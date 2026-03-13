import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteItem } from "../api/items"; // путь поправь под проект

export default function ItemDeleteButton({ itemId }) {
  const qc = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (id) => deleteItem(id),
    onSuccess: (_data, variables) => {
      const deletedId = variables;

      // Удаляем из кеша списка items (работаем с разными форматами)
      qc.setQueryData(["items"], (old) => {
        if (!old) return old;

        if (Array.isArray(old)) {
          return old.filter((i) => i.item_id !== deletedId);
        }

        if (old?.data && Array.isArray(old.data)) {
          return { ...old, data: old.data.filter((i) => i.item_id !== deletedId) };
        }

        return old;
      });

      // Удаляем конкретный кэш для item
      qc.removeQueries({ queryKey: ["item", String(deletedId)], exact: true });

      navigate("/user");
    },
    onError: (err) => {
      alert("Не удалось удалить предмет: " + (err?.message || "Unknown error"));
    },
  });

  return (
    <button
      onClick={() => mutation.mutate(itemId)}
      disabled={mutation.isLoading}
      className="m-3 border-2 border-accent rounded-lg p-3 text-2xl"
    >
      {mutation.isLoading ? "Удаление..." : "Удалить предмет"}
    </button>
  );
}