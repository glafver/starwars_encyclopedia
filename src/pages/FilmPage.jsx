import { useState, useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link, useParams, useNavigate } from 'react-router-dom'
import SWpediaAPI from '../services/SWpediaAPI'
import { getIdFromUrl } from '../helpers'

const FilmPage = () => {
    const [film, setFilm] = useState()
    const { id } = useParams()
    const navigate = useNavigate()

    const get = async (id) => {
        const data = await SWpediaAPI.get(`films/` + id)
        setFilm(data)
    }

    useEffect(() => {
        get(id)
    }, [id])

    if (!film) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Card>
                <Card.Header as="h5">{film.title}</Card.Header>
                <Card.Body>
                    <ListGroup className="list-group-flush">
                        <Card.Title>Attributes</Card.Title>
                        <ListGroupItem><b>Episode</b> {film.episode_id}</ListGroupItem>
                        <ListGroupItem><b>Direktor</b> {film.director}</ListGroupItem>
                        <ListGroupItem><b>Producer</b> {film.producer}</ListGroupItem>
                        <ListGroupItem><b>Released</b> {film.release_date}</ListGroupItem>
                        <Card.Title>Links</Card.Title>
                        <ListGroupItem><b>Characters</b></ListGroupItem>
                        <Card style={{ width: '18rem' }}>
                            <ListGroup variant="flush">
                                {film.characters.map(character => {
                                    const id = getIdFromUrl(character)
                                    return <ListGroup.Item key={id} as={Link} to={`/people/${id}`}> Character {id} ⟫</ListGroup.Item>
                                })}
                            </ListGroup>
                        </Card>
                    </ListGroup>
                </Card.Body>
            </Card>
            <Button variant="secondary" onClick={() => navigate(-1)}> ⟪ Back</Button>
        </>

    )
}

export default FilmPage