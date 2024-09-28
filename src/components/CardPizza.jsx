import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom'; // Importamos Link

const CardPizza = ({ pizza }) => {
  const { addToCart } = useCart();

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={pizza.img} />
      <Card.Body>
        <Card.Title>{pizza.name}</Card.Title>
        <Card.Text>{pizza.price.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}</Card.Text>

        {/* Botón para redirigir a los detalles de la pizza */}
        <Link to={`/pizza/${pizza.id}`}>
          <Button variant="info" style={{ marginRight: '10px' }}>Ver más</Button>
        </Link>

        <Button onClick={() => addToCart(pizza)}>Agregar al Carrito</Button>
      </Card.Body>
    </Card>
  );
};

export default CardPizza;


