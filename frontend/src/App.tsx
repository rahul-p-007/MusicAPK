import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage.tsx";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage.tsx";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import Mainlayout from "./layout/Mainlayout.tsx";
import ChatPage from "./pages/chat/ChatPage.tsx";
import AlbumPage from "./pages/album/AlbumPage.tsx";
function App() {
  return (
    <Routes>
      <Route
        path="/sso-callback"
        element={
          <AuthenticateWithRedirectCallback
            signInForceRedirectUrl={"/auth-callback"}
          />
        }
      />

      <Route path="/auth-callback" element={<AuthCallbackPage />} />

      <Route element={<Mainlayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/albums/:albumId" element={<AlbumPage />} />
      </Route>
    </Routes>
  );
}

export default App;
