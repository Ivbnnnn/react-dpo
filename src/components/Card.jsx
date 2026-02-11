import React from 'react'
import { Routes, Route, Link } from "react-router-dom"
export default function Card({ item }) {
  return (
    <Link to={`/item/${item.id}`}>
      <div className="border rounded-lg p-2 border-accent">
        <img src={item.src} alt={item.name} />
        <h3>{item.name}</h3>
        <p>${item.price}</p>
      </div>
    </Link>
  );
}
