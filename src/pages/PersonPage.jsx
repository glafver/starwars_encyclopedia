import { useState, useEffect } from 'react'
import { ListGroup, Card, Row, Col, Button } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import SWpediaAPI from '../services/SWpediaAPI'
import { getIdFromUrl } from '../helpers'

const PersonPage = () => {
    const [person, setPerson] = useState()
    const [films, setFilms] = useState()
    const { id } = useParams()
    const navigate = useNavigate()


    const get = async (id) => {
        const person = await SWpediaAPI(`people/` + id)
        const films = []
        for (let i = 0; i < person.films.length; i++) {
            const id = getIdFromUrl(person.films[i])
            const film = await SWpediaAPI(`films/` + id)
            films.push({ 'id': id, 'title': film.title })
        }
        setFilms(films)
        setPerson(person)
    }

    useEffect(() => {
        get(id)
    }, [id])

    if (!person && !films) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Card className='mb-4'>
                <Card.Header as="h5">{person.name}</Card.Header>
                <Card.Body>

                    <div className='mb-4'>
                        <Card.Title>Attributes</Card.Title>
                        <Row><Col><b>Gender</b></Col><Col sm={10}>{person.gender}</Col></Row>
                        <Row><Col><b>Birth year</b></Col><Col sm={10}>{person.birth_year}</Col></Row>
                        <Row><Col><b>Height</b></Col><Col sm={10}>{person.height}</Col></Row>
                        <Row><Col><b>Mass</b></Col><Col sm={10}>{person.mass}</Col></Row>
                        <Row><Col><b>Hair color</b></Col><Col sm={10}>{person.hair_color}</Col></Row>
                        <Row><Col><b>Skin color</b></Col><Col sm={10}>{person.skin_color}</Col></Row>
                        <Row><Col><b>Eye color</b></Col><Col sm={10}>{person.eye_color}</Col></Row>
                    </div>

                    <div className='mb-4'>
                        <Card.Title>Links</Card.Title>
                        <Row><Col><b>Films</b></Col>
                            <Col sm={10}>
                                <Card style={{ width: '18rem' }}>
                                    <ListGroup variant="flush">
                                        {films.map(film => {
                                            return <ListGroup.Item key={film.id} as={Link} to={`/films/${film.id}`}> {film.title} ⟫</ListGroup.Item>
                                        })}
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Card.Body>
            </Card>
            <Button variant="secondary" onClick={() => navigate(-1)}> ⟪ Back</Button>
        </>

    )
}

export default PersonPage