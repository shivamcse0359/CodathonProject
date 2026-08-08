const app = document.getElementById("app");

const data = {
  student: {
    name: "Shivam",
    streak: 12,
    best: 18,
    completed: 12,
    total: 60,
    rank: 24,
    track: "Web Development"
  },
  task: {
    day: 12,
    title: "Personal Portfolio Website",
    description: "Build and deploy your personal portfolio website to showcase your projects, skills and experience.",
    bullets: [
      "Create a responsive portfolio website",
      "Include About, Projects, Skills and Contact sections",
      "Deploy using GitHub Pages, Vercel or Netlify"
    ]
  }
};

function topbar({back=false, user=false} = {}) {
  return `
    <header class="topbar">
      ${back
        ? `<button class="icon-btn" aria-label="Back" onclick="go('/dashboard')">←</button>`
        : `<button class="icon-btn" aria-label="Menu" onclick="showToast('Navigation menu coming soon')">☰</button>`}
      <a class="brand" href="/" onclick="navigate(event,'/')">
        <div class="brand-wrap">AB<span>TALKS</span><small>Powered by Code. Driven by Consistency.</small></div>
      </a>
      ${user
        ? `<div class="topbar-user"><button class="icon-btn" onclick="showToast('Notifications: no new alerts')">♧</button><div class="avatar-user">SM</div></div>`
        : `<button class="icon-btn" onclick="go('/dashboard')" title="Login">LOGIN</button>`}
    </header>`;
}

function bottomNav(active="home") {
  const items = [
    ["home","⌂","Home","/dashboard"],
    ["track","⌁","Track","/dashboard"],
    ["tasks","▤","Tasks","/day/12"],
    ["community","♧","Community","#"],
    ["profile","◎","Profile","#"]
  ];
  return `<nav class="bottom-nav">${items.map(([id,icon,label,url]) => `
    <button class="nav-item ${active===id ? "active":""}" onclick="${url==="#" ? "showToast('Coming soon')" : `go('${url}')`}">
      <span class="nav-icon">${icon}</span>${label}
    </button>`).join("")}</nav>`;
}

function landing() {
  return `
    <div class="app-shell">
      ${topbar()}
      <main class="page">
        <div class="mobile-limit">
          <section class="hero-terminal">
            <div class="terminal-head"><span class="dots"><i class="dot"></i><i class="dot"></i><i class="dot"></i></span>ABTalks Terminal</div>
            <div class="terminal-body">
              <div>&gt; 60 days.</div>
              <div>&gt; Build daily.</div>
              <div>&gt; Get visible.</div>
              <div>&gt; Get hired.</div>
              <div>&gt; _</div>
            </div>
          </section>

          <section class="center-title">
            <span class="eyebrow">INDIA'S 60-DAY BUILDING CHALLENGE</span>
            <h1>The <span class="accent">60-Day</span> Coding Challenge for Indian College Students</h1>
            <p class="subtitle"><b>Build. Post. Get Noticed.</b><br>Turn daily coding into a public portfolio recruiters can see.</p>
          </section>

          <div class="feature-grid">
            <div class="feature"><div class="feature-icon">▣</div><b>Code Daily</b><p>Build a project every day</p></div>
            <div class="feature"><div class="feature-icon">↗</div><b>Public Proof</b><p>GitHub + LinkedIn post</p></div>
            <div class="feature"><div class="feature-icon">⌁</div><b>Grow Faster</b><p>Track, rank & get recognized</p></div>
          </div>

          <button class="btn btn-primary btn-block" onclick="go('/dashboard')">START YOUR 60-DAY JOURNEY →</button>
          <p class="small muted center-title" style="margin:8px 0 22px">No credit card required • Free to join</p>

          <section class="card social-proof">
            <b>10K+ students are already building</b>
            <div class="avatar-row">
              <div class="avatar">RK</div><div class="avatar">AS</div><div class="avatar">AM</div><div class="avatar">PS</div><div class="avatar">NV</div><div class="avatar orange">10K+</div>
            </div>
            <span class="muted">From 500+ colleges across India</span>
          </section>

          <section class="card">
            <h2 class="section-title">Why ABTalks?</h2>
            <div class="rank-row"><div>☼</div><div><b>Consistency that counts</b><br><span class="muted small">Track your streak and never lose momentum.</span></div></div>
            <div class="rank-row"><div>♧</div><div><b>Visibility that helps</b><br><span class="muted small">Your work gets seen by peers and recruiters.</span></div></div>
            <div class="rank-row"><div>⌁</div><div><b>Projects that matter</b><br><span class="muted small">Build real-world projects, not just tutorials.</span></div></div>
            <div class="rank-row"><div>◈</div><div><b>Community that supports</b><br><span class="muted small">Learn, share and grow with other builders.</span></div></div>
          </section>

          <section class="stats">
            <div class="stat"><strong>10K+</strong><span>Students</span></div>
            <div class="stat"><strong>500+</strong><span>Colleges</span></div>
            <div class="stat"><strong>1.2M+</strong><span>Commits</span></div>
          </section>

          <section class="card quote">
            <div style="font-size:28px;color:#98a2b3">“</div>
            ABTalks changed the way I code. The daily habit, public proof and community pushed me from inconsistent to unstoppable.
            <strong>— Ananya, IIIT Bangalore</strong>
          </section>

          <section class="card" style="background:#fff8ed;border-color:#f7d8b7;text-align:center">
            <h2>Ready to level up?</h2>
            <p class="muted small">Your future self will thank you.</p>
            <button class="btn btn-primary btn-block" onclick="go('/dashboard')">JOIN ABTALKS NOW</button>
          </section>
        </div>
      </main>
      <footer class="footer">© 2026 ABTalks · <a href="#">About</a><a href="#">FAQ</a><a href="#">Privacy</a><a href="#">Terms</a></footer>
    </div>`;
}

