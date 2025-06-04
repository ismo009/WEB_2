let analyseMode = false;
const analyseBtn = document.getElementById('analyseBtn');

// Variables pour le mode style
let styleMode = false;
let currentStyleType = null;

// Boutons de style
const toggleStyleBtn = document.getElementById('toggleStyleBtn');
const yellowBgBtn = document.getElementById('yellowBgBtn');
const boldTextBtn = document.getElementById('boldTextBtn');
const clearStyleBtn = document.getElementById('clearStyleBtn');

// Fonction pour analyser un élément
function analyserElement(element) {
  // Effacer les mises en évidence précédentes
  clearHighlights();

  console.clear();
  console.log('=== ANALYSE DE L\'ÉLÉMENT ===');
  console.log('Élément sélectionné:', element);
  console.log('Nom de la balise:', element.tagName);
  console.log('Classes:', element.className);

  // Mettre en évidence l'élément principal
  highlightElement(element, 'selected', '🎯 Élément sélectionné');

  console.log('\n--- PROPRIÉTÉS DOM ---');

  // firstChild
  console.log('firstChild:', element.firstChild);
  if (element.firstChild && element.firstChild.nodeType === 1) {
    console.log('  Type:', element.firstChild.nodeType === 3 ? 'Nœud texte' : 'Élément');
    console.log('  Contenu:', element.firstChild.nodeType === 3 ?
      `"${element.firstChild.textContent.trim()}"` : element.firstChild.tagName);
    highlightElement(element.firstChild, 'firstChild', '👶 Premier enfant');
  }

  // lastChild
  console.log('lastChild:', element.lastChild);
  if (element.lastChild && element.lastChild.nodeType === 1 && element.lastChild !== element.firstChild) {
    console.log('  Type:', element.lastChild.nodeType === 3 ? 'Nœud texte' : 'Élément');
    console.log('  Contenu:', element.lastChild.nodeType === 3 ?
      `"${element.lastChild.textContent.trim()}"` : element.lastChild.tagName);
    highlightElement(element.lastChild, 'lastChild', '👵 Dernier enfant');
  }

  // childNodes - mettre en évidence tous les enfants éléments
  console.log('childNodes:', element.childNodes);
  console.log('Nombre de nœuds enfants:', element.childNodes.length);
  let childIndex = 0;
  element.childNodes.forEach((node, index) => {
    console.log(`  [${index}]`, node.nodeType === 3 ?
      `Texte: "${node.textContent.trim()}"` :
      `Élément: ${node.tagName} (${node.className || 'sans classe'})`);

    if (node.nodeType === 1 && node !== element.firstChild && node !== element.lastChild) {
      highlightElement(node, 'child', `👶 Enfant ${++childIndex}`);
    }
  });

  // hasChildNodes() - Question 13
  console.log('\n--- ANALYSE DES ENFANTS ---');
  console.log('hasChildNodes():', element.hasChildNodes());
  console.log('childNodes.length:', element.childNodes.length);

  if (element.hasChildNodes()) {
    console.log('✅ L\'élément A des enfants');
    console.log(`📊 Nombre exact d'enfants: ${element.childNodes.length}`);

    let textNodes = 0;
    let elementNodes = 0;
    element.childNodes.forEach(node => {
      if (node.nodeType === 3) textNodes++;
      else if (node.nodeType === 1) elementNodes++;
    });

    console.log(`   - Nœuds texte: ${textNodes}`);
    console.log(`   - Éléments: ${elementNodes}`);
  } else {
    console.log('❌ L\'élément N\'A PAS d\'enfants');
    console.log('📊 childNodes.length confirme:', element.childNodes.length);
  }

  console.log('\n💡 DIFFÉRENCE hasChildNodes() vs childNodes.length:');
  console.log('• hasChildNodes() → Retourne un BOOLÉEN (true/false)');
  console.log('• childNodes.length → Retourne un NOMBRE (0, 1, 2, ...)');
  console.log('• hasChildNodes() = (childNodes.length > 0)');

  // nextSibling
  console.log('\nnextSibling:', element.nextSibling);
  if (element.nextSibling && element.nextSibling.nodeType === 1) {
    console.log('  Type:', element.nextSibling.nodeType === 3 ? 'Nœud texte' : 'Élément');
    console.log('  Contenu:', element.nextSibling.nodeType === 3 ?
      `"${element.nextSibling.textContent.trim()}"` :
      `${element.nextSibling.tagName} (${element.nextSibling.className || 'sans classe'})`);
    highlightElement(element.nextSibling, 'nextSibling', '➡️ Frère suivant');
  }

  // previousSibling
  console.log('previousSibling:', element.previousSibling);
  if (element.previousSibling && element.previousSibling.nodeType === 1) {
    console.log('  Type:', element.previousSibling.nodeType === 3 ? 'Nœud texte' : 'Élément');
    console.log('  Contenu:', element.previousSibling.nodeType === 3 ?
      `"${element.previousSibling.textContent.trim()}"` :
      `${element.previousSibling.tagName} (${element.previousSibling.className || 'sans classe'})`);
    highlightElement(element.previousSibling, 'previousSibling', '⬅️ Frère précédent');
  }

  // parentNode
  if (element.parentNode && element.parentNode.nodeType === 1) {
    console.log('parentNode:', element.parentNode);
    highlightElement(element.parentNode, 'parent', '👨‍👩‍👧‍👦 Parent');
  }

  console.log('\n💡 LÉGENDE DES COULEURS:');
  console.log('🎯 Bleu = Élément sélectionné');
  console.log('👶 Vert = Premier enfant');
  console.log('👵 Orange = Dernier enfant');
  console.log('👶 Vert clair = Autres enfants');
  console.log('➡️ Violet = Frère suivant');
  console.log('⬅️ Rose = Frère précédent');
  console.log('👨‍👩‍👧‍👦 Jaune = Parent');

  console.log('\n=== FIN DE L\'ANALYSE ===');

  // Programmer l'effacement des surbrillances après 8 secondes
  setTimeout(() => {
    clearHighlights();
    console.log('🧹 Surbrillances effacées automatiquement');
  }, 8000);

  // Désactiver le mode analyse
  analyseMode = false;
  analyseBtn.textContent = 'Analyser un élément';
  analyseBtn.style.backgroundColor = '#3498db';
  document.body.style.cursor = 'default';
}

// Fonction pour mettre en évidence un élément
function highlightElement(element, type, label) {
  if (!element || element.nodeType !== 1) return;

  // Supprimer les classes de surbrillance existantes
  element.classList.remove('highlight-selected', 'highlight-firstChild', 'highlight-lastChild',
    'highlight-child', 'highlight-nextSibling', 'highlight-previousSibling', 'highlight-parent');

  // Ajouter la nouvelle classe
  element.classList.add(`highlight-${type}`);

  // Ajouter un badge avec le label
  const badge = document.createElement('div');
  badge.className = `highlight-badge badge-${type}`;
  badge.textContent = label;
  badge.style.cssText = `
        position: absolute;
        top: -25px;
        left: 0;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 2px 8px;
        font-size: 11px;
        border-radius: 3px;
        z-index: 10000;
        pointer-events: none;
        white-space: nowrap;
    `;

  element.style.position = 'relative';
  element.appendChild(badge);

  // Stocker la référence pour le nettoyage
  if (!window.highlightedElements) {
    window.highlightedElements = [];
  }
  window.highlightedElements.push({ element, badge });
}

// Fonction pour effacer toutes les surbrillances
function clearHighlights() {
  if (window.highlightedElements) {
    window.highlightedElements.forEach(({ element, badge }) => {
      element.classList.remove('highlight-selected', 'highlight-firstChild', 'highlight-lastChild',
        'highlight-child', 'highlight-nextSibling', 'highlight-previousSibling', 'highlight-parent');
      if (badge && badge.parentNode) {
        badge.parentNode.removeChild(badge);
      }
    });
    window.highlightedElements = [];
  }
}

// Gestionnaire pour le bouton d'analyse
analyseBtn.addEventListener('click', function () {
  analyseMode = !analyseMode;

  if (analyseMode) {
    this.textContent = 'Mode analyse activé - Cliquez sur un élément';
    this.style.backgroundColor = '#e74c3c';
    document.body.style.cursor = 'crosshair';
    console.log('Mode analyse activé. Cliquez sur un élément li, p ou div pour l\'analyser.');
  } else {
    this.textContent = 'Analyser un élément';
    this.style.backgroundColor = '#3498db';
    document.body.style.cursor = 'default';
    console.log('Mode analyse désactivé.');
  }
});

// Fonction pour basculer le mode style
function toggleStyleMode() {
  styleMode = !styleMode;

  if (styleMode) {
    toggleStyleBtn.textContent = 'Mode Style: ACTIF';
    toggleStyleBtn.style.backgroundColor = '#27ae60';
    document.body.style.cursor = 'pointer';
    console.log('🎨 Mode style activé. Choisissez un style puis cliquez sur des éléments.');

    // Désactiver le mode analyse si actif
    if (analyseMode) {
      analyseMode = false;
      analyseBtn.textContent = 'Analyser un élément';
      analyseBtn.style.backgroundColor = '#3498db';
    }
  } else {
    toggleStyleBtn.textContent = 'Mode Style: INACTIF';
    toggleStyleBtn.style.backgroundColor = '#95a5a6';
    document.body.style.cursor = 'default';
    currentStyleType = null;
    updateStyleButtons();
    console.log('🎨 Mode style désactivé.');
  }
}

// Fonction pour sélectionner le type de style
function selectStyleType(type) {
  if (!styleMode) {
    console.log('⚠️ Activez d\'abord le mode style !');
    return;
  }

  currentStyleType = type;
  updateStyleButtons();

  switch (type) {
    case 'yellow':
      console.log('🟡 Style sélectionné: Fond jaune');
      break;
    case 'bold':
      console.log('🔤 Style sélectionné: Texte gras');
      break;
    case 'clear':
      console.log('🧹 Mode effacement activé');
      break;
  }
}

