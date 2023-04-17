import "./components/Global.scss"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import { Context } from "./helpers/context"
import Login from "./components/Login/login"
import Dashboard from "./pages/Dashboard/dashboard"
import Home from "./pages/Home/home"
import SignUp from "./components/SignUp/signUp"
import SharedLayout from "./components/SharedLayout/SharedLayout"
import SingleArticle from "./pages/singleArticle/SingleArticle"

function App() {

  const contextData = useContext(Context)
  console.log(contextData.newState.currentUser)

  const RequireAuth = ({ children }) => {
    return contextData.newState.currentUser ? (children) : <Navigate to='/login' />
  }

  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={contextData.newState.currentUser !== null ? <Navigate to='/' /> : <Login />} />
          <Route path="signup" element={contextData.newState.currentUser !== null ? <Navigate to='/' /> : <SignUp />} />
          <Route path="dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path=":id" element={<SingleArticle />} />
       </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
