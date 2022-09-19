import axios from "axios";

const URL = `https://reactnative-5e464-default-rtdb.firebaseio.com/`;
//*****************************************CONSUMER**************************** */
//TO SEND TO DATABASE
export function storeConsumerData(consumerData) {
  axios.post(URL + "consumer-details.json", consumerData);
}
//TO GET FROM DATABASE
export async function fetchConsumerData(consumerData) {
  const response = await axios.get(URL + "consumer-details.json", consumerData);
  const consumerDetails = [];
  for (const key in response.data) {
    const consumerDetailsObj = {
      id: key,
      firstName: response.data[key].firstName,
      lastName: response.data[key].lastName,
      houseNum: response.data[key].houseNum,
      street: response.data[key].street,
      landmark: response.data[key].landmark,
      state: response.data[key].state,
      city: response.data[key].city,
      pincode: response.data[key].pincode,
    };
    consumerDetails.push(consumerDetailsObj);
  }
  return consumerDetails;
}
//UPDATE IN DATABASE
export function updateConsumerData(id, consumerData) {
  return axios.put(URL + `consumer-details/${id}.json`, consumerData);
}
//DELETE FROM DATABASE
export function deleteConsumerData(id) {
  return axios.delete(URL + `consumer-details/${id}.json`);
}

/**************************STAFF**************************************** */
export function storeStaffData(consumerData) {
  axios.post(URL + "staff-details.json", consumerData);
}
