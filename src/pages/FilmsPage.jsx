import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ListGroup, ListGroupItem, Card, Row, Col, Button } from 'react-bootstrap'
import SWpediaAPI from '../services/SWpediaAPI'
import { getIdFromUrl } from '../helpers'
import Search from '../components/Search'

const FilmsPage = () => {
	const [films, setFilms] = useState([])
	const [searchParams, setSearchParams] = useSearchParams('')

	const [query, setQuery] = useState()
	const [page, setPage] = useState(1)
	const [pages, setPages] = useState(1)

	const params_query = searchParams.get('query')
	const params_page = searchParams.get('page')
	const params_pages = searchParams.get('pages')

	const getFilms = async (query, page) => {
		setFilms([])
		const data = await SWpediaAPI.get(`films/?search=${query}&page=${page}`)
		setFilms(data)
		if (page === 1 && data.count > 1) {
			setPages(Math.ceil(data.count / data.results.length))
		}
	}

	useEffect(() => {
		getFilms(query, page)
	}, [query, page])

	useEffect(() => {

		!params_page ? setPage(1) : setPage(parseInt(params_page))
		!params_query ? setQuery('') : setQuery(params_query)
		!params_pages ? setPages(1) : setPages(params_pages)

	}, [params_query, params_page, params_pages])

	if (films.length === 0 || (!query && films.count === 0)) {
		return <p>Loading...</p>
	}

	return (
		<>
			<Search />
			<h1>Films</h1>
			{query && (
				<p><b>{films.count} search result{films.count > 1 && 's'}{films.count === 0 && 's'} for '{query}'...</b></p>
			)}
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
							onClick={() => setSearchParams({ query: query, page: page - 1, pages: pages })} variant="primary"
						>Previous Page</Button>}

				</div>
				<div className="page">{page} / {pages}</div>
				<div className="next">
					{films.next !== null &&
						<Button
							onClick={() => setSearchParams({ query: query, page: page + 1, pages: pages })}
							variant="primary"
						>Next Page</Button>}

				</div>
			</div>
		</>
	)
}

export default FilmsPage;

