import { createContext, useReducer, useEffect } from "react";

export const Context = createContext();

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

const initialState = {
   currentUser: JSON.parse(localStorage.getItem("user")) || null
}

const reducer = (state, action) => {
   switch(action.type) {
      case LOGIN:
         return  { currentUser: action.payload }
      case LOGOUT:
         return { currentUser: null }
      default:
         return state
   }
}


const ContextApp = ({ children }) => {
   
   const [ newState, dispatch ] = useReducer(reducer, initialState);

   useEffect(() => {
      localStorage.setItem("user",  JSON.stringify(newState.currentUser))
   }, [newState.currentUser])

   return (
      <Context.Provider value={{newState, dispatch}}>
         {children}
      </Context.Provider>
   )
}

export default ContextApp