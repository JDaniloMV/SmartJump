import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, testimonialsRes] = await Promise.all([
          axios.get('/api/products/'),
          axios.get('/api/testimonials/')
        ]);

        setProducts(productsRes.data);
        setTestimonials(testimonialsRes.data);
      } catch (error) {
        console.error("Erro ao buscar produtos ou depoimentos:", error);
      }
    };

    fetchData();
  }, []);

  const renderTestimonials = (productName) => {
    return testimonials
      .filter(t => t.quote.toLowerCase().includes(productName.toLowerCase()))
      .map(t => (
        <div className="testimonial" key={t.id}>
          <img src={t.client_image} alt={t.client_name} />
          <p>"{t.quote}"</p>
          <strong>{t.client_name}</strong>
        </div>
      ));
  };

  return (
    <div className="products-container">
      <h1>Produtos</h1>

      {products.map(product => (
        <div className="product-box" key={product.id}>
          <h2>{product.name}</h2>
          <p><strong>Descrição:</strong> {product.description}</p>

          {product.name === 'Running Lab' && (
            <>
              <p><strong>Benefícios:</strong> Melhora da performance, prevenção de lesões, análise detalhada da corrida.</p>
              <p><strong>Como funciona:</strong> Utilizamos sensores e câmeras de alta velocidade para analisar sua biomecânica em movimento.</p>
              <div className="testimonials-box">
                <h4>Depoimentos:</h4>
                {renderTestimonials('Running Lab')}
              </div>
              <button className="cta-button">Agende sua Avaliação</button>
            </>
          )}

          {['Smart Breath', 'Smart Jump'].includes(product.name) && (
            <>
              <p><strong>Descrição do projeto:</strong> {product.description}</p>
              <p><strong>Benefícios esperados:</strong> Otimização do desempenho com base em dados científicos.</p>
              <button className="cta-button">Cadastre-se para receber novidades</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Products;