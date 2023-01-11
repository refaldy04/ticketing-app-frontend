import axios from 'axios'

const http = () => {
  return axios.create({
    baseURL: 'https://ticketing-app-two.vercel.app',
  })
}

export default http
