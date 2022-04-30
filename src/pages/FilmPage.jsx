import { useState, useEffect } from 'react'
import { ListGroup, Card, Row, Col, Button } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import SWpediaAPI from '../services/SWpediaAPI'
import { getIdFromUrl } from '../helpers'

const FilmPage = () => {
    const [film, setFilm] = useState()
    const [characters, setCharacters] = useState()
    const { id } = useParams()
    const navigate = useNavigate()

    const get = async (id) => {
        const film = await SWpediaAPI(`films/` + id)
        const charecters = []
        for (let i = 0; i < film.characters.length; i++) {
            const id = getIdFromUrl(film.characters[i])
            const character = await SWpediaAPI(`people/` + id)
            charecters.push({ 'id': id, 'name': character.name })
        }
        setFilm(film)
        setCharacters(charecters)
    }

    useEffect(() => {
        get(id)
    }, [id])

    if (!film && !characters) {
        return <p>Loading...</p>
    }

    return (
        <>

            <Card className='mb-4'>
                <Card.Header as="h5">{film.title}</Card.Header>
                <Card.Body>

                    <div className='mb-4'>
                        <Card.Title>Attributes</Card.Title>
                        <Row><Col><b>Episode</b></Col><Col sm={10}>{film.episode_id}</Col></Row>
                        <Row><Col><b>Director</b></Col><Col sm={10}>{film.director}</Col></Row>
                        <Row><Col><b>Producer</b></Col><Col sm={10}>{film.producer}</Col></Row>
                        <Row><Col><b>Released</b></Col><Col sm={10}>{film.release_date}</Col></Row>
                    </div>

                    <div className='mb-4'>
                        <Card.Title>Links</Card.Title>
                        <Row><Col><b>Characters</b></Col>
                            <Col sm={10}>
                                <Card style={{ width: '18rem' }}>
                                    <ListGroup variant="flush">
                                        {characters.map(character => {
                                            return <ListGroup.Item key={character.id} as={Link} to={`/people/${character.id}`}> {character.name} ⟫</ListGroup.Item>
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

export default FilmPage