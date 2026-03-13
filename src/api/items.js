// src/api/items.js
import api from "../api/api" // путь к твоему axios instance

export async function addItem( formData ) {
  try {
    const res = await api.post("/add_item", formData)
    // если сервер вернул 204 No Content — возвращаем null, иначе данные
    return res.status === 204 ? null : res.data
  } catch (err) {
    // вытянем полезную ошибку, аналогично твоему fetch-коду
    const detail =
      err.response?.data?.detail ||
      err.response?.statusText ||
      err.message ||
      "Unknown error"
    throw new Error(detail)
  }
}

export async function deleteItem(itemId) {
  try {
    const res = await api.delete(`/delete_item/${itemId}`)
    return res.status === 204 ? null : res.data
  } catch (err) {
    const detail =
      err.response?.data?.detail ||
      err.response?.statusText ||
      err.message ||
      "Unknown error"
    throw new Error(detail)
  }
}

export async function editItem( formData ) {
  try {
    // если backend ожидает itemId в URL, можно использовать `/update_item/${itemId}`
    // если ожидает в formData — убедись, что itemId добавлен в formData до вызова
    const res = await api.patch("/update_item", formData)
    return res.status === 204 ? null : res.data
  } catch (err) {
    const detail =
      err.response?.data?.detail ||
      err.response?.statusText ||
      err.message ||
      "Unknown error"
    throw new Error(detail)
  }
}