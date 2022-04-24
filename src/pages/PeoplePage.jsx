import { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import SWpediaAPI from '../services/SWpediaAPI'

const HomePage = () => {
	const [people, setPeople] = useState([])

	const getPeople = async () => {
		const data = await SWpediaAPI.get('people')
		setPeople(data.results)
	}

	useEffect(() => {
		getPeople()
	}, [])

	return (
		<>
			<h1>People</h1>

			{people.length > 0 && (
				<div className='d-flex flex-wrap'>
					{people.map(person =>
						<Card className='col-4' key={person.name}>
							<Card.Header as="h5">{person.name}</Card.Header>
							<Card.Body>
								<ListGroup className="list-group-flush">
									<ListGroupItem><b>Gender</b> {person.gender}</ListGroupItem>
									<ListGroupItem><b>Born</b> {person.birth_year}</ListGroupItem>
									<ListGroupItem><b>In</b> {person.films.length} films</ListGroupItem>
								</ListGroup>
								<Button variant="primary">Read more</Button>
							</Card.Body>
						</Card>
					)}
				</div>

			)}
		</>
	)
}

export default HomePage;

