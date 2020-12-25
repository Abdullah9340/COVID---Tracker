const listOfCountries = document.querySelector("#Country-List");
const new_deaths = document.querySelector(".new-death");
const total_deaths = document.querySelector(".total-death");
const new_cases = document.querySelector(".new-case");
const total_cases = document.querySelector(".total-case");
const new_recovered = document.querySelector(".new-recovered");
const total_recovered = document.querySelector(".total-recovered");


window.addEventListener("load",() => {
    setGlobal();

});

listOfCountries.addEventListener("change",onChange);

function onChange(e){
    if(listOfCountries.value === "global"){
        setGlobal();
    }else{
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate() -1;
    var year = dateObj.getUTCFullYear();
    newdate = year + "-" + month + "-" + day;
    const countryApi = "https://api.covid19api.com/total/dayone/country/" + listOfCountries.value;
    const recoveryApi = `https://api.covid19api.com/total/country/${listOfCountries.value}/status/recovered?from=2019-03-01T00:00:00Z&to=${newdate}T00:00:00Z`
    fetch(countryApi).then(response => {
        return response.json();
    }).then(data =>{
        new_deaths.textContent = data[data.length -1].Deaths - data[data.length -2].Deaths;
        total_deaths.textContent = data[data.length -1].Deaths;
        new_cases.textContent = data[data.length -1].Confirmed - data[data.length -2].Confirmed;
        total_cases.textContent = data[data.length -1].Confirmed;
    });

    fetch(recoveryApi).then(response => {
        return response.json();
    }).then(data => {
        new_recovered.textContent = data[data.length-1].Cases - data[data.length - 2].Cases;
        total_recovered.textContent = data[data.length -1].Cases;
    });
    }
}


function setGlobal(){
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const api = `${proxy}https://api.covid19api.com/summary`;
    fetch(api).then(response =>{
        return response.json();
    }).then(data =>{
        data.Countries.forEach((data) =>{
            var opt = document.createElement('option');
            opt.value = data.Country;
            opt.innerHTML = data.Country;
            listOfCountries.appendChild(opt);
        });
        new_deaths.textContent = data.Global.NewDeaths;
        total_deaths.textContent = data.Global.TotalDeaths;
        new_cases.textContent = data.Global.NewConfirmed;
        total_cases.textContent = data.Global.TotalConfirmed;
        new_recovered.textContent = data.Global.NewRecovered;
        total_recovered.textContent = data.Global.TotalRecovered;
    });
}

