import axios from "axios";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};
const API_URL = "http://localhost:8080/";

//Assist List
export const getAssistList = async (input, limit, page) => {
  // console.log(input);
  return axios.post(
    API_URL + "assist/Assistlist",
    {
      limit,
      page,
      name: input,
    },

    axiosConfig
  );
};

// Nursing Home List
// export const getNursinghomeList = async (input,limit,page) => {
//   return axios.get(
//     API_URL + "nursinghome/getnursinghome",{
//       limit,
//       page,
//       name:input
//     },

//     axiosConfig
//   );
// };

export const getsearch = async (input) => {
  console.log("axios", input);
  return axios.get(
    API_URL + `assist/allAssist?name=${input}`,
    {},

    axiosConfig
  );
};

export const AllList = async () => {
  return axios.get(
    API_URL + "assist/List",

    axiosConfig
  );
};
