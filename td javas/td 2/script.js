// ===== PARTIE II - QUESTIONS DE 4 À 17 =====

// Question 4 & 5 : Modifier le lien Wikipedia vers la version française
document.querySelector("a").setAttribute("href", "https://fr.wikipedia.org ");

// Question 6 : Vérifier si le champ texte contient "Oui" ou "Non"
document.getElementById("bp").addEventListener("click", function () {
    const input = document.getElementById("label");
    const valeur = input.value.trim().toLowerCase();

    if (valeur !== "oui" && valeur !== "non") {
        alert("Erreur : Veuillez entrer 'Oui' ou 'Non'");
    }
});

// Question 7 : getElementsByName vs getElementsByTagName
const radios = document.getElementsByName("choix");
const paragraphes = document.getElementsByTagName("p");

// Question 8 : Modifier les labels des radio buttons
if (radios.length >= 3) {
    radios[0].nextElementSibling.textContent = " HP";
    radios[1].nextElementSibling.textContent = " Casque";
    radios[2].nextElementSibling.textContent = " Bluetooth";
}

// Questions 9 & 10 : Modifier label "Volume" selon choix radio
for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function () {
        const volumeLabel = document.querySelector("label[for='volume']");
        if (radios[0].checked) volumeLabel.textContent = "Volume HP";
        else if (radios[1].checked) volumeLabel.textContent = "Volume Casque";
        else if (radios[2].checked) volumeLabel.textContent = "Volume Bluetooth";
    });
}

// Question 11 : Changer max du volume
document.getElementById("volume").setAttribute("max", "100");

// Question 12 : Afficher la nouvelle valeur max dans la console
console.log("Valeur max du volume :", document.getElementById("volume").getAttribute("max"));

// Question 13 : Afficher la valeur actuelle du volume
const volumeSlider = document.getElementById("volume");
const affichage = document.getElementById("affichage");

volumeSlider.addEventListener("input", function () {
    affichage.textContent = volumeSlider.value;
});

// Question 15 : Changer le label "Mute"
document.querySelector("label[for='ouinon']").textContent = "Mute";

// Question 16 & 17 : Désactiver la barre de volume si Mute cochée
const muteCheckbox = document.getElementById("ouinon");
const volumeControl = document.getElementById("volume");

muteCheckbox.addEventListener("change", function () {
    volumeControl.disabled = muteCheckbox.checked;
});


// ===== PARTIE III - QUESTIONS 25 À 44 =====

// Question 25 : Premier élément enfant de #elements
console.log(document.getElementById("elements").firstElementChild);

// Question 26 : Dernier élément enfant du formulaire
console.log(document.querySelector("main").lastElementChild);

// Question 27 : Ajouter un nouveau champ texte
const nouveauChamp = document.createElement("input");
nouveauChamp.setAttribute("type", "text");
nouveauChamp.setAttribute("placeholder", "Nouveau champ texte");
document.getElementById("elements").insertBefore(nouveauChamp, document.getElementById("label").nextElementSibling);

// Question 28 : Bouton Réinitialiser
const btnReset = document.createElement("button");
btnReset.textContent = "Réinitialiser";
btnReset.addEventListener("click", function () {
    document.getElementById("label").value = "Premiers pas avec JavaScript";
    document.getElementById("pwd").value = "password";
    document.getElementById("volume").value = 0;
    document.getElementById("ouinon").checked = false;
    document.getElementById("maDate").value = "";
    document.getElementById("file").value = 50;
    document.getElementById("espace_dispo").value = 0.5;

    const radios = document.getElementsByName("choix");
    for (let i = 0; i < radios.length; i++) {
        radios[i].checked = radios[i].id === "c2";
    }

    document.getElementById("affichage").textContent = 0;
});
document.getElementById("elements").appendChild(btnReset);

// Question 29 : Message après clic sur Ok
document.getElementById("bp").addEventListener("click", function () {
    const message = document.createElement("p");
    message.textContent = "Merci d'avoir rempli ce formulaire !";
    message.style.color = "green";
    message.id = "merciMessage";

    if (!document.getElementById("merciMessage")) {
        document.body.appendChild(message);
    }
});

// Question 30 : Remplacer champ texte par select
const select = document.createElement("select");
["Débutant", "Intermédiaire", "Expert"].forEach(function (optionText) {
    const option = document.createElement("option");
    option.value = optionText.toLowerCase();
    option.textContent = optionText;
    select.appendChild(option);
});

