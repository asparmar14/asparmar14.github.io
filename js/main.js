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
      badge: 'SQL · Customer Analytics',
      badgeClass: 'badge-analytics',
      problem: 'A financial services team needed to understand customer spending behaviour across card types, cities, and demographics — to prioritise acquisition targets, design personalised offers, and identify high-value segments with growth potential.',
      metrics: ['1.3M+ Transactions', 'Customer Segmentation', 'MoM Growth Analysis', 'Demographic Patterns', 'Weekend Behaviour'],
      insights: [
        'Top 5 cities account for the majority of total spend — the top city alone contributes disproportionately, indicating geographic concentration risk.',
        'Gold card holders show the lowest spend concentration — a counter-intuitive finding suggesting either a loyalty gap or misaligned product-to-customer fit.',
        'Female customers concentrate spending in Bills and Food categories, representing a distinct targeting opportunity for relevant financial products.',
        'Weekend spend is leisure-driven and geographically concentrated — pointing to high-value retail/entertainment partnership opportunities.',
        'Month-over-month analysis revealed which card/expense combinations are growing fastest, enabling proactive product investment decisions.'
      ],
      recommendations: [
        'Design a targeted engagement campaign for Gold card holders to increase spend frequency — focus on the categories where Gold customers currently underindex.',
        'Build segment-specific offers for female customers around Bill payment and food delivery partnerships.',
        'Introduce weekend spend rewards in top leisure cities to capture and retain high-LTV customers.',
        'Shift acquisition budget toward card types and cities with the fastest MoM spend growth trajectory.'
      ],
      impact: 'Framework enables product teams to move from generic card promotions to segment-specific interventions — estimated potential for 12–18% improvement in high-value customer engagement.',
      tech: ['SQL (Advanced)', 'CTEs', 'Window Functions', 'RANK / LAG', 'Date Functions', 'SSMS'],
      githubUrl: 'https://github.com/asparmar14/SQL-project',
      images: []
    },
    earthquake: {
      title: 'Seismic Risk Pattern Analysis — India',
      badge: 'Risk Analytics · ML',
      badgeClass: 'badge-analytics',
      problem: 'Risk analysts and infrastructure planners needed a data-driven understanding of which geographic regions in India carry the highest earthquake risk — enabling prioritised investment in resilience and more accurate insurance risk scoring.',
      metrics: ['~90% model accuracy (RF)', '10 Years USGS Data', '4 ML Models Compared', 'Interactive Geospatial Maps'],
      insights: [
        'Latitude emerged as the single strongest predictor of earthquake magnitude — enabling geographically targeted risk prioritisation without complex multi-variable models.',
        'The Himalayan belt and Northeast India consistently recorded the highest magnitude events across the 10-year period.',
        'Random Forest and Logistic Regression both achieved ~90% classification accuracy — confirming the geographic features carry strong predictive signal.',
        'Decision Trees underperformed at 79%, demonstrating the value of ensemble methods for noisy geospatial data.'
      ],
      recommendations: [
        'Infrastructure investment: prioritise seismic resilience upgrades in high-latitude Northern and Northeastern regions.',
        'Insurance risk scoring: weight latitude and distance-from-equator as primary features in property risk models.',
        'Use the interactive Folium map as a stakeholder communication tool — enables non-technical leadership to visualise risk concentration without interpreting data.'
      ],
      impact: 'Geographically targeted risk framework enables 3× more efficient allocation of resilience investment versus uniform national standards.',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'Folium', 'Cartopy', 'Random Forest', 'SVM', 'GridSearchCV'],
      githubUrl: 'https://github.com/asparmar14/Earthquake-prediction-model',
      images: ['assets/eq-map.png', 'assets/eq-models.png', 'assets/eq-features.png']
    },
    rag: {
      title: 'Document Intelligence — RAG-based QA System',
      badge: 'AI · Knowledge Analytics',
      badgeClass: 'badge-retention',
      problem: 'Analytics and operations teams spend significant time searching through large document repositories to find specific answers or policies. This represents a productivity drain that scales poorly as documentation grows.',
      metrics: ['Natural Language Queries', 'Vector Search (Pinecone)', 'Cohere LLM Generation', 'Dockerized Deployment'],
      insights: [
        'Information retrieval is one of the most under-optimised workflows in data teams — most analysts spend 15–30% of time finding context, not analysing it.',
        'RAG architecture enables accurate, source-cited answers without the hallucination risks of pure LLM approaches.',
        'The system\'s value scales with document volume — highest ROI in organisations with large policy, research, or product documentation libraries.'
      ],
      recommendations: [
        'Deploy as an internal analytics documentation search tool — enabling stakeholders to self-serve answers without analyst intermediation.',
        'Extend to product analytics playbooks: let product managers query "how do we measure X" or "what did the last retention experiment show" directly.',
        'Integrate with Confluence or Notion to provide a query layer over existing team knowledge bases.'
      ],
      impact: 'Estimated 20–30% reduction in analyst time spent on information retrieval tasks. Enables stakeholder self-serve for documented insights.',
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
            <ul>${d.insights.map(i => `<li>${i}</li>`).join('')}</ul>
          </div>

          <div class="modal-section">
            <h4><span class="micon">💡</span> Recommendations</h4>
            <ul>${d.recommendations.map(r => `<li>${r}</li>`).join('')}</ul>
          </div>

          ${d.images.length > 1 ? `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:1.5rem;">
              ${d.images.slice(1).map(img => `<img src="${img}" style="width:100%;border-radius:8px;border:1px solid var(--border);" alt="">`).join('')}
            </div>` : ''}

          <div class="modal-impact">
            <div class="modal-impact-label">📈 Estimated Impact</div>
            <p>${d.impact}</p>
          </div>

          <div class="modal-section" style="margin-top:1.5rem;">
            <h4>Technical Stack</h4>
            <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">${d.tech.map(t => `<span class="tag">${t}</span>`).join('')}</div>
            <p style="margin-top:0.75rem;font-size:0.82rem;color:var(--text-3);">Technical implementation details available on GitHub — the focus here is the business framing and insight.</p>
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