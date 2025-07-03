import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Profile from "./pages/Profile"
import NavBar from "./components/NavBar"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useAuthStore } from "./store/useAuthStote"
import { useEffect } from "react"
import { getUser } from "./utils/getUser"
import Bag from "./pages/Bag"
import Dashboard from "./pages/Dashboard"
import AdminRoute from "./components/AdminRoute"

function App() {

  const { setUser } = useAuthStore();

  useEffect(() => {
    const decodedUser = getUser();
    if (decodedUser) setUser(decodedUser);
  }, [setUser]);

  return (
    <Router>
      <div className="flex min-h-screen mx-auto flex-col">
        <NavBar />
        <main className="flex-1 flex justify-center">
          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/bag" element={<Bag />} />
            <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />

          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
