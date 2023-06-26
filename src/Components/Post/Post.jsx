import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCardHeader,
  MDBIcon,
  MDBBadge,
  MDBCollapse,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import "./Post.css";
import { useState } from "react";
export default function Post(props) {
  const [showShow, setShowShow] = useState(false);
  const toggleShow = () => setShowShow(!showShow);

  return (
    <div key={props}>
      <MDBCard className="mx-5 my-5 shadow-5">
        <MDBCardBody>
          <MDBCardHeader>
            <MDBCardTitle>{props.title}</MDBCardTitle>
            <MDBCardText>{props.content}</MDBCardText>
            <MDBBtn onClick={toggleShow} className="mx-1 p-1">
              <MDBIcon far icon="comment-dots" size="1x" />
            </MDBBtn>

            <MDBBtn className="p-1" onClick={props.addLike}>
              <MDBIcon far icon="thumbs-up" size="1x" />
              <MDBBadge className="ms-2" color="danger">
                {props.likes}
              </MDBBadge>
            </MDBBtn>
          </MDBCardHeader>
          <MDBCollapse show={showShow}>
            <div>
              <MDBInputGroup style={{ height: 100 }}>
                <textarea
                  onChange={props.handleComment}
                  style={{ height: 100 }}
                  className="form-control"
                />
              </MDBInputGroup>
              <MDBBtn
                className="m-2"
                onClick={() => {
                  {
                    props.addComment();
                  }
                  toggleShow();
                }}
              >
                ADD
              </MDBBtn>
            </div>
          </MDBCollapse>

          <MDBCardBody className="pb-0">
            <div className="comments">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0em",
                }}
              >
                {props.comments}
              </div>
            </div>
          </MDBCardBody>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
