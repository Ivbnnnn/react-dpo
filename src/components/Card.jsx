import React from 'react'
import { Routes, Route, Link } from "react-router-dom"
function normalizeImageUrl(url) {
  if (!url) return "";

  return "http://localhost:5000/images/" + url
}
export default function Card({ item }) {
  console.log(item)
  return (
    
    <Link to={`/item/${item.item_id}`} state={{item}}>
      <div className="border rounded-lg p-2 border-accent">
        <img src={normalizeImageUrl(item.src)} alt={item.item_name} />
        <h3>{item.item_name}</h3>
        {/* <p>${item.price}</p> */}
        <p>$</p>
      </div>
    </Link>
  )
}
