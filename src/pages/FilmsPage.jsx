import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import SWpediaAPI from '../services/SWpediaAPI'
import { getIdFromUrl } from '../helpers'

const FilmsPage = () => {
	const [films, setFilms] = useState([])

	const getFilms = async () => {
		const data = await SWpediaAPI.get('films')
		setFilms(data.results)
	}

	useEffect(() => {
		getFilms()
	}, [])

	if (!films) {
		return <p>Loading...</p>
	}

	return (
		<>
			<h1>Films</h1>

			{films.length > 0 && (
				<div className='d-flex flex-wrap'>
					{films.map(film =>
						<Card className='col-4' key={film.title}>
							<Card.Header as="h5">{film.title}</Card.Header>
							<Card.Body>
								<ListGroup className="list-group-flush">
									<ListGroupItem><b>Episode</b> {film.episode_id}</ListGroupItem>
									<ListGroupItem><b>Released</b> {film.release_date}</ListGroupItem>
									<ListGroupItem>{film.characters.length} <b>characters</b></ListGroupItem>
								</ListGroup>
								<Button variant="primary" as={Link} to={`/films/${getIdFromUrl(film.url)}`}>Read more</Button>
							</Card.Body>
						</Card>
					)}
				</div>

			)}
		</>
	)
}

export default FilmsPage;

