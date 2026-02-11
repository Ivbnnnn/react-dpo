import React from 'react'
import { useState } from 'react'

export default function Header() {

  const [popupActive, setPopupActive] = useState(false)
  

  return (
    <div className='p-3 bg-page'>
      <div className={`  rounded-lg  border-accent flex justify-between`}>
        <div className='p-2  flex  border-2 items-center rounded-lg border-accent'>
          <input
    type="text"
    placeholder="Поиск"
    className="flex outline-none caret-accent"
  />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className='w-4 h-4 text-gray-400'
    viewBox="0 0 16 16"
  >
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
  </svg>
        </div>
        <button onClick={() => setPopupActive(true)}
        className={`border-2 
          rounded-lg
          p-2
        border-accent 
        hover:border-accentHover 
        ${popupActive ? "border-accentHover": ""}
        
        `}>
          Фильтр
        </button>
        {popupActive && (
    <div
      className="fixed inset-0 bg-black/10 backdrop-blur-xs flex items-center justify-center z-50"
      onClick={() => setPopupActive(false)} 
    >
      <div
        className="bg-white p-6 rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()} 
      >
        Фильтр
        <button
          onClick={() => setPopupActive(false)}
          className="ml-4 text-red-500"
        >
          Закрыть
        </button>
      </div>
    </div>
  )}
      </div>
    </div>
  )
}