// Fonction pour mettre à jour l'apparence des boutons de style
function updateStyleButtons() {
  // Réinitialiser tous les boutons
  [yellowBgBtn, boldTextBtn, clearStyleBtn].forEach(btn => {
    btn.style.backgroundColor = '#ecf0f1';
    btn.style.color = '#2c3e50';
  });

  // Mettre en évidence le bouton sélectionné
  switch (currentStyleType) {
    case 'yellow':
      yellowBgBtn.style.backgroundColor = '#f1c40f';
      yellowBgBtn.style.color = 'white';
      break;
    case 'bold':
      boldTextBtn.style.backgroundColor = '#34495e';
      boldTextBtn.style.color = 'white';
      break;
    case 'clear':
      clearStyleBtn.style.backgroundColor = '#e74c3c';
      clearStyleBtn.style.color = 'white';
      break;
  }
}

// Fonction pour appliquer/retirer les styles
function applyStyle(element) {
  if (!currentStyleType) {
    console.log('⚠️ Sélectionnez d\'abord un type de style !');
    return;
  }

  switch (currentStyleType) {
    case 'yellow':
      if (element.classList.contains('yellow-background')) {
        element.classList.remove('yellow-background');
        console.log('🟡 Fond jaune retiré de:', element.tagName, element.className);
      } else {
        element.classList.add('yellow-background');
        console.log('🟡 Fond jaune appliqué à:', element.tagName, element.className);
      }
      break;

    case 'bold':
      if (element.classList.contains('bold-text')) {
        element.classList.remove('bold-text');
        console.log('🔤 Texte gras retiré de:', element.tagName, element.className);
      } else {
        element.classList.add('bold-text');
        console.log('🔤 Texte gras appliqué à:', element.tagName, element.className);
      }
      break;

    case 'clear':
      const hadStyles = element.classList.contains('yellow-background') || element.classList.contains('bold-text');
      element.classList.remove('yellow-background', 'bold-text');
      if (hadStyles) {
        console.log('🧹 Tous les styles retirés de:', element.tagName, element.className);
      } else {
        console.log('ℹ️ Aucun style à retirer de:', element.tagName);
      }
      break;
  }
}

// Event Listeners pour les boutons de style
toggleStyleBtn.addEventListener('click', toggleStyleMode);
yellowBgBtn.addEventListener('click', () => selectStyleType('yellow'));
boldTextBtn.addEventListener('click', () => selectStyleType('bold'));
clearStyleBtn.addEventListener('click', () => selectStyleType('clear'));

// Modifier le gestionnaire de clic existant
document.addEventListener('click', function (event) {
  // Mode analyse
  if (analyseMode) {
    const element = event.target;
    const tagName = element.tagName.toLowerCase();

    if (tagName === 'li' || tagName === 'p' || tagName === 'div') {
      event.preventDefault();
      event.stopPropagation();
      analyserElement(element);
    } else {
      console.log('Veuillez cliquer sur un élément li, p ou div.');
    }
    return;
  }

  // Mode style
  if (styleMode) {
    const element = event.target;
    const tagName = element.tagName.toLowerCase();

    // Éviter les clics sur les boutons de contrôle
    if (element.closest('.analyse-container')) {
      return;
    }

    if (tagName === 'li' || tagName === 'p' || tagName === 'div' || tagName === 'h1' ||
      tagName === 'h2' || tagName === 'h3' || tagName === 'h4' || tagName === 'span') {
      event.preventDefault();
      event.stopPropagation();
      applyStyle(element);
    } else {
      console.log('Cliquez sur un élément de texte (li, p, div, h1-h4, span).');
    }
    return;
  }
});

// Modifier les event listeners de survol pour inclure le mode style
document.addEventListener('mouseover', function (event) {
  const element = event.target;

  // Mode analyse
  if (analyseMode) {
    const tagName = element.tagName.toLowerCase();
    if (tagName === 'li' || tagName === 'p' || tagName === 'div') {
      element.style.outline = '2px solid #e74c3c';
      element.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
    }
    return;
  }

  // Mode style
  if (styleMode && currentStyleType) {
    const tagName = element.tagName.toLowerCase();
    if (tagName === 'li' || tagName === 'p' || tagName === 'div' || tagName === 'h1' ||
      tagName === 'h2' || tagName === 'h3' || tagName === 'h4' || tagName === 'span') {
      element.style.outline = '2px solid #3498db';
      element.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
    }
  }
});

document.addEventListener('mouseout', function (event) {
  const element = event.target;

  if (analyseMode || (styleMode && currentStyleType)) {
    element.style.outline = '';
    // Ne pas retirer le backgroundColor si c'est une classe appliquée
    if (!element.classList.contains('yellow-background')) {
      element.style.backgroundColor = '';
    }
  }
});

// ===== PARTIE 5 - GESTION DES ÉVÉNEMENTS =====

// Variables pour la gestion des événements
let eventMode = false;
let eventCount = 0;

// Fonction pour créer l'interface de gestion des événements - MODIFIÉE
function initEventManagement() {
  // Vérifier si le conteneur existe déjà
  const existingContainer = document.querySelector('.event-container');
  if (existingContainer) {
    console.log('ℹ️ Conteneur d\'événements déjà présent, réutilisation...');
    return;
  }

  // Créer le conteneur pour les événements
  const eventContainer = document.createElement('div');
  eventContainer.className = 'event-container';
  eventContainer.innerHTML = `
        <div class="event-controls">
            <h3>🎮 Gestion des Événements</h3>
            <button id="toggleEventBtn" class="event-button">Mode Événements: INACTIF</button>
            <div class="event-stats">
                <span id="eventCounter">Événements déclenchés: 0</span>
            </div>
            <div class="event-log" id="eventLog">
                <h4>📋 Journal des événements:</h4>
            </div>
        </div>
    `;

  // Ajouter après le conteneur d'analyse
  const analyseContainer = document.querySelector('.analyse-container');
  if (analyseContainer) {
    analyseContainer.parentNode.insertBefore(eventContainer, analyseContainer.nextSibling);
  } else {
    document.body.appendChild(eventContainer);
  }

  console.log('✅ Conteneur d\'événements créé');
}

// Fonction de nettoyage pour supprimer les doublons
function cleanupDuplicateContainers() {
  const eventContainers = document.querySelectorAll('.event-container');

  if (eventContainers.length > 1) {
    console.log(`⚠️ ${eventContainers.length} conteneurs détectés, nettoyage...`);

    // Garder le premier et supprimer les autres
    for (let i = 1; i < eventContainers.length; i++) {
      eventContainers[i].remove();
      console.log(`🗑️ Conteneur en double ${i} supprimé`);
    }
  }
}

// Modifier l'initialisation pour inclure le nettoyage
function initEventSystem() {
  console.log('🚀 Initialisation du système d\'événements...');

  // Nettoyer d'abord les doublons
  cleanupDuplicateContainers();

  // Vérifier que le DOM est chargé
  if (document.readyState === 'loading') {
    console.log('⏳ DOM en cours de chargement, attente...');
    return;
  }

  try {
    initEventManagement();
    console.log('✅ Interface d\'événements créée');

    // Attendre un peu que l'interface soit dans le DOM
    setTimeout(() => {
      initEventToggle();
      console.log('✅ Bouton toggle initialisé');

      attachClickEvents();
      console.log('✅ Événements de clic attachés');

      attachHoverEvents();
      console.log('✅ Événements de survol attachés');

      attachKeyboardEvents();
      console.log('✅ Événements clavier attachés');

      attachFormEvents();
      console.log('✅ Événements de formulaire attachés');

      attachOnClickEvents();
      console.log('✅ Événements onclick attachés');

      attachWindowEvents();
      console.log('✅ Événements de fenêtre attachés');

      demonstrateEventMethods();
      console.log('✅ Démonstration initialisée');

      // Nettoyage final
      cleanupDuplicateContainers();

      console.log('🎉 Système d\'événements entièrement initialisé !');
    }, 100);

  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
  }
}

// Fonction pour logger les événements avec propriétés de l'objet event
function logEvent(eventType, element, event, details = '') {
  eventCount++;
  document.getElementById('eventCounter').textContent = `Événements déclenchés: ${eventCount}`;

  const log = document.getElementById('eventLog');
  const logEntry = document.createElement('div');
  logEntry.className = 'log-entry';

  // Formater les propriétés de l'événement
  let eventProps = '';
  if (event) {
    eventProps = `
      • Type: ${event.type}
      • Target: ${event.target.tagName}
      • CurrentTarget: ${event.currentTarget.tagName}
      • TimeStamp: ${event.timeStamp}ms
    `;
  }

  logEntry.innerHTML = `
    <span class="log-time">${new Date().toLocaleTimeString()}</span>
    <span class="log-type">${eventType}</span>
    <span class="log-element">${element.tagName.toLowerCase()}.${element.className || 'no-class'}</span>
    <span class="log-details">${details}</span>
    <div class="event-properties">${eventProps}</div>
  `;

  log.appendChild(logEntry);

  // Limiter à 10 entrées
  if (log.children.length > 11) { // +1 pour le titre
    log.removeChild(log.children[1]);
  }

  // Affichage détaillé dans la console
  console.group(`🎮 ${eventType} sur ${element.tagName}${element.className ? '.' + element.className : ''}`);

  if (event) {
    console.log('📋 PROPRIÉTÉS DE L\'OBJET EVENT:');
    console.log('• type:', event.type);
    console.log('• target:', event.target);
    console.log('• currentTarget:', event.currentTarget);
    console.log('• eventPhase:', event.eventPhase, getEventPhase(event.eventPhase));
    console.log('• bubbles:', event.bubbles);
    console.log('• cancelable:', event.cancelable);
    console.log('• defaultPrevented:', event.defaultPrevented);
    console.log('• timeStamp:', event.timeStamp + 'ms');
    console.log('• isTrusted:', event.isTrusted);

    // Propriétés spécifiques selon le type d'événement
    if (event.type.includes('mouse') || event.type === 'click') {
      console.log('\n🖱️ PROPRIÉTÉS SOURIS:');
      console.log('• clientX:', event.clientX);
      console.log('• clientY:', event.clientY);
      console.log('• screenX:', event.screenX);
      console.log('• screenY:', event.screenY);
      console.log('• pageX:', event.pageX);
      console.log('• pageY:', event.pageY);
      console.log('• button:', event.button, getMouseButton(event.button));
      console.log('• buttons:', event.buttons);
      console.log('• altKey:', event.altKey);
      console.log('• ctrlKey:', event.ctrlKey);
      console.log('• shiftKey:', event.shiftKey);
      console.log('• metaKey:', event.metaKey);
    }

    if (event.type.includes('key')) {
      console.log('\n⌨️ PROPRIÉTÉS CLAVIER:');
      console.log('• key:', event.key);
      console.log('• code:', event.code);
      console.log('• keyCode:', event.keyCode);
      console.log('• which:', event.which);
      console.log('• altKey:', event.altKey);
      console.log('• ctrlKey:', event.ctrlKey);
      console.log('• shiftKey:', event.shiftKey);
      console.log('• metaKey:', event.metaKey);
      console.log('• repeat:', event.repeat);
    }

    if (event.type === 'wheel') {
      console.log('\n🖱️ PROPRIÉTÉS MOLETTE:');
      console.log('• deltaX:', event.deltaX);
      console.log('• deltaY:', event.deltaY);
      console.log('• deltaZ:', event.deltaZ);
      console.log('• deltaMode:', event.deltaMode);
    }

    if (event.type.includes('touch')) {
      console.log('\n👆 PROPRIÉTÉS TACTILES:');
      console.log('• touches:', event.touches.length);
      console.log('• targetTouches:', event.targetTouches.length);
      console.log('• changedTouches:', event.changedTouches.length);
    }
  }

  if (details) {
    console.log('\n📝 DÉTAILS SUPPLÉMENTAIRES:', details);
  }

  console.groupEnd();
}

