/* =========================================================
   CODM LOADOUT HUB - script.js

   PART 1 (top)    = YOUR DATA. Edit this to customize the site.
   PART 2 (bottom) = The code that builds the page. You don't
                     need to change it.

   Tips for editing:
   - Keep the quotes " " around text.
   - Keep the commas between items.
   - Don't delete brackets [ ] or braces { }.
   ========================================================= */

/* =====================  PART 1: YOUR DATA  ===================== */

const DATA = {

  /* ---------- Profile ---------- */
  profile: {
    name: "YOUR NAME",            // Shown on the home page (visitors can't change yours;
                                  // the EDIT button only changes it on that device)
    subtitle: "CODM Player | Rank: Placeholder | UID: 0000000000"
  },

  /* ---------- Loadouts ----------
     Two modes: MP (Multiplayer) and BR (Battle Royale).
     To ADD a weapon: copy one { ... }, paste it after a comma.
     To REMOVE a weapon: delete its whole { ... } block.
     "image" is optional. Put a file path like "images/ak.png"
     to show a picture, or leave "" to show the placeholder. */
  loadouts: {
    MP: [
      {
        name: "Weapon Name 1",
        category: "Assault Rifle",
        image: "",
        attachments: [
          { slot: "Muzzle",    name: "Placeholder Attachment" },
          { slot: "Barrel",    name: "Placeholder Attachment" },
          { slot: "Optic",     name: "Placeholder Attachment" },
          { slot: "Stock",     name: "Placeholder Attachment" },
          { slot: "Magazine",  name: "Placeholder Attachment" }
        ]
      },
      {
        name: "Weapon Name 2",
        category: "SMG",
        image: "",
        attachments: [
          { slot: "Muzzle",    name: "Placeholder Attachment" },
          { slot: "Underbarrel", name: "Placeholder Attachment" },
          { slot: "Optic",     name: "Placeholder Attachment" }
        ]
      },
      {
        name: "Weapon Name 3",
        category: "Sniper",
        image: "",
        attachments: [
          { slot: "Optic",     name: "Placeholder Attachment" },
          { slot: "Stock",     name: "Placeholder Attachment" }
        ]
      }
    ],
    BR: [
      {
        name: "Weapon Name 4",
        category: "Assault Rifle",
        image: "",
        attachments: [
          { slot: "Muzzle",    name: "Placeholder Attachment" },
          { slot: "Optic",     name: "Placeholder Attachment" },
          { slot: "Magazine",  name: "Placeholder Attachment" }
        ]
      },
      {
        name: "Weapon Name 5",
        category: "LMG",
        image: "",
        attachments: [
          { slot: "Barrel",    name: "Placeholder Attachment" },
          { slot: "Grip",      name: "Placeholder Attachment" }
        ]
      }
    ]
  },

  /* ---------- Basic Settings ----------
     Each group becomes one card. Edit the values freely.
     Add/remove rows or whole groups as you like. */
  settings: [
    { title: "Graphics Quality", rows: [
        { label: "Graphics",      value: "Placeholder" },
        { label: "Anti-Aliasing", value: "Placeholder" },
        { label: "Shadows",       value: "Placeholder" }
    ]},
    { title: "Frame Rate", rows: [
        { label: "Frame Rate",    value: "Placeholder" },
        { label: "Display",       value: "Placeholder" }
    ]},
    { title: "Control Layout", rows: [
        { label: "Fingers",       value: "Placeholder" },
        { label: "Fire Button",   value: "Placeholder" },
        { label: "Fire Mode",     value: "Placeholder" }
    ]},
    { title: "HUD Setup", rows: [
        { label: "HUD Size",      value: "Placeholder" },
        { label: "Button Opacity", value: "Placeholder" },
        { label: "Mini-map",      value: "Placeholder" }
    ]},
    { title: "Aim Assist", rows: [
        { label: "Aim Assist",    value: "Placeholder" },
        { label: "Aim Assist Strength", value: "Placeholder" }
    ]},
    { title: "FOV", rows: [
        { label: "Field of View", value: "Placeholder" }
    ]},
    { title: "Other Gameplay Settings", rows: [
        { label: "Sound",         value: "Placeholder" },
        { label: "Auto-Pickup",   value: "Placeholder" },
        { label: "Other",         value: "Placeholder" }
    ]}
  ],

  /* ---------- Sensitivity ----------
     Each key is a TAB. Inside it, each line is "Label": value.
     Replace the placeholder numbers (50) with your real values.
     Add or remove lines freely. */
  sensitivity: {
    "Camera": {
      "Third Person No Scope": 50,
      "First Person No Scope": 50,
      "Red Dot Sight":         50,
      "2x Scope":              50,
      "3x Scope":              50,
      "4x Scope":              50
    },
    "Firing": {
      "Third Person No Scope": 50,
      "First Person No Scope": 50,
      "Red Dot Sight":         50,
      "2x Scope":              50
    },
    "Gyroscope": {
      "Third Person No Scope": 50,
      "First Person No Scope": 50,
      "Red Dot Sight":         50,
      "2x Scope":              50
    },
    "ADS": {
      "ADS Sensitivity":       50,
      "ADS Gyroscope":         50
    }
  },

  /* ---------- Social Links ----------
     REPLACE each url with your real profile link.
     Set enabled to false to hide a button (e.g. no YouTube). */
  social: [
    { name: "Facebook",  icon: "f",  handle: "@your-username", url: "https://www.facebook.com/YOUR-USERNAME-HERE",     enabled: true },
    { name: "TikTok",    icon: "TT", handle: "@your-username", url: "https://www.tiktok.com/@YOUR-USERNAME-HERE",      enabled: true },
    { name: "Instagram", icon: "IG", handle: "@your-username", url: "https://www.instagram.com/YOUR-USERNAME-HERE",    enabled: true },
    { name: "YouTube",   icon: "YT", handle: "@your-channel",  url: "https://www.youtube.com/@YOUR-CHANNEL-HERE",      enabled: true }
  ]
};


