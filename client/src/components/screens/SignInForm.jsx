import React, { useState, useContext } from "react";
import { Form, Button, Container, Toast, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const [toast, setToast] = useState({ show: false, message: "", variant: "" });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const showToast = (message, variant) => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast({ show: false, message: "", variant: "" }), 3000);
  };
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In Data:", formData);
    setLoading(true);
    fetch("http://localhost:5000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (data.err) {
          //    console.log(data)
          showToast(data.err, "danger");
        } else if (data.error) {
          showToast(data.error, "danger");
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          // console.log(data)
          dispatch({ type: "USER", payload: data.user });
          showToast("Sign in successfully!", "success");
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container
      style={{
        width: "40rem",
        maxWidth: "900px",
        textAlign: "left",
      }}
    >
      <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
        <h3 className="text-center mb-4">Sign In</h3>

        {/* Email Field */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Email</strong>
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </Form.Group>

        {/* Password Field */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Password</strong>
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </Form.Group>

        {/* Submit Button */}
        <div className="text-center">
          <Button variant="primary" type="submit">
            {loading ? <Spinner animation="border" size="sm" /> : "Sign In"}
          </Button>
        </div>
      </Form>
      <Toast
        show={toast.show}
        onClose={() => setToast({ show: false, message: "", variant: "" })}
        delay={3000}
        autohide
        bg={toast.variant}
        style={{ position: "absolute", top: "80px", right: "20px" }}
      >
        <Toast.Header>
          <strong className="me-auto">{toast.variant.toUpperCase()}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{toast.message}</Toast.Body>
      </Toast>
    </Container>
  );
};

export default SignInForm;
