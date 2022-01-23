import personService from "../service/people";

const peopleReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_PEOPLE':
      return action.payload;
    case 'DELETE_PERSON':
      return state.filter(person => person.id !== action.payload.id);
    case 'ADD_PERSON':
      return state.concat([action.payload]);
    case 'UPDATE_PERSON':
      return state.map(person => person.id === action.payload.id
        ? action.payload
        : person
      );
    default:
      return state;
  }
}

export const actionInitPeople = () => {
  return async dispatch => {
    try {
      const data = await personService.getAll();
      dispatch({
        type: 'INIT_PEOPLE',
        payload: data || []
      });
    } catch (e) {
      console.error(e.response.data.error);
    }
  };
}

export const actionDeletePerson = (id) => {
  return async dispatch => {
    try {
      await personService.deletePerson(id);
      dispatch({
        type: 'DELETE_PERSON',
        payload: { id }
      });
    } catch (error) {
      console.error(error.response.data.error);
    }
  };
}

export const actionAddPerson = (data) => {
  return async dispatch => {
    try {
      const person = await personService.create(data);
      dispatch({
        type: 'ADD_PERSON',
        payload: person
      });
    } catch (e) {
      console.error(e.response.data.error);
    }
  };
}

export const actionUpdatePerson = (data) => {
  return async dispatch => {
    try {
      const updatedPerson = await personService.update(data);
      dispatch({
        type: 'UPDATE_PERSON',
        payload: updatedPerson
      });
    } catch (e) {
      console.error(e.response.data.error);
    }
  };
}

export default peopleReducer;
