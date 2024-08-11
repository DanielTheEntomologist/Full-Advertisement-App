import { useState } from "react";
import "./components/layout/MainLayout/MainLayout";
import MainLayout from "./components/layout/MainLayout/MainLayout.jsx";

function App() {
  const [count, setCount] = useState(0);

  return <MainLayout>App.jsx</MainLayout>;
}

export default App;
