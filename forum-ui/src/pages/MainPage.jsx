import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header"; // 추가
import ProfileCard from "../components/ProfileCard";

const MainPage = () => {
  const [notices, setNotices] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/boards")
      .then((res) => {
        setNotices(res.data.notices || []);
        setPosts(res.data.posts || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="max-w-6xl w-full mx-auto flex flex-col md:flex-row gap-6 p-6 flex-1">
        <section className="w-full md:w-[70%]">
          <div className="bg-white border border-[#E2F0D9] rounded-lg shadow-sm overflow-hidden">
            <h2 className="text-xl font-semibold p-4 border-b text-gray-600 bg-[#F7FCF5]">
              최신 게시글
            </h2>

            <div className="divide-y divide-gray-100">
              {/* 공지사항 렌더링 */}
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

              {/* 일반 게시글 렌더링 */}
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
                      <span className="text-xs text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-gray-400 text-center py-20">
                  게시글이 아직 없습니다.
                </div>
              )}
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
