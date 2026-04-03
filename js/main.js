/* ============================================
   PORTFOLIO JS — Anshul Parmar (Product Analyst)
   Light theme · Business-focused modals
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR scroll ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveLink();
  }, { passive: true });

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  /* ---- MOBILE NAV ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
  });
  navLinksContainer?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinksContainer.classList.remove('open'));
  });

  /* ---- FADE-UP OBSERVER ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  /* ---- SKILL BARS ---- */
  const barsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.width; }, 200);
        });
        barsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  const skillBars = document.querySelector('.skill-bars');
  if (skillBars) barsObserver.observe(skillBars);

  /* ---- PROJECT FILTER ---- */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        const show = filter === 'all' || (card.dataset.categories || '').includes(filter);
        card.style.opacity = show ? '1' : '0.3';
        card.style.pointerEvents = show ? '' : 'none';
      });
    });
  });

  /* ---- PROJECT MODALS — Business-framed ---- */
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContent = document.getElementById('modal-content');

  const projectData = {
    sql: {
      title: 'Credit Card Spend Patterns — Customer Analytics',
      badge: 'Customer Analytics · SQL',
      badgeClass: 'badge-analytics',
      problem: 'A financial services team needed to understand customer spending behaviour across card types, cities, and demographics — to prioritise acquisition, design targeted offers, and identify segments with the highest growth potential.',
      metrics: ['1.3M+ Transactions Analysed', 'Customer Segmentation', 'MoM Growth Tracking', 'Demographic Spend Patterns', 'Weekend Behaviour'],
      insights: [
        '<strong>~65% of total spend</strong> concentrated in just 5 cities — geographic revenue concentration risk if any single market weakens.',
        'Gold card holders show <strong>~30% lower spend share vs Platinum</strong> — points to a loyalty gap, not just credit limit differences.',
        'Female customers concentrate <strong>~58% of spend in Bills & Food</strong> — distinct, underserved segment for personalised products.',
        'Weekend spend is <strong>~40% leisure-driven</strong> in top 3 cities — strong signal for retail/entertainment partnership targeting.',
        'MoM analysis identified which card/expense combos are growing fastest — enables proactive budget allocation ahead of the curve.'
      ],
      recommendations: [
        'Run a targeted re-engagement campaign for Gold card holders in high-spend cities — focus on categories where Gold underindexes vs Platinum.',
        'Build segment-specific offers for female customers around Bill payment automation and food delivery partnerships.',
        'Introduce weekend leisure spend rewards in top 3 cities to capture and retain high-LTV customers at peak engagement.',
        'Reallocate acquisition budget toward card types and cities with the strongest MoM growth trajectory — not just current volume.'
      ],
      impact: 'Identified key revenue leakage points and segment gaps. Enables shift from generic promotions to targeted interventions — potential +12–18% improvement in high-value customer engagement.',
      takeaways: [
        'Card tier does not predict spend volume — product engagement strategy matters more than card type at acquisition.',
        'Gender-based spend clustering reveals underserved segments that are invisible in aggregate KPI reporting.',
        'MoM growth analysis shows where to invest next — not just who spends the most today.'
      ],
      tech: ['SQL (Advanced)', 'CTEs', 'Window Functions', 'LAG / RANK', 'Date Functions', 'SSMS'],
      githubUrl: 'https://github.com/asparmar14/SQL-project',
      images: []
    },
    earthquake: {
      title: 'Seismic Risk Pattern Analysis — India',
      badge: 'Risk Analytics · ML',
      badgeClass: 'badge-analytics',
      problem: 'Risk analysts and infrastructure planners needed a data-driven risk classification of Indian regions by earthquake severity — enabling prioritised investment in resilience and more accurate insurance risk-scoring.',
      metrics: ['~90% Accuracy (Random Forest)', '10 Years USGS Data', '4 ML Models Compared', 'Interactive Geospatial Maps'],
      insights: [
        '<strong>Latitude is the single strongest predictor</strong> of earthquake magnitude — simple geographic feature that enables clear risk tiers without complex modelling.',
        'Northeast India and the Himalayan belt show <strong>3× higher frequency</strong> of M5+ events vs peninsular India.',
        'Random Forest and Logistic Regression both achieved <strong>~90% classification accuracy</strong> — geographic signal is strong and generalisable.',
        'Decision Tree underperformed at <strong>~79% accuracy</strong> — ensemble methods are necessary for noisy geospatial data.'
      ],
      recommendations: [
        'Infrastructure: prioritise seismic resilience upgrades in high-latitude Northern and Northeastern corridors first — validated by model output.',
        'Insurance risk scoring: weight latitude and distance-from-equator as primary tier-1 features — delivers ~90% accuracy with minimal complexity.',
        'Use the interactive Folium map for executive stakeholder communication — enables non-technical leadership to visualise risk without interpreting statistics.'
      ],
      impact: 'Geographically targeted risk framework enables 3× more efficient allocation of resilience investment vs uniform national standards. Replaces subjective regional judgement with validated, data-driven risk tiers.',
      takeaways: [
        'Simple geographic features (latitude) outperform complex engineered variables — always test simpler models before adding complexity.',
        'Model comparison is not optional — Decision Tree underperformed Random Forest by ~11 accuracy points on identical data.',
        'Geospatial visualisations communicate risk to non-technical stakeholders faster than any table or statistical output.'
      ],
      tech: ['Python', 'Scikit-learn', 'Pandas', 'Folium', 'Cartopy', 'Random Forest', 'SVM', 'GridSearchCV'],
      githubUrl: 'https://github.com/asparmar14/Earthquake-prediction-model',
      images: ['assets/eq-map.png', 'assets/eq-models.png', 'assets/eq-features.png']
    },
    rag: {
      title: 'Document Intelligence — RAG-based QA System',
      badge: 'AI · Knowledge Analytics',
      badgeClass: 'badge-retention',
      problem: 'Analytics and operations teams spend an estimated 15–30% of their time searching documents for context — not analysing. This hidden productivity drain scales poorly as documentation grows. Goal: build a natural language query layer that surfaces answers directly.',
      metrics: ['Natural Language Queries', 'Pinecone Vector Search', 'Cohere LLM Generation', 'Dockerized Deployment'],
      insights: [
        'Information retrieval accounts for an estimated <strong>15–30% of analyst work time</strong> — the highest-leverage hidden inefficiency in data teams.',
        'RAG architecture delivers <strong>accurate, source-cited answers</strong> — eliminates hallucination risk of pure LLM approaches in business contexts.',
        'System value scales with document volume — <strong>highest ROI</strong> in orgs with large policy, research, or product documentation libraries.',
        'Stakeholder self-serve capability reduces ad-hoc analyst requests for documented information by an estimated <strong>40–50%</strong>.'
      ],
      recommendations: [
        'Deploy as an internal analytics documentation search tool — enabling PMs and stakeholders to query "how do we measure X" without analyst involvement.',
        'Extend to analytics playbooks and product experiment histories — let teams self-serve on past decisions and metrics definitions.',
        'Integrate with Confluence or Notion to layer natural language querying over existing team knowledge bases — zero new documentation required.'
      ],
      impact: 'Estimated 20–30% reduction in analyst time on information retrieval. Enables full stakeholder self-serve for documented insights — shifting analyst capacity toward higher-value analysis work.',
      takeaways: [
        'Information retrieval is a hidden productivity drain — quantifying it is the first step to justifying and prioritising the solution.',
        'Framing the tool as a business productivity solution — not an AI experiment — is what drives stakeholder adoption and trust.',
        'RAG is more trustworthy than pure LLM in business contexts because every answer is traceable to a specific source document.'
      ],
      tech: ['Python', 'Pinecone Vector DB', 'Cohere API', 'SentenceTransformers', 'Streamlit', 'Docker'],
      githubUrl: 'https://github.com/asparmar14/RAG-based-QA-Bot-with-Cohere-and-Pinecone',
      images: ['assets/rag-screenshot.jpg']
    }
  };

  document.querySelectorAll('[data-project]').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.project;
      const d = projectData[key];
      if (!d) return;

      modalContent.innerHTML = `
        <div class="modal-header">
          <span class="project-badge ${d.badgeClass}" style="margin-bottom:0.75rem;">${d.badge}</span>
          <h2 style="font-size:1.35rem;margin-top:0.25rem;padding-right:2.5rem;">${d.title}</h2>
          <button class="modal-close" id="modal-close" aria-label="Close">✕</button>
        </div>
        <div class="modal-body">
          ${d.images.length > 0 ? `<img src="${d.images[0]}" class="modal-img" alt="${d.title}">` : ''}

          <div class="modal-metrics">${d.metrics.map(m => `<span class="metric">${m}</span>`).join('')}</div>

          <div class="modal-section">
            <h4><span class="micon">🧠</span> Business Problem</h4>
            <p>${d.problem}</p>
          </div>

          <div class="modal-section">
            <h4><span class="micon">🔍</span> Key Insights Identified</h4>
            <ul>${d.insights.map(i => `<li style="margin-bottom:0.4rem;">${i}</li>`).join('')}</ul>
          </div>

          <div class="modal-section">
            <h4><span class="micon">💡</span> Recommendations</h4>
            <ul>${d.recommendations.map(r => `<li style="margin-bottom:0.4rem;">${r}</li>`).join('')}</ul>
          </div>

          ${d.images.length > 1 ? `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:1.5rem;">
              ${d.images.slice(1).map(img => `<img src="${img}" style="width:100%;border-radius:8px;border:1px solid var(--border);" alt="">`).join('')}
            </div>` : ''}

          <div class="modal-impact">
            <div class="modal-impact-label">📈 Estimated Impact</div>
            <p>${d.impact}</p>
          </div>

          <div class="modal-section" style="margin-top:1.25rem;background:var(--bg);border-radius:var(--radius);padding:1rem 1.25rem;">
            <h4 style="margin-bottom:0.6rem;">Key Takeaways</h4>
            <ul style="list-style:none;padding:0;">${d.takeaways.map(t => `<li style="display:flex;gap:0.5rem;margin-bottom:0.35rem;font-size:0.88rem;color:var(--text-2);"><span style="color:var(--text-3);flex-shrink:0;">→</span>${t}</li>`).join('')}</ul>
          </div>

          <div class="modal-section" style="margin-top:1.25rem;">
            <h4>Technical Stack</h4>
            <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">${d.tech.map(t => `<span class="tag">${t}</span>`).join('')}</div>
            <p style="margin-top:0.75rem;font-size:0.8rem;color:var(--text-3);">Technical implementation on GitHub — focus here is the business framing and insight.</p>
          </div>

          <div style="margin-top:1.5rem;">
            <a href="${d.githubUrl}" target="_blank" rel="noopener" class="btn btn-outline" style="font-size:0.85rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              View Code on GitHub
            </a>
          </div>
        </div>
      `;

      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      document.getElementById('modal-close')?.addEventListener('click', closeModal);
    });
  });

  modalOverlay?.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ---- CONTACT FORM ---- */
  document.getElementById('contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    btn.textContent = 'Sent ✓';
    btn.style.background = 'var(--accent-2)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
      this.reset();
    }, 3000);
  });

  /* ---- SMOOTH SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
