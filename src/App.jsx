import { BrowserRouter, Routes, Route } from "react-router-dom";
import FontImport from "./components/FontImport";
import RequireAuth from "./components/RequireAuth";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AppShell from "./pages/AppShell";
import DecksHome from "./pages/DecksHome";
import AddCard from "./pages/AddCard";
import Browse from "./pages/Browse";
import Review from "./pages/Review";
import Stats from "./pages/Stats";
import SharedDeck from "./pages/SharedDeck";

export default function App() {
  return (
    <BrowserRouter>
      <FontImport />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shared/:slug" element={<SharedDeck />} />
        <Route path="/app" element={<RequireAuth><AppShell /></RequireAuth>}>
          <Route index element={<DecksHome />} />
          <Route path="add" element={<AddCard />} />
          <Route path="deck/:deckId" element={<DecksHome />} />
          <Route path="deck/:deckId/add" element={<AddCard />} />
          <Route path="deck/:deckId/browse" element={<Browse />} />
          <Route path="deck/:deckId/review" element={<Review />} />
          <Route path="deck/:deckId/stats" element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
