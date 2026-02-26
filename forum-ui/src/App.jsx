import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("연결 중...");

  const [errMessage, setErrMessage] = useState("연결 중...");

  useEffect(() => {
    axios
      .get("/api")
      .then((response) => {
        setMessage(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error(error);
        setMessage("서버 연결 실패");
      });

    axios
      .get("/api/non")
      .then((response) => {
        setErrMessage(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("에러 발생!", error);

        // 서버에서 응답이 온 경우 (우리가 만든 ErrorDto가 담겨 있음)
        if (error.response) {
          setErrMessage(JSON.stringify(error.response.data));
        } else {
          // 서버 자체가 꺼져 있거나 네트워크 오류인 경우
          setErrMessage("서버에 연결할 수 없습니다.");
        }
      });
  }, []);

  return (
    <>
      <div>
        <h1>API 연결 테스트</h1>
        <p>서버 응답: {message}</p>
      </div>
      <div>
        <h1>API 에러 테스트</h1>
        <p>서버 응답: {errMessage}</p>
      </div>
    </>
  );
}

export default App;
