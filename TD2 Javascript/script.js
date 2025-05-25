// ===== I. Fichier HTML de base =====

// Q1 & Q2 : Aucune action nécessaire ici — fichier HTML fourni

// Q3 : Ajout dynamique de styles CSS
const style = document.createElement("style");
style.textContent = `
    .erreur { border: 2px solid red; background-color: #ffe6e6; }
    .clignotant { animation: clignote 1s infinite; }
    @keyframes clignotant {
        0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; }
    }
`;
document.head.appendChild(style);

// ===== II. JavaScript =====

// Q4 & Q5 : Modifier le lien Wikipedia vers la version française
const lienWiki = document.querySelector("a");
if (lienWiki) {
  lienWiki.href = "https://fr.wikipedia.org ";
}

// Q6 & Q36 & Q41 : Vérifie si le champ texte contient "Oui" ou "Non"
const btnOk = document.getElementById("bp");
if (btnOk) {
  btnOk.addEventListener("click", function (e) {
    e.preventDefault();

    const input = document.getElementById("label");
    if (!input) return;

    const valeur = input.value.trim();

    // Gestion de l'erreur visuelle
    if (valeur === "") {
      input.classList.add("erreur");
    } else {
      input.classList.remove("erreur");
    }

    // Validation du contenu
    if (valeur !== "Oui" && valeur !== "Non") {
      alert("Erreur : veuillez entrer 'Oui' ou 'Non'");
      return;
    }

    alert("Formulaire envoyé avec succès !");
  });
}

// Q7 : getElementsByName vs getElementsByTagName
const radios = document.getElementsByName("choix"); // Par attribut name
const paragraphes = document.getElementsByTagName("p"); // Par balise HTML

// Q8 : Modifier les labels des boutons radio
for (let i = 0; i < radios.length; i++) {
  let labelNode = radios[i].nextSibling;
  while (labelNode && labelNode.nodeType !== Node.ELEMENT_NODE) {
    labelNode = labelNode.nextSibling;
  }
  if (labelNode) {
    switch (i) {
      case 0:
        labelNode.textContent = " HP";
        break;
      case 1:
        labelNode.textContent = " Casque";
        break;
      case 2:
        labelNode.textContent = " Bluetooth";
        break;
    }
  }
}

// Q9 & Q10 : Mettre à jour le label Volume selon le choix
radios.forEach(radio => {
  radio.addEventListener("change", () => {
    const volumeLabel = document.querySelector("label[for='volume']");
    if (radio.nextSibling && volumeLabel) {
      const choice = radio.nextSibling.textContent.trim();
      volumeLabel.textContent = `Volume ${choice}`;
    }
  });
});

// Q11 & Q12 : Changer la valeur max du volume
const volumeSlider = document.getElementById("volume");
if (volumeSlider) {
  volumeSlider.max = 100;
  console.log("Valeur max du volume :", volumeSlider.max);
}

// Q13 : Afficher la valeur actuelle du volume
const affichage = document.getElementById("affichage");
if (volumeSlider && affichage) {
  volumeSlider.addEventListener("input", () => {
    affichage.textContent = volumeSlider.value;
    console.log("Valeur actuelle du volume :", volumeSlider.value); 
  });
}

// Q15 : Modifier le label "Une case à cocher" en "Mute"
const muteLabel = document.querySelector("label[for='ouinon']");
if (muteLabel) {
  muteLabel.textContent = "Mute";
}

// Q16 & Q17 : Désactiver le volume si Mute est cochée
const muteCheckbox = document.getElementById("ouinon");
if (muteCheckbox && volumeSlider) {
  muteCheckbox.addEventListener("change", () => {
    volumeSlider.disabled = muteCheckbox.checked;
  });
}

// Q18 & Q19 : Ajouter une image à la section "Lien et images"
const lienEtImagesSection = document.getElementById("lienEtImages");
if (lienEtImagesSection) {
  const img = document.createElement("img");
  img.src = "image.jpg"; // Remplacez par votre URL
  img.alt = "Image ajoutée dynamiquement";
  lienEtImagesSection.appendChild(img);
}

