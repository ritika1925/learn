/* ==========================================================================
   LearnX Landing Page Interactive Script
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide vector icons
  lucide.createIcons();

  // Initialize Particle Canvas
  initParticleSystem();

  // Scroll effect on Header
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggling
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileToggle.classList.toggle("open");
      navMenu.classList.toggle("open");
    });

    // Close mobile menu when clicking a link
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileToggle.classList.remove("open");
        navMenu.classList.remove("open");
      });
    });
  }

  // FAQ Accordion Collapses
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question-btn");
    const answer = item.querySelector(".faq-answer");
    
    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      
      // Close all other items first
      faqItems.forEach(otherItem => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".faq-answer").style.maxHeight = null;
      });
      
      if (!isActive) {
        item.classList.add("active");
        // Animate using scrollHeight
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        item.classList.remove("active");
        answer.style.maxHeight = null;
      }
    });
  });
});

/* ==========================================================================
   Global Interactive Stats (Gamification Playground)
   ========================================================================== */
let userXP = 1420;
let userStreak = 4;
let userCoins = 350;
let quizCompleted = false;
let checkedInToday = false;

// Update header displays
function updateStatsUI() {
  document.getElementById("header-xp").innerText = userXP;
  document.getElementById("header-streak").innerText = `${userStreak} Days`;
  document.getElementById("header-coins").innerText = userCoins;
}

/* ==========================================================================
   Interactive Tabbed Panels (Playground Card)
   ========================================================================== */
function switchTab(event, tabId) {
  // Prevent default if anchor
  if (event) event.preventDefault();

  // Find all panels and buttons in parent container
  const parent = document.querySelector(".playground-card");
  const panels = parent.querySelectorAll(".playground-panel");
  const tabs = parent.querySelectorAll(".playground-tab-btn");

  // Deactivate all
  panels.forEach(p => p.classList.remove("active"));
  tabs.forEach(t => t.classList.remove("active"));

  // Activate target
  document.getElementById(tabId).classList.add("active");
  if (event) {
    event.currentTarget.classList.add("active");
  }
}

/* ==========================================================================
   Panel 1: Mock Quiz Widget Interaction
   ========================================================================== */
function checkAnswer(btn, isCorrect) {
  if (quizCompleted) return; // Only award points once

  // Get option container
  const options = btn.parentElement.querySelectorAll(".quiz-option-btn");
  
  if (isCorrect) {
    quizCompleted = true;
    btn.classList.add("correct");
    
    // Add rewards
    userXP += 20;
    userCoins += 10;
    updateStatsUI();

    // Trigger visual rewards message
    const msg = document.getElementById("quiz-msg");
    msg.classList.add("show");

    // Disable all option buttons
    options.forEach(opt => {
      opt.style.cursor = "default";
      if (opt !== btn) opt.style.opacity = "0.7";
    });

    // Particle Burst on the correct button location
    const rect = btn.getBoundingClientRect();
    const canvasRect = document.getElementById("particle-canvas").getBoundingClientRect();
    const burstX = rect.left + rect.width / 2 - canvasRect.left;
    const burstY = rect.top + rect.height / 2 - canvasRect.top;
    
    triggerBurst(burstX, burstY, 35);
  } else {
    // Wrong answer behavior
    btn.classList.add("wrong");
    btn.disabled = true;
    setTimeout(() => {
      btn.classList.remove("wrong");
      btn.disabled = false;
    }, 1200);
  }
}

/* ==========================================================================
   Panel 2: Daily Streak Check-in Interaction
   ========================================================================== */
function triggerCheckIn() {
  if (checkedInToday) return;

  checkedInToday = true;
  userStreak += 1;
  userCoins += 50; // Check-in reward
  updateStatsUI();

  // Update button state
  const btn = document.getElementById("btn-streak-checkin");
  btn.innerText = "Checked In! (+50 Coins)";
  btn.disabled = true;
  btn.classList.add("btn-secondary");
  btn.classList.remove("btn-cyan");

  // Activate Friday inside grid
  const friDot = document.getElementById("day-fri");
  if (friDot) {
    friDot.classList.add("active");
    const oldIcon = friDot.querySelector("svg") || friDot.querySelector("i");
    if (oldIcon) {
      const newIcon = document.createElement("i");
      newIcon.setAttribute("data-lucide", "check");
      newIcon.style.width = "14px";
      newIcon.style.height = "14px";
      oldIcon.replaceWith(newIcon);
      lucide.createIcons(); // Refresh icons inside Friday slot
    }
  }

  // Update streak counter text
  document.getElementById("streak-counter").innerText = `${userStreak} Days`;

  // Trigger Burst
  const rect = btn.getBoundingClientRect();
  const canvasRect = document.getElementById("particle-canvas").getBoundingClientRect();
  const burstX = rect.left + rect.width / 2 - canvasRect.left;
  const burstY = rect.top + rect.height / 2 - canvasRect.top;
  triggerBurst(burstX, burstY, 40);
}

/* ==========================================================================
   Panel 3: Leaderboard Mock Data Switcher
   ========================================================================== */
const weeklyLeaderboardHTML = `
  <div class="leaderboard-item rank-1">
    <div class="leaderboard-user-details">
      <div class="rank-badge">1</div>
      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" alt="Rank 1 Avatar" class="leaderboard-avatar">
      <span class="leaderboard-username">Sneha K. (Class 8)</span>
    </div>
    <div class="leaderboard-score-pill">1,820 XP</div>
  </div>
  <div class="leaderboard-item rank-2">
    <div class="leaderboard-user-details">
      <div class="rank-badge">2</div>
      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80" alt="Rank 2 Avatar" class="leaderboard-avatar">
      <span class="leaderboard-username">Devansh M. (Class 10)</span>
    </div>
    <div class="leaderboard-score-pill">1,690 XP</div>
  </div>
  <div class="leaderboard-item rank-3">
    <div class="leaderboard-user-details">
      <div class="rank-badge">3</div>
      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80" alt="Rank 3 Avatar" class="leaderboard-avatar">
      <span class="leaderboard-username">Rohan S. (Class 7)</span>
    </div>
    <div class="leaderboard-score-pill">1,450 XP</div>
  </div>
`;

