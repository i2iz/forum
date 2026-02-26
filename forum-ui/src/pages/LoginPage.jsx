import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/members/login", { loginId, password });
      login(res.data);
      navigate("/");
    } catch (err) {
      alert(
        err.response?.data?.message || "아이디 또는 비밀번호를 확인해주세요.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0FFF0]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-[#E2F0D9]"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          로그인
        </h2>
        <input
          type="text"
          placeholder="아이디"
          className="w-full p-3 mb-4 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E2F0D9]"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full p-3 mb-6 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E2F0D9]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full py-3 bg-[#E2F0D9] text-gray-700 font-bold rounded-md hover:bg-[#D4E8C8] mb-4 transition">
          로그인
        </button>
        <div className="text-center text-sm text-gray-500">
          계정이 없으신가요?{" "}
          <Link to="/join" className="text-green-600 hover:underline">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
