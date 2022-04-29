import { Form, Button, Row, Col } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

const Search = () => {
    const [searchInput, setSearchInput] = useState('')
    const searchInputRef = useRef()
    const [searchParams, setSearchParams] = useSearchParams()

    const query = searchParams.get('query')

    const handleSubmit = async e => {
        e.preventDefault()
        if (!searchInput.length) {
            return
        }
        setSearchParams({ query: searchInput, page: 1 })
    }

    useEffect(() => {
        if (!query) {
            setSearchInput('')
            return
        }
        setSearchInput(query)
    }, [query])

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" >
                    <Col sm="10">
                        <Form.Control className='col-6 '
                            onChange={e => setSearchInput(e.target.value)}
                            placeholder="What are you looking for?"
                            ref={searchInputRef}
                            required
                            type="text"
                            value={searchInput} />
                    </Col>
                    <Col sm="2"><Button className='SWbutton' variant="success" type="submit" >Search</Button>
                    </Col>
                </Form.Group>
            </Form>

        </>

    )
}

export default Search