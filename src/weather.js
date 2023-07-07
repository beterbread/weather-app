function getWeather(location) {
  return fetch(
    `https://api.weatherapi.com/v1/current.json?key=7f47f9ba1d7d440a8ca25252230707&q=${location}`,
    { mode: "cors" },
  )
    .then((response) => response.json())
    .then((response) => ({
      name: response.location.name,
      region: response.location.region,
      country: response.location.country,
      condition: response.current.condition.text,
      temp_c: response.current.temp_c,
      temp_f: response.current.temp_f,
      feelslike_c: response.current.feelslike_c,
      feelslike_f: response.current.feelslike_f,
    }));
}

let check = true;
let celsius = true;

function updateWeather() {
  const input = document.querySelector("input");
  const search = document.querySelector("#search");
  const invalid = document.querySelector("#invalid");
  const name = document.querySelector("#name");
  const condition = document.querySelector("#condition");
  const temp = document.querySelector("#temp");
  const feelslike = document.querySelector("#feelslike");
  const measure = document.querySelector("#measure");
  
  let data;
  
  function saveLocation(location) {
    localStorage.setItem('lastSearchedLocation', location);
  }
  
  function getLastSearchedLocation() {
    return localStorage.getItem('lastSearchedLocation');
  }

  if (check) {
    // default location on page load
    const lastSearchedLocation = getLastSearchedLocation();
    if (lastSearchedLocation) {
      getWeather(lastSearchedLocation).then((obj) => {
        check = false;
        invalid.textContent = "";
        name.textContent = `${obj.name}, `;
        if (obj.region === "") {
          name.textContent += obj.country;
        } else {
          name.textContent += obj.region;
        }
        temp.textContent = `${obj.temp_c}°`;
        feelslike.textContent = `Feels like ${obj.feelslike_c}°`;
        condition.textContent = obj.condition;
        data = obj;
      });
    } else {
      getWeather("College Station").then((obj) => {
        check = false;
        invalid.textContent = "";
        name.textContent = `${obj.name}, `;
        if (obj.region === "") {
          name.textContent += obj.country;
        } else {
          name.textContent += obj.region;
        }
        temp.textContent = `${obj.temp_c}°`;
        feelslike.textContent = `Feels like ${obj.feelslike_c}°`;
        condition.textContent = obj.condition;
        data = obj;
      });
    }
  }

  search.addEventListener("click", () => {
    getWeather(input.value)
      .then((obj) => {
        input.value = '';
        invalid.textContent = "";
        name.textContent = `${obj.name}, `;
        if (obj.region === "") {
          name.textContent += obj.country;
        } else {
          name.textContent += obj.region;
        }
        if (celsius) {
          temp.textContent = `${obj.temp_c}°`;
          feelslike.textContent = `Feels like ${obj.feelslike_c}°`;
        } else {
          temp.textContent = `${obj.temp_f}°`;
          feelslike.textContent = `Feels like ${obj.feelslike_f}°`;
        }
        data = obj;
        saveLocation(input.value);
      })
      .catch(() => {
        input.value = '';
        invalid.innerHTML = 'Location not found<br>Search must be formatted "City", "City, State", or "City, Country"'
      });
  });

  measure.addEventListener("click", () => {
    if (measure.textContent === "Display °F") {
      celsius = false;
      measure.textContent = "Display °C";
      temp.textContent = `${data.temp_f}°`;
      feelslike.textContent = `Feels like ${data.feelslike_f}°`;
    } else {
      celsius = true;
      measure.textContent = "Display °F";
      temp.textContent = `${data.temp_c}°`;
      feelslike.textContent = `Feels like ${data.feelslike_c}°`;
    }
  });
}

export { updateWeather };
