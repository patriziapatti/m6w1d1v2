import React from "react";
import { Button, Container, Navbar, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
import { AuthorContext } from "../../context/AuthorContextProvider";
import { useContext , useState} from "react";
import {register} from '../../data/fetch'
 
const NavBar = props => {
  const {token} = useContext(AuthorContext)

  const [showReg, setShowReg] = useState(false);
  const handleCloseReg = () => setShowReg(false);
  const handleShowReg = () => setShowReg(true)

  
  const initialRegistrationFormValue = {
    name: "",
    surname: "",
    avatar: "",
    password: "",
    email:"",
  }
  const [regFormValue, setRegFormValue] = useState(initialRegistrationFormValue)
  const [avatar,setAvatar]= useState("")

  const handleChangeRegistration = (event) =>{
    setRegFormValue({
      ...regFormValue, 
      [event.target.name] : event.target.value
    })
  }
  const handleChangeImage = (event) =>{
    // handleChangeRegistration(event)
    setAvatar(event.target.files[0])
  }

  const handleRegister = async () =>{
    const res = await register(regFormValue, avatar)
    console.log(res)
    handleCloseReg()
  }

  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        {!token && <Button className="ms-3" variant="secondary" onClick={handleShowReg}>
        Register
      </Button> }
      <Modal show={showReg} onHide={handleCloseReg}>
        <Modal.Header closeButton>
          <Modal.Title>REGISTER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" value={regFormValue.email} onChange={handleChangeRegistration} placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" value={regFormValue.password} onChange={handleChangeRegistration} placeholder="your password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" name="name" value={regFormValue.name} onChange={handleChangeRegistration} placeholder="your name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
        <Form.Label>Surname</Form.Label>
        <Form.Control type="surname" name="surname"value={regFormValue.surname}  onChange={handleChangeRegistration} placeholder="your surname" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
        <Form.Label>Avatar</Form.Label>
        <Form.Control type="file" name="avatar" onChange={handleChangeImage} placeholder="your picture" />
      </Form.Group>
      </Form>
      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReg}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRegister}>
            Register now
          </Button>
        </Modal.Footer>
      </Modal>

        {token && <Button as={Link} to="/new" className="blog-navbar-add-button bg-dark" size="lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
          </svg>
          Nuovo Articolo
        </Button>}
      </Container>
    </Navbar>
  );
};

export default NavBar;
