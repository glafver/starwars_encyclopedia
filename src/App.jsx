import './App.css';
import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Search from './components/Search'
import HomePage from './pages/HomePage'
import FilmsPage from './pages/FilmsPage'
import FilmPage from './pages/FilmPage'
import PeoplePage from './pages/PeoplePage'
import PersonPage from './pages/PersonPage'

function App() {
  return (
    <div id="App">
      <Navigation />
      <Container className="py-3">
        {/* <Search /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/films" element={<FilmsPage />} />
          <Route path="/films/:id" element={<FilmPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:id" element={<PersonPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
