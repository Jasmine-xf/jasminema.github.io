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
  }

  async function init(){
    const slug = getParam('slug');
    const data = await loadData();
    const project = data.find(p => p.slug === slug) || data[0];
    render(project);
  }

  document.addEventListener('DOMContentLoaded', init);
})();

