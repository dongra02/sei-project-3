import axios from 'axios'

const baseUrl = 'http://localhost:3000/api'

const withHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
}

export const getAllQuests = () => {
  return axios.get(`${baseUrl}/quests`)
}

export const getSingleQuest = questId => {
  return axios.get(`${baseUrl}/quests/${questId}`)
}

export const createQuest = questFormData => {
  return axios.post(`${baseUrl}/quests`, questFormData, withHeaders())
}

export const registerUser = formData => {
  return axios.post(`${baseUrl}/register`, formData)
}

export const loginUser = formData => {
  return axios.post(`${baseUrl}/login`, formData)
}

export const getSingleProfile = profileId => {
  return axios.get(`${baseUrl}/users/${profileId}`)
}