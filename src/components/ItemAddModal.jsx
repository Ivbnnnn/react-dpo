import React, { useState } from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

async function apiAddItem({ formData }) {   
  const res = await fetch(`http://localhost:5000/add_item`, {
    method: "POST",    
    body: formData
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || res.statusText);
  }
  return res.status === 204 ? null : (await res.json().catch(() => null));
}

export default function ItemAddModal({ owner_id, onClose }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);

  const qc = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ formData }) => apiAddItem({ formData }),
    onSuccess: (updatedItem) => {
      // ❗ Отмечаем список items как устаревший, React Query сделает рефетч
      qc.invalidateQueries(["items"]);

      // Можно обновить конкретный item в кеше, если нужно
      if (updatedItem?.item_id) {
        qc.invalidateQueries(["item", String(updatedItem.item_id)]);
        navigate(`/item/${updatedItem.item_id}`);
      }

      onClose();
    },
    onError: (err) => {
      alert("Не удалось добавить/редактировать предмет: " + (err?.message || "Unknown error"));
    }
  });

  const handleSubmit = () => {
    const fd = new FormData();
    fd.append("owner_id", owner_id);
    fd.append("item_name", name);
    fd.append("item_description", desc);
    if (file) fd.append("file", file);

    mutation.mutate({ formData: fd });
    onClose()
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-100 flex items-center justify-center">
      <div className='flex flex-col bg-surfaceHover text-mainText p-4 text-lg  rounded-2xl'>

        <div className='flex justify-end text-error'>
          <button className='cursor-pointer' onClick={()=>{onClose()}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" fillRule="evenodd" className="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </button>
        </div>
        <div className='flex flex-col gap-4'>
          <label>Введите название</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className='bg-black/30' placeholder='Название'/>
          
          <label>Введите описание</label>
          <input type="text" value={desc} onChange={e => setDesc(e.target.value)} className='bg-black/30' placeholder='Описание'/>

          <label htmlFor='file' className='border border-mainText rounded-lg px-2'>Выберите файл</label>
          <input type="file" id='file' onChange={e => setFile(e.target.files[0] || null)} accept=".jpg,.jpeg,.png,.webp" className="hidden" />

          <button className='bg-black/30 rounded-2xl' onClick={handleSubmit}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}