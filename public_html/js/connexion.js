var getUsers = function () {
    
    var login = document.getElementById("user").value;
    var mdp = document.getElementById("mdp").value;
    
    $.ajax({
        url: "http://localhost:8080/BiblioProject/webresources/users/check/" + login + "/" + mdp,
        type: "GET",
        headers: {
            Accept: "text/html"
        }
    }).success(function (data, status, jq) {
        
        if (data == 'ok')
             document.location.href="index.html" 
        else {
            window.location.reload();
        }
    }).error(function (jq, status, error) {
        $(".error").text(JSON.stringify(status + " " + error));

    });
};
