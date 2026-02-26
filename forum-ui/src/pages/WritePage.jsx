import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const WritePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("카테고리 호출 실패", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryId) return alert("카테고리를 선택해주세요.");

    const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

    try {
      await axios.post(
        "/api/boards",
        {
          title,
          content,
          tags,
          categoryId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      alert("글이 등록되었습니다.");
      navigate("/");
    } catch (err) {
      alert("등록 실패: " + (err.response?.data?.message || "알 수 없는 오류"));
    }
  };

  return (
    <div className="min-h-screen bg-[#F0FFF0] p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md border border-[#E2F0D9]"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700">새 글 작성</h2>

        <select
          className="w-full p-2 mb-4 border border-gray-200 rounded focus:ring-2 focus:ring-[#E2F0D9]"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">카테고리 선택</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="제목"
          className="w-full p-3 mb-4 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#E2F0D9]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="태그 (예: #자유 #질문)"
          className="w-full p-2 mb-4 border border-gray-100 rounded focus:outline-none"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div className="mb-12 h-80">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="h-full"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-gray-300 rounded text-gray-500 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#E2F0D9] text-gray-700 font-bold rounded hover:bg-[#D4E8C8]"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default WritePage;
