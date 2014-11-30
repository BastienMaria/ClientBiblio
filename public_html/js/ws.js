/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function addCat() {

    var cat = [
        {"description": "test", "id": 1, "nom": "ScienceFiction"},
        {"description": "test", "id": 2, "nom": "Roman"},
        {"description": "test", "id": 3, "nom": "Autre"},
        {"description": "test", "id": 4, "nom": "Nouvelles"}
    ];

    for (i = 0; i < 5; i++) {

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/BiblioProject/webresources/categorie",
            data: JSON.stringify(cat[i]),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                alert(data);
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }
}

$(document).ready(function () {
    addCat();
    getData();
});


var getData = function () {
    $.ajax({
        url: "http://localhost:8080/BiblioProject/webresources/categorie",
        type: "GET",
        headers: {
            Accept: "application/json"
        }
    }).success(function (data, status, jq) {
//Cette fonction indique à knockout d'appliquer les données aux éléments de la page 
//Elle est toujours appelée quand les données sont pretes et est appelée qu'une fois 
        ko.applyBindings(new ViewModel(data));
    }).error(function (jq, status, error) {
        $(".error").text(JSON.stringify(status + " " + error));

    });
};