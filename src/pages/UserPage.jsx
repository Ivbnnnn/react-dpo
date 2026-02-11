import React from 'react'
import { useNavigate  } from 'react-router-dom'
export default function UserPage() {
  const navigate = useNavigate ()
  return (
    <div className="text-mainText bg-page min-h-screen">
      <button
      onClick={ () => navigate('/')}
      className='text-accent p-3'><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"/>
</svg></button>
      <div className='mx-4 my-4 bg-page p-4 flex gap-5'>
        <div>
          <input disabled
          className=" text-white h-min w-min border-2 border-accent p-2 rounded-lg"  type="text" placeholder='name'/>
          <div className='flex-col py-4'>
              <div className='text-accent text-xl'>Количество покупок</div>
              <div className='pl-8 text-accent text-3xl'>0</div>
          </div>
        
        </div>
        <img 
        className="w-32 h-32 border-2 rounded-full border-accent object-cover shadow-lg"
        src="/thardsoda/thardsoda1.jpg" 
        alt="Avatar" 
      />

      </div>
    
    </div>
  )
}
