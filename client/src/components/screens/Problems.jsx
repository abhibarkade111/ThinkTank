import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function Problems() {
  const [loading, setLoading] = useState(true);
  const [problemList, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/allproblems", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log("result:", result);
        setData(result.problems);
        setLoading(false);
      });
  }, []);

  const fetchSolutions = (item) => {
    // console.log("item", JSON.stringify(item));
    setLoading(true);
    fetch("/problemsolutions", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log("result solutions:", result);
        setLoading(false);
        navigate("/problems/solutions", {
          state: { solutions: result.solutions, problem: item },
        });
        // setData(result.users);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };

  return (
    <div
      style={{
        marginTop: "60px",
      }}
    >
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        problemList.map((item) => {
          return (
            <Card
              style={{
                width: "90%",
                maxWidth: "800px",
                margin: "20px auto",
                textAlign: "left",
              }}
            >
              <Card.Body>
                <Card.Title>{item.statement}</Card.Title>
                <Card.Text>
                  <strong>Description:</strong>
                  <pre
                    style={{
                      backgroundColor: "#f8f9fa",
                      padding: "10px",
                      borderRadius: "5px",
                      overflowX: "auto",
                    }}
                  >
                    {item.description}
                  </pre>
                </Card.Text>
                <Card.Text>
                  <strong>Additional Comment:</strong> {item.additional_comment}
                </Card.Text>
                <Card.Text>
                  <strong>Tech:</strong> {item.tech}
                </Card.Text>
                <div className="d-flex justify-content-between mt-3">
                  <Button
                    variant="success"
                    className="mx-1"
                    onClick={() =>
                      navigate("solve", { state: { problem: item } })
                    }
                  >
                    Solve Problem
                  </Button>
                  <Button
                    variant="primary"
                    className="mx-1"
                    onClick={() => fetchSolutions(item)}
                  >
                    View Solutions
                  </Button>
                </div>
              </Card.Body>
            </Card>
          );
        })
      )}
    </div>
  );
}

export default Problems;
