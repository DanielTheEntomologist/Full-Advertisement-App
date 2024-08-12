import { useState } from "react";
import "./components/layout/MainLayout/MainLayout";
import MainLayout from "./components/layout/MainLayout/MainLayout.jsx";

import ads from "./components/common/AdCard/MockAds";
import AdCard from "./components/common/AdCard/AdCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <MainLayout>
      {ads.map((ad) => (
        <AdCard ad={ad} key={ad.id} />
      ))}
    </MainLayout>
  );
}

export default App;
