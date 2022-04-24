import './App.css';
import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import FilmsPage from './pages/FilmsPage'
import PeoplePage from './pages/PeoplePage'



function App() {
  return (
    <div id="App">
      <Navigation />
      <Container className="py-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/films" element={<FilmsPage />} />
          <Route path="/people" element={<PeoplePage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
