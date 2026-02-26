import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [form, setForm] = useState({ loginId: "", password: "", nickname: "" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.loginId.length < 4) {
      alert("아이디는 4자 이상이어야 합니다.");
      return;
    }
    if (form.nickname.length < 2) {
      alert("닉네임은 2자 이상이어야 합니다.");
      return;
    }

    try {
      await axios.post("/api/members/join", form);
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0FFF0]">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-[#E2F0D9]"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          회원가입
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="아이디 (4자 이상)"
            className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E2F0D9]"
            onChange={(e) => setForm({ ...form, loginId: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E2F0D9]"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="닉네임 (2자 이상)"
            className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E2F0D9]"
            onChange={(e) => setForm({ ...form, nickname: e.target.value })}
            required
          />
          <button className="w-full py-3 bg-[#E2F0D9] text-gray-700 font-bold rounded-md hover:bg-[#D4E8C8] transition mt-2">
            가입하기
          </button>
        </div>
        <div className="text-center mt-4 text-sm text-gray-500">
          이미 계정이 있나요?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-green-600 hover:underline"
          >
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
