import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MainPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 상단 이미지 영역 */}
      <div className="w-full h-48 bg-[#E2F0D9] flex items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-700">Forum Project</h1>
      </div>

      {/* 7:3 레이아웃 영역 */}
      <main className="max-w-6xl w-full mx-auto flex flex-col md:flex-row gap-6 p-6 flex-1">
        {/* 왼쪽 70%: 게시글 목록 */}
        <section className="w-full md:w-[70%] bg-white border border-[#E2F0D9] rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-600">
            최신 게시글
          </h2>
          <div className="text-gray-400 text-center py-20">
            게시글이 아직 없습니다.
          </div>
        </section>

        {/* 오른쪽 30%: 회원 정보 */}
        <aside className="w-full md:w-[30%] flex flex-col gap-4">
          <div className="bg-[#F7FCF5] border border-[#E2F0D9] rounded-lg p-6 shadow-sm">
            {user ? (
              <div className="text-center">
                <p className="font-bold text-lg mb-1 text-gray-700">
                  {user.nickname}님
                </p>
                <p className="text-sm text-gray-500 mb-4">반갑습니다!</p>

                <Link
                  to="/write"
                  className="block w-full py-2 mb-3 bg-[#E2F0D9] text-gray-700 rounded-md hover:bg-[#D4E8C8] transition font-medium text-center"
                >
                  새 글 작성
                </Link>

                <button
                  onClick={logout}
                  className="w-full py-2 bg-white border border-red-200 text-red-400 rounded-md hover:bg-red-50 transition text-sm"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="mb-4 text-gray-600">로그인이 필요합니다.</p>
                <Link
                  to="/login"
                  className="block w-full py-2 bg-[#E2F0D9] text-gray-700 rounded-md hover:bg-[#D4E8C8] transition font-medium"
                >
                  로그인 화면으로 이동
                </Link>
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default MainPage;
