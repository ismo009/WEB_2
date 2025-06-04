// TD3 JavaScript - Manipulation du DOM et gestion des événements

// =============================================================================
// PARTIE 1 – Sélection et modification d'éléments du DOM
// =============================================================================

console.log("=== PARTIE 1 - Sélection et modification d'éléments ===");

// Question 3: Comment sélectionner tous les éléments avec la classe info
console.log("Q3: Sélection des éléments avec classe 'info'");
const elementsInfo = document.querySelectorAll('.info');
console.log("Éléments avec classe 'info':", elementsInfo);

// Question 4: Comment accéder au champ email du formulaire ?
console.log("Q4: Accès au champ email");
const champEmail = document.querySelector('.email');
console.log("Champ email:", champEmail);

// Question 5: Comment récupérer tous les paragraphes de la page ?
console.log("Q5: Tous les paragraphes");
const tousLesParagraphes = document.querySelectorAll('p');
console.log("Tous les paragraphes:", tousLesParagraphes);

// Question 6: Différence entre querySelector et querySelectorAll
console.log("Q6: Différence querySelector vs querySelectorAll");
const premierInfo = document.querySelector('.info'); // Premier élément trouvé
const tousLesInfo = document.querySelectorAll('.info'); // Tous les éléments
console.log("Premier élément .info:", premierInfo);
console.log("Tous les éléments .info:", tousLesInfo);

// Question 7: Comment modifier dynamiquement le texte d'un div ?
console.log("Q7: Modification du texte d'un div");
const premierDiv = document.querySelector('div.info');
if (premierDiv) {
    const ancienTexte = premierDiv.textContent;
    premierDiv.textContent = "Texte modifié dynamiquement !";
    console.log(`Ancien texte: "${ancienTexte}" → Nouveau: "${premierDiv.textContent}"`);
}

// Question 8: Comment changer la valeur d'un champ de saisie ? Comment récupérer placeholder ?
console.log("Q8: Modification valeur et récupération placeholder");
if (champEmail) {
    console.log("Placeholder actuel:", champEmail.placeholder);
    champEmail.value = "nouvel.email@exemple.com";
    console.log("Nouvelle valeur:", champEmail.value);
}

// Question 10: Comment modifier dynamiquement l'attribut title d'un élément
console.log("Q10: Modification attribut title");
const elementTest = document.querySelector('.element-test');
if (elementTest) {
    elementTest.title = "Title ajouté dynamiquement";
    console.log("Title ajouté:", elementTest.title);
}

// =============================================================================
// PARTIE 2 – Navigation dans l'arborescence du DOM
// =============================================================================

console.log("=== PARTIE 2 - Navigation dans l'arborescence ===");

// Question 12 & 13: Analyser un élément
const btnAnalyser = document.querySelector('.analyser-btn');
let elementSelectionne = null;

function analyserElement(element) {
    if (!element) return;
    
    console.log("=== Analyse de l'élément ===");
    console.log("Élément:", element);
    console.log("firstChild:", element.firstChild);
    console.log("lastChild:", element.lastChild);
    console.log("childNodes:", element.childNodes);
    console.log("nextSibling:", element.nextSibling);
    console.log("previousSibling:", element.previousSibling);
    
    // Question 13: hasChildNodes() vs childNodes.length
    console.log("hasChildNodes():", element.hasChildNodes());
    console.log("childNodes.length:", element.childNodes.length);
    console.log("Différence: hasChildNodes() retourne un booléen, childNodes.length retourne un nombre");
}

if (btnAnalyser) {
    btnAnalyser.addEventListener('click', () => {
        // Sélectionner un élément pour analyse (par exemple le premier li)
        elementSelectionne = document.querySelector('li');
        analyserElement(elementSelectionne);
        
        // Question 14: Mise en évidence visuelle
        mettreEnEvidenceElements(elementSelectionne);
    });
}

// Question 14: Mettre en évidence visuellement les éléments
function mettreEnEvidenceElements(element) {
    if (!element) return;
    
    // Nettoyer les anciennes classes
    document.querySelectorAll('.highlight-first, .highlight-last, .highlight-next, .highlight-prev')
        .forEach(el => {
            el.classList.remove('highlight-first', 'highlight-last', 'highlight-next', 'highlight-prev');
        });
    
    // Mettre en évidence les différents éléments
    if (element.firstElementChild) {
        element.firstElementChild.classList.add('highlight-first');
    }
    if (element.lastElementChild) {
        element.lastElementChild.classList.add('highlight-last');
    }
    if (element.nextElementSibling) {
        element.nextElementSibling.classList.add('highlight-next');
    }
    if (element.previousElementSibling) {
        element.previousElementSibling.classList.add('highlight-prev');
    }
}

// =============================================================================
// PARTIE 3 – Gestion des classes CSS
// =============================================================================

console.log("=== PARTIE 3 - Gestion des classes CSS ===");

// Question 15 & 16: Gestion des classes avec classList
const btnToggleClasse = document.querySelector('.toggle-classe');
const elementTestClasse = document.querySelector('.element-test');

