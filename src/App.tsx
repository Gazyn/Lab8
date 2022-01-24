import React, {useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
const key = process.env.REACT_APP_API_KEY;

export interface locationInfo {
    x: number
    y: number
    setLocationData: any
}

const ClickHandler: React.FC<locationInfo> = ({x, y, setLocationData}) => {
    useMapEvents({
        click: (e) => {
            setLocationData([e.latlng.lat, e.latlng.lng]);
        }
    })
    return null;
}

const Map: React.FC<locationInfo> = ({x=0, y=0, setLocationData}) => {
    return (
        <MapContainer center={[x, y]} zoom={13} scrollWheelZoom={true} id={"map"}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[x, y]}>
                <Popup>
                    A pretty CSS3 popup. <br /> No idea why it doesn't pan to it.
                </Popup>
            </Marker>
            <ClickHandler x={x} y={y} setLocationData={setLocationData}/>
        </MapContainer>
    )
}

function App() {

    let [locationData, setLocationData]: any = useState([]);
    let [weatherData, setWeatherData]: any = useState([]);

    let getLocationData = function() {
        navigator.geolocation.getCurrentPosition((pos) => {
            let crd = pos.coords;
            let answer = [crd.latitude, crd.longitude];
            setLocationData(answer);
        }, () => {alert("You must share your location to use this app.")})
    }

    let getWeather = function() {
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + locationData[0] + '&lon=' + locationData[1] + '&appid=' + key)
            .then(res => res.json())
            .then(data => {setWeatherData(data.daily); console.log(data)})
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
          <Map x={locationData[0]} y={locationData[1]} setLocationData={setLocationData}/>
          <button onClick={getWeather}>Get this location's weather data</button><br/>
          <button onClick={getLocationData}>Set to your location</button><br/>
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
