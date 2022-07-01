import React, { Fragment, useState } from "react";
import {
  Button,
  Tab,
  Tabs,
  TextField,
  Typography,
  FormControl,
} from "@material-ui/core";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import TabPanel from "../tabPanel/TabPanel";
import "./Header.css";
import Login from "../../screens/login/Login";
import Register from "../../screens/register/Register";

const Header = ({ bookShow, bookShowId ,props}) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [login, setLogin] = useState(true);
  const [success, setSuccess] = useState(false);
  const [modalIsOpen,setModalIsOpen]=useState(false);
  

  const openModalHandler=()=>{
    setModalIsOpen(true);
    setLoginOpen(true);
    setValue(0);
};
  const closeModalHandler=()=>{
    setModalIsOpen(false);
    setLogin(false);
};
  const loginHandler = () => {
    setLoginOpen(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const loginFormHandler = () => {
    setLogin(false);
    setLoginOpen(false);
  };

  const registerFormHandler = () => {
    setLogin(false);
    setSuccess(true);
  };

  return (
    <Fragment>
      <div className="header">
        <Link to="/">
          <img className="logo" src={Logo} alt="logo" />
        </Link>
        <div className="button-group">

          
        {bookShow ? (
            <Link
              to={"/book-show/" + bookShowId}
              style={{ textDecoration: "none" }}
            >
              <Button variant="contained" name="Book Show" color="primary">
                Book Show
              </Button>
            </Link>
          ) : null}
          {login ? (
            <Button variant="contained" name="Login" onClick={openModalHandler}>
              Login
            </Button>
          ) : (
            <Button
              variant="contained"
              name="Logout"
              onClick={() => {
                setLogin(true);
              }}
            >
              Logout
            </Button>
          )}

        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModalHandler}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            padding:0,
            transform: 'translate(-50%, -50%)'
        },
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
       

{value===0 && <Login closeModalHandler={closeModalHandler} setLoggedIn={loginFormHandler} />}
{value===1 && <Register closeModalHandler={closeModalHandler} setLoggedIn={registerFormHandler}/>}
      </Modal>
    </Fragment>
  );
};

export default Header;
