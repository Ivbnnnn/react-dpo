import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { editItem } from "../api/items"; // путь поправь под проект

export default function ItemEditModal({ itemId, onClose, initial }) {
  // optional: initial props для предзаполнения полей
  const [name, setName] = useState(initial?.item_name || "");
  const [desc, setDesc] = useState(initial?.item_description || "");
  const [file, setFile] = useState(null);

  const qc = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData) => editItem(formData),
    onSuccess: (updatedItem, variables) => {
      // variables — это FormData, откуда можно достать item_id
      const fd = variables;
      const id = fd?.get ? fd.get("item_id") : itemId;
      const normalizedId = id ? String(id) : String(itemId);

      // 1) Обновляем список items в кеше
      qc.setQueryData(["items"], (old) => {
        if (!old) return old;

        if (Array.isArray(old)) {
          return old.map((i) => (String(i.item_id) === normalizedId ? { ...i, ...updatedItem } : i));
        }

        if (old?.data && Array.isArray(old.data)) {
          return {
            ...old,
            data: old.data.map((i) =>
              String(i.item_id) === normalizedId ? { ...i, ...updatedItem } : i
            ),
          };
        }

        return old;
      });

      // 2) Обновляем кэш конкретного item
      qc.setQueryData(["item", normalizedId], (old) => (old ? { ...old, ...updatedItem } : updatedItem));

      navigate(`/item/${normalizedId}`);
      onClose();
    },
    onError: (err) => {
      alert("Не удалось отредактировать предмет: " + (err?.message || "Unknown error"));
    },
  });

  const handleSubmit = () => {
    const fd = new FormData();
    fd.append("item_id", itemId);
    fd.append("item_name", name);
    fd.append("item_description", desc);
    if (file) fd.append("file", file);

    mutation.mutate(fd);
    // закрытие — в onSuccess
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-100 flex items-center justify-center">
      <div className="flex flex-col bg-surfaceHover text-mainText p-4 text-lg rounded-2xl">
        <div className="flex justify-end text-error">
          <button className="cursor-pointer" onClick={() => onClose()}>
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="name">Введите новое название</label>
          <input
            className="bg-black/30"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="desc">Введите новое описание</label>
          <input
            className="bg-black/30"
            type="text"
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <label htmlFor="file" className="border border-mainText rounded-lg px-2">
            Выберите новый файл
          </label>
          <input
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0] || null)}
          />

          <button className="bg-black/30 rounded-2xl" onClick={handleSubmit} disabled={mutation.isLoading}>
            {mutation.isLoading ? "Отправка..." : "Редактировать"}
          </button>
        </div>
      </div>
    </div>
  );
}