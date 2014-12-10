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

$("#form").submit(function (event) {
    var user = $('#userName').val();
    var mdp = $('#mdp').val();
    checkConnexion(user, mdp);
    event.preventDefault();
});

var getData = function () {
    $.ajax({
        url: "http://localhost:8080/BiblioProject/webresources/categorie",
        type: "GET",
        headers: {
            Accept: "application/json",
        }
    }).success(function (data, status, jq) {
        //Cette fonction indique à knockout d'appliquer les données aux éléments de la page 
        //Elle est toujours appelée quand les données sont pretes et est appelée qu'une fois 
        if (data.status)
            ko.applyBindings(new ViewModel(data.data));
        else {
            alert(data.message)
        }
    }).error(function (jq, status, error) {
        $(".error").text(JSON.stringify(status + " " + error));

    });
};

$.ajax({
    url: "http://localhost:8080/bibliotheque_ntdp/webresources/category",
    type: "GET",
    headers: {
        Accept: "application/json",
        miage_authorization: "12345678903"

    }

}).success(function (data, status, jq) {

}).error(function (jq, status, error) {
});

function checkConnexion(user, mdp) {
    $.ajax({
        url: "http://localhost:8080/BiblioProject/webresources/users/check/" + user + "/" + mdp
    }).then(function (data) {
        alert(data);
    });
}








