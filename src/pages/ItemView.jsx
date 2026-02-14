import React from 'react'
import { useParams, useNavigate } from "react-router-dom"
import itemsData from '/items.json'
const itemsArray = Object.entries(itemsData.items);

export default function ItemView() {
    const navigate = useNavigate()
    const {id} = useParams()
    const itemEntry = itemsArray.find(([key, item]) => item.id === +id)
    const item = itemEntry?.[1] 
    if (!item){
      return navigate('/404')
    }
    return (
    
    <div className="text-mainText bg-page min-h-screen">
        <button
      onClick={ () => navigate('/')}
      className='text-accent p-3'><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"/>
</svg></button>
          <div className=" p-4 border-accent">
        <h3 className='px-1 text-2xl'>{item.name}</h3>
        <img 
            className='py-6'
        
        src={item.src} alt={item.name} />
        
        <p className='px-4 text-2xl'>${item.price}</p>
        <button
        onClick={()=> navigate('/')}
        className='m-3 border-2 border-accent rounded-lg
        p-3 text-2xl'>Написать продавцу</button>
      </div>
    </div>
  )
}
