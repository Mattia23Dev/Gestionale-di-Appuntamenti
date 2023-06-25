import React, {useState} from 'react';
import './ChiSiamo.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

const ChiSiamo = () => {

  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      title: 'Cliente soddisfatto',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut justo auctor, fringilla mauris at, suscipit mi.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'Cliente felice',
      description: 'Fusce accumsan dapibus massa, id dignissim dolor gravida nec. Nunc ac justo enim. Sed condimentum augue a mauris aliquet fringilla.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'Cliente felice',
      description: 'Fusce accumsan dapibus massa, id dignissim dolor gravida nec. Nunc ac justo enim. Sed condimentum augue a mauris aliquet fringilla.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'Cliente felice',
      description: 'Fusce accumsan dapibus massa, id dignissim dolor gravida nec. Nunc ac justo enim. Sed condimentum augue a mauris aliquet fringilla.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'Cliente felice',
      description: 'Fusce accumsan dapibus massa, id dignissim dolor gravida nec. Nunc ac justo enim. Sed condimentum augue a mauris aliquet fringilla.',
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide === 0 ? testimonials.length - 1 : prevSlide - 1));
  };

  return (
    <div className="chi-siamo">
      <section className="hero2">
      <div className="hero-overlay"></div>
        <h1>Benvenuti nel nostro centro estetico</h1>
        <p>Offriamo servizi di bellezza di alta qualità</p>
      </section>
  
      <section className="description">
        <h2>Cosa facciamo</h2>
        <p>Il nostro centro estetico offre una vasta gamma di servizi per la cura del viso, del corpo e dei capelli. Utilizziamo solo prodotti di alta qualità e siamo specializzati in trattamenti personalizzati per ogni cliente.</p>
      </section>
  
        <div className="number-section">
          <div className="number-card">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faUser} className="number-icon" />
            </div>
            <h3 className="number-title">Clienti soddisfatti</h3>
            <p className="number-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="number-card">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faCalendar} className="number-icon" />
            </div>
            <h3 className="number-title">Anni di esperienza</h3>
            <p className="number-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="number-card">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faHeart} className="number-icon" />
            </div>
            <h3 className="number-title">Servizio di qualità</h3>
            <p className="number-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="number-card">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faStar} className="number-icon" />
            </div>
            <h3 className="number-title">Valutazioni positive</h3>
            <p className="number-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
      </div>

      <div className="testimonial-slider">
      <h2 className="slider-title">Cosa dicono i nostri clienti</h2>
      <div className="slider-container">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`slide ${index === activeSlide ? 'active' : ''}`}
          >
            <div className="testimonial-content">
              <h3 className="testimonial-name">{testimonial.name}</h3>
              <p className="testimonial-title">{testimonial.title}</p>
              <p className="testimonial-description">{testimonial.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-controls">
        <button className="prev-button" onClick={prevSlide}>&#8249;</button>
        <button className="next-button" onClick={nextSlide}>&#8250;</button>
      </div>
    </div>
    </div>
  );
};

export default ChiSiamo;