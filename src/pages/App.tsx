import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { HeaderBrand } from "../ui/HeaderBrand";
import { Footer } from "../ui/Footer";
import { Home } from "./Home";

export default function App() {
  const location = useLocation();
  const showHeader = location.pathname !== "/";

  return (
    <div className="flex min-h-screen flex-col font-body text-ink">
      {showHeader && <HeaderBrand />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <Footer />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "var(--color-surface)",
            color: "var(--color-ink)",
            border: "1px solid var(--color-line)",
            fontSize: "13px",
          },
        }}
      />
    </div>
  );
}
