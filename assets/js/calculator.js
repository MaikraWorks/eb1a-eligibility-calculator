document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.crit-check');
  const scoreNumber = document.getElementById('score-number');
  const progressBar = document.getElementById('progress-bar');
  const statusMessage = document.getElementById('status-message');
  const printBtn = document.getElementById('print-btn');
  const resetBtn = document.getElementById('reset-btn');
  
  // Modal Elements
  const modal = document.getElementById('signup-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const signupForm = document.getElementById('signup-form');

  const STORAGE_KEY = 'eb1a_assessment_progress';

  // 1. Initialize data on load
  loadProgress();

  // 2. Attach Core Event Listeners
  checkboxes.forEach(box => {
    box.addEventListener('change', () => {
      updateAssessment();
      saveProgress(); 
    });
  });

  printBtn.addEventListener('click', () => window.print());
  resetBtn.addEventListener('click', resetProgress);

  // 3. Modal Event Listeners
  closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
  
  // Close modal if clicking outside the white content box
  modal.addEventListener('click', (e) => {
    if(e.target === modal) modal.classList.add('hidden');
  });

  // Handle fake form submission for now
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    alert(`Registration simulated for: ${email}\n\nWhen you connect a backend (like Firebase or Supabase), this will securely create the account.`);
    modal.classList.add('hidden');
    signupForm.reset();
  });

  // --- Main Application Logic ---

  function updateAssessment() {
    const uniqueCriteria = new Set();
    checkboxes.forEach(c => {
      if (c.checked) uniqueCriteria.add(c.getAttribute('data-id'));
    });
    
    const score = uniqueCriteria.size;

    // Update Dashboard UI
    scoreNumber.innerText = score;
    progressBar.style.width = `${(score / 10) * 100}%`;

    // Highlight selected cards
    document.querySelectorAll('.crit-card').forEach(card => card.classList.remove('active'));
    uniqueCriteria.forEach(id => {
      const card = document.getElementById(`card-${id}`);
      if(card) card.classList.add('active');
    });

    printBtn.disabled = true; // Default state

    // Update Status Message and Progress Color
    if (score === 0) {
      statusMessage.className = 'status alert-pending';
      statusMessage.innerHTML = 'Select criteria to begin assessment. Progress auto-saves.';
      progressBar.style.backgroundColor = 'var(--accent)';
    } 
    else if (score > 0 && score < 3) {
      statusMessage.className = 'status alert-warning';
      statusMessage.innerHTML = `<strong>Keep Building.</strong> You need at least ${3 - score} more criteria. Progress saved locally.`;
      progressBar.style.backgroundColor = 'var(--warning)';
    } 
    else {
      // Threshold met -> Show CTA
      statusMessage.className = 'status alert-success';
      statusMessage.innerHTML = `
        <div style="margin-bottom: 8px;"><strong>Threshold Met!</strong> You have identified $\\ge 3$ criteria.</div>
        <button id="open-signup" class="upgrade-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
          Save to Cloud & Get Templates
        </button>
      `;
      progressBar.style.backgroundColor = 'var(--success)';
      printBtn.disabled = false; 
      
      // Attach listener to the newly injected button
      document.getElementById('open-signup').addEventListener('click', () => {
        modal.classList.remove('hidden');
      });
    }
  }

  // --- Local Storage Functions ---

  function saveProgress() {
    const checkedIds = Array.from(checkboxes)
      .filter(box => box.checked)
      .map(box => box.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));
  }

  function loadProgress() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      JSON.parse(savedData).forEach(id => {
        const box = document.getElementById(id);
        if (box) box.checked = true;
      });
    }
    updateAssessment(); // Refresh UI to match loaded state
  }

  function resetProgress() {
    if (confirm("Are you sure you want to clear your assessment data? This cannot be undone.")) {
      checkboxes.forEach(box => box.checked = false);
      localStorage.removeItem(STORAGE_KEY);
      updateAssessment();
    }
  }
});