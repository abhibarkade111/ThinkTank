import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Spinner,
  Form,
} from "react-bootstrap";
import Editor from "@monaco-editor/react";
import confetti from "canvas-confetti";

const languageOptions = {
  Java: {
    id: 62,
    template: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },
  C: {
    id: 50,
    template: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  },
  "C++": {
    id: 54,
    template: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  },
  Python: { id: 71, template: `print("Hello, World!")` },
};

const Compiler = () => {
  const [language, setLanguage] = useState("Java");
  const [code, setCode] = useState(languageOptions["Java"].template);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const emojis = ["⚡ WOW!", "🚀 Boom!", "🔥 Nice!", "🎉 Success!"];
  const [emojiText, setEmojiText] = useState("");

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    setCode(languageOptions[selectedLang].template);
    setOutput("");
  };

  const runCode = async () => {
    setLoading(true);
    setOutput("Compiling and running...");

    try {
      const response = await axios.post("/compile", {
        source_code: code,
        language_id: languageOptions[language].id,
        stdin: "", // Optional input field
      });

      const result = response.data;
      setOutput(
        result.stdout || result.stderr || result.compile_output || "No output."
      );
      if (result.stdout) {
        runCelebration();
      }
    } catch (error) {
      console.error(error);
      setOutput("Error while compiling or running the code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mt-4 text-center mb-4">Online Compiler</h2>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Select value={language} onChange={handleLanguageChange}>
            {Object.keys(languageOptions).map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Card className="mb-4 shadow-sm">
        <Card.Header as="h5">{language} Editor</Card.Header>
        <Card.Body style={{ backgroundColor: "#1e1e1e" }}>
          <Editor
            height="350px"
            language={
              language.toLowerCase() === "c++" ? "cpp" : language.toLowerCase()
            }
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
          />
        </Card.Body>
      </Card>

      <div className="text-center mb-4">
        <Button onClick={runCode} variant="primary" disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Running...
            </>
          ) : (
            "Run Code"
          )}
        </Button>
      </div>

      <Card>
        <Card.Header as="h5">Output</Card.Header>
        <Card.Body style={{ backgroundColor: "#f8f9fa" }}>
          <pre className="m-0 text-dark">{output}</pre>
        </Card.Body>
      </Card>
      {showEmoji && <div className="emoji-pop">{emojiText}</div>}
    </Container>
  );
};

function runCelebration() {
  var duration = 2 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    confetti(
      Object.assign({}, defaults, {
        particleCount: 50,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      })
    );
  }, 200);
}

export default Compiler;
