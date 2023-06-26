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

export default function PostsProfile() {
  const [posts, setPosts] = useState([]);
  const [showShow, setShowShow] = useState(false);
  const toggleShow = () => setShowShow(!showShow);
  const token = localStorage.getItem("token");
  const [post, setPost] = useState("");

  const [comment, setComment] = useState("");

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  // function to recover the posts
  const getPosts = async () => {
    const response = await fetch(
      " https://social-network-api.osc-fr1.scalingo.io/demo/posts?page=0&limit=3 ",
      options
    );
    const data = await response.json();
    const table = data.posts;
    setPosts(table);
  };

  const optionscreate = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`, //check la valeur du token
    },
    body: JSON.stringify({
      title: `Posted by: ${localStorage.getItem(
        "firstname"
      )} ${localStorage.getItem("lastname")}`,
      content: post,
    }),
  };

  const handlePost = (e) => {
    setPost(e.target.value);
  };

  // function for POSTING
  const clickAdd = async () => {
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
        //condition
        alert("Please login before posting"); //alerte qui indique connectez vous pour poster
      } else {
        alert(data.message);
      }
    }
  };
  const getUser = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    };
    const response = await fetch(
      " https://social-network-api.osc-fr1.scalingo.io/demo/user ", //API
      options
    );
    const data = await response.json();
    localStorage.setItem("firstname", data.firstname);
    localStorage.setItem("lastname", data.lastname);
  };

  if (token != null && localStorage.getItem("firstname") === null) {
    getUser();
  }
  useEffect(() => {
    getPosts();
  }, []);

  // function pour commenter //
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
        alert("Please login before commenting"); //alerte connectez vous pour commenter
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
        alert("Please login before liking"); //alerte connectez vous pour liker
      } else {
        alert(data.message);
      }
    }
  };

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
            addLike={() => addLikes(item._id)} //pour incrémenter les likes
            likes={item.likes.length}
            handleComment={handleComment}
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
                <MDBBtn className="m-2" onClick={clickAdd}>
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
