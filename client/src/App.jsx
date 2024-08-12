import { useState } from "react";
import "./components/layout/MainLayout/MainLayout";
import MainLayout from "./components/layout/MainLayout/MainLayout.jsx";

import ExplorePage from "./components/pages/Explore/ExplorePage.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <MainLayout>
      <ExplorePage />
    </MainLayout>
  );
}

export default App;
