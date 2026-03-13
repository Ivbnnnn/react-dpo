// src/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../api/api";

function getErrorMessage(err) {
  return err?.response?.data?.detail || err?.message || "Ошибка при выполнении запроса";
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(true); 
  const navigate = useNavigate();
  
  useEffect(() => {
    let mounted = true;

    const tryRefresh = async () => {
      try {      
        const res = await api.post("/refresh");
        const newToken = res?.data?.access_token;
        if (newToken) {
          localStorage.setItem("token", newToken);
          if (mounted) navigate("/");
        }
      } catch (err) {

      } finally {
        if (mounted) setChecking(false);
      }
    };

    tryRefresh();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }) => {
      const body = new URLSearchParams();
      body.append("username", username);
      body.append("password", password);
      const res = await api.post("/token", body.toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      return res.data; // { access_token, token_type }
    },
    onSuccess: (data) => {
      const token = data?.access_token;
      if (!token) {
        alert("Сервер не вернул токен");
        return;
      }
      localStorage.setItem("token", token);
      navigate("/");
    },
    onError: (err) => {
      alert(getErrorMessage(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Введите логин и пароль");
      return;
    }
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="text-mainText bg-page min-h-screen">
      <div className="flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mx-auto gap-4 justify-center my-50"
        >
          <label className="mx-auto">Логин</label>
          <input
            className="mx-auto border"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={checking || loginMutation.isLoading}
          />

          <label className="mx-auto">Пароль</label>
          <input
            className="mx-auto border"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={checking || loginMutation.isLoading}
          />

          <button
            type="submit"
            disabled={checking || loginMutation.isLoading}
            className="bg-black/30 rounded-2xl px-4 py-2"
          >
            {checking
              ? "Проверка..."
              : loginMutation.isLoading
              ? "Вход..."
              : "Войти"}
          </button>
        </form>

        <Link to="/signUp">Нет аккаунта? Зарегистрироваться</Link>
      </div>
    </div>
  );
}