// Q20 : Ajouter un paragraphe à la fin du document
const pFin = document.createElement("p");
pFin.textContent = "Ceci est le dernier paragraphe";
document.body.appendChild(pFin);

// Q21 : Événement déclenché quand la page est chargée
window.addEventListener("load", () => {
  console.log("Page complètement chargée");
});

// Q22 & Q23 : Cacher tous les éléments sauf le menu + affichage conditionnel
const sections = document.querySelectorAll("section");

// Masquer toutes les sections au démarrage
sections.forEach(section => {
  section.style.display = "none";
});

// Créer des checkboxes pour afficher les sections
sections.forEach((section, index) => {
  section.style.display = ""; // Réinitialiser

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `toggle-section-${index}`;
  checkbox.checked = true;

  const label = document.createElement("label");
  label.setAttribute("for", checkbox.id);
  label.textContent = `Afficher Section ${index + 1}`;

  section.parentNode.insertBefore(label, section);
  section.parentNode.insertBefore(checkbox, section);

  checkbox.addEventListener("change", () => {
    section.style.display = checkbox.checked ? "block" : "none";
  });
});

// Q24 : Persistance des choix après rechargement (localStorage)
document.querySelectorAll("input[type='checkbox']").forEach((cb, idx) => {
  const key = `checkbox_${idx}`;
  if (localStorage.getItem(key)) {
    cb.checked = JSON.parse(localStorage.getItem(key));
    const target = document.getElementById(cb.dataset.target);
    if (target) target.style.display = cb.checked ? "block" : "none";
  }

  cb.addEventListener("change", () => {
    localStorage.setItem(key, JSON.stringify(cb.checked));
  });
});

// Q25 & Q26 : Premier et dernier enfant du DOM
const elementsSection = document.getElementById("elements");
if (elementsSection && elementsSection.firstElementChild) {
  console.log("Premier enfant de #elements :", elementsSection.firstElementChild);
} else {
  console.log("Section #elements ou son premier enfant est introuvable.");
}

const mainSection = document.querySelector("main");
if (mainSection && mainSection.lastElementChild) {
  console.log("Dernier enfant de <main> :", mainSection.lastElementChild);
} else {
  console.log("<main> ou son dernier enfant est introuvable.");
}
// Q27 : Ajouter un champ texte supplémentaire
const nouveauChamp = document.createElement("input");
nouveauChamp.type = "text";
nouveauChamp.placeholder = "Nouveau champ texte";
document.getElementById("elements").appendChild(nouveauChamp);

// Q28 : Bouton Réinitialiser
const btnReset = document.createElement("button");
btnReset.textContent = "Réinitialiser";
btnReset.addEventListener("click", () => {
  document.querySelectorAll("input[type='text'], input[type='date']").forEach(input => input.value = "");
  document.querySelectorAll("input[type='radio'], input[type='checkbox']").forEach(cb => cb.checked = false);
  document.getElementById("volume").value = 50;
});
document.getElementById("elements").appendChild(btnReset);

// Q29 : Message "Merci d'avoir rempli ce formulaire !"
const merciMsg = document.createElement("p");
merciMsg.textContent = "Merci d'avoir rempli ce formulaire !";
merciMsg.id = "merciMessage";
merciMsg.style.color = "green";

btnOk.addEventListener("click", () => {
  if (!document.getElementById("merciMessage")) {
    document.body.appendChild(merciMsg);
  }
});

// Q30 : Remplacer un champ texte par une liste déroulante
const labelInput = document.getElementById("label");
if (labelInput) {
  const select = document.createElement("select");
  ["Débutant", "Intermédiaire", "Expert"].forEach(val => {
    const option = document.createElement("option");
    option.value = val.toLowerCase();
    option.textContent = val;
    select.appendChild(option);
  });
  labelInput.parentNode.replaceChild(select, labelInput);
}

// Q31 : Supprimer Choix N°3
const c3 = document.getElementById("c3");
if (c3) {
  const parent = c3.parentNode;
  parent.removeChild(c3);
  if (c3.nextSibling) parent.removeChild(c3.nextSibling);
}

