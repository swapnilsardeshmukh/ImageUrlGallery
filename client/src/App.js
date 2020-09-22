import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const [dposts,setDPosts] =useState([]);

  useEffect(() => {
		axios.get("http://localhost:8080/api")
			.then( res => setDPosts(res.data) // new
			)
	},[])


  function handleChange(event) {
    const { name, value } = event.target;

    setPost((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
    event.preventDefault();
  }

  function handleClick(event) {

    const payload={
      title:post.title,
      body:post.content
    }

    console.log(payload);

    axios({
      url: 'http://localhost:8080/api/save',
      method:'POST',
      data :payload
    })
    .then(() => {
      console.log("Inserted Sucessfully");
    })
    .catch(() => {
      console.log("Something went Wrong");
    })
  }


  return (
    <div className="App container">
     <h2> 🌄 Welcome to Gallery of Urls 😄</h2>
<form onSubmit={handleClick}>
  <div class="form-group">
    <label for="exampleInputEmail1">Caption</label>
    <input type="text"  name="title" value={post.title}   onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Caption"/>
    <label for="url">Url</label>
    <input type="text" name="content" value={post.content}  onChange={handleChange} id="exampleInputPassword1" placeholder="Url here" />
    <button type="submit" class="btn btn-primary">Submit</button>
  </div>

  <div class="container">
  <div class="jumbotron">
      <h1> 📷 Image Gallery  </h1>
      <p> The best thing about a picture is that it never changes, even when the people in it do.
        – Andy Warhol
      </p>
    </div>
    <div class="row">
    {dposts.map((dposts) => (
       <div class="col-lg-4 col-md-6">
         <div >
         <img class="img-thumbnail img-fluid" width="400" height="400" src={dposts.body} alt="thumbnail" />
         <h5 >{dposts.title}</h5>
          </div >
       </div>
          ))}
    </div>
  </div>

</form>
  </div>


     // <form onSubmit={handleClick}>
     //  <div className="form-input">
     //  <input type="text"
     //  name="title"
     //  value={post.title}
     //  onChange={handleChange}
     //  placeholder="title here"
     //  />
     //  </div>
     //  <div className="form-input">
     //  <textarea name="content" cols="30" rows="10" value={post.content}  onChange={handleChange} placeholder="text here"></textarea>
     //  </div>
     //  <button>Submit</button>
     //  <div className="blog">
     //  {dposts.map((dposts) => (
     //    <div >
     //    <h3>{dposts.title}</h3>
     //    <p>{dposts.body}</p>
     //      </div>
     //  ))}
     //
     //    </div>
     //    </form>




    )
}

export default App;
