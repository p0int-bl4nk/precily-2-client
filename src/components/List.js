import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Row, Table} from "react-bootstrap";
import {actionDeletePerson} from "../reducers/peopleReducer";
import Add from "./AddModal";
import { Link } from 'react-router-dom';

const List = () => {
  const people = useSelector(state => state.people);
  const dispatch = useDispatch();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [editPerson, setEditPerson] = useState({});
  const handleEdit = (data) => {
    setEditPerson(data);
    setIsAddModalOpen(true);
  }

  const handleDelete = (id) => dispatch(actionDeletePerson(id));

  const handleAdd = () => setIsAddModalOpen(true);

  return (
    <div>
      <Row>
        <Col xs={11}><h2>List</h2></Col>
        <Col xs={1}>
          <Button
            type='Button'
            variant='success'
            onClick={handleAdd}
          >
            Add ➕
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {
          people.map((person, idx) => (
            <tr key={person.id}>
              <td>{idx + 1}</td>
              <td>
                <Link to={`/people/${person.id}`}>
                  {person.name}
                </Link>
              </td>
              <td>
                <Button
                  variant='info'
                  type='button'
                  onClick={() => handleEdit(person)}
                >
                  Edit
                </Button>
                &nbsp;
                <Button
                  variant='danger'
                  type='button'
                  onClick={() => handleDelete(person.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        }
        </tbody>
      </Table>

      {
        isAddModalOpen &&
        <Add
          isOpen={true}
          handleClose={() => {
            setIsAddModalOpen(false);
            setEditPerson({});
          }}
          editData={editPerson}
        />
      }
    </div>
  );
}

export default List;
