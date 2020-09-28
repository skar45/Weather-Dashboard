
var APIkey = "0fe553ae085323c0c8fa3a6f68d285c8"

function getInfo(){
    var city = document.querySelector("#search").value;
    queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log("working");
      })
}

document.querySelector("#submit").addEventListener("onclick",getInfo);