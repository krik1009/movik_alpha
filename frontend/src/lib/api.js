import axios from 'axios'
import { getToken } from './auth'

export const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}


// contents
export const getAllContents = async () => {
  const { data } = await axios.get('/api/contents')
  return data
}

export const getSingleContent = async id => {
  const { data } = await axios.get(`/api/contents/${id}`)
  return data
}

export const getSameTagContents = async tagId => {
  const { data } = await axios.get(`/api/tags/${tagId}`
  // , {
    // headers: { 'Content-Type': 'application/json' }
  // }
  )
  return data.tagged_contents
}

export const uploadContent = async formData => {
  const { data } = await axios.post(`/api/contents/`, formData, withHeaders())
  return data
}

// users
export const getSingleUser = async userId => {
  const { data } = await axios.get(`/api/profiles/${userId}/`, withHeaders())
  return data
}

export const registerUser = async formData => {
  return await axios.post(`/api/register/`, formData)
}

export const loginUser = async formData => {
  return await axios.post(`/api/login/`, formData)
}

export const editUser = async (userId, formData) => {
  return await axios.put(`/api/profiles/${userId}/`, formData, withHeaders())
}

export const deleteUser = async userId => {
  return await axios.delete(`/api/profiles/${userId}/`, withHeaders())
}

// tags
export const getAllTags = async () => {
  const { data } = await axios.get(`/api/tags/`, withHeaders())
  return data
}

export const createTag = async formData => {
  const { data } = await axios.post(`/api/tags/`, formData, withHeaders())
  return data
}

// categories
export const getAllCategories = async () => {
  const { data } = await axios.get(`/api/categories`, withHeaders())
  return data
}

export const createCategory = async formData => {
  const { data } = await axios.post(`/api/categories/`, formData, withHeaders())
  return data
}