import { useEffect, useState } from "react";
import React from "react";

function Weather() {
  const [search, setSearch] = useState("Mumbai");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  let liveUpdate = true;
  useEffect(() => {
    const liveData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=9f47f7c5bcaa0118cc28945441d2ab18`
      );
      if (liveUpdate) {
        setData(await response.json());
        console.log(data);
      }
      return () => {
        liveUpdate = false;
      };
    };
    liveData();
  }, [search]);

  let emoji = null;
  if (typeof data.main != "undefined") {
    if (data.weather[0].main === "clouds") {
      emoji = "fa-cloud";
    } else if (data.weather[0].main === "Thunderstorm") {
      emoji = "fa-bolt";
    } else if (data.weather[0].main === "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (data.weather[0].main === "Rain") {
      emoji = "fa-cloud-shower-heavy";
    } else if (data.weather[0].main === "Snow") {
      emoji = "fa-snow-flake";
    } else {
      emoji = "fa-smog";
    }
  } else {
    return <div>...Loading</div>;
  }

  let temp = (data.main.temp - 273.15).toFixed(2);
  let temp_min = (data.main.temp_min - 273.15).toFixed(2);
  let temp_max = (data.main.temp_max - 273.15).toFixed(2);

  // date
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  // time
  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleData = (e) =>{
    e.preventDefault();
    setSearch(input);
  }

  return (
    <>
      <h1 className="text-center">Weather Update</h1>
      <div className="container  bg-body-tertiary ">
        <div className="row justify-content-center">
          <div className="col-md-4 ">
            <div class="card text-white text-center border-0 mb-3 mt-3">
              <img
                src={`https://source.unsplash.com/500x800/?${data.weather[0].main} `}
                class="card-img w-100 "
                alt="..."
                height={560}
              />
              <div class="card-img-overlay">
                <form onSubmit={handleData}>
                  <div class="input-group mb-4 w-75 mx-auto ">
                    <input
                      type="search"
                      class="form-control"
                      placeholder="Search City"
                      aria-label="search city"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <button class="input-group-text" id="basic-addon2">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-3">
                  <h5 class="card-title">{data.name}</h5>
                  <p class="card-text lead">
                    {day}, {month} {date}, {year}
                    <br />
                    {time}
                  </p>
                  <hr />
                  <i className={`fa ${emoji} fa-4x `}></i>
                  <h1>{temp} &deg;C</h1>
                  <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                  <p className="lead">
                    {temp_min}&deg; C | {temp_max} &deg;C
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
