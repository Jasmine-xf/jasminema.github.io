(function(){
  function getParam(name){
    const url = new URL(window.location.href);
    return url.searchParams.get(name) || '';
  }

  function spanClass(span){
    if(span === 8) return 'span-8';
    if(span === 6) return 'span-6';
    if(span === 4) return 'span-4';
    if(span === 3) return 'span-3';
    return 'span-6';
  }

  async function loadData(){
    const res = await fetch('data/projects.json', { cache: 'no-store' });
    if(!res.ok) throw new Error('Failed to load projects.json');
    return res.json();
  }

  function render(project){
    document.getElementById('p-title').textContent = project.title;
    document.getElementById('p-summary').textContent = project.summary || '';
    document.getElementById('p-category').textContent = project.category || '';
    document.getElementById('p-type').textContent = project.type || '';
    document.getElementById('p-duration').textContent = project.duration || '';

    const gallery = document.getElementById('p-gallery');
    gallery.innerHTML = '';
    (project.gallery || []).forEach(item => {
      const div = document.createElement('div');
      div.className = `gallery-item ${spanClass(item.span)}`;
      const img = document.createElement('img');
      img.src = item.src; img.alt = item.alt || '';
      div.appendChild(img);
      gallery.appendChild(div);
    });

    document.getElementById('p-problem').textContent = project.problem || '';
    document.getElementById('p-goal').textContent = project.goal || '';

    const highlights = document.getElementById('p-highlights');
    highlights.innerHTML = '';
    (project.highlights || []).forEach(h => {
      const card = document.createElement('div');
      card.className = 'icon-card';
      const img = document.createElement('img');
      img.src = h.icon; img.alt = '';
      const p = document.createElement('p');
      p.textContent = h.text || '';
      card.appendChild(img); card.appendChild(p);
      highlights.appendChild(card);
    });

    // 渲染详细内容
    renderDetails(project);
  }

  function renderDetails(project) {
    // Context 背景
    if (project.context) {
      document.getElementById('p-context').style.display = 'block';
      document.getElementById('p-context-content').textContent = project.context;
    }

    // Why Redesign 重新设计原因
    if (project.whyRedesign) {
      document.getElementById('p-why-redesign').style.display = 'block';
      document.getElementById('p-why-redesign-content').textContent = project.whyRedesign;
    }

    // Goals 目标
    if (project.goals && Array.isArray(project.goals)) {
      document.getElementById('p-goals').style.display = 'block';
      const goalsList = document.getElementById('p-goals-list');
      goalsList.innerHTML = '';
      project.goals.forEach(goal => {
        const li = document.createElement('li');
        li.textContent = goal;
        goalsList.appendChild(li);
      });
    }

    // User Scenarios 用户场景
    if (project.userScenarios && Array.isArray(project.userScenarios)) {
      document.getElementById('p-user-scenarios').style.display = 'block';
      const scenariosGrid = document.getElementById('p-scenarios-grid');
      scenariosGrid.innerHTML = '';
      project.userScenarios.forEach((scenario, index) => {
        const card = document.createElement('div');
        card.className = 'scenario-card';
        card.innerHTML = `
          <div class="scenario-header">
            <div class="scenario-icon">${getPersonaIcon(scenario.persona)}</div>
            <h4 class="scenario-title">${scenario.title}</h4>
          </div>
          <div class="scenario-content">
            <blockquote class="scenario-quote">"${scenario.quote}"</blockquote>
            <p class="scenario-solution"><strong>Explor helps:</strong> ${scenario.solution}</p>
          </div>
        `;
        scenariosGrid.appendChild(card);
      });
    }

    // Pain Points 痛点
    if (project.painPoints && Array.isArray(project.painPoints)) {
      document.getElementById('p-pain-points').style.display = 'block';
      const painPointsList = document.getElementById('p-pain-points-list');
      painPointsList.innerHTML = '';
      project.painPoints.forEach(point => {
        const li = document.createElement('li');
        li.textContent = point;
        painPointsList.appendChild(li);
      });
    }

    // 原有详细内容
    if (project.process) {
      document.getElementById('p-process').style.display = 'block';
      document.getElementById('p-process-content').innerHTML = `<p>${project.process}</p>`;
    }

    if (project.research) {
      document.getElementById('p-research').style.display = 'block';
      document.getElementById('p-research-content').innerHTML = `<p>${project.research}</p>`;
    }

    if (project.implementation) {
      document.getElementById('p-implementation').style.display = 'block';
      document.getElementById('p-implementation-content').innerHTML = `<p>${project.implementation}</p>`;
    }

    if (project.results) {
      document.getElementById('p-results').style.display = 'block';
      document.getElementById('p-results-content').innerHTML = `<p>${project.results}</p>`;
    }
  }

  function getPersonaIcon(persona) {
    if (persona.includes('Student')) return '🎓';
    if (persona.includes('Business')) return '💼';
    if (persona.includes('Cultural')) return '🌍';
    return '👤';
  }

  async function init(){
    const slug = getParam('slug');
    const data = await loadData();
    const project = data.find(p => p.slug === slug) || data[0];
    render(project);
  }

  document.addEventListener('DOMContentLoaded', init);
})();