// Q32 : Supprimer tous les champs du formulaire (sans modifier le HTML)
const btnSupprimer = document.createElement("button");
btnSupprimer.textContent = "Supprimer tout le formulaire";
btnSupprimer.style.display = "block";
btnSupprimer.style.marginTop = "20px";
btnSupprimer.addEventListener("click", () => {
  // On garde le message du haut (id="message"), on supprime le reste
  document.body.querySelectorAll("label, input, button:not([id='supprimerTout']), br").forEach(el => {
    if (el !== btnSupprimer) el.remove();
  });
  // Optionnel : afficher un message
  const msg = document.createElement("h2");
  msg.textContent = "Formulaire vidé";
  document.body.appendChild(msg);
});
// Ajoute le bouton à la fin du body
btnSupprimer.id = "supprimerTout";
document.body.appendChild(btnSupprimer);

// Q33 : Cloner un champ texte et l'ajouter après
const inputClone = document.querySelector("input[type='text']");
if (inputClone) {
  const clonedInput = inputClone.cloneNode(true);
  inputClone.parentNode.insertBefore(clonedInput, inputClone.nextSibling);
}

// Q34 : Ajouter un bouton radio dynamiquement
const btnAjouter = document.createElement("button");
btnAjouter.textContent = "Ajouter un choix";
btnAjouter.addEventListener("click", () => {
  const id = `choix${document.querySelectorAll("input[name='choix']").length + 1}`;
  const newRadio = document.createElement("input");
  newRadio.type = "radio";
  newRadio.name = "choix";
  newRadio.id = id;

  const newLabel = document.createElement("label");
  newLabel.setAttribute("for", id);
  newLabel.textContent = ` Nouveau choix`;

  const container = document.querySelector(".radio-group");
  container.appendChild(newRadio);
  container.appendChild(newLabel);
});
document.querySelector(".radio-group").appendChild(btnAjouter);

// Q35 : Insérer texte avant les radios
const introText = document.createElement("p");
introText.textContent = "Sélectionnez votre option :";
introText.style.fontWeight = "bold";
const group = document.querySelector(".radio-group");
group.parentNode.insertBefore(introText, group);


// Q37 : Animation clignotante sur Mute
if (muteLabel) {
  muteCheckbox.addEventListener("change", () => {
    muteLabel.classList.toggle("clignotant");
  });
}

// Q38 : Message console sur clic formulaire
document.querySelector("form").addEventListener("click", () => {
  console.log("Vous avez cliqué sur le formulaire !");
});

// Q39 : Bloquer la saisie de chiffres dans un champ texte
document.getElementById("textInput")?.addEventListener("keydown", function (e) {
  if (!isNaN(e.key)) e.preventDefault();
});

// Q40 : Compteur de caractères
const textField = document.getElementById("textInput");
if (textField) {
  const counter = document.createElement("p");
  counter.id = "counter";
  textField.parentNode.appendChild(counter);

  textField.addEventListener("input", function () {
    counter.textContent = `Nombre de caractères : ${this.value.length}`;
  });
}

// Q42 : Changement de couleur au focus
document.querySelectorAll("input[type='text'], input[type='date'], input[type='range']").forEach(input => {
  input.addEventListener("focus", () => input.style.backgroundColor = "#ffffcc");
  input.addEventListener("blur", () => input.style.backgroundColor = "");
});

// Q43 : Message sous Volume selon état de Mute
if (muteCheckbox && volumeSlider) {
  muteCheckbox.addEventListener("change", () => {
    const msg = document.createElement("p");
    msg.id = "muteStatus";
    msg.textContent = muteCheckbox.checked ? "Le son est désactivé" : "Le son est activé";

    const parent = volumeSlider.parentNode;
    const existing = parent.querySelector("#muteStatus");
    if (existing) parent.replaceChild(msg, existing);
    else parent.appendChild(msg);
  });
}

// Q44 : Afficher l’année choisie dans la console
document.querySelector("input[type='date']")?.addEventListener("change", function () {
  const year = this.value.split("-")[0];
  console.log("Année sélectionnée :", year);
});