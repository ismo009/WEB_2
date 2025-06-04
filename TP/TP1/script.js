// Variables globales
let TableauTaches = [];
let TableauTermine = [];
let compteurTaches = 0;

// Fonction pour ajouter une tâche
function AjouterTache() {
    const champTexte = document.getElementById('champTexte');
    const texteInput = champTexte.value.trim();
    
    // Vérifier que le champ n'est pas vide
    if (texteInput === '') {
        alert('Veuillez entrer une tâche valide !');
        return;
    }
    
    // Ajouter la tâche au tableau
    TableauTaches.push(texteInput);
    TableauTermine.push(false);
    compteurTaches++;
    
    // Afficher dans la console pour vérification
    console.log('Tableau des tâches:', TableauTaches);
    console.log('Tableau terminé:', TableauTermine);
    
    // Mettre à jour l'affichage HTML
    AjouterTacheHTML(texteInput, compteurTaches - 1);
    
    // Réinitialiser le champ texte
    champTexte.value = '';
    champTexte.focus();
}

// Fonction pour créer/mettre à jour l'affichage HTML
function AjouterTacheHTML(item, index) {
    let tableau = document.getElementById('tableauTaches');
    
    // Créer le tableau s'il n'existe pas
    if (!tableau) {
        const conteneur = document.getElementById('conteneurTableau');
        tableau = document.createElement('table');
        tableau.id = 'tableauTaches';
        
        // Créer le caption
        const caption = document.createElement('caption');
        caption.textContent = 'Liste des Tâches de Projet';
        tableau.appendChild(caption);
        
        // Créer l'en-tête
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const headers = ['N°', 'Tâche', 'Terminé', 'Actions'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        tableau.appendChild(thead);
        
        // Créer le tbody
        const tbody = document.createElement('tbody');
        tbody.id = 'corpsTaches';
        tableau.appendChild(tbody);
        
        conteneur.appendChild(tableau);
    }
    
    // Ajouter la nouvelle ligne
    const tbody = document.getElementById('corpsTaches');
    const row = document.createElement('tr');
    row.dataset.index = index;
    
    // Colonne numéro
    const cellNumero = document.createElement('td');
    cellNumero.textContent = index + 1;
    row.appendChild(cellNumero);
    
    // Colonne tâche
    const cellTache = document.createElement('td');
    cellTache.textContent = item;
    cellTache.className = 'tache-texte';
    row.appendChild(cellTache);
    
    // Colonne checkbox
    const cellCheckbox = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', Cocher);
    checkbox.dataset.index = index;
    cellCheckbox.appendChild(checkbox);
    row.appendChild(cellCheckbox);
    
    // Colonne bouton supprimer
    const cellSupprimer = document.createElement('td');
    const boutonSupprimer = document.createElement('button');
    boutonSupprimer.textContent = 'Supprimer';
    boutonSupprimer.className = 'btn-supprimer';
    boutonSupprimer.addEventListener('click', supprimerTache);
    boutonSupprimer.dataset.index = index;
    cellSupprimer.appendChild(boutonSupprimer);
    row.appendChild(cellSupprimer);
    
    tbody.appendChild(row);
}

// Fonction pour gérer le cochage/décochage des tâches
function Cocher(event) {
    const checkbox = event.target;
    const index = parseInt(checkbox.dataset.index);
    const row = checkbox.closest('tr');
    const texteCell = row.querySelector('.tache-texte');
    
    // Mettre à jour le tableau des états
    TableauTermine[index] = checkbox.checked;
    
    // Appliquer/retirer le style barré
    if (checkbox.checked) {
        texteCell.innerHTML = `<s>${texteCell.textContent}</s>`;
        row.classList.add('tache-terminee');
    } else {
        texteCell.innerHTML = texteCell.textContent.replace(/<\/?s>/g, '');
        row.classList.remove('tache-terminee');
    }
    
    console.log('État des tâches terminées:', TableauTermine);
}

// Fonction pour filtrer les tâches
function filterTasks(type) {
    const rows = document.querySelectorAll('#corpsTaches tr');
    
    rows.forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        const isChecked = checkbox.checked;
        
        switch(type) {
            case 'toutes':
                row.style.display = '';
                break;
            case 'terminees':
                row.style.display = isChecked ? '' : 'none';
                break;
            case 'non-terminees':
                row.style.display = !isChecked ? '' : 'none';
                break;
        }
    });
}

// Fonction pour supprimer une tâche
function supprimerTache(event) {
    const bouton = event.target;
    const index = parseInt(bouton.dataset.index);
    const row = bouton.closest('tr');
    
    // Confirmer la suppression
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
        // Supprimer la ligne du DOM
        row.remove();
        
        // Optionnel : mettre à jour les tableaux JavaScript
        TableauTaches.splice(index, 1);
        TableauTermine.splice(index, 1);
        
        // Renuméroter les lignes restantes
        renumeroterTaches();
        
        console.log('Tâche supprimée. Tableaux mis à jour:', {
            taches: TableauTaches,
            termine: TableauTermine
        });
    }
}

// Fonction pour renuméroter les tâches après suppression
function renumeroterTaches() {
    const rows = document.querySelectorAll('#corpsTaches tr');
    rows.forEach((row, index) => {
        // Mettre à jour le numéro affiché
        const cellNumero = row.querySelector('td:first-child');
        cellNumero.textContent = index + 1;
        
        // Mettre à jour les indices des éléments
        row.dataset.index = index;
        const checkbox = row.querySelector('input[type="checkbox"]');
        const boutonSupprimer = row.querySelector('.btn-supprimer');
        
        if (checkbox) checkbox.dataset.index = index;
        if (boutonSupprimer) boutonSupprimer.dataset.index = index;
    });
}

// Gestionnaires d'événements
document.addEventListener('DOMContentLoaded', function() {
    // Bouton ajouter
    const boutonAjouter = document.getElementById('boutonAjouter');
    boutonAjouter.addEventListener('click', AjouterTache);
    
    // Entrée dans le champ texte
    const champTexte = document.getElementById('champTexte');
    champTexte.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            AjouterTache();
        }
    });
    
    // Filtre des tâches
    const filtreTaches = document.getElementById('filtreTaches');
    filtreTaches.addEventListener('change', function(event) {
        filterTasks(event.target.value);
    });
});