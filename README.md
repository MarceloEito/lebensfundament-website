# Kirche Lebensfundament Website

A modern, responsive website for Kirche Lebensfundament in Bruchmühlbach-Miesau, built with React.

<img src="public/logo.svg" alt="Logo" width="120">

## 🎨 Features

- ✅ **Warm terracotta design** – colors taken from the church logo
- ✅ **Fully responsive** – tested on phones (360–430 px), tablets and desktop
- ✅ **Video hero** – calm, softly blurred looping video of an open Bible, with a poster frame while it loads
- ✅ **Events** – regular services and upcoming events in two tabs
- ✅ **Directions** – Google Maps for the church, parking and the train station, with a public transport route
- ✅ **Contact form** – sent by email from the site's own server, with German validation messages
- ✅ **Legal pages** – Impressum and Datenschutzerklärung (templates with placeholders)

## 🚀 Technologies

- React 18 with [Vite](https://vite.dev) (requires Node.js 20.19+ or 22.12+)
- Plain CSS with design tokens (CSS custom properties)
- [AOS](https://michalsnik.github.io/aos/) for scroll animations
- Font: Montserrat (headings in bold, body text regular), self-hosted via [Fontsource](https://fontsource.org) – no requests to Google
- Icons: inline SVGs from [Feather](https://feathericons.com) and [Phosphor](https://phosphoricons.com) (Bold)

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/MarceloEito/lebensfundament-website.git
cd lebensfundament-website

# Install dependencies
npm ci

# Start development server
npm start
```

The website opens automatically at [http://localhost:3000](http://localhost:3000) and reloads on every change.

## 🏗️ Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build` folder. `npm run preview` serves that build locally for a final check.

The Content-Security-Policy is defined in `vite.config.js` and only added to the production build.

## 📂 Project Structure

```
lebensfundament-website/
├── public/
│   ├── impressum/index.html    # Impressum (static page)
│   ├── datenschutz/index.html  # Datenschutzerklärung (static page)
│   ├── legal.css               # Shared styles for the legal pages
│   ├── .htaccess               # Server settings at all-inkl (https, headers, caching)
│   ├── contact.php             # Sends contact form messages by email
│   ├── logo.svg                # Church logo (vector) + PNG icons
│   ├── og-image.jpg            # Link preview image (1200×630)
│   ├── robots.txt, sitemap.xml # For search engines
│   ├── google8ca7332cfeb69aa0.html # Google Search Console verification (keep)
│   ├── admin/                  # Admin area for event flyers (Sveltia CMS)
│   ├── uploads/events/         # Uploaded event flyers
│   ├── videos/                 # Hero video + poster frame
│   └── *.jpg                   # Church photos and posters (not used yet)
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Logo, navigation, mobile menu
│   │   ├── Hero.jsx            # Video hero with info bar
│   │   ├── WhatToExpect.jsx    # "Über uns" section
│   │   ├── Events.jsx          # Regular services + upcoming events
│   │   ├── MapSection.jsx      # "Besuche uns": address, parking, train station
│   │   ├── ContactForm.jsx     # Contact form (sends to contact.php)
│   │   ├── Location.jsx        # Address banner
│   │   └── Footer.jsx          # Footer with legal links
│   ├── data/events.json        # Upcoming event flyers (edited via /admin)
│   ├── sendMessage.js          # Posts the contact form to contact.php
│   ├── index.css               # Design tokens and shared styles
│   ├── App.jsx
│   └── index.jsx
├── .github/workflows/deploy.yml # Builds the site and uploads it to all-inkl
├── index.html                  # HTML shell, icons, share preview tags
├── vite.config.js              # Build config incl. Content-Security-Policy
└── package.json
```

## 🎨 Customization

### Colors and fonts
All colors, fonts, shadows and spacing are defined once as CSS variables at the top of `src/index.css`, e.g.:
- **Terracotta**: `--color-orange: #ab4d13`
- **Text**: `--color-text-primary: #1c1410`
- **Heading font**: `--font-heading` and `--font-heading-weight`

### Content
- **Regular services and upcoming events**: `src/components/Events.jsx` (upcoming events are placeholders for now)
- **Service times in the footer**: `src/components/Footer.jsx`
- **Address, parking and station maps**: `src/components/MapSection.jsx`
- **Contact form recipient**: `RECIPIENT` in `public/contact.php`
- **Hero video**: replace `public/videos/background.mp4` (and `background-poster.jpg`)

### Event flyers (admin area)
Flyers for the "Kommende Events" tab are managed at **[`/admin`](https://lebensfundament.org/admin/)** with [Sveltia CMS](https://sveltiacms.app). Add an event with a flyer image, a short title and the date; saving commits to `main`, and the change is online within 1–2 minutes (see Deployment). A flyer disappears automatically after its date, and the tab is hidden while there are no upcoming flyers. Uploaded images are scaled down and converted to WebP and stored in `public/uploads/events/`; the data lives in `src/data/events.json`. Settings: `public/admin/config.yml`.

Signing in requires write access to this GitHub repository: on GitHub create a *fine-grained personal access token* for this repository only with *Contents: Read and write*, then choose "Sign In Using Access Token". The token stays in your browser; never put it into the code.

### Contact form
The contact form posts to `public/contact.php` on the webspace at all-inkl, which emails the message to `info@lebensfundament.org` (recipient and sender are set at the top of the file). No outside service is involved. The script only accepts posts from the site itself, drops messages that fill the hidden honeypot field and keeps every field on one line, so it cannot be misused to send mail elsewhere. PHP does not run in local development, so the form only works on the live site.

### Legal pages
`public/impressum/index.html` and `public/datenschutz/index.html` hold the church's details. Update them when the hosting, the email address or the services used change. They are not legal advice.

## 🌐 Deployment

The site is hosted on the webspace at **all-inkl** (lebensfundament.org). On every change to `main`, including flyers saved in `/admin`, the GitHub Actions workflow `.github/workflows/deploy.yml` builds the site and uploads it over encrypted FTP. The change is online within 1–2 minutes; progress and errors are shown under *Actions* on GitHub, where *Run workflow* also starts an upload by hand.

One-time setup:
1. **all-inkl (KAS / "Technische Verwaltung"):** turn on the Let's Encrypt certificate for the domain (*Domain → edit → SSL*; in the "Privat" plan this is a paid add-on). Note the domain's folder shown in the domain list.
2. **FTP access:** either an extra FTP user whose directory is the domain's folder, or the main FTP login from the all-inkl welcome email (it sees the whole webspace).
3. **GitHub:** under *Settings → Secrets and variables → Actions* add the repository secrets `FTP_SERVER` (the KAS server name, e.g. `w0123456.kasserver.com`), `FTP_USERNAME` and `FTP_PASSWORD`. With the main FTP login also add `FTP_DIR`, the domain's folder (e.g. `/lebensfundament.org/`). Without these secrets the workflow only builds and uploads nothing.

The upload removes old files only inside the site's `assets` and `uploads` folders, never elsewhere in the webspace.

If the FTP password is changed in the KAS, update `FTP_PASSWORD` too. The server settings (https, `www` redirect, security headers, caching) are in `public/.htaccess`.

`SITE_URL` (set in the workflow) is used for the link preview (`og:image`, `og:url`) shown when the site is shared on WhatsApp, Signal or Facebook. Builds without it are hidden from search engines (`noindex`). Locally it can go into a `.env` file (see `.env.example`).

The site is a static build, so other hosts work as well.

## 🔒 Branch Protection

`main` is protected by a repository ruleset ("Protect main"):
- ✅ Only the repository owner (admin) can push directly to `main`
- ✅ Everyone else works on a branch and opens a Pull Request
- ✅ Pull Requests need an approval from the code owner (`.github/CODEOWNERS`)
- ✅ New pushes after an approval require a fresh approval
- ❌ Force pushes and deleting `main` are blocked

### Workflow for Changes:

```bash
# Create new feature branch
git checkout -b feature/my-change

# Make changes and commit
git add .
git commit -m "Description of changes"

# Push branch
git push origin feature/my-change

# Create Pull Request on GitHub
```

## 📱 Contact

**Kirche Lebensfundament**
- 📍 Eichenhübel 12a, 66892 Bruchmühlbach-Miesau, Germany
- 🕐 Sunday Service: 11:00 AM
- 🙏 Prayer Meeting: Tuesday 6:30 PM
- 🎸 Youth: Friday 7:00 PM
- ⚡ Teens: Thursday 6:00 PM

## 📄 License

This project is private and created for Kirche Lebensfundament.

## 🙏 Credits

Developed with ❤️ for Kirche Lebensfundament

---

**"Jesus ist unser Lebensfundament" - "Jesus is our life foundation"**