/* =====================  PART 2: THE CODE  ===================== */
/* You normally do not need to edit anything below this line.    */

/* ---------- Small helpers ---------- */

// Quick way to create an element with a class and text.
// Using textContent keeps things safe (no raw HTML injection).
function make(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

// Shorthand for document.getElementById
function $(id) { return document.getElementById(id); }

// Remove everything inside an element
function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); }

// Show a small popup message
let toastTimer = null;
function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 1600);
}

// Copy text to the clipboard (with a fallback for older phones)
function copyText(text, message) {
  function done() { showToast(message || "Copied!"); }
  function fallback() {
    const temp = document.createElement("textarea");
    temp.value = text;
    temp.style.position = "fixed";
    temp.style.opacity = "0";
    document.body.appendChild(temp);
    temp.select();
    try { document.execCommand("copy"); done(); }
    catch (e) { showToast("Copy not supported"); }
    document.body.removeChild(temp);
  }
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done).catch(fallback);
  } else {
    fallback();
  }
}

// Safe localStorage (some browsers block it, so we wrap it)
function saveLocal(key, value) { try { localStorage.setItem(key, value); } catch (e) {} }
function loadLocal(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }


/* ---------- Navigation between sections ---------- */

const VIEW_IDS = ["home", "loadout", "settings", "sensitivity", "social"];

function showView(id) {
  if (VIEW_IDS.indexOf(id) === -1) id = "home";

  VIEW_IDS.forEach(function (viewId) {
    const section = $(viewId);
    // Re-showing a section restarts its fade-in animation
    section.hidden = (viewId !== id);
  });

  // Top bar with back button is hidden on Home
  const topbar = $("topbar");
  topbar.hidden = (id === "home");
  $("topbarTitle").textContent = $(id).getAttribute("data-title") || "";

  window.scrollTo(0, 0);
}

// We use the URL hash (#loadout) so the phone's Back button works too.
function goTo(id) {
  if (id === "home") {
    // Clear the hash without adding clutter
    if (location.hash) location.hash = "";
    else showView("home");
  } else {
    location.hash = id;
  }
}

function onHashChange() {
  const id = location.hash.replace("#", "") || "home";
  showView(id);
}


/* ---------- Profile ---------- */

function getPlayerName() {
  return loadLocal("codm_name") || DATA.profile.name;
}

function renderProfile() {
  const name = getPlayerName();
  $("playerName").textContent = name;
  $("playerSub").textContent = DATA.profile.subtitle;
  $("avatar").textContent = name.trim().charAt(0).toUpperCase() || "P";
  $("footerName").textContent = name;
}