// Fonctions utilitaires pour décoder les valeurs
function getEventPhase(phase) {
  switch (phase) {
    case 0: return 'NONE';
    case 1: return 'CAPTURING_PHASE';
    case 2: return 'AT_TARGET';
    case 3: return 'BUBBLING_PHASE';
    default: return 'UNKNOWN';
  }
}

function getMouseButton(button) {
  switch (button) {
    case 0: return 'Gauche';
    case 1: return 'Molette/Milieu';
    case 2: return 'Droite';
    case 3: return 'Navigateur Précédent';
    case 4: return 'Navigateur Suivant';
    default: return 'Inconnu';
  }
}

// ===== GESTIONNAIRES MODIFIÉS AVEC PROPRIÉTÉS EVENT =====

// 1. Événements de clic modifiés
function attachClickEvents() {
  const clickableElements = document.querySelectorAll('h1, h2, h3, h4, p, li, div, span, a, button');

  clickableElements.forEach(element => {
    element.addEventListener('click', function (event) {
      if (!eventMode) return;

      event.preventDefault();
      event.stopPropagation();

      logEvent('CLICK', this, event, `Position souris: (${event.clientX}, ${event.clientY})`);

      // Effet visuel avec les coordonnées
      this.style.transform = 'scale(0.95)';
      this.style.boxShadow = `${event.clientX % 10}px ${event.clientY % 10}px 10px rgba(52, 152, 219, 0.3)`;
      setTimeout(() => {
        this.style.transform = '';
        this.style.boxShadow = '';
      }, 300);
    });

    // Ajouter également les événements mousedown et mouseup
    element.addEventListener('mousedown', function (event) {
      if (!eventMode) return;
      logEvent('MOUSEDOWN', this, event, `Bouton: ${getMouseButton(event.button)}`);
    });

    element.addEventListener('mouseup', function (event) {
      if (!eventMode) return;
      logEvent('MOUSEUP', this, event, `Bouton relâché: ${getMouseButton(event.button)}`);
    });
  });
}

// 2. Événements de survol modifiés
function attachHoverEvents() {
  const hoverElements = document.querySelectorAll('li, p, div, h1, h2, h3, h4');

  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', function (event) {
      if (!eventMode) return;

      logEvent('HOVER-IN', this, event, `Depuis: ${event.relatedTarget ? event.relatedTarget.tagName : 'extérieur'}`);
      this.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
      this.style.transition = 'background-color 0.3s ease';
    });

    element.addEventListener('mouseleave', function (event) {
      if (!eventMode) return;

      logEvent('HOVER-OUT', this, event, `Vers: ${event.relatedTarget ? event.relatedTarget.tagName : 'extérieur'}`);
      if (!this.classList.contains('yellow-background')) {
        this.style.backgroundColor = '';
      }
    });

    // Ajouter mousemove pour voir les coordonnées en temps réel
    element.addEventListener('mousemove', function (event) {
      if (!eventMode) return;

      // Limiter les logs de mousemove (trop nombreux)
      if (Math.random() < 0.1) { // Seulement 10% des mouvements
        logEvent('MOUSEMOVE', this, event, `Coordonnées: (${event.offsetX}, ${event.offsetY})`);
      }
    });
  });
}

// 3. Événements clavier modifiés
function attachKeyboardEvents() {
  const keyboardTest = document.createElement('div');
  keyboardTest.innerHTML = `
    <div class="keyboard-test">
      <label for="testInput">🎹 Test clavier (propriétés event):</label>
      <input type="text" id="testInput" placeholder="Tapez ici pour voir les propriétés de l'événement">
      <textarea id="testTextarea" placeholder="Testez aussi ici (focus, blur, select)"></textarea>
    </div>
  `;

  document.querySelector('.event-container').appendChild(keyboardTest);

  const testInput = document.getElementById('testInput');
  const testTextarea = document.getElementById('testTextarea');

  // Événements clavier avec propriétés détaillées
  [testInput, testTextarea].forEach(element => {
    element.addEventListener('keydown', function (event) {
      if (!eventMode) return;
      logEvent('KEYDOWN', this, event,
        `Touche: "${event.key}" | Code: ${event.code} | Modificateurs: ${getModifiers(event)}`);
    });

    element.addEventListener('keyup', function (event) {
      if (!eventMode) return;
      logEvent('KEYUP', this, event, `Touche relâchée: "${event.key}"`);
    });

    element.addEventListener('keypress', function (event) {
      if (!eventMode) return;
      logEvent('KEYPRESS', this, event, `Caractère: "${event.key}"`);
    });

    element.addEventListener('input', function (event) {
      if (!eventMode) return;
      logEvent('INPUT', this, event, `Valeur: "${this.value}" | Type: ${event.inputType || 'standard'}`);
    });

    // Événements de focus
    element.addEventListener('focus', function (event) {
      if (!eventMode) return;
      logEvent('FOCUS', this, event, 'Élément a reçu le focus');
    });

    element.addEventListener('blur', function (event) {
      if (!eventMode) return;
      logEvent('BLUR', this, event, 'Élément a perdu le focus');
    });

    // Événement de sélection de texte
    element.addEventListener('select', function (event) {
      if (!eventMode) return;
      logEvent('SELECT', this, event,
        `Texte sélectionné: "${this.value.substring(this.selectionStart, this.selectionEnd)}"`);
    });
  });
}

// Fonction utilitaire pour les modificateurs
function getModifiers(event) {
  const modifiers = [];
  if (event.altKey) modifiers.push('Alt');
  if (event.ctrlKey) modifiers.push('Ctrl');
  if (event.shiftKey) modifiers.push('Shift');
  if (event.metaKey) modifiers.push('Meta');
  return modifiers.length > 0 ? modifiers.join('+') : 'Aucun';
}

// 4. Événements de formulaire modifiés
function attachFormEvents() {
  const formTest = document.createElement('div');
  formTest.innerHTML = `
    <div class="form-test">
      <h4>📝 Test formulaire (propriétés event):</h4>
      <select id="testSelect">
        <option value="">Choisissez...</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
      <input type="checkbox" id="testCheckbox">
      <label for="testCheckbox">Case à cocher</label>
      <input type="range" id="testRange" min="0" max="100" value="50">
      <label for="testRange">Curseur (50)</label>
    </div>
  `;

  document.querySelector('.event-container').appendChild(formTest);

  const testSelect = document.getElementById('testSelect');
  const testCheckbox = document.getElementById('testCheckbox');
  const testRange = document.getElementById('testRange');

  testSelect.addEventListener('change', function (event) {
    if (!eventMode) return;
    logEvent('CHANGE', this, event, `Nouvelle sélection: "${this.value}"`);
  });

  testCheckbox.addEventListener('change', function (event) {
    if (!eventMode) return;
    logEvent('CHANGE', this, event, `État: ${this.checked ? 'Coché' : 'Décoché'}`);
  });

  testRange.addEventListener('input', function (event) {
    if (!eventMode) return;
    document.querySelector('label[for="testRange"]').textContent = `Curseur (${this.value})`;
    logEvent('INPUT', this, event, `Valeur: ${this.value}%`);
  });
}

// 5. Gestionnaire onclick modifié
function attachOnClickEvents() {
  const titre = document.querySelector('.titre-principal');

  titre.onclick = function (event) {
    if (!eventMode) return;

    logEvent('ONCLICK', this, event, 'Méthode onclick (ancienne) - Un seul gestionnaire possible');

    // Animation avec propriétés de l'événement
    this.style.color = '#e74c3c';
    this.style.transform = `rotate(${event.clientX % 10}deg)`;
    setTimeout(() => {
      this.style.color = '';
      this.style.transform = '';
    }, 1000);
  };
}

