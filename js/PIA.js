/* =========================================================
   🔧 Données des fantômes
========================================================= */
const data = [
    { name: "Poltergeist", grid: "✅ OUI", danger: "🔴 LÉTAL", speed: "⚡ RAPIDE", clues: ["emf", "ghost_writing", "orbs"] },
    { name: "Wailing Soul", grid: "✅ OUI", danger: "🔴 LÉTAL", speed: "🐢 LENT", clues: ["spiritbox", "emf", "orbs"] },
    { name: "Demon", grid: "✅ OUI", danger: "🔴 LÉTAL", speed: "⚡ RAPIDE", clues: ["spiritbox", "playful", "ghost_writing"] },
    { name: "Hupia", grid: "🔁 RAREMENT", danger: "❌ NON LÉTAL", speed: "⚖️ MOYEN", clues: ["temperature", "emf", "orbs"] },
    { name: "Duppy", grid: "✅ OUI", danger: "❌ NON LÉTAL", speed: "🐢 LENT", clues: ["playful", "emf", "orbs"] },
    { name: "Vetala", grid: "🔁 RAREMENT", danger: "🔴 LÉTAL", speed: "⚡ RAPIDE", clues: ["spiritbox", "ghost_writing", "orbs"] },
    { name: "Shy", grid: "❌ NON", danger: "❌ NON LÉTAL", speed: "🐢 LENT", clues: ["temperature", "playful", "ghost_writing"] },
    { name: "Spirit", grid: "✅ OUI", danger: "🔴 LÉTAL", speed: "⚖️ MOYEN", clues: ["spiritbox", "playful", "emf"] },
    { name: "Basty", grid: "✅ OUI", danger: "🔴 LÉTAL", speed: "🐢 LENT", clues: ["temperature", "playful", "emf"] },
    { name: "Gelin", grid: "❌ NON", danger: "❌ NON LÉTAL", speed: "🐢 LENT", clues: ["temperature", "ghost_writing", "orbs"] },
    { name: "Dybbuk", grid: "✅ OUI", danger: "🔴 LÉTAL", speed: "⚖️ MOYEN", clues: ["playful", "ghost_writing", "orbs"] },
    { name: "Moroi", grid: "✅ OUI", danger: "🔴 LÉTAL", speed: "⚖️ MOYEN", clues: ["spiritbox", "temperature", "orbs"] },
    { name: "Shade", grid: "✅ OUI", danger: "🔴 LÉTAL", speed: "🐢 LENT", clues: ["temperature", "playful", "orbs"] },
    { name: "Jumbee", grid: "✅ OUI", danger: "🔴 LÉTAL", speed: "⚖️ MOYEN", clues: ["spiritbox", "temperature", "emf"] }
];

/* =========================================================
   🌍 Traductions
========================================================= */
const LANG = {  
    fr: { 
        title: "Phantom Investigation App", reset: "&#x1f501", grid: "🔧 Grille :", yes: "OUI", no: "NON", clues: "🔎 Indices :", matchCount: "👻 :",
        ghost: { grid: "👁️ Grille", danger: "☠️ Danger", speed: "🚶 Déplacement", clues: "🔍 Indices" },
        cluesLabels: { emf: "EMF", ghost_writing: "Ghost Writing", orbs: "Orbes", spiritbox: "Spirit Box", temperature: "Température", playful: "Playful" },
        gridLabels: { "✅ OUI": "✅ OUI", "🔁 RAREMENT": "🔁 RAREMENT", "❌ NON": "❌ NON" },
        dangerLabels: { "🔴 LÉTAL": "🔴 LÉTAL", "❌ NON LÉTAL": "❌ NON LÉTAL" },
        speedLabels: { "⚡ RAPIDE": "⚡ RAPIDE", "⚖️ MOYEN": "⚖️ MOYEN", "🐢 LENT": "🐢 LENT" },
        cluesIcons: { emf: "emf.svg", ghost_writing: "ghost_writing.svg", orbs: "orbs.svg", spiritbox: "spiritbox.svg", temperature: "temperature.svg", playful: "playful.svg" }
    },
    en: { 
        title: "Phantom Investigation App", reset: "&#x1f501", grid: "🔧 Grid :", yes: "YES", no: "NO", clues: "🔎 Clues :", matchCount: "👻 :",
        ghost: { grid: "👁️ Grid", danger: "☠️ Danger", speed: "🚶 Speed", clues: "🔍 Clues" },
        cluesLabels: { emf: "EMF", ghost_writing: "Ghost Writing", orbs: "Orbs", spiritbox: "Spirit Box", temperature: "Temperature", playful: "Playful" },
        gridLabels: { "✅ OUI": "✅ YES", "🔁 RAREMENT": "🔁 RARELY", "❌ NON": "❌ NO" },
        dangerLabels: { "🔴 LÉTAL": "🔴 LETHAL", "❌ NON LÉTAL": "❌ NON-LETHAL" },
        speedLabels: { "⚡ RAPIDE": "⚡ FAST", "⚖️ MOYEN": "⚖️ MEDIUM", "🐢 LENT": "🐢 SLOW" },
        cluesIcons: { emf: "emf.svg", ghost_writing: "ghost_writing.svg", orbs: "orbs.svg", spiritbox: "spiritbox.svg", temperature: "temperature.svg", playful: "playful.svg" }
    }
};

