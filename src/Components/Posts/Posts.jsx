import {
  MDBCard,
  MDBCardBody,
  MDBCollapse,
  MDBBtn,
  MDBContainer,
  MDBInputGroup,
} from "mdb-react-ui-kit";

import Post from "../Post/Post";
import { useState, useEffect } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [showShow, setShowShow] = useState(false);
  const toggleShow = () => setShowShow(!showShow);
  const token = localStorage.getItem("token");
  const [post, setPost] = useState("");
  const [comment, setComment] = useState("");

  // function to recover the posts
  const getPosts = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      " https://social-network-api.osc-fr1.scalingo.io/demo/posts ",
      options
    );
    const data = await response.json();
    const table = data.posts;
    setPosts(table);
  };

  const handlePost = (e) => {
    setPost(e.target.value);
  };

  // function for POSTING
  const addPost = async () => {
    const optionscreate = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        title: `Posted by: ${localStorage.getItem(
          "firstname"
        )} ${localStorage.getItem("lastname")}`, // setting the title of the post with firstname and lastname from local storage
        content: post,
      }),
    };

    const response = await fetch(
      " https://social-network-api.osc-fr1.scalingo.io/demo/post ",
      optionscreate
    );

    const data = await response.json();

    if (data.success === true) {
      setShowShow(false);
      getPosts();
    } else {
      if (data.message === "Invalid token.") {
        alert("Please login before posting"); //alerte qui indique connectez vous pour postez
      } else {
        alert(data.message);
      }
    }
  };

  // function for getting the user details
  const getUser = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`, //check l'autorisation du token
      },
    };
    const response = await fetch(
      " https://social-network-api.osc-fr1.scalingo.io/demo/user ", //API
      options
    );
    const data = await response.json();
    //setting lastname and firstname in local storage so we use getUser only once
    localStorage.setItem("firstname", data.firstname);
    localStorage.setItem("lastname", data.lastname);
  };

  // recover the user details only if loged so it wount send a unnecessary query
  if (token != null && localStorage.getItem("firstname") === null) {
    getUser();
  }

  // recovering the posts at the charging of the page
  useEffect(() => {
    getPosts();
  }, []);

  // function for commeting
  const addComment = async (postId, parComment) => {
    const optioncomment = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        postId: postId,
        content: parComment,
      }),
    };
    const response = await fetch(
      " https://social-network-api.osc-fr1.scalingo.io/demo/post/comment",
      optioncomment
    );
    const data = await response.json();
    if (data.success === true) {
      getPosts();
      setShowShow(false);
    } else {
      if (data.message === "Invalid token.") {
        //condition
        alert("Please login before commenting"); //alerte connectez vous pour commentez
      } else {
        alert(data.message);
      }
    }
  };

  const handleComment = (e) => {
    setComment(e.target.value); //récupère les données saisies
  };

  // function for adding likes
  const addLikes = async (postId) => {
    const optionlike = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`, //récupère la valeur du token
      },
      body: JSON.stringify({
        postId: postId,
      }),
    };
    const response = await fetch(
      " https://social-network-api.osc-fr1.scalingo.io/demo/post/like", //API
      optionlike
    );
    const data = await response.json();
    if (data.success === true) {
      //condition
      getPosts();
    } else {
      if (data.message === "Invalid token.") {
        //condition
        alert("Please login before liking"); //alerte connectez vous pour likez
      } else {
        alert(data.message);
      }
    }
  };

  // render function
  const render = () => {
    return posts.map((item, index) => {
      return (
        <div key={index}>
          <Post
            title={item.title}
            content={item.content}
            addComment={() =>
              addComment(
                item._id,
                `${localStorage.getItem("firstname")}: ${comment}`
              )
            }
            addLike={() => addLikes(item._id)} //pour incrémentez les likes
            likes={item.likes.length}
            handleComment={handleComment}
            //mapping the comments
            comments={item.comments.map((comment) => (
              <div
                key={comment._id}
                className="m-2 "
                style={{
                  borderRadius: "5px",
                  height: "fit-content",
                  backgroundColor: "aliceblue",
                }}
              >
                <p style={{ marginLeft: "1em", marginTop: "1em" }}>
                  {comment.content}
                </p>
              </div>
            ))}
          />
        </div>
      );
    });
  };

  return (
    <div>
      <div className="createPost">
        <MDBContainer>
          <MDBCard className="mt-5">
            <MDBBtn size="lg" onClick={toggleShow}>
              Create post
            </MDBBtn>
            <MDBCollapse show={showShow}>
              <div>
                <MDBInputGroup style={{ height: 100 }}>
                  <textarea
                    onChange={handlePost}
                    style={{ height: 100 }}
                    className="form-control"
                  />
                </MDBInputGroup>
                <MDBBtn className="m-2" onClick={addPost}>
                  ADD
                </MDBBtn>
              </div>
            </MDBCollapse>
          </MDBCard>
        </MDBContainer>
      </div>
      <MDBCard
        className="m-5"
        style={{
          backgroundColor: "aliceblue",
        }}
      >
        <MDBCardBody>{render()}</MDBCardBody>
      </MDBCard>
    </div>
  );
}
