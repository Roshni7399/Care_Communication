import axios from "axios";
import { getInfo } from "./Auth.header";

const TOKEN = getInfo();

// const API_URL = "http://localhost:8080/";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: TOKEN,
  },
};

// add nurse
export const addNurse = async ({ name, email, contact, location }) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_URL + "nurse/addnurse",
      {
        name,
        email,
        contact,
        location,
        role: "2",
      },
      axiosConfig
    );

    return response;
  } catch (e) {
    return null;
  }
};

// nurse list
export const nurseList = async (input, limit, page) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_URL + "nurse/getnurshe",
      {
        limit,
        page,
        name: input,
      },
      axiosConfig
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

// Physician List
export const PhysicianList = async (input, limit, page) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_URL + "physician/getPhysicianList",
      {
        limit,
        page,
        name: input,
      },
      axiosConfig
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

// NursingHome List
export const NursinghomeList = async (input, limit, page) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_URL + "nursinghome/getnursinghome",
      {
        limit,
        page,
        name: input,
      },
      axiosConfig
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

// delete
export const DataDelete = async (_id) => {
  try {
    return await axios.delete(
      process.env.REACT_APP_URL + `physician/deletephysician/${_id}`,
      axiosConfig
    );
  } catch (e) {
    console.log(e);
  }
};

// Count list
export const CountList = async () => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_URL + "Physician/Count",
      axiosConfig
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

// Multi Auth Login
export const multiLogin = async ({ email, password }) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_URL + "user/userLogin",
      {
        email,
        password,
      },
      axiosConfig
    );
    if (response.data.status === true) {
      localStorage.setItem("users", JSON.stringify(response.data));

      return response;
    } else {
      return response;
    }
  } catch (e) {
    return null;
  }
};

export const getSearchById = async (id) => {
  return axios.get(
    process.env.REACT_APP_URL + `physician/getPhyDataById?_id=${id}`,
    axiosConfig
  );
};

//   export const customerget = async (id) => {
//     return axios.get(API_URL + "customer/customerget", axiosConfig);
//   };

// nurse edit
export const getNurseById = async (id) => {
  return await axios.get(
    process.env.REACT_APP_URL + `nurse/getNurseDataById/${id}`,
    axiosConfig
  );
};

export const updateNurse = async (_id, name, location, email, contact) => {
  return axios.put(
    process.env.REACT_APP_URL + "nurse/nurseUpdate",
    {
      _id,
      name,

      location,
      email,
      contact,
    },
    axiosConfig
  );
};