/* =========================================================
   🎯 Variables globales d'état
========================================================= */
let grilleOuiSelected = false;
let grilleNonSelected = false;
let selected = new Set();

/* =========================================================
   🔄 Mise à jour des cartes
========================================================= */
function update() {
    selected = new Set();
    document.querySelectorAll(".clue-filter").forEach(box => {
        if (box.checked) {
            selected.add(box.getAttribute("data-clue"));
        }
    });

    const oui = grilleOuiSelected;
    const non = grilleNonSelected;

    const container = document.getElementById("ghostCards");
    container.innerHTML = "";

    const filtered = data.filter(ghost => {
        const grille = ghost.grid;
        const grilleMatch = ((!oui && !non) || 
                              (oui && (grille === "✅ OUI" || grille === "🔁 RAREMENT")) || 
                              (non && grille === "❌ NON"));
        const cluesMatch = Array.from(selected).every(clue => ghost.clues.includes(clue));
        return grilleMatch && cluesMatch;
    });

    document.getElementById("count").textContent = filtered.length;
    updateClueHints(filtered);

    filtered.forEach(ghost => {
        const card = document.createElement("div");
        card.className = "card app-card";
        const cluesHTML = ghost.clues.map(c => {
            const translated = window.__LANG__.cluesLabels[c] || c;
            const icon = window.__LANG__.cluesIcons[c] || "";
            const iconHTML = icon ? `<img src="icons/${icon}" class="icon-small"> ` : "";

            if (selected.size > 0) {
                if (selected.has(c)) {
                    return `<span class='highlight'>${iconHTML}${translated}</span>`;
                } else {
                    return `<span class='nonmatch'>${iconHTML}${translated}</span>`;
                }
            } else {
                return `${iconHTML}${translated}`;
            }
        }).join(",<br>");

        card.innerHTML = `
            <h3>${ghost.name}</h3>
            <p><strong>${window.__LANG__.ghost.grid}&nbsp;:</strong>${window.__LANG__.gridLabels[ghost.grid]}</p>
            <p><strong>${window.__LANG__.ghost.danger}&nbsp;:</strong>${window.__LANG__.dangerLabels[ghost.danger]}</p>
            <p><strong>${window.__LANG__.ghost.speed}&nbsp;:</strong>${window.__LANG__.speedLabels[ghost.speed]}</p>
            <p><strong>${window.__LANG__.ghost.clues}&nbsp;:</strong><br>${cluesHTML}</p>
        `;
        container.appendChild(card);
    });
}

/* =========================================================
   🖼 Génération des indices à cocher
========================================================= */
function generateClues() {
    const clueContainer = document.getElementById("clueContainer");
    clueContainer.innerHTML = '';

    const wrapper = document.createElement("div");
    wrapper.className = "clue-wrapper";
    clueContainer.appendChild(wrapper);

    const clues = Object.keys(window.__LANG__.cluesLabels);
    clues.forEach(clue => {
        const label = document.createElement("label");
        label.classList.add("clue-label", "app-card");
        label.style.position = "relative";

        const input = document.createElement("input");
        input.type = "checkbox";
        input.className = "clue-filter";
        input.setAttribute("data-clue", clue);
        input.value = clue;
        input.style.position = "absolute";
        input.style.opacity = 0;
        input.style.width = "100%";
        input.style.height = "100%";
        input.style.cursor = "pointer";
        input.style.top = 0;
        input.style.left = 0;

        const contentWrapper = document.createElement("div");
        contentWrapper.style.display = "flex";
        contentWrapper.style.alignItems = "center";
        contentWrapper.style.justifyContent = "center";
        contentWrapper.style.gap = "8px";
        contentWrapper.style.pointerEvents = "none";

        const iconFile = window.__LANG__.cluesIcons[clue];
        const img = document.createElement("img");
        img.src = `icons/${iconFile}`;
        img.className = "icon-small";
        img.alt = clue;

        contentWrapper.appendChild(img);
        contentWrapper.append(" " + window.__LANG__.cluesLabels[clue]);

        label.appendChild(contentWrapper);
        label.appendChild(input);
        wrapper.appendChild(label);
    });

    document.querySelectorAll(".clue-filter").forEach(box => {
        box.addEventListener("change", update);
    });

    document.querySelectorAll(".clue-filter").forEach(box => {
        box.addEventListener("change", () => {
            box.closest("label").classList.toggle("selected", box.checked);
            update();
        });
    });
}

