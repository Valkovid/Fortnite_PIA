// Données des fantômes
const data = [
    {
        name: "Poltergeist",
        grid: "✅ OUI",
        danger: "🔴 LÉTAL",
        speed: "⚡ RAPIDE",
        clues: ["emf", "ghost_writing", "orbs"]
    },
    {
        name: "Wailing Soul",
        grid: "✅ OUI",
        danger: "🔴 LÉTAL",
        speed: "🐢 LENT",
        clues: ["spiritbox", "emf", "orbs"]
    },
    {
        name: "Demon",
        grid: "✅ OUI",
        danger: "🔴 LÉTAL",
        speed: "⚡ RAPIDE",
        clues: ["spiritbox", "playful", "ghost_writing"]
    },
    {
        name: "Hupia",
        grid: "🔁 RAREMENT",
        danger: "❌ NON LÉTAL",
        speed: "⚖️ MOYEN",
        clues: ["temperature", "emf", "orbs"]
    },
    {
        name: "Duppy",
        grid: "✅ OUI",
        danger: "❌ NON LÉTAL",
        speed: "🐢 LENT",
        clues: ["playful", "emf", "orbs"]
    },
    {
        name: "Vetala",
        grid: "🔁 RAREMENT",
        danger: "🔴 LÉTAL",
        speed: "⚡ RAPIDE",
        clues: ["spiritbox", "ghost_writing", "orbs"]
    },
    {
        name: "Shy",
        grid: "❌ NON",
        danger: "❌ NON LÉTAL",
        speed: "🐢 LENT",
        clues: ["temperature", "playful", "ghost_writing"]
    },
    {
        name: "Spirit",
        grid: "✅ OUI",
        danger: "🔴 LÉTAL",
        speed: "⚖️ MOYEN",
        clues: ["spiritbox", "playful", "emf"]
    },
    {
        name: "Basty",
        grid: "✅ OUI",
        danger: "🔴 LÉTAL",
        speed: "🐢 LENT",
        clues: ["temperature", "playful", "emf"]
    },
    {
        name: "Gelin",
        grid: "❌ NON",
        danger: "❌ NON LÉTAL",
        speed: "🐢 LENT",
        clues: ["temperature", "ghost_writing", "orbs"]
    },
    {
        name: "Dybbuk",
        grid: "✅ OUI",
        danger: "🔴 LÉTAL",
        speed: "⚖️ MOYEN",
        clues: ["playful", "ghost_writing", "orbs"]
    },
    {
        name: "Moroi",
        grid: "✅ OUI",
        danger: "🔴 LÉTAL",
        speed: "⚖️ MOYEN",
        clues: ["spiritbox", "temperature", "orbs"]
    },
    {
        name: "Shade",
        grid: "✅ OUI",
        danger: "🔴 LÉTAL",
        speed: "🐢 LENT",
        clues: ["temperature", "playful", "orbs"]
    },
    {
        name: "Jumbee",
        grid: "✅ OUI",
        danger: "🔴 LÉTAL",
        speed: "⚖️ MOYEN",
        clues: ["spiritbox", "temperature", "emf"]
    }
];

// Ensemble pour les indices sélectionnés
let selected = new Set();

