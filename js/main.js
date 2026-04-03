/* ============================================
   PORTFOLIO JS — Anshul Parmar
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR scroll effect ---- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveLink();
  });

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
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
    hamburger.classList.toggle('open');
  });

  navLinksContainer?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
      hamburger?.classList.remove('open');
    });
  });

  /* ---- FADE-UP OBSERVER ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  /* ---- SKILL BARS animate on scroll ---- */
  const barsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
        barsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillBarsSection = document.querySelector('.skill-bars');
  if (skillBarsSection) barsObserver.observe(skillBarsSection);

  /* ---- PROJECT FILTER ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const cats = card.dataset.categories || '';
        if (filter === 'all' || cats.includes(filter)) {
          card.style.display = '';
          setTimeout(() => card.style.opacity = '1', 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 200);
        }
      });
    });
  });

  /* ---- PROJECT MODALS ---- */
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');

  const projectData = {
    sql: {
      title: 'Credit Card Transactions Analysis',
      badge: 'SQL · Financial Analytics',
      badgeClass: 'badge-sql',
      metrics: ['9 Business Questions', 'Advanced SQL', '1.3M+ Transactions', 'Financial Domain'],
      problem: 'Analyse a large-scale credit card transactions dataset to uncover spending patterns, identify customer segments, and surface growth opportunities across cities, card types, and demographics.',
      approach: 'Designed 9 progressive analytical queries using advanced SQL techniques: window functions (LAG, RANK, ROW_NUMBER), CTEs, cumulative sums, conditional aggregations, and date functions. Each query was framed around a real business question that a credit/retail analyst would ask.',
      impact: 'Identified the top 5 cities driving the majority of spend, revealed month-over-month growth leaders, discovered which expense types are dominated by specific demographics, and surfaced weekend spend patterns useful for targeted promotions.',
      tech: ['SQL (Advanced)', 'CTEs', 'Window Functions', 'Aggregations', 'Date Functions', 'SSMS'],
      githubUrl: 'https://github.com/asparmar14/SQL-project',
      images: []
    },
    rag: {
      title: 'RAG-based Document QA Bot',
      badge: 'AI · Production App',
      badgeClass: 'badge-ai',
      metrics: ['Pinecone Vector DB', 'Cohere LLM', 'Streamlit UI', 'Dockerized'],
      problem: 'Enterprise teams often need to query large document repositories to find specific answers. Manually searching PDFs is slow and error-prone. This project builds an intelligent system that lets users ask natural language questions over uploaded documents.',
      approach: 'Built a full RAG (Retrieval-Augmented Generation) pipeline: documents are chunked and embedded using SentenceTransformers (all-MiniLM-L6-v2), stored in Pinecone vector DB, then retrieved by similarity search on user queries. Retrieved context is passed to Cohere\'s LLM for answer generation. Deployed with Streamlit frontend and Dockerized for portability.',
      impact: 'Working deployable application that answers document questions with cited source chunks. Architecture is directly applicable to enterprise knowledge management, contract analysis, and internal documentation search.',
      tech: ['Python', 'Pinecone', 'Cohere API', 'SentenceTransformers', 'Streamlit', 'Gradio', 'Docker'],
      githubUrl: 'https://github.com/asparmar14/RAG-based-QA-Bot-with-Cohere-and-Pinecone',
      images: ['assets/rag-screenshot.jpg']
    },
    earthquake: {
      title: 'Earthquake Analysis & ML Prediction — India',
      badge: 'ML · Geospatial Analysis',
      badgeClass: 'badge-ml',
      metrics: ['10 Years of USGS Data', '4 ML Models', '~90% Accuracy (RF)', 'Interactive Maps'],
      problem: 'Using 10 years of USGS seismic data for India, understand earthquake magnitude patterns geographically and build ML models that classify earthquakes by severity — with applications to risk prioritisation and early warning systems.',
      approach: 'Two-phase project: Phase 1 — EDA, visualisation, and geographic mapping using Folium and Cartopy. Phase 2 — Feature engineering (magnitude categories, distance from equator/prime meridian), then training and comparing 4 ML classifiers: Random Forest, Logistic Regression, Decision Tree, and SVM with GridSearchCV hyperparameter tuning.',
      impact: 'Random Forest achieved ~90% accuracy. Feature importance analysis showed latitude and distance from the equator are the strongest predictors. The interactive Folium map visualises all earthquake events colour-coded by magnitude category across India.',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'Folium', 'Cartopy', 'Random Forest', 'SVM', 'GridSearchCV'],
      githubUrl: 'https://github.com/asparmar14/Earthquake-prediction-model',
      images: ['assets/eq-map.png', 'assets/eq-models.png', 'assets/eq-dist.png', 'assets/eq-features.png']
    },
    excel: {
      title: 'Bike Sales Interactive Dashboard',
      badge: 'Excel · BI Dashboard',
      badgeClass: 'badge-excel',
      metrics: ['End-to-End Excel', 'Pivot Tables', 'Interactive Slicers', 'Data Cleaning'],
      problem: 'Transform raw bike sales data into an actionable dashboard that helps sales and marketing teams identify top customer segments and optimise targeting strategy.',
      approach: 'Full pipeline in Excel: data cleaning (deduplication, format standardisation), pivot table construction, and interactive dashboard design with slicers for dynamic filtering by region, demographic, and product category.',
      impact: 'Dashboard enables quick identification of the highest-converting customer segments (age, income, commute patterns) and surfaces which product categories perform best by region — directly informing sales focus.',
      tech: ['Microsoft Excel', 'Pivot Tables', 'Charts', 'Data Cleaning', 'Dashboard Design', 'Slicers'],
      githubUrl: 'https://github.com/asparmar14/Excel_Interactive-Dashboard',
      images: []
    }
  };

  document.querySelectorAll('[data-project]').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.project;
      const data = projectData[key];
      if (!data) return;

      modalContent.innerHTML = `
        <div class="modal-header">
          <span class="project-badge ${data.badgeClass}">${data.badge}</span>
          <h2 style="font-size:1.4rem; margin-top:0.5rem; padding-right:2.5rem;">${data.title}</h2>
          <button class="modal-close" id="modal-close" aria-label="Close">✕</button>
        </div>
        <div class="modal-body">
          ${data.images.length > 0 ? `<img src="${data.images[0]}" class="modal-img" alt="${data.title}">` : ''}
          <div class="modal-metrics">
            ${data.metrics.map(m => `<span class="metric">${m}</span>`).join('')}
          </div>
          <div class="modal-section">
            <h4>The Problem</h4>
            <p>${data.problem}</p>
          </div>
          <div class="modal-section">
            <h4>My Approach</h4>
            <p>${data.approach}</p>
          </div>
          <div class="modal-section">
            <h4>Impact & Results</h4>
            <p>${data.impact}</p>
          </div>
          ${data.images.length > 1 ? `
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom:1.5rem;">
              ${data.images.slice(1).map(img => `<img src="${img}" style="width:100%; border-radius:8px; border:1px solid var(--border);" alt="">`).join('')}
            </div>
          ` : ''}
          <div class="modal-section">
            <h4>Tech Stack</h4>
            <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
              ${data.tech.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
          </div>
          <div style="margin-top:1.5rem;">
            <a href="${data.githubUrl}" target="_blank" rel="noopener" class="btn btn-outline" style="font-size:0.85rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              View on GitHub
            </a>
          </div>
        </div>
      `;

      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';

      document.getElementById('modal-close')?.addEventListener('click', closeModal);
    });
  });

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ---- CONTACT FORM ---- */
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sent ✓';
    btn.style.background = 'var(--green-dim)';
    btn.style.color = 'var(--green)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });

  /* ---- TYPING EFFECT (hero) ---- */
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    const roles = ['Data Analyst', 'SQL Engineer', 'BI Developer', 'Insight Architect'];
    let roleIdx = 0, charIdx = 0, deleting = false;

    function type() {
      const current = roles[roleIdx];
      if (deleting) {
        typingEl.textContent = current.substring(0, --charIdx);
      } else {
        typingEl.textContent = current.substring(0, ++charIdx);
      }

      let delay = deleting ? 50 : 100;
      if (!deleting && charIdx === current.length) {
        delay = 2000;
        deleting = true;
      } else if (deleting && charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        delay = 400;
      }
      setTimeout(type, delay);
    }
    setTimeout(type, 800);
  }

  /* ---- SMOOTH SCROLL for anchor links ---- */
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