/* =========================================================
   🌐 Application de la langue
========================================================= */
function setLanguage(code) {
    const lang = LANG[code] || LANG["fr"];
    localStorage.setItem("lang", code);
    window.__LANG__ = lang;

    document.title = lang.title;
    document.querySelector("h1").textContent = lang.title;
    document.getElementById("resetButton").innerHTML = lang.reset;
    document.querySelectorAll(".filters span")[0].textContent = lang.grid;
    document.querySelectorAll(".filters span")[1].textContent = lang.clues;
    document.querySelector(".results-count").childNodes[0].textContent = lang.matchCount + " ";
    
    generateClues();
    update();
}

/* =========================================================
   🔄 Initialisation des évènements DOM
========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.getElementById("resetButton");
    if (resetButton) {
        resetButton.innerHTML = '&#x1f501;';
        resetButton.style.backgroundColor = "transparent";
        resetButton.style.border = "none";
        resetButton.style.boxShadow = "none";
        resetButton.style.outline = "none";
        resetButton.style.cursor = "pointer";
        resetButton.style.fontSize = "20px";
        resetButton.addEventListener("click", () => {
            // Réinitialisation des indices
            document.querySelectorAll(".filters input[type='checkbox']").forEach(box => {
                box.checked = false;
            });
            document.querySelectorAll(".clue-label").forEach(label => {
                label.classList.remove("selected");
            });

            // Réinitialisation de la grille
            grilleOuiSelected = false;
            grilleNonSelected = false;
            updateGrilleButtons();

            // Mise à jour globale
            update();
        });
    }

    const langBtn = document.getElementById("languageButton");
    const langOptions = document.getElementById("languageOptions");
    if (langBtn && langOptions) {
        langBtn.addEventListener("click", () => langOptions.classList.toggle("visible"));
        document.addEventListener("click", (e) => {
            if (!langBtn.contains(e.target) && !langOptions.contains(e.target)) {
                langOptions.classList.remove("visible");
            }
        });
    }

    document.getElementById("grille-oui").addEventListener("click", () => {
        grilleOuiSelected = !grilleOuiSelected;
        grilleNonSelected = false;
        updateGrilleButtons();
        update();
    });

    document.getElementById("grille-non").addEventListener("click", () => {
        grilleNonSelected = !grilleNonSelected;
        grilleOuiSelected = false;
        updateGrilleButtons();
        update();
    });

    function updateGrilleButtons() {
        document.getElementById("grille-oui").classList.toggle("active", grilleOuiSelected);
        document.getElementById("grille-non").classList.toggle("active", grilleNonSelected);
    }
});

/* =========================================================
   🔧 Détection des indices encore possibles / désactivés
========================================================= */
function updateClueHints(filteredGhosts) {
    const selectedClues = Array.from(document.querySelectorAll(".clue-filter"))
        .filter(box => box.checked)
        .map(box => box.getAttribute("data-clue"));

    const clueLabels = document.querySelectorAll(".clue-label");

    // Si aucun indice sélectionné → réinitialiser les effets
    if (selectedClues.length === 0) {
        clueLabels.forEach(label => {
            label.classList.remove("hint-possible", "hint-useless");
        });
        return;
    }

    // Collecter les indices possibles
    const allPossibleClues = new Set();
    filteredGhosts.forEach(ghost => {
        ghost.clues.forEach(clue => allPossibleClues.add(clue));
    });

    clueLabels.forEach(label => {
        const clue = label.querySelector("input")?.getAttribute("data-clue");
        if (!clue) return;

        label.classList.remove("hint-possible", "hint-useless");

        if (allPossibleClues.has(clue)) {
            label.classList.add("hint-possible");
        } else {
            label.classList.add("hint-useless");
        }
    });
}

/* =========================================================
   🚀 Initialisation au chargement de la page
========================================================= */
window.onload = () => {
    const savedLang = localStorage.getItem("lang");
    const userLang = savedLang || (navigator.language || navigator.userLanguage).slice(0, 2);
    setLanguage(userLang);

    const modal = document.getElementById("myModal");
    modal.style.display = "block";
    document.getElementsByClassName("close")[0].onclick = () => modal.style.display = "none";
};
