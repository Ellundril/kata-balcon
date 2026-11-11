// =====================================================
// Kata JS 6 — Mon balcon
// Suis les TODO dans l'ordre. La constante plantes vient de plantes.js.
// =====================================================

// ---------- PARTIE 1 : les fonctions qui CALCULENT ----------
// Elles reçoivent des données et RETOURNENT un résultat.
// Elles ne touchent pas à la page.

// TODO 1 — compterAArroser(liste)
// Retourne le nombre de plantes de la liste dont aArroser vaut true.
function compterAArroser(liste) {
  let nbPlantesAArroser = 0;
  liste.forEach((plante) => {
    if (plante.aArroser) {
      nbPlantesAArroser++;
    }
  });
  return nbPlantesAArroser;
}
// Vérifie dans la console avant de passer à la suite :
// console.log(compterAArroser(plantes)) // doit afficher 4

// TODO 2 — filtrerParLieu(liste, lieu)
// Retourne un NOUVEAU tableau avec seulement les plantes dont le lieu
// est égal au paramètre lieu ("intérieur" ou "extérieur").
function filtrerParLieu(liste, lieu) {
  const tabLieu = liste.filter((plante) => plante.lieu === lieu);
  return tabLieu;
}
//console.log(filtrerParLieu(plantes, "extérieur")); // doit afficher 4 plantes

function filtrerParArrosage(liste) {
  const tabAArroser = liste.filter((plante) => plante.aArroser);
  return tabAArroser;
}
//console.log(filtrerParArrosage(plantes)); //doit afficher 4 plantes à arroser

// ---------- PARTIE 2 : les fonctions qui AFFICHENT ----------
// Elles modifient la page. Elles ne retournent rien.
const listeAffichee = document.getElementById("liste");
const compteurArrosage = document.getElementById("compteur");
// TODO 3 — afficherPlantes(liste)
// 1. Vide la liste <ul id="liste">
// 2. Pour chaque plante, crée un <li> qui contient l'emoji puis le nom
// 3. Si la plante est à arroser, ajoute au <li> la classe "a-arroser"
// 4. Mets à jour <p id="compteur"> : « 4 plantes à arroser sur 8 »
//    (utilise compterAArroser, ne recompte pas ici)
function afficherPlantes(liste) {
  listeAffichee.innerHTML = "";
  liste.forEach((plante) => {
    const identitePlante = document.createElement("li");
    identitePlante.innerHTML = `${plante.emoji} ${plante.nom}`;
    if (plante.aArroser) {
      identitePlante.classList.add("a-arroser");
    }
    listeAffichee.appendChild(identitePlante);
    if (compterAArroser(liste) <= 1) {
      compteurArrosage.innerHTML = `${compterAArroser(liste)} plante à arroser sur ${liste.length}`;
    } else {
      compteurArrosage.innerHTML = `${compterAArroser(liste)} plantes à arroser sur ${liste.length}`;
    }
  });
}

// TODO 4 — Au chargement de la page, affiche toutes les plantes.
afficherPlantes(plantes);
// ---------- PARTIE 3 : les clics ----------

// TODO 5 — Les trois boutons de filtre
const btnInterieur = document.getElementById("btn-interieur");
const btnExterieur = document.getElementById("btn-exterieur");
const btnToutes = document.getElementById("btn-toutes");
const btnArrosage = document.getElementById("btn-arrosage");

btnExterieur.addEventListener("click", () => {
  const plantesExterieur = filtrerParLieu(plantes, "extérieur");
  afficherPlantes(plantesExterieur);
  boutonActif(btnExterieur);
  boutonInactif([btnInterieur, btnToutes, btnArrosage]);
});

btnInterieur.addEventListener("click", () => {
  const plantesInterieur = filtrerParLieu(plantes, "intérieur");
  afficherPlantes(plantesInterieur);
  boutonActif(btnInterieur);
  boutonInactif([btnExterieur, btnToutes, btnArrosage]);
});

btnToutes.addEventListener("click", () => {
  afficherPlantes(plantes);
  boutonActif(btnToutes);
  boutonInactif([btnExterieur, btnInterieur, btnArrosage]);
});

btnArrosage.addEventListener("click", () => {
  const plantesAArroser = filtrerParArrosage(plantes);
  afficherPlantes(plantesAArroser);
  boutonActif(btnArrosage);
  boutonInactif([btnExterieur, btnToutes, btnInterieur]);
});
// Au clic sur « Intérieur » : affiche seulement les plantes d'intérieur.
// Au clic sur « Extérieur » : seulement celles d'extérieur.
// Au clic sur « Toutes » : toutes les plantes.
// Les gestionnaires sont des fonctions fléchées : () => { ... }

// TODO 6 — Le bouton actif
// Le bouton cliqué prend la classe "actif", les deux autres la perdent.
function boutonActif(bouton) {
  bouton.classList.add("actif");
}
function boutonInactif(tabBouton) {
  tabBouton.forEach((bouton) => {
    bouton.classList.remove("actif");
  });
}

// =====================================================
// Questions de recul (réponds en commentaire ici)
// 1. On pourrait tester toutes les fonctions qui calculent avec Jest. On ne peut pas tester la fonction afficher plantes car elle ne retourne rien, elle gère un affichage dans le html.
// 2. La liste va devenir de plus en plsu longue avec les doublons créés à chaque clic. Les filtres ne fonctionneront donc plus puisque les plantes filtrées vont se rajouter aux plantes affichées avec le bouton précédent. C'est ce qui se passe quand on enlève la ligne de code qui vide la liste.
// 3. Voici le message qui s'affiche : script.js:67 Uncaught ReferenceError: plantes is not defined
//    at script.js:67:17. Le message me dit que le tableau plantes n'est pas défini. En effet script.js se charge avant plantes.js et donc au moment du chargement plantes n'est pas encore déclaré. D'où l'intérêt de d'abord charger plantes.js, ainsi plantes est déclaré et et script.js peut aller mire le contenu de ce tableau d'objets.
// =====================================================
