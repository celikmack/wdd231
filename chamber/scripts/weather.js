// CHAMBER OF COMMERCE PROJECT

const myTown = document.querySelector("#town");
myTown.textContent = "Candeias";

// Day 1 elements
const date1 = document.querySelector("#date1");
const graphic1 = document.querySelector("#graphic1");
const description1 = document.querySelector("#description1");
const temperature1 = document.querySelector("#temperature1");
const humidity1 = document.querySelector("#humidity1");

// Day 2 elements
const date2 = document.querySelector("#date2");
const graphic2 = document.querySelector("#graphic2");
const description2 = document.querySelector("#description2");
const temperature2 = document.querySelector("#temperature2");
const humidity2 = document.querySelector("#humidity2");

// Day 3 elements
const date3 = document.querySelector("#date3");
const graphic3 = document.querySelector("#graphic3");
const description3 = document.querySelector("#description3");
const temperature3 = document.querySelector("#temperature3");
const humidity3 = document.querySelector("#humidity3");

// API URL variables
const myKey = "e4fb9686da3535ce9f2e95982ad51973";
const myLat = "-12.6677";   
const myLong = "-38.5588";
const myURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

async function apiFetch() {
  try {
    const response = await fetch(myURL);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

// Function to get and display 3 days or forecast
function displayResults(data) {
    myTown.textContent = "Candeias";

    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    const formatDate = (dtTxt) => {
        const dateObj = new Date(dtTxt);
        return dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    if (dailyForecasts.length >= 3) {
        // Populate Day 1
        date1.innerHTML = formatDate(dailyForecasts[0].dt_txt);
        graphic1.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecasts[0].weather[0].icon}@2x.png`);
        graphic1.setAttribute("alt", dailyForecasts[0].weather[0].description);
        description1.innerHTML = dailyForecasts[0].weather[0].description;
        temperature1.innerHTML = `${dailyForecasts[0].main.temp.toFixed(0)}&deg;C`;
        humidity1.innerHTML = `Humidity: ${dailyForecasts[0].main.humidity}%`;

        // Populate Day 2
        date2.innerHTML = formatDate(dailyForecasts[1].dt_txt);
        graphic2.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecasts[1].weather[0].icon}@2x.png`);
        graphic2.setAttribute("alt", dailyForecasts[1].weather[0].description);
        description2.innerHTML = dailyForecasts[1].weather[0].description;
        temperature2.innerHTML = `${dailyForecasts[1].main.temp.toFixed(0)}&deg;C`;
        humidity2.innerHTML = `Humidity: ${dailyForecasts[1].main.humidity}%`;

        // Populate Day 3
        date3.innerHTML = formatDate(dailyForecasts[2].dt_txt);
        graphic3.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecasts[2].weather[0].icon}@2x.png`);
        graphic3.setAttribute("alt", dailyForecasts[2].weather[0].description);
        description3.innerHTML = dailyForecasts[2].weather[0].description;
        temperature3.innerHTML = `${dailyForecasts[2].main.temp.toFixed(0)}&deg;C`;
        humidity3.innerHTML = `Humidity: ${dailyForecasts[2].main.humidity}%`;
    }
}

apiFetch();