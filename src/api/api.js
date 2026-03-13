import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true
})

// Добавляем токен в каждый запрос
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
api.interceptors.response.use(
  (response) => response,

  async (error) => {

    const originalRequest = error.config

    // если ошибка не refresh запроса
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh")
    ) {

      originalRequest._retry = true

      try {

        const res = await api.post("/refresh")

        const newToken = res.data.access_token

        localStorage.setItem("token", newToken)

        originalRequest.headers.Authorization = `Bearer ${newToken}`

        return api(originalRequest)

      } catch (err) {

        localStorage.removeItem("token")
        window.location.href = "/login"

      }
    }

    return Promise.reject(error)
  }
)
export default api