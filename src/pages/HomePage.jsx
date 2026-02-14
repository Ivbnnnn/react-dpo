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
      <div className=" grid grid-cols-[repeat(2,1fr)] h-width gap-4 p-4 lg:grid-cols-[repeat(4,1fr)] md:grid-cols-[repeat(3,1fr)] lg:m-10 lg:gap-10 md:m-6 md:gap-6"> 
          {itemsArray.map(([key, item]) =>(
            <Card key={key} item={item} />

          ))}
      </div>    
      <MenuButton/>  
    </div>
  )
}
