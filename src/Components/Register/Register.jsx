import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
} from "mdb-react-ui-kit";
import Navbar from "../../assets/Nav/Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [firstName, setInputFirstName] = useState("");
  const [lastName, setInputLastName] = useState("");
  const [inputMail, setInputMail] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [message, setMessage] = useState("");

  const handleMail = (e) => {
    setInputMail(e.target.value); //récupère la valeur du mail
  };

  const handlePass = (e) => {
    setInputPass(e.target.value); //récupère la valeur du mot de passe
  };

  const handleFirstName = (e) => {
    setInputFirstName(e.target.value); //récupère la valeur du firstname
  };

  const handleLastName = (e) => {
    setInputLastName(e.target.value); //récupère la valeur du lastname
  };

  const clickRegister = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email: inputMail,
        password: inputPass,
      }),
    };
    const response = await fetch(
      " https://social-network-api.osc-fr1.scalingo.io/demo/register ",
      options
    );
    const data = await response.json();

    console.log("array:", data);
    if (data.success === true) {
      setMessage(
        <Link to="/Login">You are registered click here to connect</Link> //lien de redirection une fois connécté
      );
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div>
      <Navbar />
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCard
            className="my-5 mb-5  shadow-5"
            style={{
              background: "hsla(0, 0%, 100%, 0.8)",
              backdropFilter: "blur(30px)",
              maxWidth: "500px",
            }}
          >
            <MDBCardBody className="p-5 text-center">
              <h2 className="fw-bold mb-5">Sign up now</h2>

              <MDBRow>
                <MDBCol col="6">
                  <MDBInput
                    onChange={handleFirstName}
                    wrapperClass="mb-4"
                    label="First name"
                    id="form1"
                    type="text"
                  />
                </MDBCol>

                <MDBCol col="6">
                  <MDBInput
                    onChange={handleLastName}
                    wrapperClass="mb-4"
                    label="Last name"
                    id="form1"
                    type="text"
                  />
                </MDBCol>
              </MDBRow>

              <MDBInput
                onChange={handleMail}
                wrapperClass="mb-4"
                label="Email"
                id="form1"
                type="email"
              />
              <MDBInput
                onChange={handlePass}
                wrapperClass="mb-4"
                label="Password"
                id="form1"
                type="password"
              />

              <MDBBtn onClick={clickRegister} className="w-100 mb-4" size="lg">
                sign up
              </MDBBtn>
              <span>{message}</span>
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
