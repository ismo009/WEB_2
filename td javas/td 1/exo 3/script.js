const taux = {
  euroToUsd: 1.10,
  euroToAud: 1.50
};

function euroToOther() {
  const euro = parseFloat(document.getElementById("euro").value);
  document.getElementById("usd").value = (euro * taux.euroToUsd).toFixed(2);
  document.getElementById("aud").value = (euro * taux.euroToAud).toFixed(2);
}

function usdToOther() {
  const usd = parseFloat(document.getElementById("usd").value);
  document.getElementById("euro").value = (usd / taux.euroToUsd).toFixed(2);
  document.getElementById("aud").value = ((usd / taux.euroToUsd) * taux.euroToAud).toFixed(2);
}

function audToOther() {
  const aud = parseFloat(document.getElementById("aud").value);
  document.getElementById("euro").value = (aud / taux.euroToAud).toFixed(2);
  document.getElementById("usd").value = ((aud / taux.euroToAud) * taux.euroToUsd).toFixed(2);
}

// Écouteurs d'événements
document.getElementById("euro").addEventListener("input", euroToOther);
document.getElementById("usd").addEventListener("input", usdToOther);
document.getElementById("aud").addEventListener("input", audToOther);

// Conversion initiale
euroToOther();

