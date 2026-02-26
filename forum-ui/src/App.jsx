import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WritePage from "./pages/WritePage";
import PostDetailPage from "./pages/PostDetailPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<SignupPage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/boards/:id" element={<PostDetailPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
