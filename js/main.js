/* Portfolio JS — Anshul Parmar v4 */

document.addEventListener('DOMContentLoaded', () => {

  /* NAVBAR */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveLink();
  }, { passive: true });

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a[href^="#"]');
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) current = s.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
  }

  /* MOBILE NAV */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  /* FADE-UP */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

  /* SKILL BARS */
  const barsObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.width; }, 150);
        });
        barsObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelector('.skill-bars') && barsObs.observe(document.querySelector('.skill-bars'));

  /* PROJECT FILTER */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        const show = f === 'all' || (card.dataset.categories || '').includes(f);
        card.style.opacity = show ? '1' : '0.25';
        card.style.pointerEvents = show ? '' : 'none';
      });
    });
  });

  /* MODALS */
  const overlay = document.getElementById('modal-overlay');
  const modalEl = document.getElementById('modal-content');

  const data = {
    sql: {
      title: 'Credit Card Spend Patterns — Customer Segmentation',
      badge: 'Customer Analytics · SQL',
      badgeClass: 'badge-analytics',
      metrics: ['1.3M+ Transactions', 'Customer Segmentation', 'MoM Growth', 'Demographic Patterns'],
      problem: 'A financial services team needed to understand customer spending behaviour across card types, cities, and demographics — to prioritise acquisition and design targeted offers.',
      insights: [
        'Top 5 cities drive <strong>~65% of total spend</strong> — geographic concentration risk if any market weakens',
        'Gold holders spend <strong>~30% less than Platinum</strong> — a loyalty gap, not a credit limit issue',
        'Female segment concentrates <strong>~58% of spend in Bills &amp; Food</strong> — distinct targeting opportunity',
        'Weekend spend is <strong>~40% leisure-driven</strong> in top 3 cities — retail partnership signal'
      ],
      recommendations: [
        'Re-engage Gold card holders in high-spend cities, focusing on underperforming categories',
        'Build segment-specific offers for female customers around Bills &amp; Food delivery',
        'Introduce weekend leisure rewards in top 3 cities to retain high-LTV customers'
      ],
      impact: 'Enabled segment-specific targeting strategy. Potential <strong>+12–18% uplift</strong> in high-value customer engagement.',
      tech: ['SQL Advanced', 'CTEs', 'Window Functions', 'LAG / RANK', 'Date Functions'],
      github: 'https://github.com/asparmar14/SQL-project',
      images: []
    },
    earthquake: {
      title: 'Seismic Risk Pattern Analysis — India',
      badge: 'Risk Analytics · ML',
      badgeClass: 'badge-analytics',
      metrics: ['~90% Accuracy (RF)', '10 Years USGS Data', '4 ML Models', 'Interactive Maps'],
      problem: 'Risk analysts needed a data-driven classification of Indian regions by earthquake severity to prioritise infrastructure investment and improve insurance risk-scoring.',
      insights: [
        '<strong>Latitude is the single strongest predictor</strong> — simple geographic feature enabling clear risk tiers',
        'Northeast India shows <strong>3× higher M5+ frequency</strong> than peninsular India',
        'Random Forest achieved <strong>~90% accuracy</strong> — validated across 4 competing models',
        'Decision Tree underperformed RF by <strong>~11 accuracy points</strong> on identical data'
      ],
      recommendations: [
        'Prioritise seismic resilience upgrades in high-latitude Northern and Northeastern corridors',
        'Use latitude + distance-from-equator as tier-1 features in insurance risk scoring models',
        'Use the interactive Folium map for executive communication — no statistics needed'
      ],
      impact: 'Geographically targeted risk framework enables <strong>3× more efficient</strong> infrastructure investment vs uniform national standards.',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'Folium', 'Cartopy', 'Random Forest', 'SVM'],
      github: 'https://github.com/asparmar14/Earthquake-prediction-model',
      images: ['assets/eq-map.png', 'assets/eq-models.png']
    },
    rag: {
      title: 'Document QA System — Faster Insight Retrieval',
      badge: 'AI · Knowledge Analytics',
      badgeClass: 'badge-retention',
      metrics: ['Natural Language Queries', 'Pinecone Vector Search', 'Cohere LLM', 'Dockerized'],
      problem: 'Analysts spend an estimated 15–30% of their time searching documents for context — not analysing. The goal: build a natural language query layer to surface answers directly.',
      insights: [
        'Information retrieval is a <strong>hidden productivity drain</strong> — the highest-leverage inefficiency in most data teams',
        'RAG delivers <strong>accurate, source-cited answers</strong> — eliminates hallucination risk vs pure LLM',
        'Stakeholder self-serve reduces ad-hoc requests for documented information by an estimated <strong>40–50%</strong>'
      ],
      recommendations: [
        'Deploy as internal analytics documentation search — PMs can self-serve on "how do we measure X?"',
        'Extend to product experiment histories for on-demand recall of past decisions',
        'Integrate with Confluence or Notion to layer NL querying over existing knowledge bases'
      ],
      impact: 'Estimated <strong>20–30% reduction</strong> in analyst time on information retrieval. Enables full stakeholder self-serve for documented insights.',
      tech: ['Python', 'Pinecone', 'Cohere API', 'SentenceTransformers', 'Streamlit', 'Docker'],
      github: 'https://github.com/asparmar14/RAG-based-QA-Bot-with-Cohere-and-Pinecone',
      images: ['assets/rag-screenshot.jpg']
    }
  };

  const GH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`;

  document.querySelectorAll('[data-project]').forEach(card => {
    card.addEventListener('click', () => {
      const d = data[card.dataset.project];
      if (!d) return;

      modalEl.innerHTML = `
        <div class="modal-header">
          <span class="project-badge ${d.badgeClass}" style="margin-bottom:0.65rem;">${d.badge}</span>
          <h2 style="font-size:1.3rem;padding-right:2.5rem;">${d.title}</h2>
          <button class="modal-close" id="modal-close">✕</button>
        </div>
        <div class="modal-body">
          ${d.images[0] ? `<img src="${d.images[0]}" class="modal-img" alt="${d.title}">` : ''}
          <div class="modal-metrics">${d.metrics.map(m => `<span class="metric">${m}</span>`).join('')}</div>

          <div class="modal-sec">
            <h4>Problem</h4>
            <p>${d.problem}</p>
          </div>

          <div class="modal-sec">
            <h4>Key Insights</h4>
            <ul>${d.insights.map(i => `<li>${i}</li>`).join('')}</ul>
          </div>

          <div class="modal-sec">
            <h4>Recommendations</h4>
            <ul>${d.recommendations.map(r => `<li>${r}</li>`).join('')}</ul>
          </div>

          ${d.images.length > 1 ? `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.65rem;margin-bottom:1.25rem;">
              ${d.images.slice(1).map(img => `<img src="${img}" style="width:100%;border-radius:8px;border:1px solid var(--border);" alt="">`).join('')}
            </div>` : ''}

          <div class="modal-impact">
            <div class="modal-impact-label">📈 Estimated Impact</div>
            <p>${d.impact}</p>
          </div>

          <div class="modal-sec" style="margin-top:1.25rem;">
            <h4>Tools Used</h4>
            <div style="display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:1rem;">
              ${d.tech.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
            <a href="${d.github}" target="_blank" rel="noopener" class="btn btn-outline" style="font-size:0.84rem;display:inline-flex;">
              ${GH_SVG} View on GitHub
            </a>
          </div>
        </div>`;

      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      document.getElementById('modal-close')?.addEventListener('click', close);
    });
  });

  overlay?.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  function close() { overlay.classList.remove('open'); document.body.style.overflow = ''; }

  /* CONTACT FORM */
  document.getElementById('contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    btn.textContent = 'Sent ✓';
    btn.style.background = 'var(--accent-2)';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; btn.disabled = false; this.reset(); }, 3000);
  });

  /* SMOOTH SCROLL */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const t = document.querySelector(this.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

});
