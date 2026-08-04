/* ==========================================================================
   Harmain Faisal Portfolio - Interactive JavaScript Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initNavbarScroll();
  initEmailCopy();
  initProgressBars();
  initSkillFilters();
  initProjectFilters();
  initProjectSearch();
  initScrollReveal();
  initTerminal();
  initContactForm();
  initMobileMenu();
});

/* 1. Cursor Spotlight Glow */
function initCursorGlow() {
  const cursorGlow = document.getElementById('cursor-glow');
  if (!cursorGlow) return;

  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  });
}

/* 2. Premium Scroll Reveal Animations Observer (Triggers Once cleanly) */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* 3. Smooth Back to Top Scroll */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* 4. Floating Navbar Scroll State */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(3, 7, 18, 0.9)';
      navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8)';
    } else {
      navbar.style.background = 'rgba(3, 7, 18, 0.75)';
      navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    }

    // Active Section Highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      }
    });
  });
}

/* 5. One-Click Quick Email Copy */
function initEmailCopy() {
  const emailBtn = document.getElementById('quick-email-btn');
  const emailText = 'harmain.faisall19@gmail.com';

  if (!emailBtn) return;

  emailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailText).then(() => {
      showToast('Email copied to clipboard!');
    }).catch(() => {
      showToast('Copied: ' + emailText);
    });
  });
}

/* 6. Skills Progress Bars Scroll Observer */
function initProgressBars() {
  const progressFills = document.querySelectorAll('.progress-bar-fill');
  const observerOptions = { threshold: 0.25 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetProgress = fill.getAttribute('data-progress');
        fill.style.width = targetProgress;
      }
    });
  }, observerOptions);

  progressFills.forEach(fill => observer.observe(fill));
}

/* 7. Skill Category Filters */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.skills-filter .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 8. Project Category Filters */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('#project-filter .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-pfilter');

      projectCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-pcategory') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 9. Live Search Filter for Projects Page */
