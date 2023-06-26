import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import Navbar from "../../assets/Nav/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [inputMail, setInputMail] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [message, setMessage] = useState("");

  //récupère la valeur du mail
  const handleMail = (e) => {
    setInputMail(e.target.value);
  };
  //récupère la valeur du mot de passe
  const handlePass = (e) => {
    setInputPass(e.target.value);
  };
  // déclare les options du fetch
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: inputMail,
      password: inputPass,
    }),
  };
  const navigate = useNavigate();

  const clickLogin = async () => {
    const response = await fetch(
      " https://social-network-api.osc-fr1.scalingo.io/demo/login ",
      options
    );
    const data = await response.json();

    if (data.success === true) {
      navigate("/");
      localStorage.setItem("token", data.token); //récupère et stock le token
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div>
      <Navbar />
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "500px" }}
            >
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                <p className="text-white-50 mb-3">
                  Please enter your login and password!
                </p>

                <MDBInput
                  onChange={handleMail}
                  wrapperClass="mb-4 w-100"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                />
                <MDBInput
                  onChange={handlePass}
                  wrapperClass="mb-4 w-100"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                />

                <MDBBtn onClick={clickLogin} size="lg">
                  Login
                </MDBBtn>

                <hr className="my-3" />

                <MDBBtn
                  className="mb-4 w-100"
                  size="lg"
                  style={{ backgroundColor: "#3b5998" }}
                >
                  SIGN UP NOW
                </MDBBtn>

                <span>{message}</span>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
