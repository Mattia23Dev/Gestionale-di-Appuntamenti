import React, {useState} from 'react';
import './ChiSiamo.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import service1 from '../../images/service-icon-1.png';
import service2 from '../../images/service-icon-2.png';
import service3 from '../../images/service-icon-3.png';
import service4 from '../../images/service-icon-4.png';
import fotomedical from '../../images/foto1.jpg';


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
        <h1>Health & Medical Center</h1>
        <p>Offriamo servizi di bellezza di alta qualità</p>
        <button className='button_hero_chi_siamo'>Prenota</button>
      </section>
  
      <section className="description">
        <div>
          <h2>Choose The Top Clinic For Yourself and Your Family</h2>
          <div className='star-container'>
            <FontAwesomeIcon icon={faStar} className="number-icon" />
            <FontAwesomeIcon icon={faStar} className="number-icon" />
            <FontAwesomeIcon icon={faStar} className="number-icon" />
            <FontAwesomeIcon icon={faStar} className="number-icon" />
            <FontAwesomeIcon icon={faStar} className="number-icon" />
          </div>

        </div>
        <div>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Standard dummy text ever since.<br /> <br />

It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
        </div>
        
      </section>
      <hr className='line_middle'/>
  
        <div className="number-section">
          <div className="number-card">
            <div className="icon-wrapper">
              <img src={service4} alt='service' />
            </div>
            <h3 className="number-title">Clienti soddisfatti</h3>
            <p className="number-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="number-card">
            <div className="icon-wrapper">
              <img src={service1} alt='service' />
            </div>
            <h3 className="number-title">Anni di esperienza</h3>
            <p className="number-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="number-card">
            <div className="icon-wrapper">
              <img src={service2} alt='service' />
            </div>
            <h3 className="number-title">Servizio di qualità</h3>
            <p className="number-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="number-card">
            <div className="icon-wrapper">
              <img src={service3} alt='service' />
            </div>
            <h3 className="number-title">Valutazioni positive</h3>
            <p className="number-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
      </div>

    <h2 className="slider-title">Cosa dicono i nostri clienti</h2>
    <div className='testimonials'>
      <div className="testimonial-slider">
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
    <div className='testimonials_foto'>
          <img alt='' src={fotomedical} />
    </div>
    </div>

    </div>
  );
};

export default ChiSiamo;