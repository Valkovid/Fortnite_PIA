// Données des fantômes
const data = [
    {
        name: "Poltergeist",
        voice: "Rarement",
        grid: "Souvent",
        danger: "Actif et physique",
        speed: "Moyen",
        clues: ["EMF", "Ghost Writing", "Orbes"]
    },
    {
        name: "Wailing Soul",
        voice: "Souvent",
        grid: "Souvent",
        danger: "Moyennement dangereux",
        speed: "Lent",
        clues: ["Spirit Box", "EMF", "Orbes"]
    },
    {
        name: "Demon",
        voice: "Souvent",
        grid: "Souvent",
        danger: "Très dangereux",
        speed: "Moyen",
        clues: ["Spirit Box", "Playful", "Ghost Writing"]
    },
    {
        name: "Hupia",
        voice: "Jamais",
        grid: "Rarement",
        danger: "Très passif",
        speed: "Moyen",
        clues: ["Température", "EMF", "Orbes"]
    },
    {
        name: "Duppy",
        voice: "Souvent",
        grid: "Rarement",
        danger: "Plutôt calme",
        speed: "Moyen",
        clues: ["Playful", "EMF", "Orbes"]
    },
    {
        name: "Vetala",
        voice: "Souvent",
        grid: "Rarement",
        danger: "Dangereux",
        speed: "Rapide",
        clues: ["Spirit Box", "Ghost Writing", "Orbes"]
    },
    {
        name: "Shy",
        voice: "Jamais",
        grid: "Jamais",
        danger: "Très passif",
        speed: "Lent",
        clues: ["Température", "Playful", "Ghost Writing"]
    },
    {
        name: "Spirit",
        voice: "Parfois",
        grid: "Souvent",
        danger: "Moyen",
        speed: "Moyen",
        clues: ["Spirit Box", "Playful", "EMF"]
    },
    {
        name: "Basty",
        voice: "Parfois",
        grid: "Rarement",
        danger: "Moyen",
        speed: "Moyen",
        clues: ["Température", "Playful", "EMF"]
    },
    {
        name: "Gelin",
        voice: "Parfois",
        grid: "Jamais",
        danger: "Inoffensif",
        speed: "Moyen",
        clues: ["Température", "Ghost Writing", "Orbes"]
    },
    {
        name: "Dybbuk",
        voice: "Souvent",
        grid: "Souvent",
        danger: "Très dangereux",
        speed: "Moyen",
        clues: ["Playful", "Ghost Writing", "Orbes"]
    },
    {
        name: "Moroi",
        voice: "Souvent",
        grid: "Rarement",
        danger: "Moyennement dangereux",
        speed: "Moyen",
        clues: ["Spirit Box", "Température", "Orbes"]
    },
    {
        name: "Shade",
        voice: "Jamais",
        grid: "Rarement",
        danger: "Très passif",
        speed: "Moyen",
        clues: ["Température", "Playful", "Orbes"]
    },
    {
        name: "Jumbee",
        voice: "Parfois",
        grid: "Rarement",
        danger: "Plutôt calme",
        speed: "Moyen",
        clues: ["Spirit Box", "Température", "EMF"]
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
        const grilleMatch = (grille === "Inconnu" || (!oui && !non) || (oui && (grille === "Souvent" || grille === "Rarement" || grille === "Inconnu")) || (non && (grille === "Jamais" || grille === "Inconnu")));
        const cluesMatch = Array.from(selected).every(clue => ghost.clues.includes(clue));
        return grilleMatch && cluesMatch;
    });

    document.getElementById("count").textContent = filtered.length;

    filtered.forEach(ghost => {
        const card = document.createElement("div");
        card.className = "card";
        const cluesHTML = ghost.clues.map(c => {
            if (selected.size > 0) {
                if (selected.has(c)) {
                    return `<span class='highlight'>${c}</span>`;
                } else {
                    return `<span class='nonmatch'>${c}</span>`;
                }
            } else {
                return c;
            }
        }).join(",<br>");
        card.innerHTML = `
            <h3>${ghost.name}</h3>
            <p><strong>${window.__LANG__.ghost.voice}&nbsp;:</strong>${ghost.voice}</p>
            <p><strong>${window.__LANG__.ghost.grid}&nbsp;:</strong>${ghost.grid}</p>
            <p><strong>${window.__LANG__.ghost.danger}&nbsp;:</strong>${ghost.danger}</p>
            <p><strong>${window.__LANG__.ghost.speed}&nbsp;:</strong>${ghost.speed}</p>
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
		resetButton.style.cursor = "pointer"; 				// 👉 Curseur doigt
		resetButton.style.fontSize = "20px"; 				// ou 30px si tu veux bien grand
        resetButton.addEventListener("click", () => {
            document.querySelectorAll(".filters input[type='checkbox']").forEach(box => {
                box.checked = false;
            });
            update();
        });
    }
});

// Traductions
const LANG = {
    fr: {
        title: "Phantom Investigation - par Valkovid",
        reset: "&#x1f501", // Utilisation de l'icône directement dans le texte de traduction
        grid: "🔧 Grille :",
        yes: "OUI",
        no: "NON",
        clues: "🔎 Indices :",
        matchCount: "👻 :",
        ghost: {
            voice: "🗣️ Voix",
            grid: "👁️ Mouvement Grille",
            danger: "☠️ Dangerosité",
            speed: "🚶 Déplacement",
            clues: "🔍 Indices"
        }
    },
    en: {
        title: "Phantom Investigation - by Valkovid",
        reset: "&#x1f501", // Utilisation de l'icône directement dans le texte de traduction
        grid: "🔧 Grid :",
        yes: "YES",
        no: "NO",
        clues: "🔎 Clues found:",
        matchCount: "Matching ghosts:",
        ghost: {
            voice: "🗣️ Voice",
            grid: "👁️ Grid movement",
            danger: "☠️ Danger level",
            speed: "🚶 Speed",
            clues: "🔍 Clues"
        }
    }
};

// Charger la langue appropriée au chargement de la page
window.onload = () => {
    const userLang = (navigator.language || navigator.userLanguage).slice(0, 2);
    const lang = LANG[userLang] || LANG["fr"];

    document.title = "Fortnite_PIA";
    const h1 = document.querySelector("h1");
    if (h1) h1.textContent = lang.title;

    const resetBtn = document.getElementById("resetButton");
    if (resetBtn) {
        resetBtn.innerHTML = lang.reset; // Utilisation du texte de traduction pour le bouton
        resetBtn.addEventListener("click", () => {
            document.querySelectorAll(".filters input[type='checkbox']").forEach(box => {
                box.checked = false;
            });
            update();
        });
    }

    const filterSpans = document.querySelectorAll(".filters span");
    if (filterSpans[0]) filterSpans[0].textContent = lang.grid;
    if (filterSpans[1]) filterSpans[1].textContent = lang.clues;

    const labels = document.querySelectorAll(".filters label");
    if (labels[0]?.childNodes[0]) labels[0].childNodes[0].nodeValue = lang.yes + " ";
    if (labels[1]?.childNodes[0]) labels[1].childNodes[0].nodeValue = lang.no + " ";

    const resultCount = document.querySelector(".results-count");
    if (resultCount?.childNodes[0]) resultCount.childNodes[0].textContent = lang.matchCount + " ";

    window.__LANG__ = lang;
    if (typeof update === "function") update();
};