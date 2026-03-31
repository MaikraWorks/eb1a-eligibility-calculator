---
layout: default
title: EB-1A Eligibility Assessment
---

<div class="app-container">
  
  <main class="questionnaire">
    <header class="app-header">
      <h1>EB-1A Extraordinary Ability Assessment</h1>
      <p>Select all items you can confidently prove with documented evidence. You must satisfy <strong>at least 3 of the 10</strong> criteria.</p>
    </header>

    {% for item in site.data.criteria %}
      <section class="crit-card" id="card-{{ item.id }}">
        <div class="crit-header">
          <div class="crit-number">{{ item.id }}</div>
          <h3>{{ item.title }}</h3>
        </div>
        
        <div class="crit-body">
          {% for q in item.questions %}
            <label class="custom-checkbox">
              <input type="checkbox" class="crit-check" data-id="{{ item.id }}" id="q-{{ item.id }}-{{ forloop.index }}">
              <span class="checkmark"></span>
              <span class="label-text">{{ q }}</span>
            </label>
          {% endfor %}
        </div>

        <div class="evidence-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <div>
            <strong>Required Evidence:</strong> <br>
            {{ item.evidence }}
          </div>
        </div>
      </section>
    {% endfor %}
  </main>

  <aside class="dashboard">
    <div class="sticky-panel">
      <h2>Case Strength</h2>
      
      <div class="progress-container">
        <div class="progress-bar" id="progress-bar"></div>
      </div>
      
      <div class="score-display">
        <span id="score-number">0</span> / 10 Criteria Met
      </div>

      <div id="status-message" class="status alert-pending">
        Select criteria to begin assessment.
      </div>

      <button id="print-btn" class="action-btn" disabled>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
        Save Report as PDF
      </button>

      <button id="reset-btn" class="secondary-btn" style="margin-top: 10px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        Reset Assessment
      </button>
    </div>
  </aside>

</div>

<div id="signup-modal" class="modal-overlay hidden">
  <div class="modal-content">
    <button id="close-modal" class="close-btn">&times;</button>
    <h2>Create Your Free Account</h2>
    <p>You have a strong case! Create an account to securely save your progress to the cloud, access expert legal evidence templates, and unlock document uploads.</p>
    
    <form id="signup-form">
      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" required placeholder="you@example.com">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" required placeholder="••••••••">
      </div>
      <button type="submit" class="action-btn" style="margin-top: 1rem;">Create Account</button>
    </form>
    
    <p class="terms"><small>By creating an account, you agree to our Terms of Service and Privacy Policy. We will never share your sensitive data.</small></p>
  </div>
</div>

<script src="{{ '/assets/js/calculator.js' | relative_url }}"></script>