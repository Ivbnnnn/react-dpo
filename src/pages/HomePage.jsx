import React from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import MenuButton from "../components/MenuButton";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api"; // <- путь к твоему axios instance

function ItemsGrid() {
  const {
    data: rawItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await api.get("/get_items");
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 минут
    cacheTime: 30 * 60 * 1000, // 30 минут
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (error) {
    console.error("Ошибка загрузки items:", error);
    return <p>Ошибка при загрузке данных</p>;
  }

  // Поддерживаем варианты ответа: массив или { data: [...] }
  const items = Array.isArray(rawItems)
    ? rawItems
    : rawItems?.data && Array.isArray(rawItems.data)
    ? rawItems.data
    : [];

  if (!items.length) return <p>Пусто</p>;

  return (
    <div className="grid grid-cols-[repeat(2,1fr)] h-width gap-4 p-4 lg:grid-cols-[repeat(4,1fr)] md:grid-cols-[repeat(3,1fr)] lg:m-10 lg:gap-10 md:m-6 md:gap-6">
      {items.map((item) => (
        <Card key={item.item_id ?? item.id} item={item} />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="text-mainText bg-page min-h-screen">
      <Header />
      <div>
        <ItemsGrid />
      </div>
      <MenuButton />
    </div>
  );
}