# Animated Skill/Progress Bars

A simple and responsive web development project that displays technical skills using animated progress bars. Each bar smoothly fills to its target percentage when the skills section enters the viewport.

This project was created as part of **Day 29 of my Web Development Internship**.

## Live Demo

https://wadityasingh.github.io/Animated-Skill-Progress-Bars-Day-29/

## Project Overview

The Animated Skill/Progress Bars project demonstrates how CSS transitions and JavaScript can be used to create smooth, scroll-triggered animations.

The website displays different technical skills along with their proficiency percentages. When the user scrolls to the skills section, the progress bars animate from 0% to their configured values.

## Features

- Animated skill progress bars
- Smooth CSS width transitions
- Scroll-triggered animation using IntersectionObserver
- Configurable skill percentages
- Responsive layout for mobile and desktop
- Clean and simple user interface
- Lightweight implementation without external frameworks

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript

## Skills Displayed

| Skill | Progress |
|---|---:|
| HTML | 90% |
| CSS | 85% |
| JavaScript | 75% |
| React | 70% |
| Node.js | 65% |

## How It Works

Each progress bar uses a `data-progress` attribute to define its target percentage.

JavaScript reads the configured value and updates the bar's width when the skills section becomes visible.

CSS transitions provide the smooth filling animation.

## Project Structure

```text
Animated-Skill-Progress-Bars-Day-29/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run Locally

1. Clone this repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Open the project folder.
3. Open `index.html` in your browser.

No additional installation is required.

## What I Learned

Through this project, I practiced:

- CSS transitions and animations
- JavaScript DOM manipulation
- IntersectionObserver API
- Using HTML data attributes
- Creating responsive layouts
- Triggering animations based on scroll position

## Internship Task

**Day 29:** Animated Skill/Progress Bars

**Objective:** Practice CSS animations/transitions and basic scroll detection.

## Author

**Aditya Singh**

GitHub: https://github.com/wadityasingh/Animated-Skill-Progress-Bars-Day-29.git

---

Built with HTML, CSS, and JavaScript.