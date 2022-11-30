import axios from "axios";
import { getInfo } from "./Auth.header";

const TOKEN = getInfo();

const API_URL = "http://localhost:8080/";

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: TOKEN,
    }
}


export const addAssist = async (fromdata) => {
    try {
        const response = await axios.post(API_URL + "assist/addAssist",fromdata, axiosConfig)

        return response;

    } catch (e) {
        return null;
    }
}

export const addHome = async (fromdata) => {
    try {
        const response = await axios.post(API_URL + "nursinghome/addNursingHome",fromdata, axiosConfig)

        return response;

    } catch (e) {
        return null;
    }
}

export const addPhy = async (fromdata) => {
    try {
        const response = await axios.post(API_URL + "physician/physicianSignup",fromdata, axiosConfig)

        return response;

    } catch (e) {
        return null;
    }
}

export const addNurse = async (fromdata) => {
    try {
        const response = await axios.post(API_URL + "nurse/addnurse",fromdata, axiosConfig)

        return response;

    } catch (e) {
        return null;
    }
}

export const addUser = async (fromdata) => {
console.log(fromdata)
    try {
        const response = await axios.put(API_URL + "user/updateUser",fromdata, axiosConfig)

        return response;

    } catch (e) {
        return null;
    }
}