function dayStrip() {
  const days = [
    ["7","done"],["8","done"],["9","missed"],["10","done"],["11","done"],["12","today"],["13",""]
  ];
  return `<section class="card"><div class="card-title-row"><h3>Last 7 Days</h3><a class="link small" href="#" onclick="event.preventDefault();showToast('Calendar opened')">View Calendar</a></div>
    <div class="day-strip">${days.map(([d,c]) => `<div class="day ${c}"><div class="day-circle">${c==="done"?"✓":c==="missed"?"×":d}</div>${d==="12"?"Today":d}</div>`).join("")}</div>
  </section>`;
}

function dashboard() {
  const pct = Math.round(data.student.completed / data.student.total * 100);
  return `
    <div class="app-shell">
      ${topbar({user:true})}
      <main class="page"><div class="mobile-limit">
        <section class="welcome">
          <h1>Welcome back, ${data.student.name} 👋</h1>
          <p>Keep building. Keep shipping.</p>
        </section>

        <section class="card streak">
          <div class="label">🔥 CURRENT STREAK</div>
          <div class="streak-number">${data.student.streak} <span>Days</span></div>
          <div class="small muted">Best: ${data.student.best} Days</div>
        </section>

        <section class="card">
          <div class="card-title-row"><h3>Challenge Progress</h3><b>${pct}%</b></div>
          <div class="progress"><span style="width:${pct}%"></span></div>
          <div class="progress-row" style="margin-top:8px"><span>${data.student.completed} / ${data.student.total} Days Completed</span><span>48 days to go</span></div>
        </section>

        ${dayStrip()}

        <section class="card task-card">
          <div class="card-title-row"><h3>Today's Task</h3><span class="badge">Day 12</span></div>
          <h2>${data.task.title}</h2>
          <p>${data.task.description}</p>
          <button class="btn btn-primary btn-block" onclick="go('/day/12')">Continue Day 12 →</button>
        </section>

        <section class="card">
          <div class="card-title-row"><h3>Your Track</h3><a class="link small" href="#" onclick="event.preventDefault();showToast('Track selector opened')">Change Track</a></div>
          <div style="font-size:12px;font-weight:700">▣ &nbsp; ${data.student.track}</div>
          <div class="track-line"><div class="track-meta"><span></span><span>20%</span></div><div class="progress"><span style="width:20%"></span></div></div>
        </section>

        <section class="card">
          <div class="card-title-row"><h3>Achievements</h3><a class="link small" href="#" onclick="event.preventDefault();showToast('All achievements')">View All →</a></div>
          <div class="achievement-grid">
            <div class="achievement"><div class="achievement-icon">🔥</div><strong>7 Days</strong><span>Streak</span></div>
            <div class="achievement"><div class="achievement-icon">⌘</div><strong>10</strong><span>Tasks Done</span></div>
            <div class="achievement"><div class="achievement-icon">★</div><strong>Early Bird</strong><span>3 Days</span></div>
          </div>
        </section>

        <section class="card">
          <div class="card-title-row"><h3>Leaderboard</h3><a class="link small" href="#" onclick="event.preventDefault();showToast('Full leaderboard')">View All →</a></div>
          ${[
            ["1","Rohan Verma","28"],
            ["2","Ananya S.","24"],
            ["3","Aryan Patel","22"],
            ["24","Shivam (You)","12"]
          ].map((r,i)=>`<div class="rank-row"><div class="rank-num">${r[0]}</div><div class="rank-name"><span class="mini-avatar">${["RV","AS","AP","SM"][i]}</span><b>${r[1]}</b></div><b>${r[2]} days</b></div>`).join("")}
        </section>
      </div></main>
      ${bottomNav("home")}
    </div>`;
}

