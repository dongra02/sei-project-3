import axios from 'axios'

const baseUrl = '/api'
const mapBoxGeoBase = 'https://api.mapbox.com/geocoding/v5/mapbox.places'

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

export const updateQuest = (questFormData, questId) => {
  return axios.put(`${baseUrl}/quests/${questId}`, questFormData, withHeaders())
}

export const submitReview = (reviewFormData, questId) => {
  return axios.post(`${baseUrl}/quests/${questId}/reviews`, reviewFormData, withHeaders())
}

export const deleteQuest = questId => {
  return axios.delete(`${baseUrl}/quests/${questId}`, withHeaders())
}

export const registerUser = formData => {
  return axios.post(`${baseUrl}/register`, formData)
}

export const loginUser = formData => {
  return axios.post(`${baseUrl}/login`, formData)
}

export const getAllProfiles = () => {
  return axios.get(`${baseUrl}/users`)
}

export const getSingleProfile = profileId => {
  return axios.get(`${baseUrl}/users/${profileId}`)
}

export const getUserProfile = () => {
  return axios.get(`${baseUrl}/profile`, withHeaders())
}

export const reverseGeoCode = location => {
  return axios.get(`${mapBoxGeoBase}/${location.longitude},${location.latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`)
}