function setupProfileEditor() {
  const editor = $("nameEditor");
  const input = $("nameInput");

  $("editNameBtn").addEventListener("click", function () {
    editor.hidden = !editor.hidden;
    if (!editor.hidden) { input.value = getPlayerName(); input.focus(); }
  });

  function save() {
    const value = input.value.trim();
    if (!value) { showToast("Enter a name"); return; }
    saveLocal("codm_name", value);
    renderProfile();
    editor.hidden = true;
    showToast("Name saved");
  }

  $("saveNameBtn").addEventListener("click", save);
  input.addEventListener("keydown", function (e) { if (e.key === "Enter") save(); });
}


/* ---------- LOADOUT section ---------- */

let currentMode = "MP";     // "MP" or "BR"
let currentCategory = "All";

function renderModeSwitch() {
  const box = $("modeSwitch");
  clear(box);
  Object.keys(DATA.loadouts).forEach(function (mode) {
    const btn = make("button", mode === currentMode ? "active" : "", mode === "MP" ? "MULTIPLAYER" : mode === "BR" ? "BATTLE ROYALE" : mode);
    btn.type = "button";
    btn.addEventListener("click", function () {
      currentMode = mode;
      currentCategory = "All";
      renderLoadout();
    });
    box.appendChild(btn);
  });
}

function renderCategoryChips() {
  const box = $("categoryChips");
  clear(box);
  const weapons = DATA.loadouts[currentMode] || [];

  // Build a list of unique categories from your data
  const categories = ["All"];
  weapons.forEach(function (w) {
    if (categories.indexOf(w.category) === -1) categories.push(w.category);
  });

  categories.forEach(function (cat) {
    const chip = make("button", "chip" + (cat === currentCategory ? " active" : ""), cat);
    chip.type = "button";
    chip.addEventListener("click", function () {
      currentCategory = cat;
      renderLoadout();
    });
    box.appendChild(chip);
  });
}

function buildWeaponCard(weapon) {
  const card = make("article", "card");

  // Header: name + category
  const head = make("div", "card-head");
  head.appendChild(make("h3", "card-title", weapon.name));
  head.appendChild(make("span", "tag", weapon.category));
  card.appendChild(head);

  // Image (real image if provided, otherwise a CSS placeholder)
  const imgBox = make("div", "weapon-img");
  if (weapon.image) {
    const img = document.createElement("img");
    img.src = weapon.image;
    img.alt = weapon.name;
    img.loading = "lazy";
    // If the image file is missing, fall back to the placeholder
    img.addEventListener("error", function () {
      clear(imgBox);
      imgBox.textContent = weapon.name.charAt(0).toUpperCase();
    });
    imgBox.appendChild(img);
  } else {
    imgBox.textContent = weapon.name.charAt(0).toUpperCase();
  }
  card.appendChild(imgBox);

  // Attachments
  const list = make("ul", "attach-list");
  (weapon.attachments || []).forEach(function (a) {
    const li = make("li");
    li.appendChild(make("span", "attach-slot", a.slot));
    li.appendChild(make("span", "attach-name", a.name));
    list.appendChild(li);
  });
  card.appendChild(list);

  // Copy button: copies the loadout as plain text
  const copy = make("button", "btn btn-small", "COPY LOADOUT");
  copy.type = "button";
  copy.style.marginTop = "12px";
  copy.style.width = "100%";
  copy.addEventListener("click", function () {
    const lines = [weapon.name + " (" + weapon.category + ", " + currentMode + ")"];
    (weapon.attachments || []).forEach(function (a) { lines.push("- " + a.slot + ": " + a.name); });
    copyText(lines.join("\n"), "Loadout copied!");
  });
  card.appendChild(copy);

  return card;
}

function renderLoadout() {
  renderModeSwitch();
  renderCategoryChips();

  const grid = $("loadoutGrid");
  clear(grid);

  const weapons = (DATA.loadouts[currentMode] || []).filter(function (w) {
    return currentCategory === "All" || w.category === currentCategory;
  });

  if (weapons.length === 0) {
    grid.appendChild(make("p", "empty", "No weapons added yet."));
    return;
  }
  weapons.forEach(function (w) { grid.appendChild(buildWeaponCard(w)); });
}


/* ---------- SETTINGS section ---------- */