function initProjectSearch() {
  const searchInput = document.getElementById('project-search-input');
  const projectCards = document.querySelectorAll('.data-pcard');

  if (!searchInput || !projectCards.length) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    projectCards.forEach(card => {
      const keywords = card.getAttribute('data-keywords') || '';
      const title = card.querySelector('.project-title') ? card.querySelector('.project-title').textContent.toLowerCase() : '';
      const desc = card.querySelector('.project-desc') ? card.querySelector('.project-desc').textContent.toLowerCase() : '';

      if (!query || keywords.includes(query) || title.includes(query) || desc.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* 10. Toast Notification */
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* 11. Interactive Project Modal Handler */
let focusTimerInterval = null;
let quizScore = 0;
let currentQuizIndex = 0;

const quizQuestions = [
  {
    question: "What does semantic HTML provide to web applications?",
    options: ["Faster CSS animations", "Meaningful structure for search engines and accessibility", "Database connectivity", "Server side rendering"],
    answer: 1
  },
  {
    question: "Which CSS property creates frosted glass glassmorphism effect?",
    options: ["background-blur", "backdrop-filter: blur()", "filter: glass()", "box-shadow: inset"],
    answer: 1
  },
  {
    question: "In JavaScript, which method converts a JSON string into an object?",
    options: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()", "Object.fromJSON()"],
    answer: 1
  }
];

function openProjectModal(projectId) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!overlay || !content) return;

  let html = '';

  if (projectId === 'focusflow') {
    html = `
      <div style="text-align: center; padding: 10px;">
        <span class="section-tag"><i class="fa-solid fa-stopwatch"></i> Interactive App Demo</span>
        <h2 style="font-size: 2rem; margin: 12px 0;">FocusFlow — Study Timer</h2>
        <p style="color: var(--text-muted); margin-bottom: 24px;">Test Harmain's live Pomodoro timer engine below!</p>
        
        <div style="width: 220px; height: 220px; margin: 0 auto 24px; border-radius: 50%; border: 4px solid var(--cyan-primary); display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(0,242,254,0.05); box-shadow: 0 0 30px rgba(0,242,254,0.2);">
          <div id="pomodoro-display" style="font-family: var(--font-mono); font-size: 3.2rem; font-weight: 800; color: var(--cyan-primary);">25:00</div>
          <div id="pomodoro-status" style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">FOCUS SESSION</div>
        </div>

        <div style="display: flex; justify-content: center; gap: 16px;">
          <button onclick="startFocusTimer()" class="btn-primary" style="padding: 10px 24px;"><i class="fa-solid fa-play"></i> Start</button>
          <button onclick="pauseFocusTimer()" class="btn-secondary" style="padding: 10px 24px;"><i class="fa-solid fa-pause"></i> Pause</button>
          <button onclick="resetFocusTimer()" class="btn-secondary" style="padding: 10px 24px;"><i class="fa-solid fa-rotate-left"></i> Reset</button>
        </div>
      </div>
    `;
  } else if (projectId === 'quiz') {
    html = `
      <div style="padding: 10px;">
        <span class="section-tag"><i class="fa-solid fa-gamepad"></i> Playable Mini Game</span>
        <h2 style="font-size: 1.8rem; margin: 12px 0;">Interactive Web Quiz App</h2>
        <div id="quiz-container">
          <div id="quiz-question-box"></div>
        </div>
      </div>
    `;
    setTimeout(renderQuizQuestion, 50);
  } else if (projectId === 'calculator') {
    html = `
      <div style="text-align: center; padding: 10px;">
        <span class="section-tag"><i class="fa-solid fa-calculator"></i> Live Glass Calculator</span>
        <h2 style="font-size: 1.8rem; margin: 12px 0;">Modern Calculator App</h2>
        
        <div style="max-width: 320px; margin: 20px auto; padding: 20px; border-radius: 20px; background: rgba(15,23,42,0.9); border: 1px solid var(--cyan-primary); box-shadow: 0 0 25px rgba(0,242,254,0.2);">
          <input type="text" id="calc-display" readonly value="0" style="width: 100%; height: 50px; background: rgba(3,7,18,0.8); border: 1px solid var(--border-glass); color: var(--cyan-primary); font-family: var(--font-mono); font-size: 1.8rem; text-align: right; padding: 0 14px; border-radius: 12px; margin-bottom: 16px;">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
            <button onclick="calcPress('C')" style="padding: 12px; border-radius: 10px; background: rgba(239,68,68,0.2); color: #ef4444; border: 1px solid #ef4444; font-weight: 700; cursor: pointer;">C</button>
            <button onclick="calcPress('DEL')" style="padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-glass); font-weight: 700; cursor: pointer;">⌫</button>
            <button onclick="calcPress('/')" style="padding: 12px; border-radius: 10px; background: rgba(0,242,254,0.15); color: var(--cyan-primary); border: 1px solid var(--cyan-primary); font-weight: 700; cursor: pointer;">/</button>
            <button onclick="calcPress('*')" style="padding: 12px; border-radius: 10px; background: rgba(0,242,254,0.15); color: var(--cyan-primary); border: 1px solid var(--cyan-primary); font-weight: 700; cursor: pointer;">*</button>
            
            <button onclick="calcPress('7')" style="padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-glass); font-weight: 700; cursor: pointer;">7</button>
            <button onclick="calcPress('8')" style="padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-glass); font-weight: 700; cursor: pointer;">8</button>
            <button onclick="calcPress('9')" style="padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-glass); font-weight: 700; cursor: pointer;">9</button>
            <button onclick="calcPress('-')" style="padding: 12px; border-radius: 10px; background: rgba(0,242,254,0.15); color: var(--cyan-primary); border: 1px solid var(--cyan-primary); font-weight: 700; cursor: pointer;">-</button>
            
            <button onclick="calcPress('4')" style="padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-glass); font-weight: 700; cursor: pointer;">4</button>
            <button onclick="calcPress('5')" style="padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-glass); font-weight: 700; cursor: pointer;">5</button>
            <button onclick="calcPress('6')" style="padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-glass); font-weight: 700; cursor: pointer;">6</button>
            <button onclick="calcPress('+')" style="padding: 12px; border-radius: 10px; background: rgba(0,242,254,0.15); color: var(--cyan-primary); border: 1px solid var(--cyan-primary); font-weight: 700; cursor: pointer;">+</button>
            
            <button onclick="calcPress('1')" style="padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-glass); font-weight: 700; cursor: pointer;">1</button>
            <button onclick="calcPress('2')" style="padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-glass); font-weight: 700; cursor: pointer;">2</button>
            <button onclick="calcPress('3')" style="padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-glass); font-weight: 700; cursor: pointer;">3</button>
            <button onclick="calcPress('=')" style="grid-row: span 2; padding: 12px; border-radius: 10px; background: linear-gradient(135deg, var(--cyan-primary), var(--blue-primary)); color: #030712; font-weight: 800; border: none; cursor: pointer;">=</button>
            
            <button onclick="calcPress('0')" style="grid-column: span 2; padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-glass); font-weight: 700; cursor: pointer;">0</button>
            <button onclick="calcPress('.')" style="padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-glass); font-weight: 700; cursor: pointer;">.</button>
          </div>
        </div>
      </div>
    `;
  } else {
    // General Project Preview Details
    const projectDetails = {
      wordflow: {
        title: "WordFlow AI — Writing Assistant",
        img: "assets/wordflow_ai.jpg",
        desc: "A futuristic AI landing page featuring real-time prompts, obsidian dark theme with cyan glows, glassmorphism pricing cards, and sleek typography.",
        tech: ["HTML5", "CSS3", "JavaScript", "Glassmorphism UI"]
      },
      coffiora: {
        title: "Coffiora — Premium Coffee Web Experience",
        img: "assets/coffiora.jpg",
        desc: "Crafted luxury landing page for artisanal coffee featuring product carousels, custom ordering interface, dark theme aesthetic, and micro-animations.",
        tech: ["HTML5", "CSS Grid", "JavaScript", "Responsive Design"]
      },
      delicious: {
        title: "Delicious Bites — Food Ordering Web App",
        desc: "Food delivery web application with item search, dynamic cart updating, order summary breakdown, and delivery feedback modal.",
        tech: ["JavaScript", "HTML5", "CSS3", "Cart Logic"]
      },
      travelbae: {
        title: "TravelBae — Travel Website",
        desc: "Travel booking web template built using Bootstrap 5 grid layout, modal search, destination sliders, and luxury dark theme accents.",
        tech: ["Bootstrap 5", "HTML5", "JavaScript"]
      },
      figmaclone: {
        title: "Figma UI Clone",
        desc: "Pixel-perfect recreation of Figma interface toolbar and canvas using pure HTML and CSS custom variables.",
        tech: ["HTML5", "CSS Grid", "Flexbox"]
      },
      resultchecker: {
        title: "Result Checker Application",
        desc: "Academic result lookup tool with roll number validation, GPA calculation engine, and result print preview.",
        tech: ["JavaScript DOM", "HTML5", "CSS3"]
      },
      minihackathon: {
        title: "Mini Hackathon Challenge",
        desc: "Speed-coded web solution converting complex Figma design specifications into production-ready responsive code within time constraints.",
        tech: ["Rapid HTML/CSS", "Figma Specs"]
      },
      gallery: {
        title: "Responsive Image Gallery",
        desc: "Dynamic masonry photo gallery with lightbox modal preview, filter tags, and smooth hover zoom state.",
        tech: ["Masonry Grid", "JavaScript Lightbox"]
      }
    };

    const details = projectDetails[projectId] || {
      title: "Project Showcase",
      desc: "Detailed project view crafted by Harmain Faisal.",
      tech: ["HTML5", "CSS3", "JavaScript"]
    };

    html = `
      <div style="padding: 10px;">
        <span class="section-tag"><i class="fa-solid fa-layer-group"></i> Project Showcase</span>
        <h2 style="font-size: 2rem; margin: 12px 0;">${details.title}</h2>
        ${details.img ? `<img src="${details.img}" style="width: 100%; height: 260px; object-fit: cover; border-radius: 16px; margin-bottom: 20px; border: 1px solid var(--border-glass);">` : ''}
        <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.7; margin-bottom: 24px;">${details.desc}</p>
        
        <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 28px;">
          ${details.tech.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>

        <div style="display: flex; gap: 16px;">
          <a href="index.html#contact" onclick="closeModal()" class="btn-primary" style="padding: 10px 24px;">Contact Harmain for Code</a>
          <button onclick="closeModal()" class="btn-secondary" style="padding: 10px 24px;">Close Preview</button>
        </div>
      </div>
    `;
  }

  content.innerHTML = html;
  overlay.classList.add('active');
}

function openCertificateModal(imgSrc, title, issuer, pdfPath) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!overlay || !content) return;

  content.innerHTML = `
    <div style="text-align: center; padding: 10px;">
      <span class="section-tag"><i class="fa-solid fa-award"></i> Verified Technical Certification</span>
      <h2 style="font-size: 1.8rem; margin: 12px 0 4px;">${title}</h2>
      <p style="color: var(--cyan-primary); font-weight: 600; margin-bottom: 20px;">${issuer}</p>
      
      <div style="position: relative; border-radius: 16px; overflow: hidden; border: 1px solid var(--cyan-primary); box-shadow: 0 0 30px rgba(0,242,254,0.25); margin-bottom: 20px; background: #000;">
        <img src="${imgSrc}" alt="${title}" style="width: 100%; max-height: 65vh; object-fit: contain; display: block; margin: 0 auto;">
      </div>

      <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
        ${pdfPath ? `
          <a href="${pdfPath}" target="_blank" download style="text-decoration: none;" class="btn-primary">
            <i class="fa-solid fa-file-pdf"></i> Download Official PDF
          </a>
        ` : ''}
        <a href="${imgSrc}" download style="text-decoration: none;" class="${pdfPath ? 'btn-secondary' : 'btn-primary'}">
          <i class="fa-solid fa-download"></i> Download Image
        </a>
        <button onclick="closeModal()" class="btn-secondary">Close Lightbox</button>
      </div>
    </div>
  `;
  overlay.classList.add('active');
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('active');
  if (focusTimerInterval) {
    clearInterval(focusTimerInterval);
    focusTimerInterval = null;
  }
}

