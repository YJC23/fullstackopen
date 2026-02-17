import axios from 'axios'
const limit = '1'
const API_KEY = import.meta.env.VITE_SOME_KEY


const getCity = ( city ) => {
  const request = axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${API_KEY}`)
  return request.then(response => response.data)
}

const getWeather = (lat, lon) => {
  const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
  return request.then(response => response.data)
}
export default { getCity, getWeather }