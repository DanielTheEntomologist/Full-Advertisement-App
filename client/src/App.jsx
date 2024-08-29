import { useState } from "react";
import "./components/layout/MainLayout/MainLayout";
import MainLayout from "./components/layout/MainLayout/MainLayout.jsx";

import ExplorePage from "./components/pages/Explore/ExplorePage.jsx";
import LoginPage from "./components/pages/LoginPage/LoginPage.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <MainLayout>
      <ExplorePage />
      <LoginPage />
    </MainLayout>
  );
}

export default App;
