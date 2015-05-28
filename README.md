# Solution TP AngularJS de HN Institut

Attention, ceci n’est pas *la* solution, mais *un exemple* de solution.
Il n’y a jamais une seule solution possible à un problème informatique.

## Exercice 7

* `success && success();` est un racourci pour tester que `success`
  est définie avant de l’appeler.
* Remarquer qu la base de données est une variable privée du service.
  Il n’y a aucun moyen d’y accéder sans passer par le service.
* De même, `c`, `new_` et `self` sont des variables privées d’un contact.
* Tout ce qui doit s’exécuter après la fin d’une méthode asynchrone
  doit être mis dans une méthode callback.
* Le module principal ne dépend que du module des contrôleurs,
  en effet les services ne sont pas appelés directement par la page HTML.
* Le module des contrôleurs dépends du module des service
  puisque le contrôleur utilise le service.
* Si on indique que le module principal dépend des deux autres
  et qu’eux-mêmes n’ont aucunes dépendances ça marche,
  mais ce n’est pas propre et ça pose des problèmes pour les tests unitaires.

## Exercice 6

* Si l’exemple du sujet montrait un filtrage sur une chaîne statique,
  il est évidement possible d’utiliser n’importe quelle expression
  comme paramètre de `filterBy:`. En particulier, un élément du modèle.
* Noter que la recherche fonctionne sur tous les champs des contacts.

## Exercice 5

Utilisation de la méthode [.factory()][Module.factory] pour enregistrer
le service.
C’est la solution la plus simple, mais `.provider()` et `.service()`
auraient aussi été possibles.

[Module.factory]: https://docs.angularjs.org/api/ng/type/angular.Module#factory

## Exercice 4

* On utilise la directive [ngSubmit][ngSubmit] pour ajouter un contact.
  *ngClick* sur le bouton « Ajouter » aurait aussi pu convenir,
  mais avec ngSubmit l’action est également déclenchée lorsque
  l’utilisateur appuie sur « Entrée ».
* Les éléments `input` pour les champs « email » et « téléphone »
  ont le type approprié dans l’attribut `type`.
* La directive *ngClick* sur les boutons de suppressions
  a accès au contact du contexte.
  Cela permet de coder très simplement la fonction `remove()`.
* La fonction `addTelUri()` pour avoir des URI sur les numéros de
  téléphone n’était pas demandée pour cet exercice,
  mais sera utile pour les suivants.  
* On ajoute pas de contact si tous les champs ne sont pas renseignés.
  On aurait pu mettre seulement certains champs obligatoires.

[ngSubmit]: https://docs.angularjs.org/api/ng/directive/ngSubmit
