import axios from "axios";

export const api = axios.create({
  baseURL: 'http://18.230.197.190:3333'
})