if (btnToggleClasse && elementTestClasse) {
    btnToggleClasse.addEventListener('click', () => {
        // Question 16: Utilisation de classList
        console.log("Q16: Manipulation de classList");
        
        // Ajouter une classe
        elementTestClasse.classList.add('fond-jaune');
        console.log("Classe ajoutée: fond-jaune");
        
        // Toggle une classe (très utile pour les interactions)
        elementTestClasse.classList.toggle('texte-gras');
        console.log("Toggle texte-gras, classes actuelles:", elementTestClasse.classList.toString());
        
        // Retirer une classe spécifique sans affecter les autres
        setTimeout(() => {
            elementTestClasse.classList.remove('fond-jaune');
            console.log("Classe retirée: fond-jaune");
        }, 2000);
    });
}

// =============================================================================
// PARTIE 5 – Gestion des événements
// =============================================================================

console.log("=== PARTIE 5 - Gestion des événements ===");

// Question 17 & 18: Gestionnaires d'événements et propriétés de l'objet event
function afficherProprietesEvent(event) {
    console.log("=== Propriétés de l'événement ===");
    console.log("event.type:", event.type);
    console.log("event.target:", event.target);
    console.log("event.currentTarget:", event.currentTarget);
    console.log("event.target.nodeName:", event.target.nodeName);
}

// Question 19: Différentes interactions

// 1. Clic sur bouton modifie un élément
const btnModifier = document.querySelector('.btn-modifier');
const texteModifiable = document.querySelector('.texte-modifiable');

if (btnModifier && texteModifiable) {
    // Méthode addEventListener
    btnModifier.addEventListener('click', (event) => {
        afficherProprietesEvent(event);
        texteModifiable.textContent = "Texte modifié par clic !";
    });
    
    // Méthode onclick (alternative)
    // btnModifier.onclick = (event) => { ... };
}

// 2. Survol change couleur de fond
const elementSurvol = document.querySelector('.survol');
if (elementSurvol) {
    elementSurvol.addEventListener('mouseover', (event) => {
        afficherProprietesEvent(event);
        event.target.style.backgroundColor = '#ffeb3b';
    });
    
    elementSurvol.addEventListener('mouseout', (event) => {
        afficherProprietesEvent(event);
        event.target.style.backgroundColor = '#f0f0f0';
    });
}

// 3. Touche pressée affiche caractère
const champClavier = document.querySelector('.clavier');
const affichageClavier = document.querySelector('.affichage-clavier');

if (champClavier && affichageClavier) {
    champClavier.addEventListener('keypress', (event) => {
        afficherProprietesEvent(event);
        affichageClavier.textContent = `Caractère tapé: ${event.key}`;
    });
    
    champClavier.addEventListener('keydown', (event) => {
        console.log(`Touche pressée: ${event.key} (code: ${event.keyCode})`);
    });
}

// 4. Focus colore le champ
const champFocus = document.querySelector('.focus-test');
if (champFocus) {
    champFocus.addEventListener('focus', (event) => {
        afficherProprietesEvent(event);
        console.log("Champ en focus");
    });
    
    champFocus.addEventListener('blur', (event) => {
        afficherProprietesEvent(event);
        console.log("Champ a perdu le focus");
    });
}

// 5. Scroll déclenche message
window.addEventListener('scroll', (event) => {
    console.log(`Scroll détecté - Position Y: ${window.scrollY}`);
});

// 6. Chargement page affiche bannière
window.addEventListener('load', (event) => {
    afficherProprietesEvent(event);
    const banniere = document.querySelector('.banniere');
    if (banniere) {
        banniere.classList.add('show');
        banniere.textContent = "Bienvenue ! Page chargée avec succès.";
    }
});

// =============================================================================
// PARTIE 6 – Timers
// =============================================================================

console.log("=== PARTIE 6 - Timers ===");

// Question 20: Message après 3 secondes avec setTimeout
const btnTimeout = document.querySelector('.btn-timeout');
const messageTimeout = document.querySelector('.message-timeout');

if (btnTimeout && messageTimeout) {
    btnTimeout.addEventListener('click', () => {
        messageTimeout.textContent = "Message en attente...";
        btnTimeout.disabled = true;
        
        setTimeout(() => {
            messageTimeout.textContent = "Message affiché après 3 secondes !";
            messageTimeout.style.backgroundColor = '#d4edda';
            messageTimeout.style.border = '1px solid #c3e6cb';
            btnTimeout.disabled = false;
        }, 3000);
    });
}

// Question 21 & 22: Compteur avec setInterval et bouton Stop
let compteur = 0;
let intervalId = null;
const valeurCompteur = document.querySelector('.valeur-compteur');
const btnStart = document.querySelector('.btn-start');
const btnStop = document.querySelector('.btn-stop');

function incrementerCompteur() {
    compteur++;
    if (valeurCompteur) {
        valeurCompteur.textContent = compteur;
    }
    console.log(`Compteur: ${compteur}`);
}

if (btnStart) {
    btnStart.addEventListener('click', () => {
        if (!intervalId) {
            intervalId = setInterval(incrementerCompteur, 1000);
            btnStart.disabled = true;
            btnStop.disabled = false;
            console.log("Compteur démarré");
        }
    });
}

if (btnStop) {
    btnStop.addEventListener('click', () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            btnStart.disabled = false;
            btnStop.disabled = true;
            console.log("Compteur arrêté");
        }
    });
}

// =============================================================================
// INITIALISATION
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM entièrement chargé et analysé");
    
    // Initialiser l'état des boutons
    if (btnStop) btnStop.disabled = true;
    
    console.log("=== TD3 JavaScript - Prêt à tester ! ===");
    console.log("Ouvrez la console pour voir les logs des interactions");
});