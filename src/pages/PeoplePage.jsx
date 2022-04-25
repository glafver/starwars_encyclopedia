import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import SWpediaAPI from '../services/SWpediaAPI'
import { getIdFromUrl } from '../helpers'

const HomePage = () => {
	const [people, setPeople] = useState([])
	const [page, setPage] = useState(1)
	const [total_pages, setTotalPages] = useState(0)

	const getPeople = async (page) => {
		const data = await SWpediaAPI.get(`people/?page=${page}`)
		setPeople(data)
	}

	useEffect(() => {
		getPeople(page)
	}, [page])

	if (people.length === 0) {
		return <p>Loading...</p>
	}

	if (people.length !== 0 && total_pages === 0 && page === 1) {
		setTotalPages(Math.ceil(people.count / people.results.length))
	}

	return (
		<>
			<h1>People</h1>

			{people.results.length > 0 && (
				<div className='d-flex flex-wrap'>
					{people.results.map(person =>
						<Card className='col-6' key={person.name}>
							<Card.Header as="h5">{person.name}</Card.Header>
							<Card.Body>
								<ListGroup className="list-group-flush">
									<ListGroupItem><b>Gender</b> {person.gender}</ListGroupItem>
									<ListGroupItem><b>Born</b> {person.birth_year}</ListGroupItem>
									<ListGroupItem><b>In</b> {person.films.length} films</ListGroupItem>
								</ListGroup>
								<Button variant="primary" as={Link} to={`/people/${getIdFromUrl(person.url)}`}>Read more</Button>							</Card.Body>
						</Card>
					)}
				</div>

			)}

			<div className="d-flex justify-content-between align-items-center mt-4">
				<div className="prev">
					{people.previous !== null &&
						<Button
							onClick={() => setPage(prevValue => prevValue - 1)}
							variant="primary"
						>Previous Page</Button>}

				</div>
				<div className="page">{page} / {total_pages}</div>
				<div className="next">
					{people.next !== null &&
						<Button
							onClick={() => setPage(prevValue => prevValue + 1)}
							variant="primary"
						>Next Page</Button>}

				</div>
			</div>
		</>
	)
}

export default HomePage;

