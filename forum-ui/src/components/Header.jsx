import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [searchType, setSearchType] = useState("title");
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    // 검색 시 쿼리 스트링으로 메인 페이지로 이동 (검색 로직은 MainPage에서 처리)
    navigate(`/?searchType=${searchType}&keyword=${keyword}`);
  };

  return (
    <header className="w-full flex flex-col shadow-sm">
      {/* 1. 상단바 (Top Bar): 로고, 검색창, 네비게이션 */}
      <nav className="w-full bg-white border-b border-[#E2F0D9] px-6 py-3">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          {/* 로고 영역 */}
          <Link
            to="/"
            className="text-xl font-bold text-gray-800 hover:text-green-600 transition shrink-0"
          >
            🌱 <span className="hidden sm:inline">i2iz</span>
          </Link>

          {/* 중앙 검색창 영역 */}
          <form
            onSubmit={handleSearch}
            className="flex flex-1 max-w-lg w-full items-center border-2 border-[#E2F0D9] rounded-full px-2 py-1 bg-gray-50 focus-within:border-[#D4E8C8] focus-within:bg-white transition-all"
          >
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="bg-transparent text-sm text-gray-600 px-2 outline-none cursor-pointer border-r border-gray-200"
            >
              <option value="title">제목</option>
              <option value="content">내용</option>
              <option value="nickname">글쓴이</option>
            </select>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="검색어를 입력하세요..."
              className="flex-1 bg-transparent px-3 text-sm outline-none text-gray-700"
            />
            <button
              type="submit"
              className="p-1.5 text-gray-400 hover:text-green-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </form>

          {/* 네비게이션 메뉴 */}
          <div className="flex gap-6 text-sm font-medium text-gray-500 shrink-0">
            <Link to="/" className="hover:text-green-600">
              홈
            </Link>
            <button
              onClick={() => alert("준비 중입니다.")}
              className="hover:text-green-600"
            >
              뭐쓰지
            </button>
            <button
              onClick={() => alert("준비 중입니다.")}
              className="hover:text-green-600"
            >
              뭐넣지
            </button>
          </div>
        </div>
      </nav>

      {/* 하단 배너 영역 */}
      <div className="w-full h-40 bg-[#E2F0D9] flex flex-col items-center justify-center border-b border-[#D4E8C8]">
        <h1 className="text-4xl font-black text-gray-700 tracking-tight mb-2">
          게시판
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          적당히 게시판 만들어보기
        </p>
      </div>
    </header>
  );
};

export default Header;
