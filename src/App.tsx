import React, {useState} from 'react';
const key = process.env.REACT_APP_API_KEY;

function App() {

    let locationData: number[] = [];
    let [weatherData, setWeatherData] = useState([]);

    let getLocationData = function() {
        navigator.geolocation.getCurrentPosition((pos) => {
            let crd = pos.coords;
            let answer = [crd.latitude, crd.longitude];
            locationData = answer;
        }, () => {alert("You must share your location to use this app.")})
    }
    let getWeather = function() {
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + locationData[0] + '&lon=' + locationData[1] + '&appid=' + key)
            .then(res => res.json())
            .then(data => {setWeatherData(data.daily); console.log(weatherData)})
            .catch(console.error)
    }
    let fetchData = function(index: number) {
        if(weatherData !== undefined && weatherData.length>0) {
            // @ts-ignore
            return weatherData[index].weather[0].description;
        }
    }

    return (
      <div>
          <p>So anyways かたぎりは電気狐の夢を見るか？</p>
          <button onClick={getLocationData}>Get Location</button><br></br>
          <button onClick={getWeather}>Get Weather</button><br></br>
          <table>
              <tbody>
              <tr>
                  <th>Day</th>
                  <th>Description</th>
              </tr>
              <tr>
                  <td>Day 1</td>
                  <td>{fetchData(0)}</td>
              </tr>
              <tr>
                  <td>Day 2</td>
                  <td>{fetchData(1)}</td>
              </tr>
              <tr>
                  <td>Day 3</td>
                  <td>{fetchData(2)}</td>
              </tr>
              <tr>
                  <td>Day 4</td>
                  <td>{fetchData(3)}</td>
              </tr>
              <tr>
                  <td>Day 5</td>
                  <td>{fetchData(4)}</td>
              </tr>
              </tbody>
          </table>
      </div>
    );
}

export default App;
