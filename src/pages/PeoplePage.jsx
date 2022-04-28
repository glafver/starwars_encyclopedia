import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ListGroup, ListGroupItem, Card, Row, Col, Button } from 'react-bootstrap'
import SWpediaAPI from '../services/SWpediaAPI'
import { getIdFromUrl } from '../helpers'
import Search from '../components/Search'

const PeoplePage = () => {
	const [people, setPeople] = useState([])
	const [searchParams, setSearchParams] = useSearchParams('')

	const [query, setQuery] = useState()
	const [page, setPage] = useState(1)
	const [pages, setPages] = useState(1)

	const params_query = searchParams.get('query')
	const params_page = searchParams.get('page')
	const params_pages = searchParams.get('pages')

	const getPeople = async (query, page) => {
		setPeople([])
		const data = await SWpediaAPI.get(`people/?search=${query}&page=${page}`)
		setPeople(data)
		if (page === 1 && data.count > 1) {
			setPages(Math.ceil(data.count / data.results.length))
		}
	}

	useEffect(() => {
		getPeople(query, page)
	}, [query, page])

	useEffect(() => {

		!params_page ? setPage(1) : setPage(parseInt(params_page))
		!params_query ? setQuery('') : setQuery(params_query)
		!params_pages ? setPages(1) : setPages(params_pages)

	}, [params_query, params_page, params_pages])

	if (people.length === 0 || (!query && people.count === 0)) {
		return <p>Loading...</p>
	}

	return (

		<>
			<Search />
			<h1>People</h1>
			{query && (
				<p><b>{people.count} search result{people.count > 1 && 's'}{people.count === 0 && 's'} for '{query}'...</b></p>
			)}
			{people.results.length > 0 && (
				<Row sm={2}>
					{people.results.map(person =>
						<Col key={person.name}>
							<Card className='mb-4'>
								<Card.Header as="h5">{person.name}</Card.Header>
								<Card.Body>
									<ListGroup className="list-group-flush">
										<ListGroupItem><b>Gender</b> {person.gender}</ListGroupItem>
										<ListGroupItem><b>Born</b> {person.birth_year}</ListGroupItem>
										<ListGroupItem><b>In</b> {person.films.length} films</ListGroupItem>
									</ListGroup>
									<Button variant="primary" as={Link} to={`/people/${getIdFromUrl(person.url)}`}>Read more</Button>
								</Card.Body>
							</Card>
						</Col>
					)}
				</Row>
			)}

			<div className="d-flex justify-content-between align-items-center mt-4">
				<div className="prev">
					{people.previous !== null &&
						<Button
							onClick={() => setSearchParams({ query: query, page: page - 1, pages: pages })}
							variant="primary"
						>Previous Page</Button>}
				</div>

				<div className="page">{page} / {pages}</div>

				<div className="next">
					{people.next !== null &&
						<Button
							onClick={() => setSearchParams({ query: query, page: page + 1, pages: pages })}
							variant="primary"
						>Next Page</Button>}
				</div>
			</div>
		</>
	)
}

export default PeoplePage;

