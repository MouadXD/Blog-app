import "./navbar.scss"
import { NavLink, Link } from "react-router-dom"
import { useContext } from "react"
import { Context, LOGOUT } from "../../helpers/context"

const navbar = () => {

   const contextData = useContext(Context);
   const userInfo = contextData.newState.currentUser

  return (
    <nav>
      <div className="nav_logo_links">
         <div className="nav_logo">
            <Link to='/'>
               <h1>BFS <span>News</span></h1>
            </Link>
         </div>
         <div className="nav_links">
            <ul>
               <li><NavLink to='/'>Home</NavLink></li>
               {
                  contextData.newState.currentUser && (
                     <>
                        <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                     </>
                  )
               }
            </ul>
         </div>
      </div>
      <div className="auth_btns">
         {contextData.newState.currentUser ? (
            <div className="auth_name">
               <h4>{userInfo.displayName || "Anonymous"}</h4>
               <button className="signout_btn" onClick={() => contextData.dispatch({ type: LOGOUT })}>Sign Out</button>
            </div>
         ) : (
            <>
               <div className="auth_btn signup_btn">
                  <Link to='/signup'>Sign up</Link>
               </div>
               <div className="auth_btn signin_btn">
                  <Link to='/login'>Sign in</Link>
               </div>
            </>
         )}
      </div>
    </nav>
  )
}

export default navbar