const alltimeLeaderboardHTML = `
  <div class="leaderboard-item rank-1">
    <div class="leaderboard-user-details">
      <div class="rank-badge">1</div>
      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" alt="Rank 1 Avatar" class="leaderboard-avatar">
      <span class="leaderboard-username">Sneha K. (Class 8)</span>
    </div>
    <div class="leaderboard-score-pill">14,230 XP</div>
  </div>
  <div class="leaderboard-item rank-2">
    <div class="leaderboard-user-details">
      <div class="rank-badge">2</div>
      <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&h=80&q=80" alt="Rank 2 Avatar" class="leaderboard-avatar">
      <span class="leaderboard-username">Aarav J. (Class 12)</span>
    </div>
    <div class="leaderboard-score-pill">12,890 XP</div>
  </div>
  <div class="leaderboard-item rank-3">
    <div class="leaderboard-user-details">
      <div class="rank-badge">3</div>
      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80" alt="Rank 3 Avatar" class="leaderboard-avatar">
      <span class="leaderboard-username">Devansh M. (Class 10)</span>
    </div>
    <div class="leaderboard-score-pill">11,400 XP</div>
  </div>
`;

function toggleBoard(isWeekly) {
  const container = document.getElementById("leaderboard-container");
  const btnWeekly = document.getElementById("board-weekly");
  const btnAlltime = document.getElementById("board-alltime");

  if (isWeekly) {
    container.innerHTML = weeklyLeaderboardHTML;
    btnWeekly.style.background = "#FFFFFF";
    btnWeekly.style.boxShadow = "var(--shadow-sm)";
    btnAlltime.style.background = "transparent";
    btnAlltime.style.boxShadow = "none";
  } else {
    container.innerHTML = alltimeLeaderboardHTML;
    btnWeekly.style.background = "transparent";
    btnWeekly.style.boxShadow = "none";
    btnAlltime.style.background = "#FFFFFF";
    btnAlltime.style.boxShadow = "var(--shadow-sm)";
  }
}

/* ==========================================================================
   Rewards Store simulated purchases
   ========================================================================== */
function redeemReward(rewardName, cost) {
  if (userCoins >= cost) {
    userCoins -= cost;
    updateStatsUI();
    
    // Confetti effect from screen center
    const canvas = document.getElementById("particle-canvas");
    triggerBurst(canvas.width / 2, canvas.height / 2, 45);

    alert(`🎉 Successfully Redeemed: "${rewardName}"!\nYour new balance is ${userCoins} coins.`);
  } else {
    alert(`❌ Insufficient Coins!\nYou need ${cost} coins to redeem "${rewardName}" (Your balance: ${userCoins} coins).\n\nHint: Earn more coins by solving the Mini Quiz and Checking In!`);
  }
}

/* ==========================================================================
   Subject filter mechanism (Class-based categories)
   ========================================================================== */
function filterSubjects(event, classFilter) {
  const buttons = document.querySelectorAll(".subject-filter-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  event.currentTarget.classList.add("active");

  const cards = document.querySelectorAll(".subject-card");
  cards.forEach(card => {
    const categories = card.getAttribute("data-category").split(" ");
    
    if (classFilter === "all" || categories.includes(classFilter)) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

/* ==========================================================================
   Canvas Particle Explosion Engine (Confetti & Gold Coins)
   ========================================================================== */
let canvas;
let ctx;
let particles = [];
let animFrameId;

function initParticleSystem() {
  canvas = document.getElementById("particle-canvas");
  ctx = canvas.getContext("2d");
  
  // Resize canvas handler
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Start tick cycle
  tickParticles();
}

function resizeCanvas() {
  if (!canvas) return;
  const parent = canvas.parentElement;
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight;
}

function triggerBurst(x, y, count = 25) {
  if (!canvas || !ctx) return;
  resizeCanvas();

  const colors = [
    "#F59E0B", // Gold
    "#4F46E5", // Indigo
    "#06B6D4", // Cyan
    "#10B981", // Green
    "#EC4899"  // Pink
  ];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 8;
    const shapeRandom = Math.random();
    
    particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (1 + Math.random() * 3), // Initial vertical push upwards
      size: 5 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
      decay: 0.015 + Math.random() * 0.02,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 15,
      isCoin: shapeRandom > 0.6 // 40% coins, 60% confetti squares
    });
  }
}

function tickParticles() {
  if (!canvas || !ctx) return;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Physics updates
  const gravity = 0.2;
  const friction = 0.98;

  particles.forEach((p, idx) => {
    p.x += p.vx;
    p.y += p.vy;
    
    p.vx *= friction;
    p.vy += gravity;
    
    p.rotation += p.rotationSpeed;
    p.opacity -= p.decay;

    // Draw particle
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation * Math.PI / 180);

    if (p.isCoin) {
      // Draw circular gold coin
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "#F59E0B";
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#D97706";
      ctx.stroke();
      
      // Inner circle detail
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = "#FBBF24";
      ctx.stroke();
    } else {
      // Draw rectangular confetti
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    }

    ctx.restore();
  });

  // Filter dead particles
  particles = particles.filter(p => p.opacity > 0 && p.y < canvas.height);

  animFrameId = requestAnimationFrame(tickParticles);
}
