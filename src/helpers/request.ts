import axios from 'axios'
import { ElMessage  } from 'element-plus'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'http://localhost:8080'


type RequestOption = {
  url: string,
  method: RequestMethod,
  params?: any,
  data?: any
}

export default function request<T>(url: string, type = RequestMethod.GET, data = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    let option: RequestOption = {
      url,
      method:  type,
    }
    if(type.toLowerCase() === 'get') {
      option.params = data
    }else {
      option.data = data
    }
    if(localStorage.token) {
      axios.defaults.headers.common['Authorization']  = localStorage.token
    }

    axios(option).then(res => {
      // console.log(res.data)
      if(res.data.status === 'ok') {
        if(res.data.token) {
          localStorage.token = res.data.token
        }
        resolve(res.data)
      }else{
        ElMessage.error(res.data.msg)
        reject(res.data)
      }
    }).catch(err => {
      ElMessage.error('网络异常')
      reject({ msg: '网络异常' })
    })
  })
}
