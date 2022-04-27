import { useState, useEffect } from 'react'
import { ListGroup, ListGroupItem, Card, Row, Button } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import SWpediaAPI from '../services/SWpediaAPI'
import { getIdFromUrl } from '../helpers'

const PersonPage = () => {
    const [person, setPerson] = useState()
    const { id } = useParams()
    const navigate = useNavigate()


    const get = async (id) => {
        const data = await SWpediaAPI.get(`people/` + id)
        setPerson(data)
    }

    useEffect(() => {
        get(id)
    }, [id])

    if (!person) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Card>
                <Card.Header as="h5">{person.name}</Card.Header>
                <Card.Body>
                    <ListGroup className="list-group-flush">
                        <Card.Title>Attributes</Card.Title>
                        <ListGroupItem><b>Gender</b> {person.gender}</ListGroupItem>
                        <ListGroupItem><b>Birth year</b> {person.birth_year}</ListGroupItem>
                        <ListGroupItem><b>Height</b> {person.height}</ListGroupItem>
                        <ListGroupItem><b>Mass</b> {person.mass}</ListGroupItem>
                        <ListGroupItem><b>Hair color</b> {person.hair_color}</ListGroupItem>
                        <ListGroupItem><b>Skin color</b> {person.skin_color}</ListGroupItem>
                        <ListGroupItem><b>Eye color</b> {person.eye_color}</ListGroupItem>

                        <Card.Title>Links</Card.Title>
                        <ListGroupItem><b>Films</b></ListGroupItem>
                        <Card style={{ width: '18rem' }}>
                            <ListGroup variant="flush">
                                {person.films.map(film => {
                                    const id = getIdFromUrl(film)
                                    return <ListGroup.Item key={id} as={Link} to={`/films/${id}`}> Film {id} ⟫</ListGroup.Item>
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

export default PersonPage