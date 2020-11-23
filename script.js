let cityList = localStorage.getItem("cityList")? JSON.parse(localStorage.getItem("cityList")):[];

var APIkey = "0fe553ae085323c0c8fa3a6f68d285c8"
const kelvin = 273.15;

cityList.forEach(element => {
  addList(element);
});


function getUV(lat,lon){
  let queryURL ="http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+APIkey+""
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
   document.querySelector("#UVindex").innerHTML = "UV: <span>" + response["value"] +"</span>";
   if (parseFloat(response["value"])>7){
    document.querySelector("#UVindex").setAttribute("style","background-color:red;")
   } else if (parseFloat(response["value"])>4){
    document.querySelector("#UVindex").setAttribute("style","background-color:yellow;") 
   } else {
    document.querySelector("#UVindex").setAttribute("style","background-color:green;")
   }
  }) 
}

function getIcon(element,icon){
  let url = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
  element.innerHTML=`<img src=${url}>`;
}

function getInfo(city){
//  event.preventDefault();
    
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        document.querySelector(".col-8").setAttribute("style","display:block")
        document.querySelector("#city").innerHTML = response.city.name;
        document.querySelector("#temp").textContent = "Temp: " + parseInt(response.list[0].main.temp-kelvin) + "°C";
        document.querySelector("#humidity").textContent = "Humidity: " + response.list[0].main.humidity;
        document.querySelector("#wind-speed").textContent = "Wind Speed: " + response.list[0].wind.speed;

        document.querySelector("#date1").innerHTML= moment().add(1,'day').format('l');
        document.querySelector("#date2").textContent= moment().add(2,'days').format('l');
        document.querySelector("#date3").textContent= moment().add(3,'days').format('l');
        document.querySelector("#date4").textContent= moment().add(4,'days').format('l');
        document.querySelector("#date5").textContent= moment().add(5,'days').format('l');
        getIcon(document.querySelector("#fi"),response.list[0].weather[0].icon);

        let latitude = response.city.coord.lat
        let longitude = response.city.coord.lon
        getUV(latitude,longitude);
        for(let i=1;i<6;i++){
          let g = document.querySelector("#stuff").children[i].children[0]
          g.children[2].textContent ="Temp: " + parseInt(response.list[(8*i)-1].main.temp - kelvin) + "°C";
          getIcon(g.children[1],response.list[(8*i)-1].weather[0].icon);
          g.children[3].textContent ="Humidity: " + response.list[(8*i)-1].main.humidity;
        }
      })
}

function display(event){
  getInfo(event.target.innerHTML);
}

function addList(city){
    
    console.log(cityList)
    
    var li = document.createElement("li");
    li.textContent = city;
    
    li.classList.add("list-group-item");
    document.querySelector("#list").append(li);
    li.addEventListener("click",display);
}



document.querySelector("#submit").addEventListener("click",function(event){
  event.preventDefault();
  getInfo(document.querySelector("#search").value);
  if(cityList.indexOf(document.querySelector("#search").value) == -1){
    addList(document.querySelector("#search").value);
    cityList.push(document.querySelector("#search").value);
    localStorage.setItem("cityList",JSON.stringify(cityList ));
  }
});