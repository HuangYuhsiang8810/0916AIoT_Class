/**
 * Personal Space - Interactive Real-Time Dashboard
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // State & Persistent Storage Keys
  // ==========================================
  const STORAGE_KEYS = {
    THEME: 'personal_space_theme',
    FORMAT_24H: 'personal_space_format_24h',
    PROFILE: 'personal_space_profile'
  };

  const DEFAULT_PROFILE = {
    name: 'Alex Morgan',
    bio: 'Software Engineer, Creative Thinker & Digital Craftsman. Exploring ideas at the intersection of technology and design.',
    status: 'Active Now',
    tags: ['Engineering', 'UI/UX Design', 'Innovation', 'Coffee Enthusiast']
  };

  let is24Hour = localStorage.getItem(STORAGE_KEYS.FORMAT_24H) !== 'false';
  let profile = loadProfile();

  // ==========================================
  // DOM Elements
  // ==========================================
  const elements = {
    // Clock Elements
    hours: document.getElementById('clock-hours'),
    minutes: document.getElementById('clock-minutes'),
    seconds: document.getElementById('clock-seconds'),
    ampm: document.getElementById('clock-ampm'),
    ampmContainer: document.getElementById('ampm-container'),
    formatToggle: document.getElementById('format-toggle'),
    formatBadge: document.getElementById('format-badge'),
    currentDateStr: document.getElementById('current-date-str'),
    dayOfYearStr: document.getElementById('day-of-year-str'),
    yearProgressStr: document.getElementById('year-progress-str'),
    yearProgressBar: document.getElementById('year-progress-bar'),
    timezoneText: document.getElementById('timezone-text'),
    localUtcOffset: document.getElementById('local-utc-offset'),
    weekNumber: document.getElementById('week-number'),

    // Greeting
    timeGreeting: document.getElementById('time-greeting'),
    greetingIcon: document.getElementById('greeting-icon'),

    // Profile Elements
    displayName: document.getElementById('display-name'),
    displayBio: document.getElementById('display-bio'),
    statusText: document.getElementById('status-text'),
    tagList: document.getElementById('tag-list'),
    avatarInitials: document.getElementById('avatar-initials'),
    footerName: document.getElementById('footer-name'),
    copyrightYear: document.getElementById('copyright-year'),

    // Buttons & Controls
    themeToggle: document.getElementById('theme-toggle'),
    themeIcon: document.getElementById('theme-icon'),
    quickEditBtn: document.getElementById('quick-edit-name-btn'),
    editProfileBtn: document.getElementById('edit-profile-btn'),
    closeModalBtn: document.getElementById('close-modal-btn'),
    resetProfileBtn: document.getElementById('reset-profile-btn'),
    profileForm: document.getElementById('profile-form'),
    editModal: document.getElementById('edit-modal'),

    // Form inputs
    inputName: document.getElementById('input-name'),
    inputBio: document.getElementById('input-bio'),
    inputStatus: document.getElementById('input-status'),
    inputTags: document.getElementById('input-tags'),

    // Quotes & Misc
    quoteText: document.getElementById('quote-text'),
    quoteAuthor: document.getElementById('quote-author'),
    newQuoteBtn: document.getElementById('new-quote-btn'),
    copyEmailBtn: document.getElementById('copy-email-btn'),
    copyEmailLabel: document.getElementById('copy-email-label'),
    toast: document.getElementById('toast'),
    canvas: document.getElementById('particle-canvas')
  };

  // ==========================================
  // Clock & Calendar Functions
  // ==========================================
  function updateClock() {
    const now = new Date();

    let h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    // 12h / 24h format handling
    if (!is24Hour) {
      elements.ampmContainer.style.display = 'block';
      const isPM = h >= 12;
      elements.ampm.textContent = isPM ? 'PM' : 'AM';
      h = h % 12;
      h = h ? h : 12; // 0 becomes 12
    } else {
      elements.ampmContainer.style.display = 'none';
    }

    elements.hours.textContent = String(h).padStart(2, '0');
    elements.minutes.textContent = String(m).padStart(2, '0');
    elements.seconds.textContent = String(s).padStart(2, '0');

    // Update Date text
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    elements.currentDateStr.textContent = now.toLocaleDateString(undefined, dateOptions);

    // Update Year & Day of Year Metrics
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
    const isLeapYear = (now.getFullYear() % 4 === 0 && now.getFullYear() % 100 !== 0) || (now.getFullYear() % 400 === 0);
    const totalDays = isLeapYear ? 366 : 365;
    const yearProgress = ((dayOfYear / totalDays) * 100).toFixed(1);

    elements.dayOfYearStr.textContent = `Day ${dayOfYear} / ${totalDays}`;
    elements.yearProgressStr.textContent = `${yearProgress}%`;
    elements.yearProgressBar.style.width = `${yearProgress}%`;

    // Calendar week
    const week = getWeekNumber(now);
    elements.weekNumber.textContent = `W${week}`;

    // Update dynamic greeting
    updateGreeting(now.getHours());
  }

  function getWeekNumber(d) {
    const target = new Date(d.valueOf());
    const dayNr = (d.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
  }

  function updateGreeting(hour) {
    let greeting = '';
    let iconClass = 'ph ph-sun-horizon';

    if (hour >= 5 && hour < 12) {
      greeting = `Good morning, hope you have a productive day!`;
      iconClass = 'ph ph-sun';
    } else if (hour >= 12 && hour < 17) {
      greeting = `Good afternoon, stay focused & energized!`;
      iconClass = 'ph ph-sun-dim';
    } else if (hour >= 17 && hour < 22) {
      greeting = `Good evening, welcome to my personal space!`;
      iconClass = 'ph ph-cloud-sun';
    } else {
      greeting = `Good night, taking time to rest and recharge!`;
      iconClass = 'ph ph-moon-stars';
    }

    elements.timeGreeting.textContent = greeting;
    elements.greetingIcon.className = iconClass;
  }

  function detectTimezone() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local Time';
      const offsetMinutes = new Date().getTimezoneOffset();
      const offsetHours = -offsetMinutes / 60;
      const sign = offsetHours >= 0 ? '+' : '-';
      const absHours = Math.floor(Math.abs(offsetHours));
      const absMins = Math.abs(offsetMinutes % 60);
      const formattedOffset = `UTC${sign}${String(absHours).padStart(2, '0')}:${String(absMins).padStart(2, '0')}`;

      elements.timezoneText.textContent = `${tz} (${formattedOffset})`;
      elements.localUtcOffset.textContent = formattedOffset;
    } catch (e) {
      elements.timezoneText.textContent = 'Local Time';
      elements.localUtcOffset.textContent = 'UTC';
    }
  }

  // ==========================================
  // Profile Management
  // ==========================================
  function loadProfile() {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return { ...DEFAULT_PROFILE };
      }
    }
    return { ...DEFAULT_PROFILE };
  }

  function saveProfile(newProfile) {
    profile = { ...newProfile };
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    renderProfile();
  }

  function renderProfile() {
    elements.displayName.textContent = profile.name || 'My Name';
    elements.displayBio.textContent = profile.bio || '';
    elements.statusText.textContent = profile.status || 'Active Now';
    elements.footerName.textContent = profile.name || 'My Name';

    // Initials calculation
    const parts = (profile.name || 'Alex Morgan').trim().split(/\s+/);
    let initials = 'AN';
    if (parts.length >= 2) {
      initials = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } else if (parts.length === 1 && parts[0].length > 0) {
      initials = parts[0].substring(0, 2).toUpperCase();
    }
    elements.avatarInitials.textContent = initials;

    // Render tags
    elements.tagList.innerHTML = '';
    const icons = ['ph-code', 'ph-paint-brush', 'ph-sparkle', 'ph-coffee', 'ph-book-open', 'ph-rocket'];
    (profile.tags || []).forEach((tag, idx) => {
      if (!tag.trim()) return;
      const icon = icons[idx % icons.length];
      const span = document.createElement('span');
      span.className = 'tag';
      span.innerHTML = `<i class="ph ${icon}"></i> ${escapeHtml(tag.trim())}`;
      elements.tagList.appendChild(span);
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  function openEditModal() {
    elements.inputName.value = profile.name;
    elements.inputBio.value = profile.bio;
    elements.inputStatus.value = profile.status;
    elements.inputTags.value = (profile.tags || []).join(', ');
    elements.editModal.classList.add('active');
    elements.editModal.setAttribute('aria-hidden', 'false');
    elements.inputName.focus();
  }

  function closeEditModal() {
    elements.editModal.classList.remove('active');
    elements.editModal.setAttribute('aria-hidden', 'true');
  }

  // ==========================================
  // Themes & Preferences
  // ==========================================
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'dark'); // default sleek dark

    applyTheme(theme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    if (theme === 'light') {
      elements.themeIcon.className = 'ph ph-sun';
    } else {
      elements.themeIcon.className = 'ph ph-moon';
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const target = current === 'dark' ? 'light' : 'dark';
    applyTheme(target);
    showToast(`Switched to ${target} mode`);
  }

  function toggleFormat() {
    is24Hour = !is24Hour;
    localStorage.setItem(STORAGE_KEYS.FORMAT_24H, is24Hour);
    elements.formatBadge.textContent = is24Hour ? '24H' : '12H';
    updateClock();
    showToast(`Switched to ${is24Hour ? '24-hour' : '12-hour'} format`);
  }

  // ==========================================
  // Quotes Collection
  // ==========================================
  const quotes = [
    { text: "Time is what we want most, but what we use worst.", author: "William Penn" },
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
    { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "It's not that we have a short time to live, but that we waste a lot of it.", author: "Seneca" },
    { text: "Small deeds done are better than great deeds planned.", author: "Peter Marshall" }
  ];
  let currentQuoteIndex = 0;

  function nextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    const q = quotes[currentQuoteIndex];
    elements.quoteText.style.opacity = 0;
    elements.quoteAuthor.style.opacity = 0;

    setTimeout(() => {
      elements.quoteText.textContent = `"${q.text}"`;
      elements.quoteAuthor.textContent = `— ${q.author}`;
      elements.quoteText.style.opacity = 1;
      elements.quoteAuthor.style.opacity = 1;
    }, 200);
  }

  // ==========================================
  // Toast Notifications
  // ==========================================
  let toastTimeout;
  function showToast(message) {
    clearTimeout(toastTimeout);
    elements.toast.textContent = message;
    elements.toast.classList.add('show');
    toastTimeout = setTimeout(() => {
      elements.toast.classList.remove('show');
    }, 2500);
  }

  // ==========================================
  // Ambient Particle Canvas Animation
  // ==========================================
  function initParticles() {
    const canvas = elements.canvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(35, Math.floor((width * height) / 30000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      ctx.fillStyle = isLight ? 'rgba(79, 70, 229, ' : 'rgba(165, 180, 252, ';

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = (isLight ? 'rgba(99, 102, 241, ' : 'rgba(165, 180, 252, ') + p.alpha + ')';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  // ==========================================
  // Event Listeners
  // ==========================================
  elements.themeToggle.addEventListener('click', toggleTheme);
  elements.formatToggle.addEventListener('click', toggleFormat);
  elements.quickEditBtn.addEventListener('click', openEditModal);
  elements.editProfileBtn.addEventListener('click', openEditModal);
  elements.closeModalBtn.addEventListener('click', closeEditModal);

  elements.editModal.addEventListener('click', e => {
    if (e.target === elements.editModal) {
      closeEditModal();
    }
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && elements.editModal.classList.contains('active')) {
      closeEditModal();
    }
  });

  elements.profileForm.addEventListener('submit', e => {
    e.preventDefault();
    const newTags = elements.inputTags.value
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const updated = {
      name: elements.inputName.value.trim() || 'My Name',
      bio: elements.inputBio.value.trim(),
      status: elements.inputStatus.value.trim() || 'Active Now',
      tags: newTags.length ? newTags : DEFAULT_PROFILE.tags
    };

    saveProfile(updated);
    closeEditModal();
    showToast('Profile updated successfully!');
  });

  elements.resetProfileBtn.addEventListener('click', () => {
    saveProfile(DEFAULT_PROFILE);
    closeEditModal();
    showToast('Reset to default profile');
  });

  elements.newQuoteBtn.addEventListener('click', nextQuote);

  elements.copyEmailBtn.addEventListener('click', () => {
    const email = 'hello@example.com';
    navigator.clipboard.writeText(email)
      .then(() => {
        showToast('Email address copied to clipboard!');
      })
      .catch(() => {
        showToast('Contact: hello@example.com');
      });
  });

  // ==========================================
  // Initialization
  // ==========================================
  initTheme();
  elements.formatBadge.textContent = is24Hour ? '24H' : '12H';
  renderProfile();
  detectTimezone();
  updateClock();
  setInterval(updateClock, 1000);
  initParticles();
  elements.copyrightYear.textContent = new Date().getFullYear();
});
