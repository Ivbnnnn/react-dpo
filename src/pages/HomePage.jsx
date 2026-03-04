import React from 'react'
import Card from "../components/Card";
import Header from "../components/Header";
import itemsData from '/items.json'
import MenuButton from '../components/MenuButton';
import { useEffect, useMemo } from 'react';
const itemsArray = Object.entries(itemsData.items);
import { useQuery } from "@tanstack/react-query";

function ItemsPage() {
  const { data: items, isLoading, error } = useQuery({
    queryKey: ["items"],
    queryFn: () =>
      fetch("http://localhost:5000/get_items")
        .then(res => res.json()),
    staleTime: 5 * 60 * 1000,  // 5 минут данные считаются "свежими"
    cacheTime: 30 * 60 * 1000 // храним в памяти 30 минут
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка</p>;

  return (
    <div  className=" grid grid-cols-[repeat(2,1fr)] h-width gap-4 p-4 lg:grid-cols-[repeat(4,1fr)] md:grid-cols-[repeat(3,1fr)] lg:m-10 lg:gap-10 md:m-6 md:gap-6">
    {items.map((item) => (
      <Card key={item.item_id} item={item} />
      ))}
    </div>
  );
}
export default function HomePage() {

  return (
    <div className="text-mainText bg-page min-h-screen">
      <Header/>
      <div> 
          <ItemsPage />
      </div>    
      <MenuButton/>  
    </div>
  )
}
