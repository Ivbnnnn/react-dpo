import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../api/api";

function getErrorMessage(err) {
  return err?.response?.data?.detail || err?.message || "Ошибка при выполнении запроса";
}

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUpMutation = useMutation({
    mutationFn: async ({ username, password }) => {      
      const payload = {
        user_name: username,
        user_password: password,
      };
      const res = await api.post("/users/", payload);
      return res.data;
    },
      onSuccess: async (_data) => {
        try {
          const body = new URLSearchParams();
          body.append("username", username);
          body.append("password", password);
          const tokenRes = await api.post("/signup", body);
          const token = tokenRes.data?.access_token;
          if (token) {
            localStorage.setItem("token", token);
            navigate("/");
            return;
          }
        } catch (err) {          
          console.warn("Auto-login failed:", err);
        }
        navigate("/login");
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
    signUpMutation.mutate({ username, password });
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
          />

          <label className="mx-auto">Пароль</label>
          <input
            className="mx-auto border"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={signUpMutation.isLoading}
            className="bg-black/30 rounded-2xl px-4 py-2"
          >
            {signUpMutation.isLoading ? "Отправка..." : "Зарегистрироваться"}
          </button>
        </form>

        <Link to="/login">Уже есть аккаунт? Войти</Link>
      </div>
    </div>
  );
}