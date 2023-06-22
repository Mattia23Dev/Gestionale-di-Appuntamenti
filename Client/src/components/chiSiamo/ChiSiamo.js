import React from 'react';
import './ChiSiamo.css'; // Importa il file CSS per la pagina ChiSiamo

const ChiSiamo = () => {
  return (
    <div className="chi-siamo">
      <section className="hero">
        <h1>Benvenuti nel nostro centro estetico</h1>
        <p>Offriamo servizi di bellezza di alta qualità</p>
      </section>
  
      <section className="description">
        <h2>Cosa facciamo</h2>
        <p>Il nostro centro estetico offre una vasta gamma di servizi per la cura del viso, del corpo e dei capelli. Utilizziamo solo prodotti di alta qualità e siamo specializzati in trattamenti personalizzati per ogni cliente.</p>
      </section>
  
      <section className="numbers">
        <h2>I nostri numeri</h2>
        <div className="number">5000+ clienti soddisfatti</div>
        <div className="number">100+ servizi offerti</div>
        <div className="number">20+ anni di esperienza</div>
      </section>
    </div>
  );
};

export default ChiSiamo;