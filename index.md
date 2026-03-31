---
layout: default
title: Eligibility Assessment
---

<div id="calculator">
  {% for item in site.data.criteria %}
    <section class="criterion">
      <h3>{{ item.title }}</h3>
      {% for q in item.questions %}
        <label>
          <input type="checkbox" class="crit-check" data-id="{{ item.id }}">
          {{ q }}
        </label><br>
      {% endfor %}
      <p><small>Evidence needed: {{ item.evidence }}</small></p>
    </section>
    <hr>
  {% endfor %}
  
  <div id="results">
    <button onclick="calculateScore()">Check Eligibility</button>
    <h2 id="score-output"></h2>
  </div>
</div>

<script>
function calculateScore() {
  const checks = document.querySelectorAll('.crit-check:checked');
  const uniqueCriteria = new Set();
  checks.forEach(c => uniqueCriteria.add(c.getAttribute('data-id')));
  
  const score = uniqueCriteria.size;
  const output = document.getElementById('score-output');
  
  if(score >= 3) {
    output.innerText = `Potential Match! You meet ${score}/10 criteria.`;
    output.style.color = "green";
  } else {
    output.innerText = `Keep Building: You meet ${score}/10 criteria. You need at least 3.`;
    output.style.color = "orange";
  }
}
</script>