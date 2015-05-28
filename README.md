# Solution TP AngularJS de HN Institut

Attention, ceci n’est pas *la* solution, mais *un exemple* de solution.
Il n’y a jamais une seule solution possible à un problème informatique.

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
