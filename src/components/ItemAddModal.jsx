import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addItem } from "../api/items"; // путь поправь под проект

export default function ItemAddModal({ owner_id, onClose }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const qc = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData) => addItem(formData),
    onSuccess: (createdItem) => {
      // Обновим список items (рефетч или ручное обновление)
      qc.invalidateQueries(["items"]);

      if (createdItem?.item_id) {
        qc.invalidateQueries(["item", String(createdItem.item_id)]);
        navigate(`/item/${createdItem.item_id}`);
      }

      onClose();
    },
    onError: (err) => {
      alert("Не удалось добавить предмет: " + (err?.message || "Unknown error"));
    },
  });

  const handleSubmit = () => {
    const fd = new FormData();
    fd.append("owner_id", owner_id);
    fd.append("item_name", name);
    fd.append("item_description", desc);
    if (file) fd.append("file", file);

    mutation.mutate(fd);
    // не закрываем модалку сразу — закроется в onSuccess
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-100 flex items-center justify-center">
      <div className="flex flex-col bg-surfaceHover text-mainText p-4 text-lg rounded-2xl">
        <div className="flex justify-end text-error">
          <button className="cursor-pointer" onClick={() => onClose()}>
            {/* SVG */}
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <label>Введите название</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-black/30"
            placeholder="Название"
          />

          <label>Введите описание</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="bg-black/30"
            placeholder="Описание"
          />

          <label htmlFor="file" className="border border-mainText rounded-lg px-2">
            Выберите файл
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0] || null)}
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
          />

          <button
            className="bg-black/30 rounded-2xl"
            onClick={handleSubmit}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Отправка..." : "Добавить"}
          </button>
        </div>
      </div>
    </div>
  );
}