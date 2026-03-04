import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// apiDeleteItem должен принимать itemId и возвращать промис
async function apiDeleteItem(itemId) {
  const res = await fetch(`http://localhost:5000/delete_item/${itemId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || res.statusText);
  }
  return res.status === 204 ? null : (await res.json().catch(() => null));
}

export default function ItemDeleteButton({ itemId }) {
  const qc = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    // mutationFn получает переменную, которую мы передаём в .mutate()
    mutationFn: (id) => apiDeleteItem(id),

    onSuccess: (_data, variables) => {
      const deletedId = variables; // то, что мы передали в mutate()

      // 1) Обновляем кеш списка "items" (подстраиваемся под разные форматы)
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

      // 2) Удаляем конкретный кэш для ["item", deletedId]
      qc.removeQueries({ queryKey: ["item", String(deletedId)], exact: true });

      // 3) Навигация после успешного удаления
      navigate("/user");
    },

    onError: (err) => {
      alert("Не удалось удалить предмет: " + (err?.message || "Unknown error"));
    },
  });

  return (
    <button
      onClick={() => mutation.mutate(itemId)} // передаём id в mutate
      disabled={mutation.isLoading}
      className="m-3 border-2 border-accent rounded-lg p-3 text-2xl"
    >
      {mutation.isLoading ? "Удаление..." : "Удалить предмет"}
    </button>
  );
}