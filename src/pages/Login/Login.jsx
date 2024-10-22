import Form from "react-bootstrap/Form";
import { useRef } from "react";

import { checkUsername } from "../../data/username";

function Login({ setToken }) {
  const userRef = useRef();
  const passRef = useRef();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center", width: "300px" }}>

        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control
          type="text"
          id="username"
          aria-describedby="usernameHelpBlock"
          placeholder="user"
          style={{ textAlign: "center" }}
          ref={userRef}
        />

        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          id="password"
          aria-describedby="passwordHelpBlock"
          placeholder="pass"
          style={{ textAlign: "center" }}
          ref={passRef}
        />
        <button
          className="btn btn-success mt-3"
          onClick={() => {
            const user = userRef.current.value.trim();
            const pass = passRef.current.value.trim();
            const userInfo = checkUsername(user, pass);
            if (userInfo === null) {
              alert("Wrong username or password");
              userRef.current.value = ''
              passRef.current.value = ''
              userRef.current.setFocus();
            }else {
              setToken(userInfo.token);
            }
          }}
        >
          Log in
        </button>
      </div>
    </div>
  );
}

export default Login;
