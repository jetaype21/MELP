import axios from 'axios'

export const MelpApi = axios.create({baseURL: '/data'})