# Anshul Parmar — Portfolio Website

Personal portfolio website for Anshul Parmar, Senior Data Analyst.
Built with vanilla HTML, CSS, and JavaScript. Hosted on GitHub Pages.

**Live site:** https://asparmar14.github.io

## Tech Stack
- HTML5 · CSS3 · Vanilla JavaScript
- No frameworks, no build tools — loads fast everywhere
- Fully responsive (mobile, tablet, desktop)
- Dark theme, scroll animations, project modals

## Sections
- Hero with animated typing effect
- About Me with stats
- Skills (6 categories + proficiency bars)
- Experience Timeline (2 roles with metrics)
- Projects (4 case studies with modal popups + filter)
- Certifications (8 cards)
- Contact form (via Formspree)

## How to Deploy on GitHub Pages

### Step 1 — Create the repo
1. Go to https://github.com/new
2. Repository name: **exactly** `asparmar14.github.io` (replace `asparmar14` with your GitHub username)
3. Make it **Public**
4. Do NOT initialise with README (you'll push your own files)
5. Click "Create repository"

### Step 2 — Push these files
```bash
cd portfolio   # this folder
git init
git add .
git commit -m "Initial portfolio deploy"
git branch -M main
git remote add origin https://github.com/asparmar14/asparmar14.github.io.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** · Folder: **/ (root)**
4. Click **Save**

### Step 4 — Wait 2–3 minutes
Your site will be live at: `https://asparmar14.github.io`

---

## Updating the Site

### Add a photo
Replace the `AP` initials in the About section with your photo:
1. Add your photo to `assets/photo.jpg`
2. In `index.html`, find the `.about-avatar` div and replace with:
```html
<img src="assets/photo.jpg" alt="Anshul Parmar" class="about-avatar" style="object-fit:cover;">
```

### Add a new project
1. Add project images to `assets/`
2. In `index.html`, duplicate a `.project-card` block and update content
3. In `js/main.js`, add an entry to the `projectData` object

### Add a Power BI dashboard screenshot
1. Screenshot your Power BI dashboard (Windows: Win+Shift+S)
2. Save as `assets/powerbi-dashboard.png`
3. Add a new project card pointing to that image

### Update contact form
Replace the Formspree URL with your actual endpoint:
1. Go to https://formspree.io and create a free account
2. Create a new form for your email
3. Replace `https://formspree.io/f/anshulparmar101@gmail.com` with your actual Formspree endpoint

---

## Folder Structure
```
portfolio/
├── index.html          ← Main page (everything is single-page)
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← Interactions, animations, modals
├── assets/
│   ├── rag-screenshot.jpg
│   ├── eq-map.png
│   ├── eq-models.png
│   ├── eq-dist.png
│   └── eq-features.png
└── README.md           ← This file
```

---

## Customisation Checklist (do before going live)

- [ ] Replace `asparmar14.github.io` URLs with your actual GitHub Pages URL
- [ ] Set up Formspree for contact form (takes 5 minutes, free tier works)
- [ ] Add your professional photo to `assets/`
- [ ] Add Power BI dashboard screenshot to `assets/` and link it to a new project card
- [ ] Update the `og:url` meta tag in `<head>` with your live URL
- [ ] Test on mobile (Chrome DevTools → device toolbar)

---

*Last updated: April 2026*