// 6. Gestion du bouton de toggle pour les événements - FONCTION MANQUANTE
function initEventToggle() {
  const toggleEventBtn = document.getElementById('toggleEventBtn');

  if (!toggleEventBtn) {
    console.error('Bouton toggleEventBtn non trouvé !');
    return;
  }

  toggleEventBtn.addEventListener('click', function () {
    eventMode = !eventMode;

    if (eventMode) {
      this.textContent = 'Mode Événements: ACTIF';
      this.style.backgroundColor = '#27ae60';
      document.body.style.outline = '3px solid #27ae60';

      console.log('🎮 Mode événements ACTIVÉ - Interagissez avec la page !');
      logEvent('MODE', document.body, null, 'Mode événements activé');

      // Désactiver les autres modes
      if (analyseMode) {
        analyseMode = false;
        analyseBtn.textContent = 'Analyser un élément';
        analyseBtn.style.backgroundColor = '#3498db';
        document.body.style.cursor = 'default';
      }
      if (styleMode) {
        styleMode = false;
        toggleStyleBtn.textContent = 'Mode Style: INACTIF';
        toggleStyleBtn.style.backgroundColor = '#95a5a6';
        document.body.style.cursor = 'default';
      }
    } else {
      this.textContent = 'Mode Événements: INACTIF';
      this.style.backgroundColor = '#95a5a6';
      document.body.style.outline = '';

      console.log('🎮 Mode événements DÉSACTIVÉ');
      logEvent('MODE', document.body, null, 'Mode événements désactivé');
    }
  });
}

// Initialisation de la gestion des événements - CORRIGÉE
function initEventSystem() {
  console.log('🚀 Initialisation du système d\'événements...');

  // Vérifier que le DOM est chargé
  if (document.readyState === 'loading') {
    console.log('⏳ DOM en cours de chargement, attente...');
    return;
  }

  try {
    initEventManagement();
    console.log('✅ Interface d\'événements créée');

    // Attendre un peu que l'interface soit dans le DOM
    setTimeout(() => {
      initEventToggle();
      console.log('✅ Bouton toggle initialisé');

      attachClickEvents();
      console.log('✅ Événements de clic attachés');

      attachHoverEvents();
      console.log('✅ Événements de survol attachés');

      attachKeyboardEvents();
      console.log('✅ Événements clavier attachés');

      attachFormEvents();
      console.log('✅ Événements de formulaire attachés');

      attachOnClickEvents();
      console.log('✅ Événements onclick attachés');

      attachWindowEvents();
      console.log('✅ Événements de fenêtre attachés');

      demonstrateEventMethods();
      console.log('✅ Démonstration initialisée');

      console.log('🎉 Système d\'événements entièrement initialisé !');
    }, 100);

  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('📄 DOM chargé, initialisation des systèmes...');

  // Initialiser le système d'événements
  initEventSystem();

  // Vérifier que tous les boutons existent
  setTimeout(() => {
    const analyseBtn = document.getElementById('analyseBtn');
    const toggleStyleBtn = document.getElementById('toggleStyleBtn');
    const toggleEventBtn = document.getElementById('toggleEventBtn');

    console.log('🔍 Vérification des boutons:');
    console.log('- analyseBtn:', analyseBtn ? '✅' : '❌');
    console.log('- toggleStyleBtn:', toggleStyleBtn ? '✅' : '❌');
    console.log('- toggleEventBtn:', toggleEventBtn ? '✅' : '❌');

    if (!toggleEventBtn) {
      console.error('❌ Le bouton d\'événements n\'a pas été créé correctement !');
      // Réessayer la création
      initEventManagement();
      setTimeout(initEventToggle, 100);
    }
  }, 500);
});

// Alternative - Si le problème persiste, forcer l'initialisation
window.addEventListener('load', function () {
  console.log('🔄 Initialisation forcée après chargement complet...');

  // Vérifier si le système d'événements existe
  if (!document.getElementById('toggleEventBtn')) {
    console.log('⚠️ Système d\'événements manquant, re-initialisation...');
    initEventSystem();
  }
});

// ===== QUESTION 19 - INTERACTIONS SPÉCIFIQUES =====

// Variables pour les interactions spécifiques
let keyboardDisplay = '';
let scrollCount = 0;
let focusedElements = [];

// 1. Un clic sur un bouton modifie dynamiquement un élément du DOM
function initButtonTextChange() {
  // Créer un bouton et un paragraphe de démonstration
  const demoSection = document.createElement('div');
  demoSection.className = 'demo-interactions';
  demoSection.innerHTML = `
        <div class="demo-section">
            <h4>🔥 Interactions Question 19</h4>
            
            <!-- 1. Modification de texte par clic -->
            <div class="interaction-item">
                <h5>1️⃣ Clic modifie le texte</h5>
                <p id="dynamicParagraph" class="dynamic-paragraph">Texte original - Cliquez le bouton pour me changer !</p>
                <button id="changeTextButton" class="demo-button">Changer le Texte</button>
                <button id="resetTextButton" class="demo-button secondary">Reset</button>
            </div>
            
            <!-- 2. Paragraphes qui changent de couleur au survol -->
            <div class="interaction-item">
                <h5>2️⃣ Survol change la couleur</h5>
                <p class="hover-paragraph">Survolez-moi ! Je change de couleur ! 🎨</p>
                <p class="hover-paragraph">Moi aussi ! Différente couleur ! 🌈</p>
                <p class="hover-paragraph">Et moi ! Encore une autre couleur ! ✨</p>
            </div>
            
            <!-- 3. Zone d'affichage des touches clavier -->
            <div class="interaction-item">
                <h5>3️⃣ Touches clavier affichées</h5>
                <div id="keyboardZone" class="keyboard-zone">
                    <p class="keyboard-instruction">Appuyez sur des touches du clavier :</p>
                    <div id="keyDisplay" class="key-display">Les caractères apparaîtront ici...</div>
                    <button id="clearKeysButton" class="demo-button small">Effacer</button>
                </div>
            </div>
            
            <!-- 4. Champs de formulaire qui se colorent au focus -->
            <div class="interaction-item">
                <h5>4️⃣ Focus colore les champs</h5>
                <div class="form-demo">
                    <input type="text" class="focus-input" placeholder="Cliquez ici - Focus/Blur">
                    <input type="email" class="focus-input" placeholder="Email - Focus/Blur">
                    <textarea class="focus-input" placeholder="Zone de texte - Focus/Blur"></textarea>
                    <select class="focus-input">
                        <option>Sélectionnez - Focus/Blur</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                    </select>
                </div>
            </div>
            
            <!-- 5. Compteur de scroll -->
            <div class="interaction-item">
                <h5>5️⃣ Scroll déclenche des messages</h5>
                <div class="scroll-info">
                    <p>Nombre de scrolls détectés: <strong id="scrollCounter">0</strong></p>
                    <p>Position actuelle: <strong id="scrollPosition">0px</strong></p>
                    <div class="scroll-messages" id="scrollMessages"></div>
                </div>
            </div>
            
            <!-- 6. Message d'accueil (sera créé au load) -->
            <div class="interaction-item">
                <h5>6️⃣ Message d'accueil au chargement</h5>
                <p>Une bannière d'accueil apparaît quand la page se charge !</p>
                <button id="showWelcomeButton" class="demo-button">Réafficher la Bannière</button>
            </div>
        </div>
    `;

  // Ajouter après le conteneur d'événements
  const eventContainer = document.querySelector('.event-container');
  if (eventContainer) {
    eventContainer.parentNode.insertBefore(demoSection, eventContainer.nextSibling);
  } else {
    document.body.appendChild(demoSection);
  }
}

// 1. Clic sur bouton modifie un élément DOM
function initTextChangeInteraction() {
  const changeTextButton = document.getElementById('changeTextButton');
  const resetTextButton = document.getElementById('resetTextButton');
  const dynamicParagraph = document.getElementById('dynamicParagraph');

  const textVariations = [
    "🚀 Texte modifié par JavaScript !",
    "⚡ Le DOM est dynamique !",
    "🎯 Interaction réussie !",
    "🌟 JavaScript contrôle tout !",
    "🎨 Changement en temps réel !",
    "💫 Magie du développement web !",
    "🔥 Code en action !",
    "✨ Transformation instantanée !"
  ];

  let currentIndex = 0;

  changeTextButton.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % textVariations.length;
    dynamicParagraph.textContent = textVariations[currentIndex];
    dynamicParagraph.style.color = getRandomColor();
    dynamicParagraph.style.transform = 'scale(1.05)';

    // Animation de retour
    setTimeout(() => {
      dynamicParagraph.style.transform = 'scale(1)';
    }, 200);

    console.log('🔄 Texte modifié par clic:', textVariations[currentIndex]);
  });

  resetTextButton.addEventListener('click', function () {
    dynamicParagraph.textContent = "Texte original - Cliquez le bouton pour me changer !";
    dynamicParagraph.style.color = '';
    currentIndex = 0;
    console.log('🔄 Texte remis à zéro');
  });
}

// 2. Survol de paragraphe change sa couleur (mouseover et mouseout)
function initHoverColorChange() {
  const hoverParagraphs = document.querySelectorAll('.hover-paragraph');
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];

  hoverParagraphs.forEach((paragraph, index) => {
    const originalColor = window.getComputedStyle(paragraph).backgroundColor;
    const hoverColor = colors[index % colors.length];

    paragraph.addEventListener('mouseover', function () {
      this.style.backgroundColor = hoverColor;
      this.style.color = 'white';
      this.style.padding = '10px';
      this.style.borderRadius = '5px';
      this.style.transform = 'translateX(10px)';
      this.style.transition = 'all 0.3s ease';

      console.log('🎨 Survol détecté - Couleur changée:', hoverColor);
    });

    paragraph.addEventListener('mouseout', function () {
      this.style.backgroundColor = '';
      this.style.color = '';
      this.style.padding = '';
      this.style.borderRadius = '';
      this.style.transform = '';

      console.log('👋 Survol terminé - Couleur restaurée');
    });
  });
}

