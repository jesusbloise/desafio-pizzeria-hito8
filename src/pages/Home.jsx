import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; 

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const { addToCart } = useCart(); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/pizzas")
      .then((response) => response.json())
      .then((data) => setPizzas(data))
      .catch((error) => console.error("Error fetching pizzas:", error));
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "20px" }}>
      {pizzas.map((pizza) => (
        <div
          key={pizza.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            maxWidth: "300px",
            textAlign: "center",
            flex: "1 1 calc(33.333% - 40px)",
            boxSizing: "border-box",
          }}
        >
          <h2>{pizza.name}</h2>
          <img src={pizza.img} alt={pizza.name} style={{ width: "100%", borderRadius: "8px" }} />
          <p><strong>Precio:</strong> ${pizza.price}</p>
          <p><strong>Ingredientes:</strong> {pizza.ingredients.join(", ")}</p>
    
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              margin: "10px 5px",
            }}
            onClick={() => navigate(`/pizza/${pizza.id}`)}  
          >
            Ver más
          </button>
          <button
            style={{
              backgroundColor: "#008CBA",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              margin: "10px 5px",
            }}
            onClick={() => addToCart(pizza)}  
          >
            Añadir al carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;

