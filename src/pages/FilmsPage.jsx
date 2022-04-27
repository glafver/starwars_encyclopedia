import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem, Card, Row, Col, Button } from 'react-bootstrap'
import SWpediaAPI from '../services/SWpediaAPI'
import { getIdFromUrl } from '../helpers'

const FilmsPage = () => {
	const [films, setFilms] = useState([])
	const [page, setPage] = useState(1)
	const [total_pages, setTotalPages] = useState(0)

	const getFilms = async () => {
		const data = await SWpediaAPI.get('films')
		setFilms(data)
	}

	useEffect(() => {
		getFilms()
	}, [])

	if (films.length !== 0 && total_pages === 0 && page === 1) {
		setTotalPages(Math.ceil(films.count / films.results.length))
	}

	if (films.length === 0) {
		return <p>Loading...</p>
	}

	return (
		<>
			<h1>Films</h1>

			{films.results.length > 0 && (
				<Row sm={2}>
					{films.results.map(film =>
						<Col key={film.title}>
							<Card className='mb-4' >
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
						</Col>
					)}
				</Row>

			)
			}

			<div className="d-flex justify-content-between align-items-center mt-4">
				<div className="prev">
					{films.previous !== null &&
						<Button
							onClick={() => setPage(prevValue => prevValue - 1)}
							variant="primary"
						>Previous Page</Button>}

				</div>
				<div className="page">{page} / {total_pages}</div>
				<div className="next">
					{films.next !== null &&
						<Button
							onClick={() => setPage(prevValue => prevValue + 1)}
							variant="primary"
						>Next Page</Button>}

				</div>
			</div>
		</>
	)
}

export default FilmsPage;

