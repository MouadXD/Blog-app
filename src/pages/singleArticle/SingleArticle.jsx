import { useParams } from "react-router-dom"
import { db } from "../../config/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import "./singlearticle.scss"

const SingleArticle = () => {

   const { id } = useParams()
   const [ article, setArticle ] = useState(null);
   
   const getArticle = async () => {
      const docRef = doc(db, "articles", id)
      const targetDoc = await getDoc(docRef);
      setArticle(targetDoc.data())
   }

   useEffect(() => {
      getArticle();
   }, [])

   console.log(article)

  return (
    <div className="singleArticle">
      <div className="container">
         <div className="singleArticle_image">
            <img src={article?.articleImage} alt={article?.title} />
         </div>
         <span>@{article?.name}</span>
         <div className="article_content">
            <h2>{article?.title}</h2>
            <p>{article?.description}</p>
         </div>
      </div>
    </div>
  )
}

export default SingleArticle