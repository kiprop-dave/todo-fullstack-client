import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Todos from "./pages/Todos";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/" element={<RequireAuth />}>
          <Route path="/todo" element={<Todos />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
