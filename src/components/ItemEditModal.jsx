import React, { useState } from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

async function apiEditItem({itemId, formData}) {   
  const res = await fetch(`http://localhost:5000/update_item`, {
    method: "PATCH",    
    body: formData
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || res.statusText);
  }
  return res.status === 204 ? null : (await res.json().catch(() => null));
}

export default function ItemEditModal({itemId, onClose}) {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    // const [price, setPrice] = useState('')
    const [file, setFile] = useState(null)


    const qc = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
    mutationFn: ({ itemId, formData }) => apiEditItem({ itemId, formData }),

    onSuccess: (updatedItem, variables) => {
        const { itemId } = variables;

        // 1) Обновляем список items
        qc.setQueryData(["items"], (old) => {
        if (!old) return old;

        if (Array.isArray(old)) {
            return old.map((i) =>
            i.item_id === itemId ? { ...i, ...updatedItem } : i
            );
        }

        if (old?.data && Array.isArray(old.data)) {
            return {
            ...old,
            data: old.data.map((i) =>
                i.item_id === itemId ? { ...i, ...updatedItem } : i
            ),
            };
        }

        return old;
        });

        // 2) Обновляем кеш конкретного item
        qc.setQueryData(["item", String(itemId)], (old) =>
        old ? { ...old, ...updatedItem } : updatedItem
        );

        navigate(`/item/${itemId}`)
    },

    onError: (err) => {
        alert("Не удалось отредактировать предмет: " + (err?.message || "Unknown error"));
    },
    });


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
                <label htmlFor="name">Введите новое название</label>
                <input className='bg-black/30' type="text" name="" id="name"  placeholder='' value={name || ""} onChange={(e)=>{setName(e.target.value)}}/>               
                <label htmlFor="desc">Введите новое описание</label>
                <input className='bg-black/30' type="text" name="" id="desc"  placeholder='' value={desc || ""} onChange={(e)=>{setDesc(e.target.value)}}/>               
                {/* <label htmlFor="price">Введите новую цену</label>
                <input className='bg-black/30' type="text" name="" id="price"  placeholder='' value={price} onChange={(e)=>{setPrice(e.target.value)}}/>                */}
                <label htmlFor="file"  className='border border-mainText rounded-lg px-2'>Выберите новый файл</label>
                <input accept=".jpg,.jpeg,.png,.webp" className="hidden" type="file" name="" id="file"  placeholder='' value={undefined} onChange={(e)=>{setFile(e.target.files[0]) || null} }/>    
                <button className='bg-black/30 rounded-2xl'
                onClick={()=> {
                        const fd = new FormData();
                        fd.append("item_id", itemId)
                        fd.append("item_name", name);                    
                        fd.append("item_description", desc);                    
                        if (file) fd.append("file", file);

                        mutation.mutate({ itemId, formData: fd });
                        onClose();
                        }                    
                    }
                >Редактировать</button>
            </div>
        </div>           
    </div>  
)
}
