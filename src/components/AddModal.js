import React, {useEffect} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {actionAddPerson, actionUpdatePerson} from "../reducers/peopleReducer";
import {useDispatch} from "react-redux";

const Add = ({isOpen, handleClose, editData}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    reset(editData);
  }, [editData]);

  const onSubmit = (data) => {
    if (editData.id) dispatch(actionUpdatePerson(data));
    else dispatch(actionAddPerson(data));
    reset({});
    handleClose();
  }

  const getError = (name, message) => {
    return errors[name]
      ? <span className='text-danger'>{message || errors[name].message}</span>
      : '';
  }

  return (
    <Modal
      show={isOpen}
      onHide={handleClose}
      size='lg'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Person</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              {...register(
                'name',
                { required: 'Name is Required!' }
              )}
            />
            <Form.Text>{getError('name')}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register(
                'email',
                { required: 'Email is Required!' }
              )}
            />
            <Form.Text>{getError('email')}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Age"
              min={18}
              max={99}
              defaultValue={18}
              {...register('age')}
            />
            <Form.Text>{getError('age')}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Identifies as</Form.Label>
            <br/>
            <Form.Text>Male</Form.Text>&nbsp;
            <input type='radio' {...register('gender')} value='male' /><br/>
            <Form.Text>Female</Form.Text>&nbsp;
            <input type='radio' {...register('gender')} value='female' /><br/>
            <Form.Text>Do not wish to put a label on it</Form.Text>&nbsp;
            <input type='radio' {...register('gender')} defaultChecked value='undisclosed' /><br/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Add;