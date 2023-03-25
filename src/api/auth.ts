import request from '../helpers/request'

interface Url {
  REGISTER: string,
  LOGIN: string,
  LOGOUT: string,
  GET_INFO: string
}

const URL: Url = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  GET_INFO: '/auth'
}

type UsernameAndPassword = {
  username: string,
  password: string
}

export default {
  register({username, password}: UsernameAndPassword) {
    return request(URL.REGISTER, RequestMethod.POST, { username, password })
  },

  login({username, password}: UsernameAndPassword) {
    return request(URL.LOGIN, RequestMethod.POST, { username, password })
  },

  logout() {
    localStorage.removeItem('token')
    return request(URL.LOGOUT)
  },

  getInfo() {
    return request(URL.GET_INFO)
  }
}