// 3. Touche pressée affiche le caractère (keypress/keydown)
function initKeyboardDisplay() {
  const keyDisplay = document.getElementById('keyDisplay');
  const clearKeysButton = document.getElementById('clearKeysButton');

  // Écouter les événements clavier sur tout le document
  document.addEventListener('keydown', function (event) {
    // Ignorer certaines touches spéciales
    if (event.ctrlKey || event.altKey || event.metaKey) return;
    if (['Tab', 'Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(event.key)) return;

    const timestamp = new Date().toLocaleTimeString();

    if (event.key === 'Backspace') {
      // Supprimer le dernier caractère
      keyboardDisplay = keyboardDisplay.slice(0, -1);
      keyDisplay.innerHTML = keyboardDisplay || 'Les caractères apparaîtront ici...';
      console.log('⌨️ Backspace - Caractère supprimé');
    } else if (event.key === 'Enter') {
      // Ajouter une nouvelle ligne
      keyboardDisplay += '<br>';
      keyDisplay.innerHTML = keyboardDisplay;
      console.log('⌨️ Entrée - Nouvelle ligne');
    } else if (event.key === ' ') {
      // Espace
      keyboardDisplay += '&nbsp;';
      keyDisplay.innerHTML = keyboardDisplay;
      console.log('⌨️ Espace ajouté');
    } else if (event.key.length === 1) {
      // Caractères normaux
      keyboardDisplay += event.key;
      keyDisplay.innerHTML = keyboardDisplay;
      console.log(`⌨️ Touche pressée: "${event.key}" à ${timestamp}`);
    }

    // Limiter la longueur pour éviter le débordement
    if (keyboardDisplay.length > 200) {
      keyboardDisplay = keyboardDisplay.slice(-150);
      keyDisplay.innerHTML = keyboardDisplay;
    }
  });

  clearKeysButton.addEventListener('click', function () {
    keyboardDisplay = '';
    keyDisplay.innerHTML = 'Les caractères apparaîtront ici...';
    console.log('🧹 Zone clavier effacée');
  });
}

// 4. Champ de formulaire en focus se colore (focus et blur)
function initFocusColorChange() {
  const focusInputs = document.querySelectorAll('.focus-input');

  focusInputs.forEach(input => {
    const originalBackground = window.getComputedStyle(input).backgroundColor;
    const originalBorder = window.getComputedStyle(input).border;

    input.addEventListener('focus', function () {
      this.style.backgroundColor = '#e8f4fd';
      this.style.border = '2px solid #3498db';
      this.style.boxShadow = '0 0 10px rgba(52, 152, 219, 0.3)';
      this.style.transform = 'scale(1.02)';
      this.style.transition = 'all 0.3s ease';

      focusedElements.push(this);

      console.log('🎯 Focus détecté sur:', this.tagName, this.placeholder || this.value || 'élément');
    });

    input.addEventListener('blur', function () {
      this.style.backgroundColor = '';
      this.style.border = '';
      this.style.boxShadow = '';
      this.style.transform = '';

      const index = focusedElements.indexOf(this);
      if (index > -1) {
        focusedElements.splice(index, 1);
      }

      console.log('😴 Blur détecté sur:', this.tagName, 'Focus perdu');
    });
  });
}

// 5. Scroll déclenche un message dans la console
function initScrollDetection() {
  const scrollCounter = document.getElementById('scrollCounter');
  const scrollPosition = document.getElementById('scrollPosition');
  const scrollMessages = document.getElementById('scrollMessages');

  let lastScrollTop = 0;
  let scrollTimeout;

  window.addEventListener('scroll', function (event) {
    scrollCount++;
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Mettre à jour les affichages
    scrollCounter.textContent = scrollCount;
    scrollPosition.textContent = Math.round(currentScrollTop) + 'px';

    // Déterminer la direction
    const direction = currentScrollTop > lastScrollTop ? 'vers le bas ⬇️' : 'vers le haut ⬆️';

    // Ajouter un message visuel
    const message = document.createElement('div');
    message.className = 'scroll-message';
    message.innerHTML = `
            <span class="scroll-time">${new Date().toLocaleTimeString()}</span>
            <span class="scroll-info">Scroll ${direction} - Position: ${Math.round(currentScrollTop)}px</span>
        `;

    scrollMessages.appendChild(message);

    // Limiter le nombre de messages affichés
    if (scrollMessages.children.length > 5) {
      scrollMessages.removeChild(scrollMessages.firstChild);
    }

    // Supprimer le message après 3 secondes
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 3000);

    // Console avec debounce pour éviter le spam
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      console.log(`📜 Scroll détecté #${scrollCount} - Direction: ${direction} - Position: ${Math.round(currentScrollTop)}px`);
    }, 100);

    lastScrollTop = currentScrollTop;
  });
}

// 6. Chargement de la page affiche une bannière d'accueil (load)
function initWelcomeBanner() {
  function showWelcomeBanner() {
    // Créer la bannière d'accueil
    const welcomeBanner = document.createElement('div');
    welcomeBanner.id = 'welcomeBanner';
    welcomeBanner.className = 'welcome-banner';
    welcomeBanner.innerHTML = `
            <div class="welcome-content">
                <h2>🎉 Bienvenue sur la page d'interactions DOM !</h2>
                <p>Page chargée avec succès à ${new Date().toLocaleTimeString()}</p>
                <p>Explorez toutes les interactions disponibles !</p>
                <button onclick="closeWelcomeBanner()" class="close-welcome">❌ Fermer</button>
            </div>
        `;

    // Ajouter au début du body
    document.body.insertBefore(welcomeBanner, document.body.firstChild);

    // Animation d'apparition
    setTimeout(() => {
      welcomeBanner.style.opacity = '1';
      welcomeBanner.style.transform = 'translateY(0)';
    }, 100);

    // Fermeture automatique après 10 secondes
    setTimeout(() => {
      if (document.getElementById('welcomeBanner')) {
        closeWelcomeBanner();
      }
    }, 10000);

    console.log('🎊 Bannière d\'accueil affichée au chargement de la page');
  }

  // Fonction globale pour fermer la bannière
  window.closeWelcomeBanner = function () {
    const banner = document.getElementById('welcomeBanner');
    if (banner) {
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(-100%)';
      setTimeout(() => {
        if (banner.parentNode) {
          banner.parentNode.removeChild(banner);
        }
      }, 500);
    }
    console.log('👋 Bannière d\'accueil fermée');
  };

  // Bouton pour réafficher la bannière
  const showWelcomeButton = document.getElementById('showWelcomeButton');
  if (showWelcomeButton) {
    showWelcomeButton.addEventListener('click', showWelcomeBanner);
  }

  // Afficher au chargement de la page
  window.addEventListener('load', function () {
    console.log('📄 Page entièrement chargée - Affichage de la bannière d\'accueil');
    setTimeout(showWelcomeBanner, 500); // Petit délai pour laisser la page se stabiliser
  });
}

