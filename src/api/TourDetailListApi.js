import Api from "./Api";
import Axios from 'axios';

const url = "/tours"

const getAllTours = () =>{
    return Api.get(`${url}`)
}
const getTourDetailById = (id) => {
    return Api.get(`${url}/${id}`)
}
const createTour = (createForm) => {
    return Api.post(`${url}/create-tour`, createForm)
}
const updateTour = (id, updateForm) => {
    return Api.put(`${url}/update/${id}`, updateForm)
}
const deleteTourById = (id) => {
    return Api.delete(`${url}/delete/${id}`)
}
const deleteMultipleTours = (ids) => {
    return Api.delete(`${url}/${ids}`)
}
const uploadMultipleImage = (formData) =>{
    return Axios.post("https://api.cloudinary.com/v1_1/dv0zrozae/upload", formData)
}

// export
const api = { getAllTours , getTourDetailById, createTour, updateTour, deleteTourById, deleteMultipleTours, uploadMultipleImage}
export default api;