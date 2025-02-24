import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Form, Button, Container, Spinner, Toast } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SolutionForm = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", variant: "" });
  // const { state } = useLocation();
  const [formData, setFormData] = useState({
    answer: "",
    additional_comment: "",
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log("location", location);
  const showToast = (message, variant) => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast({ show: false, message: "", variant: "" }), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const increaseProblemSolved = () => {
    fetch("/incproblemsolved", {
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: JSON.parse(localStorage.getItem("user")),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setLoading(false);
        if (data.err) {
          showToast(data.err, "danger");
        } else if (data.error) {
          showToast(data.error, "danger");
        } else {
          showToast("Problem solved count increased", "success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Call API or submit function
    // console.log("Submitted Solution:", formData);
    fetch("/submitsolution", {
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData,
        user: JSON.parse(localStorage.getItem("user")),
        problem: location.state,
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
          showToast("Solution submited successfully!", "success");
          increaseProblemSolved();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // if (onSubmit) onSubmit(formData);

    // Clear form fields after submission
    setFormData({ answer: "", additional_comment: "" });
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{
        width: isMobile ? "100%" : "40rem",
        maxWidth: "900px",
        textAlign: "left",
        marginTop: "60px",
      }}
    >
      <Form
        onSubmit={handleSubmit}
        className="p-4 shadow rounded bg-light"
        style={{ width: "100%", maxWidth: "500px", textAlign: "left" }}
      >
        {/* Problem Statement as Title */}
        <h4 className="text-left mb-3">{location.state.problem.statement}</h4>

        {/* Solution Field */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Solution:</strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            rows={5}
            placeholder="Enter your solution here..."
            required
          />
        </Form.Group>

        {/* Additional Comments */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Additional Comment:</strong>
          </Form.Label>
          <Form.Control
            type="text"
            name="additional_comment"
            value={formData.additional_comment}
            onChange={handleChange}
            placeholder="Any additional notes..."
          />
        </Form.Group>

        {/* Submit Button */}
        <div className="text-center">
          <Button variant="primary" type="submit">
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Submit Solution"
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

export default SolutionForm;
