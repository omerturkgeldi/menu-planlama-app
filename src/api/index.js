import axios from "axios"

const BASE_URL = 'https://localhost:5001/api/';


export const ENDPOINTS = {
    FOOD: 'Foods',
    FOODTYPE: 'FoodTypes',
    MENU: 'Menus',

}

export const createdAPIEndpoint = endpoint => {
    let url = BASE_URL + endpoint;

    console.log(url)

    return {
        fetchAll: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        fetchByName: name => axios.get(url + name),
        create: newRecord => axios.post(url, newRecord),
        update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: () => axios.delete(url),
        fetchByDate: myProps => axios.post(url, myProps)
    }
}