/* Pomodoro Interactive Logic */
let timerSeconds = 1500;
let timerRunning = false;

function startFocusTimer() {
  if (timerRunning) return;
  timerRunning = true;
  document.getElementById('pomodoro-status').textContent = 'TIMER RUNNING... KEEP FOCUS!';
  document.getElementById('pomodoro-status').style.color = 'var(--cyan-primary)';

  focusTimerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds--;
      updateTimerDisplay();
    } else {
      clearInterval(focusTimerInterval);
      timerRunning = false;
      document.getElementById('pomodoro-status').textContent = 'SESSION COMPLETED! GREAT JOB!';
      showToast('Pomodoro Focus session finished!');
    }
  }, 1000);
}

function pauseFocusTimer() {
  if (focusTimerInterval) clearInterval(focusTimerInterval);
  timerRunning = false;
  document.getElementById('pomodoro-status').textContent = 'TIMER PAUSED';
  document.getElementById('pomodoro-status').style.color = '#f59e0b';
}

function resetFocusTimer() {
  if (focusTimerInterval) clearInterval(focusTimerInterval);
  timerRunning = false;
  timerSeconds = 1500;
  updateTimerDisplay();
  document.getElementById('pomodoro-status').textContent = 'FOCUS SESSION';
  document.getElementById('pomodoro-status').style.color = 'var(--text-muted)';
}

