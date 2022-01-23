import axios from "axios";
const BASE_URL = '/api/people';

const getAll = () => {
  const request = axios.get(BASE_URL);
  return request.then(response => response.data);
}

const create = (person) => {
  const request = axios.post(BASE_URL, person);
  return request.then(response => response.data);
}

const update = (person) => {
  const request = axios.put(`${BASE_URL}/${person.id}`, person);
  return request.then(response => response.data);
}

const deletePerson = (id) => {
  const request = axios.delete(`${BASE_URL}/${id}`);
  return request.then(response => response.data);
}

const personService = {
  getAll, create, update, deletePerson
};

export default personService;