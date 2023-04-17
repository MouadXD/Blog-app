import "./Home.scss"
import {  useState, useEffect } from "react"
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase"
import { Link } from "react-router-dom";

function Home() {
   const [ articles, setArticles ] = useState([]);

   const getArticles = async () => {
    try {
      onSnapshot(collection(db, "articles"), (snapchot) => { 
        const allArticles = snapchot.docs.map(doc => ({...doc.data(), id: doc.id}))
        setArticles(allArticles.sort((a, b) => b.timeStamp.seconds - a.timeStamp.seconds))
      });
    } catch (error) {
      console.error(error)
    }
   }

   useEffect(() => {
    getArticles()
   }, [])


  return (
    <div className="home">
      <div className="home_content">
        <h1>{articles.length !== 0 ? "All Articles!" : "No Articles!"}</h1>
        <div className="articles">
          {
            articles.map(article => {
              const { title, id, articleImage="", name, description } = article;
              console.log(id)
              return (
                <div key={id} className="article">
                  <div className="article_img">
                    <img src={articleImage} alt={title} />
                  </div>
                  <div className="article_header">
                    <h4 className="article_author">@{name}</h4>
                  </div>
                  <div className="article_content">
                    <h2 className="articleTitle">{title}</h2>
                    <p className="articleDescription">{description.substring(0, 150)}...</p>
                  </div>
                  <button className="moreInfo">
                    <Link to={`/${id}`}>More info</Link>
                  </button>
                </div>
              )
            })
          }
        </div>
      </div>
   </div>
  )
}

export default Home