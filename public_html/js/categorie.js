/*
 Ceci est equivalent à une classe Java, on veut faire propre!
 */
var Category = function (categorie) {
    this.id = ko.observable(categorie.id);
    this.nom = ko.observable(categorie.nom);
    this.description = ko.observable(categorie.description);
};

/*
 Cette function est le controlleur de la vue 
 Elle assure la communication entre la vue et le modèle, une sorte de pont quoi! 
 */
var ViewModel = function (categories) {
    var self = this;
    //représente la liste des catégories
    //La fonction prend la réponse obtenue du serveur en paramètre
    //Ici nous supposons que vous avez chargé la liste des catégories
    //ko.utils.arrayMap itère sur la collection et pour chaque objet trouvé, elle crée une instance de categorie 
    self.categories = ko.observableArray(ko.utils.arrayMap(categories, function (categorie) {
        return new Category(categorie);
    }));
};