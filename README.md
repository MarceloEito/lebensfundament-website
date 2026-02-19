# Grace Community Church Website

A modern, responsive church website built with React featuring contact forms and Google Maps integration.

## Features

- Responsive design that works on all devices
- Component-based architecture
- Interactive navigation with active states
- Service times display
- Information cards for visitors
- **Google Maps integration** showing church location in Bruchmühlbach-Miesau
- **Contact form** with validation
- Contact information section
- Modern styling with CSS

## Getting Started

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm start
```

The site will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

## Project Structure

```
church-website-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js & Header.css
│   │   ├── Navigation.js & Navigation.css
│   │   ├── Hero.js & Hero.css
│   │   ├── ServiceTimes.js & ServiceTimes.css
│   │   ├── WhatToExpect.js & WhatToExpect.css
│   │   ├── MapSection.js & MapSection.css (Google Maps)
│   │   ├── ContactForm.js & ContactForm.css (Contact Form)
│   │   ├── Location.js & Location.css
│   │   ├── Footer.js & Footer.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## New Components

### MapSection
- Integrated Google Maps showing Bruchmühlbach-Miesau location
- Address details with parking and public transport information
- Responsive map display

### ContactForm
- Full contact form with validation
- Multiple subject options (Visit, Prayer Request, Volunteer, etc.)
- Success message on submission
- Form fields: Name, Email, Phone, Subject, Message

## Customization

Update the following to match your church:

- Church name in `Header.js`
- Service times in `ServiceTimes.js`
- Contact information in `Location.js` (already updated for Germany)
- Map coordinates in `MapSection.js` (currently set to Bruchmühlbach-Miesau)
- Navigation items in `Navigation.js`
- Colors in CSS files (main color: #3498db)

### Customizing the Map

To change the exact location on the map, update the coordinates in `MapSection.js`. You can:
1. Go to Google Maps
2. Find your exact location
3. Right-click and copy the coordinates
4. Update the embed URL in the component

### Contact Form Backend

The contact form currently logs to console. To make it functional:
1. Set up a backend API endpoint
2. Update the `handleSubmit` function in `ContactForm.js`
3. Use services like EmailJS, FormSpree, or your own server

## Technologies

- React 18
- CSS3
- Google Maps Embed API
- React Scripts

## Location

Church address: Hauptstraße 45, 66892 Bruchmühlbach-Miesau, Germany
