import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";

const MainPage = () => {
  const [notices, setNotices] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "0");
  const searchType = query.get("searchType") || "title";
  const keyword = query.get("keyword") || "";

  useEffect(() => {
    axios
      .get("/api/boards", {
        params: { page, searchType, keyword },
      })
      .then((res) => {
        setNotices(res.data.notices || []);
        setPosts(res.data.posts || []);
        setTotalPages(res.data.totalPages || 0);
      })
      .catch((err) => console.error(err));
  }, [page, searchType, keyword]);

  const renderPagination = () => {
    const pages = [];
    const start = Math.max(0, page - 4);
    const end = Math.min(totalPages - 1, start + 9);

    for (let i = start; i <= end; i++) {
      pages.push(
        <Link
          key={i}
          to={`/?page=${i}&searchType=${searchType}&keyword=${keyword}`}
          className={`px-3 py-1 rounded ${i === page ? "bg-[#E2F0D9] text-gray-700 font-bold" : "text-gray-400 hover:bg-gray-50"}`}
        >
          {i + 1}
        </Link>,
      );
    }
    return pages;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />
      <main className="max-w-6xl w-full mx-auto flex flex-col md:flex-row gap-6 p-6 flex-1">
        <section className="w-full md:w-[70%]">
          <div className="bg-white border border-[#E2F0D9] rounded-lg shadow-sm overflow-hidden flex flex-col min-h-[600px]">
            <h2 className="text-xl font-semibold p-4 border-b text-gray-600 bg-[#F7FCF5]">
              {keyword ? `'${keyword}' 검색 결과` : "최신 게시글"}
            </h2>

            <div className="divide-y divide-gray-100 flex-1">
              {notices.map((notice) => (
                <Link
                  to={`/boards/${notice.id}`}
                  key={notice.id}
                  className="flex items-center p-4 bg-[#FFFBEB] hover:bg-[#FEF3C7] transition"
                >
                  <span className="bg-orange-400 text-white text-[10px] px-2 py-0.5 rounded mr-3 font-bold">
                    공지
                  </span>
                  <div className="flex-1 flex flex-col">
                    <span className="font-bold text-gray-800">
                      📢 {notice.title}
                    </span>
                    {notice.tags && (
                      <span className="text-xs text-gray-400 mt-0.5">
                        {notice.tags}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </span>
                </Link>
              ))}

              {posts.length > 0 ? (
                posts.map((post) => (
                  <Link
                    to={`/boards/${post.id}`}
                    key={post.id}
                    className="flex items-center p-4 hover:bg-gray-50 transition"
                  >
                    <span className="text-sm text-gray-400 w-10 text-center">
                      {post.id}
                    </span>
                    <div className="flex-1 px-3 flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700 font-medium">
                          {post.title}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded border border-gray-200">
                          {post.category?.name}
                        </span>
                      </div>
                      {post.tags && (
                        <span className="text-xs text-gray-400 mt-1">
                          {post.tags}
                        </span>
                      )}
                    </div>
                    <div className="text-right flex flex-col items-end shrink-0">
                      <span className="text-sm text-gray-600 font-semibold">
                        {post.writer?.nickname}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-gray-400 text-center py-20">
                  게시글이 없습니다.
                </div>
              )}
            </div>

            <div className="p-4 border-t flex justify-center items-center gap-2 bg-[#F7FCF5]">
              <Link
                to={`/?page=${Math.max(0, page - 1)}&searchType=${searchType}&keyword=${keyword}`}
                className={`text-sm ${page === 0 ? "text-gray-200 pointer-events-none" : "text-gray-500 hover:text-gray-800"}`}
              >
                이전
              </Link>
              <div className="flex gap-1">{renderPagination()}</div>
              <Link
                to={`/?page=${Math.min(totalPages - 1, page + 1)}&searchType=${searchType}&keyword=${keyword}`}
                className={`text-sm ${page >= totalPages - 1 ? "text-gray-200 pointer-events-none" : "text-gray-500 hover:text-gray-800"}`}
              >
                다음
              </Link>
            </div>
          </div>
        </section>

        <aside className="w-full md:w-[30%]">
          <ProfileCard />
        </aside>
      </main>
    </div>
  );
};

export default MainPage;
