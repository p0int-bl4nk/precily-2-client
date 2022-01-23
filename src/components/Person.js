import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link, useMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Person = () => {
	const match = useMatch('/people/:id');
	const person = useSelector(state =>
		state.people.find(p => match && p.id === match.params.id)
	);
	if (!person) return null;

	return (
		<Card>
			<Card.Header>
				<Card.Title>
					<Row>
						<Col>{person.name}</Col>
						<Col>
							<Link to={'/'}>
								Back to List
							</Link>
						</Col>
					</Row>
				</Card.Title>
				<Card.Body>
					<Card.Subtitle>Email</Card.Subtitle>
					<Card.Text>{person.email}</Card.Text>
					<Card.Subtitle>Age</Card.Subtitle>
					<Card.Text>{person.age}</Card.Text>
					<Card.Subtitle>Identifies as</Card.Subtitle>
					<Card.Text>{person.gender}</Card.Text>
				</Card.Body>
			</Card.Header>
		</Card>
	)
}

export default Person;
