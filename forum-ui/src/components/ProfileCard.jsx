import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfileCard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-[#F7FCF5] border border-[#E2F0D9] rounded-lg p-6 shadow-sm sticky top-6">
      {user ? (
        <div className="text-center">
          {/* 아바타 영역 */}
          <div className="w-16 h-16 bg-[#E2F0D9] rounded-full mx-auto mb-3 flex items-center justify-center text-gray-600 font-bold text-xl">
            {user.nickname[0]}
          </div>

          <p className="font-bold text-lg text-gray-700 mb-1">
            {user.nickname}님
          </p>
          <p className="text-[10px] text-green-600 font-bold mb-4 uppercase tracking-wider">
            {user.role}
          </p>

          <Link
            to="/write"
            className="block w-full py-2 mb-3 bg-[#E2F0D9] text-gray-700 rounded-md hover:bg-[#D4E8C8] transition font-medium text-center"
          >
            새 글 작성
          </Link>

          <button
            onClick={logout}
            className="w-full py-2 bg-white border border-red-100 text-red-400 rounded-md hover:bg-red-50 transition text-sm"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-4 text-gray-600 text-sm">로그인이 필요합니다.</p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-2 bg-[#E2F0D9] text-gray-700 rounded-md hover:bg-[#D4E8C8] transition font-medium"
          >
            로그인 화면으로 이동
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
