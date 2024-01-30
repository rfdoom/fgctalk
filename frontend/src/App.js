import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar';
import CharPage from './components/CharPage';
import CharForm from './components/CharForm';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
      <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/:id" element={<CharPage />}/>
            <Route path="/create" element={<CharForm />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  );
}

export default App;
