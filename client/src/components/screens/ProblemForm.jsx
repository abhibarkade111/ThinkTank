import React, { useState, useContext } from "react";
import { Form, Button, Container, Toast, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../../App";

const ProblemForm = () => {
  // State to store form values
  const [toast, setToast] = useState({ show: false, message: "", variant: "" });
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const [formData, setFormData] = useState({
    statement: "",
    description: "",
    additional_comment: "",
    tech: "",
  });

  const showToast = (message, variant) => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast({ show: false, message: "", variant: "" }), 3000);
  };

  // Available tech options
  const techOptions = ["Java", "SQL", "System Design", "Java", "C++"];

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form Data:", formData);
    fetch("http://localhost:5000/submitproblem", {
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData,
        user: JSON.parse(localStorage.getItem("user")),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setLoading(false);
        if (data.err) {
          //    console.log(data)
          showToast(data.err, "danger");
        } else if (data.error) {
          showToast(data.error, "danger");
        } else {
          showToast("Problem submited successfully!", "success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setFormData({
      statement: "",
      tech: "",
      description: "",
      additional_comment: "",
    });
  };

  return (
    <Container
      style={{
        width: "40rem",
        maxWidth: "900px",
        textAlign: "left",
        marginTop: "60px",
      }}
    >
      <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
        {/* Problem Statement */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Problem Statement</strong>
          </Form.Label>
          <Form.Control
            type="text"
            name="statement"
            value={formData.statement}
            onChange={handleChange}
            placeholder="Enter the problem statement"
            required
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Description</strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a detailed description"
            required
          />
        </Form.Group>

        {/* Additional Comment */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Additional Comment</strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="additional_comment"
            value={formData.additional_comment}
            onChange={handleChange}
            placeholder="Any additional information"
          />
        </Form.Group>

        {/* Tech Dropdown */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Tech</strong>
          </Form.Label>
          <Form.Select
            name="tech"
            value={formData.tech}
            onChange={handleChange}
            required
          >
            <option value="">Select a technology</option>
            {techOptions.map((tech, index) => (
              <option key={index} value={tech}>
                {tech}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Submit Button */}
        <div className="text-center">
          <Button variant="primary" type="submit">
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Submit Problem"
            )}
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

export default ProblemForm;
