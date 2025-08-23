# CinePeak - Movie Discovery Platform

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Roboto&size=40&duration=3000&pause=1000&color=00D4FF&center=true&vCenter=true&multiline=true&width=600&height=100&lines=Welcome+to+CinePeak;" alt="Typing SVG" />
  <br><br>
  <img src="https://media.giphy.com/media/M9gbBd9nbDrOTu1Mqx/giphy.gif" width="100">
</div>



---

<div align="center">
  
  <img src="https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=000000&color=00D4FF">
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=000000&color=FF6B9D">
  <img src="https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=000000&color=C73E1D">
  <img src="https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white&labelColor=000000&color=06B6D4">
  
  <br><br>
  [Check it Live!](https:cinepeak-7.netlify.app)
  
  [![GitHub Stars](https://img.shields.io/github/stars/sayansonu7/CinePeak?style=for-the-badge&logo=github&logoColor=white&labelColor=000000&color=00D4FF)](https://github.com/sayansonu7/CinePeak/stargazers)
  [![GitHub Forks](https://img.shields.io/github/forks/sayansonu7/CinePeak?style=for-the-badge&logo=github&logoColor=white&labelColor=000000&color=FF6B9D)](https://github.com/sayansonu7/CinePeak/network)
  [![GitHub Issues](https://img.shields.io/github/issues/sayansonu7/CinePeak?style=for-the-badge&logo=github&logoColor=white&labelColor=000000&color=FFC107)](https://github.com/sayansonu7/CinePeak/issues)

</div>

---

<div align="center&color=E0B0FF">

## ABOUT CINEPEAK 

*Your Gateway to Cinematic Excellence*

</div>

<table align="center">
<tr>
<td align="center" width="100%">

### What is CinePeak?

**CinePeak** is a cutting-edge movie discovery platform that brings the magic of cinema to your fingertips! Built with modern web technologies, it offers seamless movie search capabilities powered by the OMDB API.

**Key Features:**
- **Real-time Search** - Instant movie results
- **Popular Movies** - Curated trending films
- **Responsive Design** - Works on all devices
- **Rich Details** - Ratings, plots, and cast info

</td>
</tr>
</table>

---

## TECH STACK

<div align="center">

<table>
<tr>
<td align="center" width="33%">

###  Frontend
<br>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">

</td>
<td align="center" width="33%">

### Build Tools
<br>
<img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E">
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">

</td>
<td align="center" width="33%">

### APIs & Routing
<br>
<img src="https://img.shields.io/badge/OMDB_API-FFD700?style=for-the-badge&logo=imdb&logoColor=black">
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
<img src="https://img.shields.io/badge/REST_API-009688?style=for-the-badge&logo=api&logoColor=white">

</td>
</tr>
</table>

</div>

---

##  QUICK START

### Prerequisites

```bash
# Ensure you have these installed
node --version  # v14.0.0+
npm --version   # v6.0.0+
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sayansonu7/CinePeak.git

# 2. Navigate to project directory  
cd CinePeak

# 3. Install dependencies
npm install

# 4. Create environment file
echo "VITE_OMDB_API_KEY=your_api_key_here" > .env

# 5. Start the development server
npm run dev
```

### Get Your OMDB API Key

1. Visit [OMDB API](http://www.omdbapi.com/apikey.aspx)
2. Sign up for a free API key
3. Add it to your `.env` file
4. Start exploring movies!

<div align="center">

**Open [http://localhost:5173](http://localhost:5173) and witness the magic!**

</div>

---

##  USAGE GUIDE

<table>
<tr>
<td width="50%">

### Search Movies
1. Use the search bar at the top
2. Type any movie title
3. Get instant results with details
4. Click on movies for more info

###  Browse Popular Movies  
1. Scroll through the homepage
2. Discover trending films
3. View ratings and release years
4. Explore different genres

</td>
<td width="50%">

###  Mobile Experience
1. Fully responsive design
2. Touch-friendly interface
3. Optimized for all screen sizes
4. Fast loading on mobile data

### Visual Features
1. Dark theme interface
2. Smooth animations
3. Modern card layouts
4. Clean user interface

</td>
</tr>
</table>

---

## PROJECT STRUCTURE

```
CinePeak/
├── public/
│   ├── CinePeak-full.png
│   ├── cinema.png
│   └── [assets...]
├── src/
│   ├── components/
│   │   ├── MovieCard.tsx
│   │   ├── Search.tsx
│   │   └── Spinner.tsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── DetailsPage.jsx
│   ├── hooks/
│   │   └── useDebounce.js
│   ├── App.css
│   ├── App.jsx
│   └── main.tsx
├── package.json
├── vite.config.ts
└── README.md


```
---
### Workflow
``` [User]
   |
   v
[App Interface]
   |
   v
[Search & Browse Movies]
   |
   v
[OMDB API]
   |
   v
[Results: Movie Details, Posters]
```
---

##  AVAILABLE SCRIPTS

<div align="center">

| Command | Description |
|---------|----------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` |  Preview production build |
| `npm run lint` | Run ESLint for code quality |

</div>

---

## CONTRIBUTING

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork** the repository
2. **Create** a new branch: `git checkout -b feature/amazing-feature`
3. **Make** your changes and commit them: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

###  Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Be respectful in discussions

---

## BUG REPORTS & ISSUES

<div align="center">

Found a bug? Have a feature request? 

[![Report Bug](https://img.shields.io/badge/Report_Bug-FF6B6B?style=for-the-badge)](https://github.com/sayansonu7/CinePeak/issues)
[![Feature Request](https://img.shields.io/badge/Feature_Request-4ECDC4?style=for-the-badge)](https://github.com/sayansonu7/CinePeak/issues)

</div>

When reporting issues, please include:
- Device/Browser information
- Steps to reproduce
- Screenshots (if applicable)
- Expected vs actual behavior

---

## LICENSE

<div align="center">

This project is licensed under the **MIT License**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

*Feel free to use, modify, and distribute this project!*

</div>

---

## CONTACT & SUPPORT

<div align="center">

### Connect with the Developer

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sayansonu7)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your-sayan.professional7@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sayan-pal-969431350)


</div>

---

<div align="center">

## Ready to Explore the World of Cinema?

<img src="https://readme-typing-svg.herokuapp.com?font=Roboto&size=30&duration=3000&pause=1000&color=FF6B9D&center=true&vCenter=true&width=600&lines=Star+this+repo+if+you+like+it!;Happy+Movie+Hunting!" alt="Closing Typing SVG" />

### Don't forget to give this project a star if you found it helpful! 
<br>

**Made with React for movie lovers everywhere!**

</div>

---

<div align="center">
  <sub>Built with passion, powered by creativity, and fueled by countless cups of coffee</sub>
</div>