// Fonction pour mettre à jour les résultats en fonction des filtres
function update() {
    selected = new Set();
    document.querySelectorAll(".clue-filter").forEach(box => {
        if (box.checked) {
            selected.add(box.getAttribute("data-clue"));
        }
    });

    const oui = document.getElementById("grille-oui").checked;
    const non = document.getElementById("grille-non").checked;
    const container = document.getElementById("ghostCards");
    container.innerHTML = "";

    const filtered = data.filter(ghost => {
        const grille = ghost.grid;
        const grilleMatch = ((!oui && !non) || (oui && (grille === "yes" || (grille === "✅ OUI" || grille === "🔁 RAREMENT"))) || (non && (grille === "no" || grille === "❌ NON")));
        const cluesMatch = Array.from(selected).every(clue => ghost.clues.includes(clue));
        return grilleMatch && cluesMatch;
    });

    document.getElementById("count").textContent = filtered.length;

    filtered.forEach(ghost => {
        const card = document.createElement("div");
        card.className = "card";
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

            <p><strong>${window.__LANG__.ghost.grid}&nbsp;:</strong>${window.__LANG__.gridLabels[ghost.grid] || ghost.grid}</p>
            <p><strong>${window.__LANG__.ghost.danger}&nbsp;:</strong>${window.__LANG__.dangerLabels[ghost.danger] || ghost.danger}</p>
            <p><strong>${window.__LANG__.ghost.speed}&nbsp;:</strong>${window.__LANG__.speedLabels[ghost.speed] || ghost.speed}</p>
            <p><strong>${window.__LANG__.ghost.clues}&nbsp;:</strong><br>${cluesHTML}</p>
        `;
        container.appendChild(card);
    });
}

// Ajouter des écouteurs d'événements pour les cases à cocher
document.querySelectorAll("input[type='checkbox']").forEach(box => {
    box.addEventListener("change", update);
});

// Gérer les événements de changement pour les filtres de grille
document.getElementById("grille-oui").addEventListener("change", (e) => {
    if (e.target.checked) document.getElementById("grille-non").checked = false;
});

document.getElementById("grille-non").addEventListener("change", (e) => {
    if (e.target.checked) document.getElementById("grille-oui").checked = false;
});

// Définir l'icône du bouton de réinitialisation et ajouter le gestionnaire d'événements
document.addEventListener('DOMContentLoaded', function() {
    const resetButton = document.getElementById("resetButton");
    if (resetButton) {
        resetButton.innerHTML = '&#x1f501;';
		resetButton.style.backgroundColor = "transparent"; 	// pas de fond
		resetButton.style.border = "none";                	// pas de bordure
		resetButton.style.boxShadow = "none";             	// pas d’ombre éventuelle
		resetButton.style.outline = "none";               	// pas de contour focus
		resetButton.style.cursor = "pointer"; 			    // 👉 Curseur doigt
		resetButton.style.fontSize = "20px"; 			    // ou 30px si tu veux bien grand
        resetButton.addEventListener("click", () => {
            document.querySelectorAll(".filters input[type='checkbox']").forEach(box => {
                box.checked = false;
            });
            update();
        });
    }
    const langBtn = document.getElementById("languageButton");
    const langOptions = document.getElementById("languageOptions");

    if (langBtn && langOptions) {
        langBtn.addEventListener("click", () => {
            langOptions.classList.toggle("visible");
        });

        document.addEventListener("click", (e) => {
            if (!langBtn.contains(e.target) && !langOptions.contains(e.target)) {
                langOptions.classList.remove("visible");
            }
        });
    }
});

// Traductions
const LANG = {
    fr: {
        title: "Phantom Investigation App",
        reset: "&#x1f501",                  // Utilisation de l'icône directement dans le texte de traduction
        grid: "🔧 Grille :",
        yes: "OUI",
        no: "NON",
        clues: "🔎 Indices :",
        matchCount: "👻 :",
        ghost: {
            grid: "👁️ Grille",
            danger: "☠️ Danger",
            speed: "🚶 Déplacement",
            clues: "🔍 Indices"
        },
        cluesLabels: {
            "emf": "EMF",
            "ghost_writing": "Ghost Writing",
            "orbs": "Orbes",
            "spiritbox": "Spirit Box",
            "temperature": "Température",
            "playful": "Playful"
        },
        gridLabels: {
            "✅ OUI": "✅ OUI",
            "🔁 RAREMENT": "🔁 RAREMENT",
            "❌ NON": "❌ NON"
        },
        dangerLabels: {
            "🔴 LÉTAL": "🔴 LÉTAL",
            "❌ NON LÉTAL": "❌ NON LÉTAL"
        },
        speedLabels: {
            "⚡ RAPIDE": "⚡ RAPIDE",
            "⚖️ MOYEN": "⚖️ MOYEN",
            "🐢 LENT": "🐢 LENT"
        },
        modal: {
            title: "⚠️ Avertissement : Difficulté & Mises à Jour",
            p1: "🧠 Les comportements des fantômes peuvent varier selon le niveau de difficulté (Facile / Normal / Hard / Expert / Impossible), et selon les mises à jour récentes de la map.",
            p2: "💡 Les indices présents dans cette application sont basés sur des observations en mode Hard (et inférieur si tout va bien), et certains fantômes peuvent réagir différemment en mode Expert :",
            li1: "💥 Mouvements dans \"The Grid\"",
            li2: "☠️ Capacité à tuer",
            li3: "🏃‍♂️ Vitesse de déplacement",
            p3: "...peuvent changer de façon imprévisible selon la partie ou après une mise à jour du jeu.",
            p4: "🎯 Utilisez les informations comme guide de référence, mais faites toujours confiance à vos propres analyses en partie. Restez vigilants, enquêteurs. 👻",
        },
        cluesIcons: {
            "emf": "emf.svg",
            "ghost_writing": "ghost_writing.svg",
            "orbs": "orbs.svg",
            "spiritbox": "spiritbox.svg",
            "temperature": "temperature.svg",
            "playful": "playful.svg"
        },
    },
    en: {
        title: "Phantom Investigation App",
        reset: "&#x1f501",                  // Utilisation de l'icône directement dans le texte de traduction
        grid: "🔧 Grid :",
        yes: "YES",
        no: "NO",
        clues: "🔎 Clues :",
        matchCount: "👻 :",
        ghost: {
            grid: "👁️ Grid",
            danger: "☠️ Danger",
            speed: "🚶 Speed",
            clues: "🔍 Clues"
        },
        cluesLabels: {
            "emf": "EMF",
            "ghost_writing": "Ghost Writing",
            "orbs": "Orbs",
            "spiritbox": "Spirit Box",
            "temperature": "Temperature",
            "playful": "Playful"
        },
        gridLabels: {
            "✅ OUI": "✅ YES",
            "🔁 RAREMENT": "🔁 RARELY",
            "❌ NON": "❌ NO"
        },
        dangerLabels: {
            "🔴 LÉTAL": "🔴 LETHAL",
            "❌ NON LÉTAL": "❌ NON-LETHAL"
        },
        speedLabels: {
            "⚡ RAPIDE": "⚡ FAST",
            "⚖️ MOYEN": "⚖️ MEDIUM",
            "🐢 LENT": "🐢 SLOW"
        },
        modal: {
        title: "⚠️ Warning: Difficulty & Updates",
        p1: "🧠 Ghost behaviors may vary depending on the difficulty level (Easy / Normal / Hard / Expert / Impossible), and recent updates to the map.",
        p2: "💡 The clues listed in this app are based on observations in Hard mode (and lower if all goes well), but some ghosts may behave differently in Expert mode :",
        li1: "💥 Movement in 'The Grid'",
        li2: "☠️ Ability to kill",
        li3: "🏃‍♂️ Movement speed",
        p3: "...can unpredictably change depending on the session or after a game update.",
        p4: "🎯 Use this information as a reference guide, but always rely on your own in-game analysis. Stay sharp, investigators. 👻",
        },
        cluesIcons: {
            "emf": "emf.svg",
            "ghost_writing": "ghost_writing.svg",
            "orbs": "orbs.svg",
            "spiritbox": "spiritbox.svg",
            "temperature": "temperature.svg",
            "playful": "playful.svg"
        },
    },
};

// Génération des indices à cocher
function generateClues() {
    const container = document.getElementById("clueContainer");
    container.innerHTML = '';

    const clues = Object.keys(window.__LANG__.cluesLabels);
    
    clues.forEach(clue => {
        const label = document.createElement("label");
        label.classList.add("clue-label");
        
        const input = document.createElement("input");
        input.type = "checkbox";
        input.className = "clue-filter";
        input.setAttribute("data-clue", clue);
        input.value = clue;
        
        // Chargement de l'icône
        const iconFile = window.__LANG__.cluesIcons[clue];
        const img = document.createElement("img");
        img.src = `icons/${iconFile}`;
        img.className = "icon-small";
        img.alt = clue;

        label.appendChild(input);
        label.appendChild(img);
        label.append(" " + window.__LANG__.cluesLabels[clue]);
        
        container.appendChild(label);
    });

    // Ajoute les écouteurs sur les nouvelles cases
    document.querySelectorAll(".clue-filter").forEach(box => {
        box.addEventListener("change", update);
    });
}


// Charger la langue appropriée au chargement de la page
window.onload = () => {
const savedLang = localStorage.getItem("lang");
const userLang = savedLang || (navigator.language || navigator.userLanguage).slice(0, 2);
    setLanguage(userLang);

    // Afficher le pop-up
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
};

function setLanguage(code) {
    const lang = LANG[code] || LANG["fr"];
        localStorage.setItem("lang", code); // mémorise la langue
    window.__LANG__ = lang;

    // Titre et h1
    document.title = lang.title;
    const h1 = document.querySelector("h1");
    if (h1) h1.textContent = lang.title;

    // Bouton de réinitialisation
    const resetBtn = document.getElementById("resetButton");
    if (resetBtn) resetBtn.innerHTML = lang.reset;

    // Textes des filtres
    const filterSpans = document.querySelectorAll(".filters span");
    if (filterSpans[0]) filterSpans[0].textContent = lang.grid;
    if (filterSpans[1]) filterSpans[1].textContent = lang.clues;

    // Libellés OUI / NON
    const labels = document.querySelectorAll(".filters label");
    if (labels[0]?.childNodes[0]) labels[0].childNodes[0].nodeValue = lang.yes + " ";
    if (labels[1]?.childNodes[0]) labels[1].childNodes[0].nodeValue = lang.no + " ";

    // Compteur
    const resultCount = document.querySelector(".results-count");
    if (resultCount?.childNodes[0]) resultCount.childNodes[0].textContent = lang.matchCount + " ";

    // Mise à jour des libellés des indices cochables
    document.querySelectorAll(".clue-filter").forEach(input => {
            const clue = input.getAttribute("data-clue");
            const label = input.closest("label");
            if (label && lang.cluesLabels[clue]) {
                label.innerHTML = '';
                label.appendChild(input);
                const icon = lang.cluesIcons[clue] || "";
                if (icon) {
                    const img = document.createElement('img');
                    img.src = `icons/${icon}`;
                    img.className = 'icon-small';
                    label.appendChild(img);
                }
                label.insertAdjacentText('beforeend', ' ' + lang.cluesLabels[clue]);
            }
        });

    // 🟨 Met à jour le contenu de la modale
    const modal = document.getElementById("myModal");
    if (modal) {
        modal.querySelector("h2").textContent = lang.modal.title;
        const paragraphs = modal.querySelectorAll("p");
        if (paragraphs.length >= 4) {
            paragraphs[0].textContent = lang.modal.p1;
            paragraphs[1].textContent = lang.modal.p2;
            paragraphs[2].textContent = lang.modal.p3;
            paragraphs[3].textContent = lang.modal.p4;
        }
        const lis = modal.querySelectorAll("ul li");
        if (lis.length >= 3) {
            lis[0].textContent = lang.modal.li1;
            lis[1].textContent = lang.modal.li2;
            lis[2].textContent = lang.modal.li3;
        }
    }

    // Mise à jour bouton de langue
    const langButton = document.getElementById("languageButton");
    if (langButton) langButton.textContent = code.toUpperCase();

    // Fermer le menu de langue après sélection
    const options = document.getElementById("languageOptions");
    if (options) options.classList.remove("visible");

    // Mettre à jour les cartes
    update();

    // Mise à jour des indices
    generateClues();
    update();
}

const loader = new IconLoader();

// Exemples d'injection :
loader.loadIcon('emf', 'icon-emf');
loader.loadIcon('spiritbox', 'icon-spiritbox');
loader.loadIcon('playful', 'icon-playful');
loader.loadIcon('ghost_writing', 'icon-ghost-writing');
loader.loadIcon('orbs', 'icon-orbs');
loader.loadIcon('temperature', 'icon-temperature');
