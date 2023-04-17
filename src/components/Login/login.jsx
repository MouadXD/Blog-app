import "./login.scss"
import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Context, LOGIN } from "../../helpers/context"

const Signin = () => {

   const [ email, setEmail ] = useState('');
   const [ password, setPassword ] = useState('');
   const [ error, setError ] = useState('')

   const contextData = useContext(Context)

   const navigate = useNavigate();

   const handleSignIn = async (e) => {
      e.preventDefault();
      if (email !== '' && password !== '') {
         const user = auth.currentUser
         try {
            await signInWithEmailAndPassword(auth, email, password)
            contextData.dispatch({ type: LOGIN, payload: user })
            navigate("/dashboard")
         } catch (error) {
            setError(error)
         }
         } else {
            alert("Email or password is empty!")
            }
   }

  return (
    <div className="signIn">
      <form onSubmit={(e) => handleSignIn(e)}>
         <h4>Login</h4>
         <div className="email">
            <label>Email</label>
            <input type="email" placeholder="test@test.com" onChange={(e) => setEmail(e.target.value)}/>
         </div>
         <div className="password">
            <label>Password</label>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
         </div>
         <button type="submit">Login</button>
         <div className="loginMsg">Don't have an account <Link to={'/signup'}>sign up</Link></div>
         {error !== '' && (
            <span className="error">invalid email or password</span>
         )}
      </form>
    </div>
  )
}

export default Signin