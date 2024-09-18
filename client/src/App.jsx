import { Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout/MainLayout.jsx";
import ExplorePage from "./components/pages/Explore/ExplorePage.jsx";
import LoginPage from "./components/pages/LoginPage/LoginPage.jsx";
import LogoutPage from "./components/pages/LogoutPage/LogoutPage.jsx";
import AdPage from "./components/pages/AdPage/AdPage.jsx";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<ExplorePage />} />
        <Route path="/ads/:id" element={<AdPage />} />
        <Route path="/ads" element={<ExplorePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/adsdisplay" element={<AdPage></AdPage>} />
        <Route path="/*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </MainLayout>
  );
}

export default App;
