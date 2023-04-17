import "./signup.scss"
import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"
import { Context, LOGIN } from "../../helpers/context"

const SignUp = () => {

   const [ email, setEmail ] = useState('');
   const [ password, setPassword ] = useState('');
   const [ name, setName ] = useState('')
   const [ error, setError ] = useState('')

   const contextData = useContext(Context)

   const navigate = useNavigate();

   const handleSignIn = async (e) => {
      e.preventDefault();
      if (email !== '' && password !== '' && name !== '') {
         const user = auth.currentUser
         try {
            await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(user, {
               displayName: name
            })
            contextData.dispatch({ type: LOGIN, payload: user })
            navigate("/dashboard")
            console.log(auth.currentUser)
         } catch (error) {
            setError(error)
         }
      }
   }

  return (
   <div className="signup">
      <form onSubmit={(e) => handleSignIn(e)}>
         <h4>Sign Up</h4>
         <div className="name">
            <label>Name</label>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
         </div>
         <div className="email">
            <label>Email</label>
            <input type="email" placeholder="test@test.com" onChange={(e) => setEmail(e.target.value)}/>
         </div>
         <div className="password">
            <label>Password</label>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
         </div>
         <button type="submit">Sign up</button>
         <div className="signupMsg">Have an account <Link to={'/login'}>login</Link></div>
      </form>
    </div>
  )
}

export default SignUp