function dayPage() {
  return `
    <div class="app-shell">
      ${topbar({back:true})}
      <main class="page"><div class="mobile-limit">
        <div class="day-header"><span class="small muted">Challenge Day</span><b>Day 12 of 60</b><span>□</span></div>

        <div class="stepper">
          <div class="step done"><div class="step-circle">✓</div>10</div>
          <div class="step done"><div class="step-circle">✓</div>11</div>
          <div class="step current"><div class="step-circle">12</div>12</div>
          <div class="step"><div class="step-circle">⌑</div>13</div>
          <div class="step"><div class="step-circle">⌑</div>14</div>
        </div>

        <section class="card">
          <span class="badge">DAY 12</span>
          <h1 class="problem-title">${data.task.title}</h1>
          <p class="problem-text">${data.task.description}</p>
          <hr style="border:0;border-top:1px solid var(--line);margin:18px -16px">

          <h3 style="font-size:14px">▤ &nbsp; Problem Statement</h3>
          <p class="problem-text">Create a responsive personal portfolio website that includes:</p>
          <ul class="problem-list">${data.task.bullets.slice(0,2).map(x=>`<li>${x}</li>`).join("")}</ul>
          <p class="problem-text">${data.task.bullets[2]}.</p>

          <div class="info-box">
            <h4>💡 Tips</h4>
            <ul>
              <li>Keep the design clean and mobile-friendly.</li>
              <li>Use the projects you built in previous days.</li>
              <li>Add your personal touch!</li>
            </ul>
          </div>
        </section>

        <section class="card">
          <div class="card-title-row"><h3>▧ &nbsp; Resources</h3></div>
          <div class="resources">
            <a class="resource" href="#" onclick="event.preventDefault();showToast('Example Portfolio opened')">Example Portfolio <b>↗</b></a>
            <a class="resource" href="#" onclick="event.preventDefault();showToast('Deployment Guide opened')">Deployment Guide <b>↗</b></a>
          </div>
        </section>

        <section class="card" id="proof">
          <div class="card-title-row"><h3>✅ Submit Your Proof</h3></div>
          <p class="small muted">Complete both links to mark Day 12 as done.</p>

          <label class="form-label">◉ &nbsp; 1. GitHub Commit / Repo</label>
          <input id="github" class="input" type="url" placeholder="https://github.com/username/repo">
          <a class="help" href="#" onclick="event.preventDefault();showToast('Paste your repository or specific commit URL')">How to add a commit link?</a>

          <label class="form-label">in &nbsp; 2. LinkedIn Post</label>
          <input id="linkedin" class="input" type="url" placeholder="https://www.linkedin.com/posts/...">
          <a class="help" href="#" onclick="event.preventDefault();showToast('Your post should mention what you built and what you learned')">What to include in the post?</a>

          <button class="btn btn-primary btn-block" style="margin-top:18px" onclick="submitProof()">MARK DAY 12 AS COMPLETE</button>
          <button class="btn btn-outline btn-block" style="margin-top:8px" onclick="showToast('Saved — come back whenever you are ready')">I'LL DO IT LATER</button>
        </section>

        <section class="warning">
          <strong>⚠ Missed a day?</strong>
          Don't break your streak. You can make it up!<br>
          <a class="link" href="#" onclick="event.preventDefault();showToast('Make-up rules: complete the missed task within 48 hours')">View Make-up Rules →</a>
        </section>
      </div></main>
      ${bottomNav("tasks")}
    </div>`;
}

function submitProof() {
  const github = document.getElementById("github").value.trim();
  const linkedin = document.getElementById("linkedin").value.trim();
  if (!github || !linkedin) {
    showToast("Add both GitHub and LinkedIn links first.");
    return;
  }
  showToast("🎉 Day 12 completed! Streak protected.");
  setTimeout(() => go("/dashboard"), 900);
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function navigate(event, path) {
  event.preventDefault();
  go(path);
}

function go(path) {
  if (history.pushState) {
    history.pushState({}, "", path);
    render();
  } else {
    location.hash = path;
  }
  window.scrollTo({top:0, behavior:"smooth"});
}

function render() {
  const path = window.location.pathname;
  if (path === "/dashboard") app.innerHTML = dashboard();
  else if (path === "/day/12") app.innerHTML = dayPage();
  else app.innerHTML = landing();
}

window.addEventListener("popstate", render);
render();
