import { useState } from "react";
import { useJobContext } from "../../utils/GlobalState";
import Modal from "./Modal";
import Tabs from "./Tabs";
import LoginForm from "../Forms/LoginForm";
import SignupForm from "../Forms/SignupForm";
import Auth from "../Helpers/AuthService";

function Navbar(props) {
  const [state] = useJobContext();
  const [showModal, setShowModal] = useState(false);
  const [authTab, setAuthTab] = useState("Login");
  const renderAuthTab = () => {
    if (authTab === "Login") {
      return <LoginForm handleModalClose={() => setShowModal(false)} />;
    } else {
      return <SignupForm handleModalClose={() => setShowModal(false)} />;
    }
  };
  const handleAuthChange = (newTab) => setAuthTab(newTab);
  return (
    <>
      <Modal
        isActive={showModal}
        onClose={() => setShowModal(false)}
        title="Login/Sign Up"
      >
        <>
          <Tabs
            currentTab={authTab}
            handleTabChange={handleAuthChange}
            tabNames={["Login", "Sign Up"]}
          />
          {renderAuthTab()}
        </>
      </Modal>
      <nav id="navMenu" className="col-12 d-flex">
        <Tabs
          currentTab={props.currentTab}
          handleTabChange={props.handleTabChange}
          tabNames={props.tabNames}
        />
        {state.loggedIn ? (
          <button className="h-50 btn btn-outline-primary" onClick={() => Auth.logout()}>Logout</button>
        ) : (
          <button
            className="h-50 btn btn-outline-primary"
            onClick={() => setShowModal(true)}
          >
            Login/Sign Up
          </button>
        )}
      </nav>
    </>
  );
}

export default Navbar;