// Fonction utilitaire pour générer des couleurs aléatoires
function getRandomColor() {
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#34495e'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Initialisation de toutes les interactions de la question 19
function initQuestion19Interactions() {
  console.log('🎯 Initialisation des interactions Question 19...');

  try {
    // Créer l'interface
    initButtonTextChange();
    console.log('✅ Interface des interactions créée');

    // Attendre que l'interface soit dans le DOM
    setTimeout(() => {
      // 1. Clic modifie texte
      initTextChangeInteraction();
      console.log('✅ 1. Interaction clic → texte initialisée');

      // 2. Survol change couleur
      initHoverColorChange();
      console.log('✅ 2. Interaction survol → couleur initialisée');

      // 3. Clavier affiche caractères
      initKeyboardDisplay();
      console.log('✅ 3. Interaction clavier → affichage initialisée');

      // 4. Focus colore champs
      initFocusColorChange();
      console.log('✅ 4. Interaction focus → couleur initialisée');

      // 5. Scroll déclenche messages
      initScrollDetection();
      console.log('✅ 5. Interaction scroll → messages initialisée');

      // 6. Bannière d'accueil
      initWelcomeBanner();
      console.log('✅ Bannière d\'accueil initialisée');

      console.log('🎉 Toutes les interactions Question 19 sont opérationnelles !');

    }, 300);

  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation Question 19:', error);
  }
}

// ===== QUESTION 20 - MESSAGE TEMPORISÉ AVEC setTimeout =====

// Variables pour les messages temporisés
let messageTimeouts = [];
let messageCount = 0;

// Fonction pour créer l'interface des messages temporisés
function initDelayedMessages() {
  // Ajouter la section dans le conteneur des interactions Question 19
  const demoSection = document.querySelector('.demo-interactions .demo-section');

  if (demoSection) {
    const delayedMessageSection = document.createElement('div');
    delayedMessageSection.className = 'interaction-item';
    delayedMessageSection.innerHTML = `
            <!-- Question 20: Messages temporisés -->
            <div class="interaction-item">
                <h5>⏰ Messages temporisés (setTimeout)</h5>
                <div class="delayed-message-demo">
                    <div class="trigger-buttons">
                        <button id="delayedBtn1" class="demo-button">Message dans 3s</button>
                        <button id="delayedBtn2" class="demo-button">Message personnalisé</button>
                        <button id="delayedBtn3" class="demo-button secondary">Message aléatoire</button>
                    </div>
                    
                    <div class="message-controls">
                        <input type="text" id="customMessageInput" class="text-input" 
                               placeholder="Tapez votre message personnalisé...">
                        <input type="number" id="delayInput" class="delay-input" 
                               value="3" min="1" max="10" step="0.5">
                        <label for="delayInput" class="delay-label">Délai (secondes)</label>
                    </div>
                    
                    <div class="message-display">
                        <div id="messageArea" class="message-area">
                            <p class="message-prompt">Cliquez sur un bouton et attendez...</p>
                        </div>
                        
                        <div class="message-status">
                            <span>Messages en attente: <strong id="pendingCount">0</strong></span>
                            <span>Messages affichés: <strong id="displayedCount">0</strong></span>
                            <button id="clearMessagesBtn" class="demo-button small">Effacer Tous</button>
                        </div>
                    </div>
                    
                    <div class="advanced-controls">
                        <h6>🎮 Contrôles avancés:</h6>
                        <button id="multipleDelayBtn" class="demo-button accent">Messages en cascade</button>
                        <button id="cancelDelayBtn" class="demo-button danger">Annuler en attente</button>
                        <button id="progressDelayBtn" class="demo-button">Message avec barre</button>
                    </div>
                </div>
            </div>
        `;

    demoSection.appendChild(delayedMessageSection);
  }
}

// 1. Message simple avec délai de 3 secondes
function initSimpleDelayedMessage() {
  const delayedBtn1 = document.getElementById('delayedBtn1');

  delayedBtn1.addEventListener('click', function () {
    const clickTime = new Date().toLocaleTimeString();

    // Indiquer que le message est en préparation
    showWaitingIndicator(this, 3000);
    updatePendingCount(1);

    console.log('⏰ Clic détecté à', clickTime, '- Message programmé pour dans 3 secondes');

    // Programmer le message avec setTimeout
    const timeoutId = setTimeout(() => {
      const displayTime = new Date().toLocaleTimeString();
      const message = `Message affiché à ${displayTime} (3 secondes après le clic de ${clickTime}) 🎯`;

      displayDelayedMessage(message, 'success');
      updatePendingCount(-1);
      updateDisplayedCount(1);

      console.log('✅ Message temporisé affiché:', message);

      // Retirer cet ID de la liste
      const index = messageTimeouts.indexOf(timeoutId);
      if (index > -1) {
        messageTimeouts.splice(index, 1);
      }
    }, 3000);

    // Stocker l'ID du timeout pour pouvoir l'annuler si nécessaire
    messageTimeouts.push(timeoutId);
  });
}

// 2. Message personnalisé avec délai configurable
function initCustomDelayedMessage() {
  const delayedBtn2 = document.getElementById('delayedBtn2');
  const customMessageInput = document.getElementById('customMessageInput');
  const delayInput = document.getElementById('delayInput');

  delayedBtn2.addEventListener('click', function () {
    const customMessage = customMessageInput.value.trim() || 'Message personnalisé par défaut';
    const delay = parseFloat(delayInput.value) * 1000; // Convertir en millisecondes
    const clickTime = new Date().toLocaleTimeString();

    showWaitingIndicator(this, delay);
    updatePendingCount(1);

    console.log(`⏰ Message personnalisé programmé: "${customMessage}" dans ${delay / 1000}s`);

    const timeoutId = setTimeout(() => {
      const displayTime = new Date().toLocaleTimeString();
      const message = `"${customMessage}" - Affiché à ${displayTime} (${delay / 1000}s après ${clickTime}) 💬`;

      displayDelayedMessage(message, 'custom');
      updatePendingCount(-1);
      updateDisplayedCount(1);

      console.log('✅ Message personnalisé affiché:', message);

      const index = messageTimeouts.indexOf(timeoutId);
      if (index > -1) {
        messageTimeouts.splice(index, 1);
      }
    }, delay);

    messageTimeouts.push(timeoutId);

    // Vider le champ après utilisation
    customMessageInput.value = '';
  });
}

// 3. Messages aléatoires
function initRandomDelayedMessage() {
  const delayedBtn3 = document.getElementById('delayedBtn3');

  const randomMessages = [
    "🎲 Message aléatoire surprise !",
    "🌟 Vous avez attendu pour rien... ou pas !",
    "🎭 La patience est une vertu !",
    "⚡ setTimeout() en action !",
    "🎪 Spectacle temporisé terminé !",
    "🎯 Timing parfait !",
    "🚀 Mission accomplie avec délai !",
    "💫 L'attente en valait la peine !"
  ];

  delayedBtn3.addEventListener('click', function () {
    const randomDelay = Math.random() * 5000 + 1000; // Entre 1 et 6 secondes
    const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    const clickTime = new Date().toLocaleTimeString();

    showWaitingIndicator(this, randomDelay);
    updatePendingCount(1);

    console.log(`🎲 Message aléatoire programmé: "${randomMessage}" dans ${Math.round(randomDelay / 1000)}s`);

    const timeoutId = setTimeout(() => {
      const displayTime = new Date().toLocaleTimeString();
      const message = `${randomMessage} - Affiché à ${displayTime} (${Math.round(randomDelay / 1000)}s après ${clickTime}) 🎲`;

      displayDelayedMessage(message, 'random');
      updatePendingCount(-1);
      updateDisplayedCount(1);

      console.log('✅ Message aléatoire affiché:', message);

      const index = messageTimeouts.indexOf(timeoutId);
      if (index > -1) {
        messageTimeouts.splice(index, 1);
      }
    }, randomDelay);

    messageTimeouts.push(timeoutId);
  });
}

// 4. Fonctionnalités avancées
function initAdvancedDelayedFeatures() {
  const multipleDelayBtn = document.getElementById('multipleDelayBtn');
  const cancelDelayBtn = document.getElementById('cancelDelayBtn');
  const progressDelayBtn = document.getElementById('progressDelayBtn');
  const clearMessagesBtn = document.getElementById('clearMessagesBtn');

  // Messages en cascade
  multipleDelayBtn.addEventListener('click', function () {
    const messages = [
      { text: "Premier message", delay: 1000 },
      { text: "Deuxième message", delay: 2000 },
      { text: "Troisième message", delay: 3000 },
      { text: "Message final", delay: 4000 }
    ];

    showWaitingIndicator(this, 4000);
    updatePendingCount(messages.length);

    console.log('🌊 Cascade de messages programmée');

    messages.forEach((msg, index) => {
      const timeoutId = setTimeout(() => {
        displayDelayedMessage(`${msg.text} (${index + 1}/4) 🌊`, 'cascade');
        updatePendingCount(-1);
        updateDisplayedCount(1);

        const timeoutIndex = messageTimeouts.indexOf(timeoutId);
        if (timeoutIndex > -1) {
          messageTimeouts.splice(timeoutIndex, 1);
        }
      }, msg.delay);

      messageTimeouts.push(timeoutId);
    });
  });

  // Annuler les messages en attente
  cancelDelayBtn.addEventListener('click', function () {
    const canceledCount = messageTimeouts.length;

    messageTimeouts.forEach(timeoutId => {
      clearTimeout(timeoutId);
    });

    messageTimeouts = [];
    updatePendingCount(-canceledCount);

    displayDelayedMessage(`❌ ${canceledCount} message(s) en attente annulé(s)`, 'canceled');
    console.log(`❌ ${canceledCount} timeouts annulés`);
  });

  // Message avec barre de progression
  progressDelayBtn.addEventListener('click', function () {
    const delay = 5000; // 5 secondes

    showProgressMessage(delay);
    updatePendingCount(1);

    const timeoutId = setTimeout(() => {
      displayDelayedMessage('⭐ Message avec progression terminé !', 'progress');
      updatePendingCount(-1);
      updateDisplayedCount(1);

      const index = messageTimeouts.indexOf(timeoutId);
      if (index > -1) {
        messageTimeouts.splice(index, 1);
      }
    }, delay);

    messageTimeouts.push(timeoutId);
  });

  // Effacer tous les messages
  clearMessagesBtn.addEventListener('click', function () {
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = '<p class="message-prompt">Messages effacés - Cliquez sur un bouton...</p>';

    // Réinitialiser les compteurs
    document.getElementById('displayedCount').textContent = '0';
    messageCount = 0;

    console.log('🧹 Tous les messages effacés');
  });
}

// Fonctions utilitaires pour l'affichage

function displayDelayedMessage(message, type = 'default') {
  const messageArea = document.getElementById('messageArea');

  // Supprimer le message de prompt s'il existe
  const prompt = messageArea.querySelector('.message-prompt');
  if (prompt) {
    prompt.remove();
  }

  messageCount++;

  const messageElement = document.createElement('div');
  messageElement.className = `delayed-message ${type}`;
  messageElement.innerHTML = `
        <span class="message-number">#${messageCount}</span>
        <span class="message-text">${message}</span>
        <button onclick="this.parentNode.remove()" class="message-close">✖</button>
    `;

  // Déclencher l'animation
  setTimeout(() => {
    messageElement.style.opacity = '1';
    messageElement.style.transform = 'translateY(0)';
  }, 50);

  messageArea.appendChild(messageElement);

  // Limiter le nombre de messages affichés
  if (messageArea.children.length > 5) {
    messageArea.removeChild(messageArea.firstChild);
  }

  // Auto-suppression après 10 secondes
  setTimeout(() => {
    if (messageElement.parentNode) {
      messageElement.parentNode.removeChild(messageElement);
    }
  }, 10000);
}

function showWaitingIndicator(button, delay) {
  const originalText = button.textContent;
  const originalColor = button.style.backgroundColor;

  button.textContent = '⏳ Attente...';
  button.style.backgroundColor = '#f39c12';
  button.disabled = true;

  setTimeout(() => {
    button.textContent = originalText;
    button.style.backgroundColor = originalColor;
    button.disabled = false;
  }, delay + 100);
}

function showProgressMessage(duration) {
  const messageArea = document.getElementById('messageArea');

  const progressContainer = document.createElement('div');
  progressContainer.className = 'progress-message';
  progressContainer.innerHTML = `
        <p>⏰ Message en cours de préparation...</p>
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <span class="progress-text">0%</span>
    `;

  messageArea.appendChild(progressContainer);

  const progressFill = progressContainer.querySelector('.progress-fill');
  const progressText = progressContainer.querySelector('.progress-text');

  let progress = 0;
  const interval = setInterval(() => {
    progress += 100 / (duration / 100); // Mise à jour toutes les 100ms

    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        if (progressContainer.parentNode) {
          progressContainer.parentNode.removeChild(progressContainer);
        }
      }, 500);
    }

    progressFill.style.width = progress + '%';
    progressText.textContent = Math.round(progress) + '%';
  }, 100);
}

function updatePendingCount(change) {
  const pendingElement = document.getElementById('pendingCount');
  const current = parseInt(pendingElement.textContent) || 0;
  const newCount = Math.max(0, current + change);
  pendingElement.textContent = newCount;
}

