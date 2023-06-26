import { useEffect, useState } from "react";
import Navbar from "../../assets/Nav/Navbar";
import PostsProfile from "../../Components/Posts/PostsProfile";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBInput,
  MDBCollapse,
  MDBInputGroup,
} from "mdb-react-ui-kit";

export default function Profile() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [adress, setAdress] = useState("");
  const [mobileU, setMobileU] = useState("");
  const [adressU, setAdressU] = useState("");
  const [showShow, setShowShow] = useState(false);
  const toggleShow = () => setShowShow(!showShow);
  const [firstnameU, setFirstNameU] = useState("");
  const [lastnameU, setLastNameU] = useState("");
  const [emailU, setEmailU] = useState("");
  const token = localStorage.getItem("token");

  const getUser = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`, //check l'autorisation du token
      },
    };
    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/demo/user", //API
      options
    );
    const data = await response.json();
    setFirstName(data.firstname);
    setLastName(data.lastname);
    setEmail(data.email);
    setAdress(data.occupation);
    setMobile(data.age);
  };
  useEffect(() => {
    getUser();
  }, []);

  const updateProfile = async () => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        firstname: firstnameU,
        lastname: lastnameU,
        email: emailU,
        occupation: adressU,
        age: mobileU,
      }),
    };
    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/test/user",
      options
    );
    const data = await response.json();
    getUser();
    if (firstnameU != "") {
      localStorage.setItem("firstname", firstnameU);
    }
    if (lastnameU != "") {
      localStorage.setItem("lastname", lastnameU);
    }
    console.log("data", data);
  };

  const handleFirstname = (e) => {
    setFirstNameU(e.target.value);
  };

  const handleLastName = (e) => {
    setLastNameU(e.target.value);
  };

  const handleEmail = (e) => {
    setEmailU(e.target.value);
  };

  const handleAdress = (e) => {
    setAdressU(e.target.value);
  };
  const handleMobile = (e) => {
    setMobileU(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <section className="text-center text-md-start">
        <div
          className="p-5 bg-image"
          style={{
            height: "300px",
            backgroundImage:
              'url("https://mdbootstrap.com/img/new/textures/full/56.jpg")',
            zIndex: "-1",
          }}
        ></div>

        <div
          className="pb-2"
          style={{ backgroundColor: "background-color: hsl(0, 0%, 98%)" }}
        >
          <MDBContainer>
            <MDBRow className="d-flex justify-content-center align-items-center">
              <MDBCol lg="6" md="8" className="mb-4 mb-md-0 pt-4">
                <img
                  src="https://mdbootstrap.com/img/new/avatars/22.jpg"
                  className="rounded-circle float-none float-md-start me-4 mb-3"
                  alt=""
                  style={{
                    width: "168px",
                    marginTop: "-110px",
                    border: "4px solid hsl(0, 0%, 98%)",
                  }}
                />
                <h1 className="fw-bold">{`${firstname} ${lastname}`}</h1>
              </MDBCol>
              <MDBCol
                lg="6"
                md="8"
                className="mb-4 mb-md-0 text-center text-lg-end"
              ></MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </section>
      <div className="d-flex">
        <MDBCol className="mt-5 ms-3" lg="3">
          <MDBCard className="mb-4">
            <MDBCardHeader className="d-flex justify-content-center align-items-center bg-primary text-light">
              Informations
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>First Name</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{firstname}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Last Name</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{lastname}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Email</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{email}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Mobile</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{mobile}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Address</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{adress}</MDBCardText>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
            <MDBCardFooter>
              <MDBBtn onClick={toggleShow} className="w-100">
                Edit profile
              </MDBBtn>
            </MDBCardFooter>
          </MDBCard>

          <MDBCollapse show={showShow}>
            <div>
              <MDBInputGroup>
                <MDBInput
                  onChange={handleFirstname}
                  wrapperClass="mb-4 w-100"
                  label="First Name"
                  type="text"
                  size="lg"
                />
                <MDBInput
                  onChange={handleLastName}
                  wrapperClass="mb-4 w-100"
                  label="Last Name"
                  type="text"
                  size="lg"
                />
                <MDBInput
                  onChange={handleEmail}
                  wrapperClass="mb-4 w-100"
                  label="Email address"
                  type="email"
                  size="lg"
                />
                <MDBInput
                  onChange={handleMobile}
                  wrapperClass="mb-4 w-100"
                  label="Mobile"
                  type="number"
                  size="lg"
                />
                <MDBInput
                  onChange={handleAdress}
                  wrapperClass="mb-4 w-100"
                  label="Adress"
                  type="text"
                  size="lg"
                />
              </MDBInputGroup>
              <MDBBtn
                onClick={() => {
                  updateProfile();
                  toggleShow();
                }}
                className="m-2"
              >
                UPDATE
              </MDBBtn>
            </div>
          </MDBCollapse>
        </MDBCol>
        <div className="flex-grow-1 w-1">
          <PostsProfile />
        </div>
      </div>
    </div>
  );
}
