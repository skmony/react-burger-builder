import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-skmony.firebaseio.com/",
});

export default instance;
