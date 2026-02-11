import React from 'react'
import Card from "../components/Card";
import Header from "../components/Header";
import itemsData from '/items.json'
import MenuButton from '../components/MenuButton';
const itemsArray = Object.entries(itemsData.items);
export default function HomePage() {
  return (
    <div className="text-mainText bg-page min-h-screen">
      <Header/>
      <div className=" grid grid-cols-[repeat(2,1fr)] h-width gap-4 p-4 "> 
          {itemsArray.map(([key, item]) =>(
            <Card key={key} item={item} />

          ))}
      </div>    
      <MenuButton/>  
    </div>
  )
}