function updateDisplayedCount(change) {
  const displayedElement = document.getElementById('displayedCount');
  const current = parseInt(displayedElement.textContent) || 0;
  const newCount = current + change;
  displayedElement.textContent = newCount;
}

// Initialisation des messages temporisés
function initQuestion20DelayedMessages() {
  console.log('⏰ Initialisation des messages temporisés (Question 20)...');

  try {
    initDelayedMessages();
    console.log('✅ Interface des messages temporisés créée');

    setTimeout(() => {
      initSimpleDelayedMessage();
      console.log('✅ Messages simples initialisés');

      initCustomDelayedMessage();
      console.log('✅ Messages personnalisés initialisés');

      initRandomDelayedMessage();
      console.log('✅ Messages aléatoires initialisés');

      initAdvancedDelayedFeatures();
      console.log('✅ Fonctionnalités avancées initialisées');

      console.log('🎉 Question 20 - Messages temporisés opérationnels !');
    }, 200);

  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation Question 20:', error);
  }
}

// ===== QUESTION 21 - COMPTEUR AVEC setInterval =====

// Variables pour les compteurs
let counterIntervals = [];
let mainCounterValue = 0;
let isCounterRunning = false;
let mainIntervalId = null;

// Fonction pour créer l'interface des compteurs
function initCounterInterface() {
  // Ajouter la section dans le conteneur des interactions Question 19
  const demoSection = document.querySelector('.demo-interactions .demo-section');

  if (demoSection) {
    const counterSection = document.createElement('div');
    counterSection.className = 'interaction-item';
    counterSection.innerHTML = `
            <!-- Question 21: Compteurs avec setInterval -->
            <div class="interaction-item">
                <h5>⏱️ Compteurs avec setInterval</h5>
                <div class="counter-demo">
                    
                    <!-- Compteur principal -->
                    <div class="main-counter">
                        <div class="counter-display">
                            <span class="counter-label">Compteur Principal:</span>
                            <span id="mainCounter" class="counter-value">0</span>
                            <span class="counter-unit">secondes</span>
                        </div>
                        <div class="counter-controls">
                            <button id="startMainCounter" class="demo-button success">▶️ Démarrer</button>
                            <button id="pauseMainCounter" class="demo-button warning">⏸️ Pause</button>
                            <button id="resetMainCounter" class="demo-button danger">🔄 Reset</button>
                        </div>
                    </div>
                    
                    <!-- Compteurs multiples -->
                    <div class="multiple-counters">
                        <h6>🎯 Compteurs Multiples:</h6>
                        <div id="countersList" class="counters-list">
                            <!-- Les compteurs seront ajoutés ici -->
                        </div>
                        <div class="counters-controls">
                            <button id="addCounterBtn" class="demo-button">➕ Ajouter Compteur</button>
                            <button id="startAllCounters" class="demo-button success">▶️ Tous Démarrer</button>
                            <button id="stopAllCounters" class="demo-button danger">⏹️ Tous Arrêter</button>
                        </div>
                    </div>
                    
                    <!-- Compteurs spéciaux -->
                    <div class="special-counters">
                        <h6>🌟 Compteurs Spéciaux:</h6>
                        
                        <!-- Compteur décompte -->
                        <div class="countdown-section">
                            <div class="counter-display small">
                                <span class="counter-label">Décompte:</span>
                                <span id="countdownValue" class="counter-value">10</span>
                                <span class="counter-unit">sec</span>
                            </div>
                            <input type="number" id="countdownInput" class="countdown-input" 
                                   value="10" min="1" max="3600" placeholder="Secondes">
                            <button id="startCountdown" class="demo-button accent">🚀 Décompte</button>
                        </div>
                        
                        <!-- Horloge temps réel -->
                        <div class="clock-section">
                            <div class="counter-display small">
                                <span class="counter-label">Horloge:</span>
                                <span id="realTimeClock" class="counter-value">00:00:00</span>
                            </div>
                            <button id="toggleClock" class="demo-button">🕐 Démarrer Horloge</button>
                        </div>
                        
                        <!-- Compteur millisecondes -->
                        <div class="stopwatch-section">
                            <div class="counter-display small">
                                <span class="counter-label">Chrono:</span>
                                <span id="stopwatchValue" class="counter-value">00:00.0</span>
                            </div>
                            <button id="startStopwatch" class="demo-button">⏱️ Chronomètre</button>
                            <button id="lapStopwatch" class="demo-button small">📍 Tour</button>
                        </div>
                    </div>
                    
                    <!-- Statistiques -->
                    <div class="counter-stats">
                        <div class="stats-grid">
                            <div class="stat-item">
                                <span class="stat-label">Compteurs actifs:</span>
                                <span id="activeCounters" class="stat-value">0</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Total intervals:</span>
                                <span id="totalIntervals" class="stat-value">0</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Temps écoulé:</span>
                                <span id="totalTime" class="stat-value">0s</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

    demoSection.appendChild(counterSection);
  }
}

// 1. Compteur principal qui s'incrémente chaque seconde
function initMainCounter() {
  const startBtn = document.getElementById('startMainCounter');
  const pauseBtn = document.getElementById('pauseMainCounter');
  const resetBtn = document.getElementById('resetMainCounter');
  const counterDisplay = document.getElementById('mainCounter');

  startBtn.addEventListener('click', function () {
    if (!isCounterRunning) {
      // Démarrer le compteur
      mainIntervalId = setInterval(() => {
        mainCounterValue++;
        counterDisplay.textContent = mainCounterValue;
        updateStats();

        console.log(`⏱️ Compteur principal: ${mainCounterValue} secondes`);

        // Changement de couleur selon la valeur
        if (mainCounterValue % 10 === 0) {
          counterDisplay.style.color = '#e74c3c';
          setTimeout(() => {
            counterDisplay.style.color = '';
          }, 500);
        }
      }, 1000);

      isCounterRunning = true;
      this.textContent = '⏸️ En cours...';
      this.disabled = true;
      pauseBtn.disabled = false;

      console.log('▶️ Compteur principal démarré');
    }
  });

  pauseBtn.addEventListener('click', function () {
    if (isCounterRunning && mainIntervalId) {
      clearInterval(mainIntervalId);
      mainIntervalId = null;
      isCounterRunning = false;

      startBtn.textContent = '▶️ Continuer';
      startBtn.disabled = false;
      this.disabled = true;

      console.log('⏸️ Compteur principal mis en pause à:', mainCounterValue);
    }
  });

  resetBtn.addEventListener('click', function () {
    // Arrêter le compteur s'il tourne
    if (mainIntervalId) {
      clearInterval(mainIntervalId);
      mainIntervalId = null;
    }

    // Remettre à zéro
    mainCounterValue = 0;
    isCounterRunning = false;
    counterDisplay.textContent = '0';
    counterDisplay.style.color = '';

    startBtn.textContent = '▶️ Démarrer';
    startBtn.disabled = false;
    pauseBtn.disabled = true;

    updateStats();
    console.log('🔄 Compteur principal remis à zéro');
  });

  // Initialiser l'état des boutons
  pauseBtn.disabled = true;
}

// 2. Système de compteurs multiples
function initMultipleCounters() {
  const addCounterBtn = document.getElementById('addCounterBtn');
  const startAllBtn = document.getElementById('startAllCounters');
  const stopAllBtn = document.getElementById('stopAllCounters');
  const countersList = document.getElementById('countersList');

  let counterIdCounter = 0;

  addCounterBtn.addEventListener('click', function () {
    counterIdCounter++;
    const counterId = `counter_${counterIdCounter}`;

    const counterElement = document.createElement('div');
    counterElement.className = 'individual-counter';
    counterElement.setAttribute('data-counter-id', counterId);
    counterElement.innerHTML = `
            <div class="counter-header">
                <span class="counter-name">Compteur #${counterIdCounter}</span>
                <button class="counter-delete" onclick="removeCounter('${counterId}')">❌</button>
            </div>
            <div class="counter-display mini">
                <span class="counter-value" id="${counterId}_display">0</span>
                <span class="counter-unit">sec</span>
            </div>
            <div class="counter-mini-controls">
                <button class="demo-button small" onclick="toggleCounter('${counterId}')">▶️</button>
                <button class="demo-button small" onclick="resetIndividualCounter('${counterId}')">🔄</button>
                <input type="number" id="${counterId}_interval" class="interval-input" value="1" min="0.1" max="60" step="0.1" title="Intervalle en secondes">
            </div>
        `;

    countersList.appendChild(counterElement);

    // Initialiser les données du compteur
    counterIntervals[counterId] = {
      value: 0,
      intervalId: null,
      isRunning: false,
      interval: 1000
    };

    updateStats();
    console.log(`➕ Nouveau compteur ajouté: ${counterId}`);
  });

  startAllBtn.addEventListener('click', function () {
    Object.keys(counterIntervals).forEach(counterId => {
      if (!counterIntervals[counterId].isRunning) {
        toggleCounter(counterId);
      }
    });
    console.log('▶️ Tous les compteurs démarrés');
  });

  stopAllBtn.addEventListener('click', function () {
    Object.keys(counterIntervals).forEach(counterId => {
      if (counterIntervals[counterId].isRunning) {
        toggleCounter(counterId);
      }
    });
    console.log('⏹️ Tous les compteurs arrêtés');
  });
}

// 3. Fonctions globales pour les compteurs individuels
window.toggleCounter = function (counterId) {
  const counter = counterIntervals[counterId];
  const display = document.getElementById(`${counterId}_display`);
  const intervalInput = document.getElementById(`${counterId}_interval`);
  const button = document.querySelector(`[data-counter-id="${counterId}"] .counter-mini-controls button`);

  if (!counter.isRunning) {
    // Démarrer
    const intervalSeconds = parseFloat(intervalInput.value) || 1;
    counter.interval = intervalSeconds * 1000;

    counter.intervalId = setInterval(() => {
      counter.value++;
      display.textContent = counter.value;
      updateStats();
    }, counter.interval);

    counter.isRunning = true;
    button.textContent = '⏸️';
    intervalInput.disabled = true;

    console.log(`▶️ Compteur ${counterId} démarré (intervalle: ${intervalSeconds}s)`);
  } else {
    // Arrêter
    clearInterval(counter.intervalId);
    counter.intervalId = null;
    counter.isRunning = false;
    button.textContent = '▶️';
    intervalInput.disabled = false;

    console.log(`⏸️ Compteur ${counterId} arrêté à: ${counter.value}`);
  }
};

window.resetIndividualCounter = function (counterId) {
  const counter = counterIntervals[counterId];
  const display = document.getElementById(`${counterId}_display`);
  const button = document.querySelector(`[data-counter-id="${counterId}"] .counter-mini-controls button`);
  const intervalInput = document.getElementById(`${counterId}_interval`);

  // Arrêter s'il tourne
  if (counter.intervalId) {
    clearInterval(counter.intervalId);
    counter.intervalId = null;
  }

  counter.value = 0;
  counter.isRunning = false;
  display.textContent = '0';
  button.textContent = '▶️';
  intervalInput.disabled = false;

  updateStats();
  console.log(`🔄 Compteur ${counterId} remis à zéro`);
};

window.removeCounter = function (counterId) {
  // Arrêter le compteur
  if (counterIntervals[counterId] && counterIntervals[counterId].intervalId) {
    clearInterval(counterIntervals[counterId].intervalId);
  }

  // Supprimer de la liste
  delete counterIntervals[counterId];

  // Supprimer l'élément DOM
  const element = document.querySelector(`[data-counter-id="${counterId}"]`);
  if (element) {
    element.remove();
  }

  updateStats();
  console.log(`❌ Compteur ${counterId} supprimé`);
};

// 4. Compteurs spéciaux
function initSpecialCounters() {
  initCountdown();
  initRealTimeClock();
  initStopwatch();
}

function initCountdown() {
  const startBtn = document.getElementById('startCountdown');
  const countdownDisplay = document.getElementById('countdownValue');
  const countdownInput = document.getElementById('countdownInput');

  let countdownValue = 10;
  let countdownIntervalId = null;

  startBtn.addEventListener('click', function () {
    if (countdownIntervalId) {
      clearInterval(countdownIntervalId);
      countdownIntervalId = null;
      this.textContent = '🚀 Décompte';
      countdownInput.disabled = false;
      return;
    }

    countdownValue = parseInt(countdownInput.value) || 10;
    countdownDisplay.textContent = countdownValue;

    this.textContent = '⏹️ Arrêter';
    countdownInput.disabled = true;

    countdownIntervalId = setInterval(() => {
      countdownValue--;
      countdownDisplay.textContent = countdownValue;

      // Changement de couleur quand c'est critique
      if (countdownValue <= 5 && countdownValue > 0) {
        countdownDisplay.style.color = '#f39c12';
      } else if (countdownValue <= 3 && countdownValue > 0) {
        countdownDisplay.style.color = '#e74c3c';
      }

      if (countdownValue <= 0) {
        clearInterval(countdownIntervalId);
        countdownIntervalId = null;
        countdownDisplay.textContent = '🎉';
        countdownDisplay.style.color = '#27ae60';
        startBtn.textContent = '🚀 Décompte';
        countdownInput.disabled = false;

        console.log('🎉 Décompte terminé !');

        // Remettre à la normale après 2 secondes
        setTimeout(() => {
          countdownDisplay.style.color = '';
          countdownValue = parseInt(countdownInput.value) || 10;
          countdownDisplay.textContent = countdownValue;
        }, 2000);
      }

      console.log(`⏰ Décompte: ${countdownValue}`);
    }, 1000);

    console.log(`🚀 Décompte démarré à partir de ${countdownValue}`);
  });
}

function initRealTimeClock() {
  const toggleBtn = document.getElementById('toggleClock');
  const clockDisplay = document.getElementById('realTimeClock');

  let clockIntervalId = null;
  let isClockRunning = false;

  function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    clockDisplay.textContent = timeString;
  }

  toggleBtn.addEventListener('click', function () {
    if (!isClockRunning) {
      // Démarrer l'horloge
      updateClock(); // Mise à jour immédiate
      clockIntervalId = setInterval(updateClock, 1000);

      isClockRunning = true;
      this.textContent = '⏹️ Arrêter Horloge';

      console.log('🕐 Horloge temps réel démarrée');
    } else {
      // Arrêter l'horloge
      clearInterval(clockIntervalId);
      clockIntervalId = null;
      isClockRunning = false;
      this.textContent = '🕐 Démarrer Horloge';

      console.log('🕐 Horloge temps réel arrêtée');
    }
  });
}

function initStopwatch() {
  const startBtn = document.getElementById('startStopwatch');
  const lapBtn = document.getElementById('lapStopwatch');
  const stopwatchDisplay = document.getElementById('stopwatchValue');

  let stopwatchMs = 0;
  let stopwatchIntervalId = null;
  let isStopwatchRunning = false;
  let lapCount = 0;

  function updateStopwatchDisplay() {
    const minutes = Math.floor(stopwatchMs / 60000);
    const seconds = Math.floor((stopwatchMs % 60000) / 1000);
    const deciseconds = Math.floor((stopwatchMs % 1000) / 100);

    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${deciseconds}`;
    stopwatchDisplay.textContent = timeString;
  }

  startBtn.addEventListener('click', function () {
    if (!isStopwatchRunning) {
      // Démarrer
      stopwatchIntervalId = setInterval(() => {
        stopwatchMs += 100; // Incrément de 100ms
        updateStopwatchDisplay();
      }, 100);

      isStopwatchRunning = true;
      this.textContent = '⏹️ Arrêter';
      lapBtn.disabled = false;

      console.log('⏱️ Chronomètre démarré');
    } else {
      // Arrêter
      clearInterval(stopwatchIntervalId);
      stopwatchIntervalId = null;
      isStopwatchRunning = false;
      this.textContent = '🔄 Reset';
      lapBtn.disabled = true;

      console.log(`⏹️ Chronomètre arrêté à: ${stopwatchDisplay.textContent}`);
    }
  });

  // Reset quand cliqué alors qu'arrêté
  startBtn.addEventListener('click', function () {
    if (!isStopwatchRunning && stopwatchMs > 0) {
      stopwatchMs = 0;
      lapCount = 0;
      updateStopwatchDisplay();
      this.textContent = '⏱️ Chronomètre';

      console.log('🔄 Chronomètre remis à zéro');
    }
  });

  lapBtn.addEventListener('click', function () {
    if (isStopwatchRunning) {
      lapCount++;
      console.log(`📍 Tour ${lapCount}: ${stopwatchDisplay.textContent}`);

      // Effet visuel
      stopwatchDisplay.style.backgroundColor = '#f39c12';
      setTimeout(() => {
        stopwatchDisplay.style.backgroundColor = '';
      }, 200);
    }
  });

  // Initialiser l'affichage
  updateStopwatchDisplay();
  lapBtn.disabled = true;
}