const labelInput = document.getElementById("label");
labelInput.parentNode.replaceChild(select, labelInput);

// Question 31 : Supprimer Choix N°3
const c3 = document.getElementById("c3");
if (c3 && c3.nextElementSibling) {
    c3.parentNode.removeChild(c3.nextElementSibling);
    c3.parentNode.removeChild(c3);
}

// Question 32 : Bouton Supprimer tout le formulaire
const btnSupprimer = document.createElement("button");
btnSupprimer.textContent = "Supprimer tout le formulaire";
btnSupprimer.addEventListener("click", function () {
    const elements = document.getElementById("elements");
    while (elements.children.length > 1) {
        elements.removeChild(elements.lastElementChild);
    }
});
document.getElementById("elements").appendChild(btnSupprimer);

// Question 33 : Cloner le champ texte
const original = document.querySelector("#label");
const clone = original.cloneNode(true);
original.parentNode.insertBefore(clone, original.nextSibling);

// Question 34 : Ajouter un bouton radio "Choix N°4"
const btnAjouter = document.createElement("button");
btnAjouter.textContent = "Ajouter un choix";
btnAjouter.addEventListener("click", function () {
    const nouveauRadio = document.createElement("input");
    nouveauRadio.type = "radio";
    nouveauRadio.name = "choix";
    nouveauRadio.value = "4";
    nouveauRadio.id = "c4";

    const nouveauLabel = document.createElement("label");
    nouveauLabel.setAttribute("for", "c4");
    nouveauLabel.textContent = " Choix N°4";

    const container = document.querySelector(".radio-group");
    container.appendChild(nouveauRadio);
    container.appendChild(nouveauLabel);
});
document.querySelector(".radio-group").appendChild(btnAjouter);

// Question 35 : Insérer un texte avant les radios
const texte = document.createElement("p");
texte.textContent = "Sélectionnez votre option :";
texte.style.fontWeight = "bold";
const container = document.querySelector(".radio-group");
container.parentNode.insertBefore(texte, container);

// Question 36 : Ajouter une classe erreur
document.getElementById("bp").addEventListener("click", function () {
    const input = document.getElementById("label");
    if (input.value.trim() === "") {
        input.classList.add("erreur");
    } else {
        input.classList.remove("erreur");
    }
});

// Question 37 : Animation clignotante pour Mute
document.getElementById("ouinon").addEventListener("change", function () {
    const checkboxLabel = document.querySelector("label[for='ouinon']");
    checkboxLabel.classList.toggle("clignotant");
});

// Question 38 : Clic sur le formulaire → message console
document.querySelector("main").addEventListener("click", function () {
    console.log("Vous avez cliqué sur le formulaire !");
});

// Question 39 : Bloquer les chiffres dans le champ texte
document.addEventListener("keydown", function (event) {
    if (event.target.id === "label" && /\d/.test(event.key)) {
        event.preventDefault();
    }
});

// Question 40 : Compteur de caractères
const compteur = document.createElement("p");
compteur.id = "compteur";
document.getElementById("label").parentNode.appendChild(compteur);

document.getElementById("label").addEventListener("input", function () {
    compteur.textContent = `Nombre de caractères : ${this.value.length}`;
});

// Question 41 : Empêcher soumission réelle + alerte
document.getElementById("bp").addEventListener("click", function (event) {
    event.preventDefault();
    alert("Formulaire envoyé avec succès !");
});

// Question 42 : Effet visuel focus sur champs
document.querySelectorAll("input[type='text'], input[type='password'], input[type='date']")
    .forEach(input => {
        input.addEventListener("focus", function () {
            this.style.backgroundColor = "#ffffcc";
        });
        input.addEventListener("blur", function () {
            this.style.backgroundColor = "";
        });
    });

// Question 43 : Message "Son activé/désactivé"
document.getElementById("ouinon").addEventListener("change", function () {
    const message = document.createElement("p");
    message.id = "message-mute";

    if (this.checked) {
        message.textContent = "Le son est désactivé";
    } else {
        message.textContent = "Le son est activé";
    }

    const parent = document.querySelector(".volume-slider");
    if (document.getElementById("message-mute")) {
        document.getElementById("message-mute").textContent = message.textContent;
    } else {
        parent.appendChild(message);
    }
});

// Question 44 : Afficher l’année choisie
document.querySelector("input[type='date']").addEventListener("change", function () {
    const date = new Date(this.value);
    console.log("Année sélectionnée :", date.getFullYear());
});