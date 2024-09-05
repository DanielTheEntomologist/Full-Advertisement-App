import { Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout/MainLayout.jsx";
import ExplorePage from "./components/pages/Explore/ExplorePage.jsx";
import LoginPage from "./components/pages/LoginPage/LoginPage.jsx";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<ExplorePage />} />
        <Route path="/ads" element={<ExplorePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/login" element={<LoginPage entryPoint={"login"} />} />
        <Route
          path="/register"
          element={<LoginPage entryPoint={"register"} />}
        />
        <Route path="/*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </MainLayout>
  );
}

export default App;
