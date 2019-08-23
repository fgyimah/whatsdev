import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:42489/api`
});
