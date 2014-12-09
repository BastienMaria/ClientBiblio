var self = this;
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
    //représente la liste des catégories
    //La fonction prend la réponse obtenue du serveur en paramètre
    //Ici nous supposons que vous avez chargé la liste des catégories
    //ko.utils.arrayMap itère sur la collection et pour chaque objet trouvé, elle crée une instance de categorie 
    self.categories = ko.observableArray(ko.utils.arrayMap(categories, function (categorie) {
        return new Category(categorie);
    }));

};

self.removed = function (categorie) {
    self.categories.remove(categorie);
    $.ajax({
        url: "http://localhost:8080/BiblioProject/webresources/categorie/" + categorie.id(),
        type: "DELETE",
        contentType: "application/json",
        headers: {
            Accept: "application/json"
        }
    })
            .success(function (data, status, jq) {

                // self.categories.remove(categorie);
            })
            .error(function (jq, status, error) {
                $(".error").text(JSON.stringify(status + " " + error));
            });
};

self.updated = function (categorie) {
    $.ajax({
        url: "http://localhost:8080/BiblioProject/webresources/categorie/" + categorie.id(),
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(ko.toJS(categorie), null, 2),
        headers: {
            Accept: "application/json"
        }
    })
            .success(function (data, status, jq) {

            })
            .error(function (jq, status, error) {
                $(".error").text(JSON.stringify(status + " " + error));

            });
};

self.added = function (categorie) {

    var id = document.getElementById("id").value;
    var description = document.getElementById("description").value;
    var nom = document.getElementById("nom").value;
    var JSONObject = {
        "description": description,
        "id": id,
        "nom": nom
    };

    $.ajax({
        url: "http://localhost:8080/BiblioProject/webresources/categorie/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(JSONObject),
        dataType: 'JSON'
    })
            .success(function (data) {
                self.categories.update(categorie);

            })
            .error(function (jq, status, error) {
                $(".error").text(JSON.stringify(status + " " + error));
            });

    $("span").text("Ajout réalisé!").show().fadeOut(2000);

    //window.location.reload();
};
