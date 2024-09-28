import React from 'react';
import CardPizza from './CardPizza';
import pizzasData from '../data/pizzaslocal'; 

const PizzaList = () => {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {pizzasData.map((pizza) => (
        <CardPizza
          key={pizza.id}
          name={pizza.name}
          price={pizza.price}
          ingredients={pizza.ingredients}
          img={pizza.img}
          desc={pizza.desc}  
        />
      ))}
    </div>
  );
};

export default PizzaList;
