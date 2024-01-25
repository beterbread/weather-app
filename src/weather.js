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
    localStorage.setItem("lastLocation", location);
  }

  function getLocation() {
    return localStorage.getItem("lastLocation");
  }

  function savePreference(pref) {
    localStorage.setItem("preference", pref);
  }

  function getPreference() {
    return localStorage.getItem("preference");
  }

  const storedPref = getPreference();
  if (storedPref === "f") {
    celsius = false;
    measure.textContent = "Display °C";
  } else {
    celsius = true;
    measure.textContent = "Display °F";
  }

  if (check) {
    // default location on page load
    const lastLocation = getLocation();
    if (lastLocation) {
      getWeather(lastLocation).then((obj) => {
        check = false;
        invalid.textContent = "";
        name.textContent = `${obj.name}, `;
        if (obj.country === "United States of America") {
          name.textContent += obj.region;
        }
        else if (obj.country === "") {
          name.textContent += obj.region;
        } else {
          name.textContent += obj.country;
        }
        if (storedPref === "f") {
          temp.textContent = `${obj.temp_f}°`;
          feelslike.textContent = `Feels like ${obj.feelslike_f}°`;
        } else {
          temp.textContent = `${obj.temp_c}°`;
          feelslike.textContent = `Feels like ${obj.feelslike_c}°`;
        }
        condition.textContent = obj.condition;
        data = obj;
      });
    } else {
      getWeather("College Station").then((obj) => {
        check = false;
        invalid.textContent = "";
        name.textContent = `${obj.name}, Texas`;
        if (storedPref === "f") {
          temp.textContent = `${obj.temp_f}°`;
          feelslike.textContent = `Feels like ${obj.feelslike_f}°`;
        } else {
          temp.textContent = `${obj.temp_c}°`;
          feelslike.textContent = `Feels like ${obj.feelslike_c}°`;
        }
        condition.textContent = obj.condition;
        data = obj;
      });
    }
  }

  function handleSearch() {
    const inputValue = input.value.trim();
    if (inputValue !== "") {
      getWeather(inputValue)
        .then((obj) => {
          saveLocation(inputValue);
          input.value = "";
          invalid.textContent = "";
          name.textContent = `${obj.name}, `;
          if (obj.country === "United States of America") {
            name.textContent += obj.region;
          }
          else if (obj.country === "") {
            name.textContent += obj.region;
          } else {
            name.textContent += obj.country;
          }
          if (celsius) {
            temp.textContent = `${obj.temp_c}°`;
            feelslike.textContent = `Feels like ${obj.feelslike_c}°`;
          } else {
            temp.textContent = `${obj.temp_f}°`;
            feelslike.textContent = `Feels like ${obj.feelslike_f}°`;
          }
          condition.textContent = obj.condition;
          data = obj;
        })
        .catch(() => {
          input.value = "";
          invalid.innerHTML =
            'Location not found<br>Search must be formatted "City", "City, State", or "City, Country"';
        });
    }
  }

  search.addEventListener("click", handleSearch);

  input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  });

  measure.addEventListener("click", () => {
    if (measure.textContent === "Display °F") {
      celsius = false;
      savePreference("f");
      measure.textContent = "Display °C";
      temp.textContent = `${data.temp_f}°`;
      feelslike.textContent = `Feels like ${data.feelslike_f}°`;
    } else {
      celsius = true;
      savePreference("c");
      measure.textContent = "Display °F";
      temp.textContent = `${data.temp_c}°`;
      feelslike.textContent = `Feels like ${data.feelslike_c}°`;
    }
  });
}

export default updateWeather;