function updateTimerDisplay() {
  const display = document.getElementById('pomodoro-display');
  if (!display) return;
  const mins = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
  const secs = (timerSeconds % 60).toString().padStart(2, '0');
  display.textContent = `${mins}:${secs}`;
}

/* Quiz Interactive Logic */
function renderQuizQuestion() {
  const box = document.getElementById('quiz-question-box');
  if (!box) return;

  if (currentQuizIndex >= quizQuestions.length) {
    box.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <i class="fa-solid fa-trophy cyan-text" style="font-size: 3.5rem; margin-bottom: 16px;"></i>
        <h3 style="font-size: 1.8rem; margin-bottom: 8px;">Quiz Completed!</h3>
        <p style="font-size: 1.2rem; color: var(--cyan-primary); font-weight: 700; margin-bottom: 24px;">Your Score: ${quizScore} / ${quizQuestions.length}</p>
        <button onclick="restartQuiz()" class="btn-primary">Play Again</button>
      </div>
    `;
    return;
  }

  const q = quizQuestions[currentQuizIndex];

  box.innerHTML = `
    <div style="background: rgba(15,23,42,0.8); padding: 24px; border-radius: 16px; border: 1px solid var(--border-glass);">
      <div style="font-size: 0.85rem; color: var(--cyan-primary); font-weight: 700; margin-bottom: 8px;">QUESTION ${currentQuizIndex + 1} OF ${quizQuestions.length}</div>
      <h4 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 20px;">${q.question}</h4>
      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
        ${q.options.map((opt, idx) => `
          <button onclick="answerQuiz(${idx})" class="btn-secondary" style="justify-content: flex-start; text-align: left; padding: 12px 18px; border-radius: 12px; font-weight: 500;">
            ${String.fromCharCode(65 + idx)}. ${opt}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function answerQuiz(selectedIdx) {
  if (selectedIdx === quizQuestions[currentQuizIndex].answer) {
    quizScore++;
    showToast('Correct answer! +1 Point');
  } else {
    showToast('Incorrect answer!');
  }
  currentQuizIndex++;
  renderQuizQuestion();
}

function restartQuiz() {
  quizScore = 0;
  currentQuizIndex = 0;
  renderQuizQuestion();
}

/* Calculator Logic */
let calcValue = '0';

function calcPress(val) {
  const display = document.getElementById('calc-display');
  if (!display) return;

  if (val === 'C') {
    calcValue = '0';
  } else if (val === 'DEL') {
    calcValue = calcValue.length > 1 ? calcValue.slice(0, -1) : '0';
  } else if (val === '=') {
    try {
      calcValue = eval(calcValue.replace(/[^0-9+\-*/.]/g, '')).toString();
    } catch (e) {
      calcValue = 'Error';
    }
  } else {
    if (calcValue === '0' || calcValue === 'Error') {
      calcValue = val;
    } else {
      calcValue += val;
    }
  }
  display.value = calcValue;
}

/* 12. Interactive Developer Terminal Shell */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  if (!input || !output) return;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      input.value = '';

      // Print entered command line
      const cmdLine = document.createElement('div');
      cmdLine.className = 'terminal-line';
      cmdLine.innerHTML = `<span class="terminal-prompt">guest@harmain-dev:~$</span> <span>${escapeHtml(cmd)}</span>`;
      output.appendChild(cmdLine);

      // Process command
      const response = handleTerminalCommand(cmd);
      if (response) {
        const respLine = document.createElement('div');
        respLine.className = 'terminal-line';
        respLine.style.color = '#cbd5e1';
        respLine.style.marginBottom = '16px';
        respLine.innerHTML = response;
        output.appendChild(respLine);
      }

      // Auto scroll
      const body = document.getElementById('terminal-body');
      if (body) body.scrollTop = body.scrollHeight;
    }
  });
}

function handleTerminalCommand(cmd) {
  if (!cmd) return '';

  switch (cmd) {
    case 'help':
      return `
        Available Commands:<br>
        - <span class="cyan-text">skills</span> : Output technical skills matrix<br>
        - <span class="cyan-text">projects</span> : Output list of 11 web projects<br>
        - <span class="cyan-text">certificates</span> : Output HTML, CSS, JS & Cisco certificates<br>
        - <span class="cyan-text">education</span> : Output academic & course timeline<br>
        - <span class="cyan-text">contact</span> : Show email & location info<br>
        - <span class="cyan-text">sudo hire</span> : Trigger instant interview request<br>
        - <span class="cyan-text">clear</span> : Clear terminal screen
      `;

    case 'skills':
      return `
        <strong>HARMAIN FAISAL — SKILLS MATRIX</strong><br>
        • HTML5 (95%) | CSS3 (90%) | JavaScript (80%)<br>
        • Bootstrap (85%) | Git (75%) | GitHub (88%)<br>
        • Figma (70%) | Responsive Design (90%)<br>
        • VS Code (96%) | Problem Solving (88%)
      `;

    case 'projects':
      return `
        <strong>FEATURED PROJECTS (11 TOTAL):</strong><br>
        1. FocusFlow — Study Timer (Pomodoro Engine)<br>
        2. WordFlow AI (AI Writing Landing Page)<br>
        3. Coffiora (Premium Coffee Website)<br>
        4. Delicious Bites (Food Ordering Web App)<br>
        5. Quiz App (Interactive Trivia Tracker)<br>
        6. Figma Clone (Pixel-perfect UI recreation)<br>
        7. TravelBae (Bootstrap Travel Site)<br>
        8. Calculator (Glassmorphism Calculator)<br>
        9. Result Checker (Grade Lookup Engine)<br>
        10. Mini Hackathon (Timed UI Challenge)<br>
        11. Image Gallery (Responsive Lightbox Gallery)
      `;

    case 'certificates':
    case 'certs':
      return `
        <strong>VERIFIED TECHNICAL CERTIFICATIONS:</strong><br>
        1. <span class="cyan-text">HTML5 Web Engineering Certification</span> — Saylani Mass IT Training (SMIT)<br>
        2. <span class="cyan-text">CSS3 & Responsive UI Certification</span> — Modern Frontend Architecture<br>
        3. <span class="cyan-text">JavaScript Engineering Certification</span> — DOM & Async Logic<br>
        4. <span class="cyan-text">Cisco Networking Academy Certification</span> — Cisco IT Fundamentals
      `;

    case 'education':
      return `
        <strong>EDUCATION & CREDENTIALS:</strong><br>
        • SMIT (Saylani Mass IT Training) — Web & App Dev Course (Present)<br>
        • Intermediate (Pre-Medical) — Govt Islamia College<br>
        • Matriculation (Pre-Medical Science) — Dar ul Madinah Islamic School<br>
        • Certifications: HTML5, CSS3, JavaScript & Cisco Networking Academy
      `;

    case 'contact':
      return `
        <strong>DIRECT CONTACT DETAILS:</strong><br>
        Email: <span class="cyan-text">harmain.faisall19@gmail.com</span><br>
        Location: Karachi, Pakistan<br>
        Status: Open for Web Development Opportunities
      `;

    case 'sudo hire':
    case 'hire':
      showToast('Redirecting to contact form...');
      const contactSec = document.getElementById('contact');
      if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
      return `<span style="color: #10b981; font-weight: 700;">[SUCCESS] Access Granted! Redirecting to Harmain's message portal...</span>`;

    case 'clear':
      document.getElementById('terminal-output').innerHTML = '';
      return '';

    default:
      return `<span style="color: #ef4444;">Command not found: '${escapeHtml(cmd)}'. Type '<span class="cyan-text">help</span>' for available commands.</span>`;
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
  });
}

/* 13. Contact Form Real Email Submission (FormSubmit AJAX) */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnContent = submitBtn.innerHTML;

    // Show loading state on button
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>`;

    try {
      const formData = new FormData(form);

      const response = await fetch('https://formsubmit.co/ajax/harmain.faisall19@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showToast('Thank you! Your message has been sent to Harmain.');
        form.reset();
      } else {
        showToast('Failed to send message. Please try again or copy email directly.');
      }
    } catch (error) {
      showToast('Connection error. Please check your internet connection.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
    }
  });
}

/* 11. Mobile Hamburger Navigation Drawer Engine */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link, .mobile-only-cta .btn-nav');

  if (!hamburgerBtn || !navLinks) return;

  // Toggle mobile drawer open/close
  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburgerBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    const isExpanded = hamburgerBtn.classList.contains('active');
    hamburgerBtn.setAttribute('aria-expanded', isExpanded);
  });

  // Close menu when clicking any link
  navLinkItems.forEach(item => {
    item.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      navLinks.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside of navbar
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      hamburgerBtn.classList.remove('active');
      navLinks.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

