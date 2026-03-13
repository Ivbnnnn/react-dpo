import React from 'react'
import { useParams, useNavigate, Navigate, useLocation} from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import itemsData from '/items.json'
import ItemDeleteButton from '../components/ItemDeleteButton';
import ItemEditButton from '../components/ItemEditButton'
import api from "../api/api";
function normalizeImageUrl(url) {
  if (!url) return "";

  return "http://localhost:5000/images/" + url
}

export default function ItemView() {
    const navigate = useNavigate()

    const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await api.get("/users/me");
      return res.data; // здесь есть user_id и user_name
    },
    staleTime: 5 * 60 * 1000,
  });


    const {id} = useParams()
    const location = useLocation();
    const passedItem = location.state?.item;
    console.log(user)

    const { data: item } = useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/get_items/${id}`);
      return res.json();
    },
    enabled: !passedItem, // не делать запрос, если item уже есть
  });

  const finalItem = passedItem || item;
    if (!finalItem){
      return <Navigate to="/404" replace />;
    }
    const isOwner = user?.user_id === finalItem.owner_id || user?.role_id === 2;
    return (
    
    <div className="text-mainText bg-page min-h-screen relative">
        <button
      onClick={ () => navigate('/')}
      className='text-accent p-3'><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"/>
</svg></button>
          <div className=" p-4 border-accent">
        
        <img 
            className='py-6 lg:h-170 md:h-130'
        
        src={normalizeImageUrl(finalItem.src)} alt={finalItem.item_name} />
        <h3 className='px-1 text-2xl'>{finalItem.item_name}</h3>
        <p className='px-4 text-2xl'>$price</p>
        { !isOwner &&
        <button
        onClick={()=> navigate('/')}
        className='m-3 border-2 border-accent rounded-lg
        p-3 text-2xl'>Написать продавцу</button>}
        {isOwner && <ItemDeleteButton itemId={finalItem.item_id}/>
          }
        
        {isOwner && <ItemEditButton itemId={finalItem.item_id}/>
          }
        
    
      </div>
    </div>
  )
}
