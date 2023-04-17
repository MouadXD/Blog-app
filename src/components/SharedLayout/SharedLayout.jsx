import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/navbar"

function SharedLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default SharedLayout