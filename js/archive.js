(function(){
  async function loadData(){
    const res = await fetch('data/projects.json', { cache: 'no-store' });
    if(!res.ok) throw new Error('Failed to load projects.json');
    return res.json();
  }

  function createCard(p){
    const article = document.createElement('article');
    article.className = 'work-card span-4';

    const media = document.createElement('a');
    // 使用新的URL结构：project/slug/
    media.href = `project/${encodeURIComponent(p.slug)}/`;
    media.className = 'work-card-media';

    const cover = (p.gallery && p.gallery[0]) ? p.gallery[0].src : 'assets/images/Gradient.png';
    const img = document.createElement('img');
    img.src = cover; img.alt = p.title;
    media.appendChild(img);

    const body = document.createElement('div');
    body.className = 'work-card-body';

    const h3 = document.createElement('h3');
    h3.className = 'work-card-title';
    h3.textContent = p.title;

    const meta = document.createElement('div');
    meta.className = 'work-card-meta';

    const tag1 = document.createElement('span');
    tag1.className = 'work-tag';
    tag1.textContent = p.category || '';
    const tag2 = document.createElement('span');
    tag2.className = 'work-tag';
    tag2.textContent = p.type || '';

    meta.appendChild(tag1); meta.appendChild(tag2);
    body.appendChild(h3); body.appendChild(meta);

    article.appendChild(media); article.appendChild(body);
    return article;
  }

  async function init(){
    const grid = document.getElementById('archive-grid');
    const data = await loadData();
    data.forEach(p => grid.appendChild(createCard(p)));
  }

  document.addEventListener('DOMContentLoaded', init);
})();

