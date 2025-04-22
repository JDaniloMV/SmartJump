import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Store from './pages/Store';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/loja" element={<Store />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/politica" element={<Policy />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;