import { useState } from "react";

import { Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout/MainLayout.jsx";
import ExplorePage from "./components/pages/Explore/ExplorePage.jsx";
import LoginPage from "./components/pages/LoginPage/LoginPage.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <MainLayout>
      <Routes>
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/login" element={<LoginPage entryPoint={"login"} />} />
        <Route
          path="/register"
          element={<LoginPage entryPoint={"register"} />}
        />
      </Routes>
    </MainLayout>
  );
}

export default App;