function renderSettings() {
  const grid = $("settingsGrid");
  clear(grid);

  DATA.settings.forEach(function (group) {
    const card = make("article", "card");
    const head = make("div", "card-head");
    head.appendChild(make("h3", "card-title", group.title));
    card.appendChild(head);

    group.rows.forEach(function (row) {
      const r = make("div", "row");
      r.appendChild(make("span", "row-label", row.label));
      r.appendChild(make("span", "row-value", row.value));
      card.appendChild(r);
    });

    // Copy the whole card as text
    const copy = make("button", "btn btn-small", "COPY");
    copy.type = "button";
    copy.style.marginTop = "12px";
    copy.style.width = "100%";
    copy.addEventListener("click", function () {
      const lines = [group.title];
      group.rows.forEach(function (row) { lines.push(row.label + ": " + row.value); });
      copyText(lines.join("\n"), "Settings copied!");
    });
    card.appendChild(copy);

    grid.appendChild(card);
  });
}


/* ---------- SENSITIVITY section ---------- */

let currentSensTab = Object.keys(DATA.sensitivity)[0];

function renderSensitivity() {
  // Tabs
  const tabs = $("sensTabs");
  clear(tabs);
  Object.keys(DATA.sensitivity).forEach(function (tabName) {
    const chip = make("button", "chip" + (tabName === currentSensTab ? " active" : ""), tabName);
    chip.type = "button";
    chip.addEventListener("click", function () {
      currentSensTab = tabName;
      renderSensitivity();
    });
    tabs.appendChild(chip);
  });

  // One card holding every value in the selected tab
  const grid = $("sensGrid");
  clear(grid);
  const values = DATA.sensitivity[currentSensTab] || {};

  const card = make("article", "card");
  card.style.gridColumn = "1 / -1";   // make the card span the full width
  card.appendChild(make("h3", "card-title", currentSensTab + " Sensitivity"));

  Object.keys(values).forEach(function (label) {
    const row = make("div", "sens-row");
    row.appendChild(make("span", "sens-label", label));
    row.appendChild(make("span", "sens-value", String(values[label])));

    const btn = make("button", "copy-btn", "COPY");
    btn.type = "button";
    btn.addEventListener("click", function () {
      copyText(String(values[label]), label + ": " + values[label] + " copied");
    });
    row.appendChild(btn);
    card.appendChild(row);
  });

  grid.appendChild(card);
}

function setupCopyAllSens() {
  $("copyAllSens").addEventListener("click", function () {
    const values = DATA.sensitivity[currentSensTab] || {};
    const lines = [currentSensTab + " Sensitivity"];
    Object.keys(values).forEach(function (label) { lines.push(label + ": " + values[label]); });
    copyText(lines.join("\n"), currentSensTab + " values copied!");
  });
}


/* ---------- SOCIAL section ---------- */

function renderSocial() {
  const list = $("socialList");
  clear(list);

  DATA.social.filter(function (s) { return s.enabled; }).forEach(function (s) {
    const a = document.createElement("a");
    a.className = "social-btn";
    a.href = s.url;
    a.target = "_blank";                 // open in a new tab
    a.rel = "noopener noreferrer";       // safe external link

    a.appendChild(make("span", "social-icon", s.icon));

    const text = make("span");
    text.appendChild(make("div", "social-name", s.name.toUpperCase()));
    text.appendChild(make("div", "social-handle", s.handle));
    a.appendChild(text);

    a.appendChild(make("span", "social-arrow", "\u2197"));
    list.appendChild(a);
  });
}


/* ---------- Start everything when the page loads ---------- */

document.addEventListener("DOMContentLoaded", function () {
  // Footer year
  $("year").textContent = new Date().getFullYear();

  // Build all content
  renderProfile();
  setupProfileEditor();
  renderLoadout();
  renderSettings();
  renderSensitivity();
  setupCopyAllSens();
  renderSocial();

  // Home menu buttons
  document.querySelectorAll(".menu-btn").forEach(function (btn) {
    btn.addEventListener("click", function () { goTo(btn.getAttribute("data-target")); });
  });

  // Back button
  $("backBtn").addEventListener("click", function () { goTo("home"); });

  // Navigation via URL hash (also makes the phone Back button work)
  window.addEventListener("hashchange", onHashChange);
  onHashChange();
});```