// 5. Fonction de mise à jour des statistiques
function updateStats() {
  const activeCountersElement = document.getElementById('activeCounters');
  const totalIntervalsElement = document.getElementById('totalIntervals');
  const totalTimeElement = document.getElementById('totalTime');

  if (!activeCountersElement) return; // Pas encore initialisé

  // Compter les compteurs actifs
  let activeCount = 0;
  if (isCounterRunning) activeCount++;

  Object.values(counterIntervals).forEach(counter => {
    if (counter.isRunning) activeCount++;
  });

  // Total des intervals
  const totalIntervals = Object.keys(counterIntervals).length + (mainIntervalId ? 1 : 0);

  // Temps total écoulé (approximatif)
  let totalTime = mainCounterValue;
  Object.values(counterIntervals).forEach(counter => {
    totalTime += counter.value;
  });

  activeCountersElement.textContent = activeCount;
  totalIntervalsElement.textContent = totalIntervals;
  totalTimeElement.textContent = totalTime + 's';
}

// Initialisation des compteurs (Question 21)
function initQuestion21Counters() {
  console.log('⏱️ Initialisation des compteurs (Question 21)...');

  try {
    initCounterInterface();
    console.log('✅ Interface des compteurs créée');

    setTimeout(() => {
      initMainCounter();
      console.log('✅ Compteur principal initialisé');

      initMultipleCounters();
      console.log('✅ Système de compteurs multiples initialisé');

      initSpecialCounters();
      console.log('✅ Compteurs spéciaux initialisés');

      updateStats();
      console.log('✅ Statistiques initialisées');

      console.log('🎉 Question 21 - Tous les compteurs sont opérationnels !');
    }, 200);

  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation Question 21:', error);
  }
}

// Modifier l'appel d'initialisation principal pour inclure la Question 21
document.addEventListener('DOMContentLoaded', function () {
  console.log('📄 DOM chargé, initialisation des systèmes...');

  // Initialiser le système d'événements
  initEventSystem();

  // Initialiser les interactions dynamiques (si elles existent)
  setTimeout(() => {
    if (typeof initAllDynamicInteractions === 'function') {
      initAllDynamicInteractions();
    }
  }, 1000);

  // Initialiser les interactions Question 19
  setTimeout(() => {
    initQuestion19Interactions();
  }, 1500);

  // Initialiser les messages temporisés Question 20
  setTimeout(() => {
    initQuestion20DelayedMessages();
  }, 2000);

  // Initialiser les compteurs Question 21
  setTimeout(() => {
    initQuestion21Counters();
  }, 2500);
});

// Nettoyage au déchargement de la page
window.addEventListener('beforeunload', function () {
  // Nettoyer tous les intervals pour éviter les fuites mémoire
  if (mainIntervalId) {
    clearInterval(mainIntervalId);
  }

  Object.values(counterIntervals).forEach(counter => {
    if (counter.intervalId) {
      clearInterval(counter.intervalId);
    }
  });

  console.log('🧹 Tous les intervals nettoyés avant déchargement');
});