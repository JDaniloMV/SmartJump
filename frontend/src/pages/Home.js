import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [pageData, setPageData] = useState({
    banner: null,
    featuredProduct: null,
    about: null,
    testimonials: [],
    ctas: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          bannerRes,
          productRes,
          aboutRes,
          testimonialsRes,
          ctasRes
        ] = await Promise.all([
          axios.get('/api/home-banner/'),
          axios.get('/api/featured-product/'),
          axios.get('/api/about-section/'),
          axios.get('/api/testimonials/'),
          axios.get('/api/product-ctas/')
        ]);

        setPageData({
          banner: bannerRes.data[0],
          featuredProduct: productRes.data[0],
          about: aboutRes.data[0],
          testimonials: testimonialsRes.data,
          ctas: ctasRes.data
        });
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-container">
      {/* Banner Section */}
      <section className="box banner-box">
        {pageData.banner && (
          <div className="banner-content">
            <h1>{pageData.banner.headline}</h1>
            <p>{pageData.banner.subtext}</p>
            <button className="cta-button">{pageData.banner.cta_text}</button>
          </div>
        )}
      </section>

      {/* Featured Product */}
      <section className="box featured-product-box large">
        {pageData.featuredProduct && (
          <div className="product-highlight">
            <h2>{pageData.featuredProduct.product.name}</h2>
            <p>{pageData.featuredProduct.description}</p>
            <span className="highlight">{pageData.featuredProduct.highlight}</span>
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="box about-box">
        {pageData.about && (
          <div className="about-content">
            <h2>Sobre a Moove Lab</h2>

            <h3>Missão</h3>
            <p>{pageData.about.mission}</p>

            <h3>Visão</h3>
            <p>{pageData.about.vision}</p>

            <h3>Valores</h3>
            {Array.isArray(pageData.about.values) && (
              <ul>
                {pageData.about.values.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="box testimonials-box">
        <h2>Depoimentos</h2>
        <div className="testimonials-list">
          {pageData.testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial">
              <img
                src={testimonial.client_image}
                alt={testimonial.client_name}
                className="testimonial-img"
              />
              <blockquote>{testimonial.quote}</blockquote>
              <cite>- {testimonial.client_name}</cite>
            </div>
          ))}
        </div>
      </section>

      {/* Product CTAs */}
      <section className="box ctas-box">
        <h2>Conheça nossos produtos</h2>
        {pageData.ctas.map(cta => (
          <div key={cta.id} className="cta-section">
            <h4>{cta.title}</h4>
            <div className="products-grid">
              {cta.products.map(product => (
                <div key={product.id} className="product-card">
                  <h5>{product.name}</h5>
                  <p>{product.short_description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
