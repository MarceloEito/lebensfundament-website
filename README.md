# Kirche Lebensfundament Website

A modern, responsive website for Kirche Lebensfundament in Bruchmühlbach-Miesau, built with React.

![Logo](public/logo.jpeg)

## 🎨 Features

- ✅ **Modern Orange/White Design** - Colors from the church logo
- ✅ **Fully Responsive** - Works on all devices
- ✅ **Video Background** - Dynamic hero section
- ✅ **Google Maps Integration** - Shows exact location
- ✅ **Contact Form** - For inquiries and prayer requests
- ✅ **Service Times** - Clear display of all events
- ✅ **Smooth Animations** - Professional hover effects and transitions

## 🚀 Technologies

- React 18
- CSS3 with modern features
- Google Maps Embed API
- Responsive Design (Mobile-First)

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/MarceloEito/lebensfundament-website.git

# Change directory
cd lebensfundament-website

# Install dependencies
npm install

# Start development server
npm start
```

The website will automatically open at [http://localhost:3000](http://localhost:3000)

## 🏗️ Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build` folder.

## 📂 Project Structure

```
lebensfundament-website/
├── public/
│   ├── index.html
│   └── logo.jpeg          # Church logo
├── src/
│   ├── components/
│   │   ├── Header.js      # Navigation & Logo
│   │   ├── Hero.js        # Hero section with video
│   │   ├── ServiceTimes.js # Service times
│   │   ├── WhatToExpect.js # Info section
│   │   ├── MapSection.js  # Google Maps
│   │   ├── ContactForm.js # Contact form
│   │   ├── Location.js    # Contact banner
│   │   └── Footer.js      # Footer
│   ├── App.js
│   └── index.js
└── package.json
```

## 🎨 Customization

### Change Colors
Main colors are defined in CSS files:
- **Orange**: `#ff6b35`
- **White**: `#ffffff`
- **Dark Gray**: `#1a1a1a`

### Customize Content
- **Service Times**: `src/components/ServiceTimes.js`
- **Address**: `src/components/MapSection.js` and `Location.js`
- **Contact Form Options**: `src/components/ContactForm.js`

### Google Maps Location
The map is already set to the correct address:
- **Eichenhübel 14, 66892 Bruchmühlbach-Miesau, Germany**

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Then upload the build folder to Netlify
```

### GitHub Pages
```bash
npm install --save-dev gh-pages

# Add to package.json:
"homepage": "https://marceloeito.github.io/lebensfundament-website",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

npm run deploy
```

## 🔒 Branch Protection

This repository uses Branch Protection Rules:
- ❌ No direct pushing to `main`
- ✅ All changes via Pull Requests
- ✅ At least 1 approval required

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
- 📍 Eichenhübel 14, 66892 Bruchmühlbach-Miesau, Germany
- 🕐 Sunday Service: 11:00 AM
- 🙏 Prayer Meeting: Tuesday 6:30 PM
- 🎸 Youth: Friday 7:00 PM

## 📄 License

This project is private and created for Kirche Lebensfundament.

## 🙏 Credits

Developed with ❤️ for Kirche Lebensfundament

---

**"Jesus ist unser Lebensfundament" - "Jesus is our life foundation"**
