import axios from 'axios'
import { getToken } from './auth'
const baseUrl = '/api'
export const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}


// contents
export const getAllContents = async () => {
  const { data } = await axios.get(`${baseUrl}/contents`)
  return data
}

export const getSingleContent = async id => {
  const { data } = await axios.get(`${baseUrl}/contents/${id}`)
  return data
}

export const uploadContent = async formData => {
  const { data } = await axios.post(`${baseUrl}/contents/`, formData, withHeaders())
  return data
}

export const editContent = async (contentId, formData) => {
  const { data } = await axios.put(`${baseUrl}/contents/${contentId}/`, formData, withHeaders())
  return data
}

export const deleteContent = async contentId => {
  return await axios.delete(`${baseUrl}/contents/${contentId}/`, withHeaders())
}



// users
export const getSingleUser = async userId => {
  const { data } = await axios.get(`${baseUrl}/profiles/${userId}/`)
  return data
}

export const registerUser = async formData => {
  return await axios.post(`${baseUrl}/register/`, formData)
}

export const loginUser = async formData => {
  return await axios.post(`${baseUrl}/login/`, formData)
}

export const editUser = async (userId, formData) => {
  return await axios.put(`${baseUrl}/profiles/${userId}/edit/`, formData, withHeaders())
}

export const deleteUser = async userId => {
  return await axios.delete(`${baseUrl}/profiles/${userId}/edit/`, withHeaders())
}



// tags
export const getAllTags = async () => {
  const { data } = await axios.get(`${baseUrl}/tags/`)
  return data
}

export const getSingleTag = async tagId => {
  const { data } = await axios.get(`${baseUrl}/tags/${tagId}`)
  return data
}

export const createTag = async formData => {
  const { data } = await axios.post(`${baseUrl}/tags/new/`, formData, withHeaders())
  return data
}

export const deleteTag = async tagId => {
  return await axios.delete(`${baseUrl}/tags/${tagId}/delete/`, withHeaders())
}



// categories
export const getAllCategories = async () => {
  const { data } = await axios.get(`${baseUrl}/categories`, withHeaders())
  return data
}

export const createCategory = async formData => {
  const { data } = await axios.post(`${baseUrl}/categories/`, formData, withHeaders())
  return data
}

export const deleteCategory = async categoryId => {
  return await axios.delete(`${baseUrl}/categories/${categoryId}/`, withHeaders())
}


// followers
export const getAllFollows = async () => {
  const { data } = await axios.get(`${baseUrl}/followers/`, withHeaders() )
  return data
}

export const followOwner = async (fromId, toId) => {
  return await axios.post(`${baseUrl}/followers/`, {
    owner: fromId, to: toId
  }, withHeaders())
}

export const unfollowOwner = async id => {
  return await axios.delete(`${baseUrl}/followers/${id}/`, withHeaders())
}


// likes
export const getAllLikes = async () => {
  const { data } = await axios.get(`${baseUrl}/likes/`, withHeaders() )
  return data
}

export const likeContent = async (fromId, contentId) => {
  return await axios.post(`${baseUrl}/likes/`, {
    owner: fromId, content: contentId
  }, withHeaders())
}

export const unlikeContent = async id => {
  return await axios.delete(`${baseUrl}/likes/${id}/`, withHeaders())
}


// comments
export const getAllComments = async () => {
  const { data } = await axios.get(`${baseUrl}/comments/`, withHeaders() )
  return data
}

export const postComment = async formData => {
  return await axios.post(`${baseUrl}/comments/`, formData, withHeaders())
}

export const deleteComment = async id => {
  return await axios.delete(`${baseUrl}/comments/${id}/`, withHeaders())
}