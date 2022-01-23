import './App.css';
import List from "./components/List";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {actionInitPeople} from "./reducers/peopleReducer";
import { Route, Routes } from 'react-router-dom';
import Person from './components/Person';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionInitPeople());
    //eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route
          path='/'
          element={<List/>}
        />
        <Route
          path='/people/:id'
          element={<Person/>}
        />
      </Routes>
    </div>
  );
}

export default App;
