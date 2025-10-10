import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.jsx";
import Post from "./pages/Post.jsx";
import Contact from "./pages/Contact.jsx";
import Portfolio from "./pages/Portifolio.jsx";
import useSmoothAnchor from "./hooks/useSmoothAnchor.js";
import PortfolioDetail from "./pages/PortifolioDetails.jsx";
import NotFound from "./pages/NotFound.jsx";

function Page({ children }) { return <main>{children}</main>; }

export default function App() {
  useSmoothAnchor(80);
  return (
    <div className="min-h-screen flex flex-col bg-white text-black dark:bg-[#0f0f12] dark:text-white">
      <Header />
      <Routes>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route path="/portfolio" element={<Page><Portfolio /></Page>} />
        <Route path="/portfolio/:slug" element={<Page><PortfolioDetail /></Page>} />
        <Route path="/blog" element={<Page><Blog /></Page>} />
        <Route path="/blog/:slug" element={<Page><Post /></Page>} />
        <Route path="/contato" element={<Page><Contact /></Page>} />
        <Route path="*" element={<Page><NotFound /></Page>} />
      </Routes>
      <Footer />
    </div>
  );
}


