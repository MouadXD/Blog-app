import "./Dashboard.scss"
import { useContext, useState, useEffect } from "react"
import { Context } from "../../helpers/context"
import { auth, db, storage } from "../../config/firebase";
import { addDoc, collection, serverTimestamp, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"


const Dashboard = () => {
  
  const contextData = useContext(Context);
  const userInfo = contextData.newState.currentUser


  const [ file, setFile ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ imageUploadProg, setImageUploadProg ] = useState(0);
  const [ userArticles, setUserArticles ] = useState([]);

  const getFilteredArticles = async () => {
    try {
      onSnapshot(collection(db, "articles"), (snapchot) => {
        const allArticles = snapchot.docs.map(doc => ({...doc.data(), id: doc.id}))
        const userArticles = allArticles.filter(article => article.userId == auth.currentUser.uid)
        setUserArticles(userArticles)
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getFilteredArticles();
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputsCheck()) {
      try {
        await addDoc(collection(db, "articles"), {
          title: title,
          category: category,
          description: description,
          name: userInfo.displayName || "Anonymous",
          timeStamp: serverTimestamp(),
          articleImage: file || "",
          userId: auth.currentUser.uid
        })
        getFilteredArticles();
      } catch (error) {
        console.error(error)
      }
    }
  }

  const inputsCheck = () => {
    if (file !== '' && category !== '' && description !== '' && title !== '' && imageUploadProg == 100) return true
  }


  useEffect(() => {
    const uploadFile = async () => {
      const name = new Date().getTime() + file.name 
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProg(progress)
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        console.error(error)
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFile(downloadURL)
        });
      }
      );

    }
    file && uploadFile();
  }, [file])

  const removeArticle = async (id) => {
    try {
      await deleteDoc(doc(db, "articles", id))
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="dashboard">
      <h1 className="dashboard_name">Hello {userInfo.displayName || "Anonymous"}!</h1>
      <div className="createPostForm">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="formInput postImage">
            <label>Post Image</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <span className="prog" style={{width: `${imageUploadProg}%`}}></span>
          </div>
          <div className="formInput title">
            <label>Title</label>
            <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div className="formInput category">
            <label>Category</label>
            <input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)}/>
          </div>
          <div className="formInput description">
            <label>Description</label>
            <textarea placeholder="Description" cols="30" rows="10" onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <button type="submit" style={inputsCheck() ? {cursor: "pointer"} : {cursor: "not-allowed"} } disabled={!inputsCheck()}>Add Post</button>
        </form>
      </div>
      <div className="all_articles">
        <h2>Total Articles - <span>{userArticles.length}</span></h2>
          <table cellPadding={0} cellSpacing={0} border={1}>
            <thead>
              <tr>
                <td>{ userArticles.length !== 0 ? "Article Title" : "No Articles Yet" }</td>
                <td>{ userArticles.length !== 0 ? "Remove article" : "No Articles Yet" }</td>
              </tr>
            </thead>
            <tbody>

        {
          userArticles.map(article => {
            const { id, title } = article;
            console.log(article)
            return (   
              <tr className="article_coun" key={id}>
                <td>{title}</td>
                <td className="removeArticle" width={"10%"} onClick={() => removeArticle(id)}>remove</td>
              </tr>           
            )
          })
        }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard