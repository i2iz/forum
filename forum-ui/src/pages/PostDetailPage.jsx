import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header"; // 추가
import ProfileCard from "../components/ProfileCard";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/boards/${id}`)
      .then((res) => setPost(res.data))
      .catch(() => {
        alert("게시글을 불러올 수 없습니다.");
        navigate("/");
      });
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
    try {
      await axios.delete(`/api/boards/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("삭제되었습니다.");
      navigate("/");
    } catch (err) {
      alert("삭제 실패");
    }
  };

  const handleRecommend = async () => {
    const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
    if (!token) return alert("로그인이 필요합니다.");
    try {
      const res = await axios.post(
        `/api/boards/${id}/recommend`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setPost({ ...post, recommendCount: res.data });
      alert("추천되었습니다!");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  if (!post) return <div className="p-10 text-center">로딩 중...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="max-w-6xl w-full mx-auto flex flex-col md:flex-row gap-6 p-6 flex-1">
        <section className="w-full md:w-[70%] bg-white border border-[#E2F0D9] rounded-lg p-8 shadow-sm h-fit">
          <div className="border-b pb-4 mb-6">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                {post.category?.name}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {post.title}
            </h2>
            {post.tags && (
              <div className="text-sm text-gray-400 mb-4 font-medium">
                {post.tags}
              </div>
            )}
            <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
              <span>
                작성자:{" "}
                <span className="font-semibold text-gray-700">
                  {post.writer?.nickname}
                </span>
              </span>
              <span>
                추천수:{" "}
                <span className="text-orange-500 font-bold">
                  {post.recommendCount}
                </span>
              </span>
            </div>
          </div>

          <div
            className="prose max-w-none min-h-[300px] mb-10 text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="flex justify-center gap-4 border-t pt-8">
            <button
              onClick={handleRecommend}
              className="px-8 py-2 bg-orange-50 text-orange-600 border border-orange-200 rounded-full font-bold hover:bg-orange-100 transition"
            >
              👍 추천하기
            </button>
            {user?.nickname === post.writer?.nickname && (
              <button
                onClick={handleDelete}
                className="px-8 py-2 bg-red-50 text-red-600 border border-red-200 rounded-full font-bold hover:bg-red-100 transition"
              >
                삭제하기
              </button>
            )}
            <button
              onClick={() => navigate("/")}
              className="px-8 py-2 bg-gray-50 text-gray-600 border border-gray-200 rounded-full font-bold hover:bg-gray-100 transition"
            >
              목록으로
            </button>
          </div>
        </section>

        <aside className="w-full md:w-[30%]">
          <ProfileCard />
        </aside>
      </main>
    </div>
  );
};

export default PostDetailPage;
