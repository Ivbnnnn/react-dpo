import React from 'react'
import { useNavigate  } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import Card from '../components/Card';
import ItemAddButton from '../components/ItemAddButton';
import api from "../api/api";
export default function UserPage() {
  const navigate = useNavigate ()
  
  function logout() {
  // Удаляем токен
  localStorage.removeItem("access_token"); // или sessionStorage.removeItem("access_token")
  
  // Перенаправляем на страницу логина
  window.location.href = "/login"; 
}

  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await api.get("/users/me");
      return res.data; // здесь есть user_id и user_name
    },
    staleTime: 5 * 60 * 1000,
  });
  const { data: items = [], isLoading: itemsLoading, error: itemsError } = useQuery({
    queryKey: ["items", user?.user_id],
    queryFn: async () => {
      if (!user) return [];
      const res = await api.get(`/get_owner_items/${user.user_id}`);
      return res.data;
    },
    enabled: !!user, // запрос выполняется только когда user есть
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000
  });

  if (userLoading) return <div>Загрузка пользователя...</div>;
  if (userError) return <div>Ошибка загрузки пользователя</div>;
  
    

  return (
    <div className="text-mainText bg-page min-h-screen relative">
      <div className='flex justify-between'>
              <button
              onClick={ () => navigate('/')}
              className='text-accent p-3'><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"/>
        </svg></button>
        {user.role_id === 2 && <div>
          admin
          </div>}
        <div className='m-4'>
          <button
            onClick={()=> logout()}
          >
            Выйти</button></div>
      </div>
      <div className='mx-4 my-4 bg-page p-4 flex gap-5'>
        <div>
          <input disabled
          className=" text-white h-min w-min border-2 border-accent p-2 rounded-lg"  type="text" placeholder={user.user_name}/>
          <div className='flex-col py-4'>
              <div className='text-accent text-xl'>Количество покупок</div>
              <div className='pl-8 text-accent text-3xl'>0</div>
              <ItemAddButton owner_id={user.user_id}/>
          </div>
        
        </div>
        <img 
        className="w-32 h-32 border-2 rounded-full border-accent object-cover shadow-lg"
        src="" 
        alt="Avatar" 
        />
        

      </div>
      <div className="grid grid-cols-[repeat(2,1fr)] h-width gap-4 p-4 lg:grid-cols-[repeat(4,1fr)] md:grid-cols-[repeat(3,1fr)] lg:p-10 lg:gap-10 md:p-6 md:gap-6">
          {itemsLoading && "Загрузка"}
          {itemsError && "Ошибка"}
          <div>{items.map((item) => (
                <Card key={item.item_id} item={item} />
                ))}
              </div>
      </div>
    
    </div>
  )
}
