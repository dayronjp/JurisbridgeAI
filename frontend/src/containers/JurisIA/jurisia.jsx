import React, { useState, useRef } from "react";
import axios from "axios";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo_jb.png";
import bridgejai from "../../assets/bridgejai.png";
import { ArrowLeft } from "lucide-react";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0; padding: 0; box-sizing: border-box;
  }
  body, #root {
    height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(180deg, #121020 0%, #302b63 35%, #3a4a80 70%, #4c5a9a 100%);
    color: white;
    overflow: auto;
  }
`;

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 6px #b8a8ff99;
  }
  50% {
    box-shadow: 0 0 14px #b8a8ffcc;
  }
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ResponseArea = styled.pre`
  flex: 1;
  padding: 2rem 3rem;
  overflow-y: auto;
  font-family: 'Roboto Mono', monospace;
  font-size: 1.05rem;
  line-height: 1.5;
  white-space: pre-wrap;
  user-select: text;
  background: transparent;
  -webkit-font-smoothing: antialiased;

  scrollbar-width: thin;
  scrollbar-color: #a085ff66 transparent;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #a085ffcc;
    border-radius: 10px;
  }
`;

const InputBar = styled.form`
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
  backdrop-filter: blur(12px);
`;

const TextInput = styled.textarea`
  flex: 1;
  font-family: 'Roboto Mono', monospace;
  font-size: 1.15rem;
  resize: none;
  border: none;
  outline: none;
  box-shadow: none;
  border-radius: 24px;
  padding: 0.8rem 1.8rem;
  background: rgba(255, 255, 255, 0.1);
  color: #e6e6ff;
  min-height: 2.5rem;
  max-height: 4rem;
  line-height: 1.3;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &::placeholder {
    color: #c1c1e6aa;
    font-style: italic;
  }

  &:focus {
    background: rgba(255, 255, 255, 0.15);
    box-shadow:
      0 6px 18px rgba(153, 135, 255, 0.6),
      inset 0 0 12px rgba(255, 255, 255, 0.25);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #7e6cff 30%, #b4a9ff 95%);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  box-shadow:
    0 0 10px #b4a9ffbb,
    0 0 25px #a085ffcc;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.4s ease;

  &:hover:not(:disabled) {
    animation: ${pulse} 2s infinite;
    transform: scale(1.1);
    box-shadow:
      0 0 15px #d1caffcc,
      0 0 35px #c4b3ffdd;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    animation: none;
    transform: none;
    box-shadow: 0 0 10px #7e7e7e88;
  }

  svg {
    width: 22px;
    height: 22px;
    fill: #201f42;
    filter: drop-shadow(0 0 1px rgba(0,0,0,0.15));
  }
`;

const ErrorText = styled.div`
  color: #ff6f6f;
  text-align: center;
  margin-top: 8px;
  user-select: none;
  font-weight: 600;
  text-shadow: 0 0 5px #ff6f6f99;
`;

const Logo = styled.img`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  width: 100px;
  height: auto;
  cursor: pointer;
  transition: transform 0.3s ease, filter 0.3s ease;
  z-index: 999;

  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 6px rgba(180, 160, 255, 0.6));
  }
`;

const BackgroundImage = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 66%;
  height: auto;
  max-width: none;
  transform: translate(-50%, -50%);
  opacity: 0.04;
  pointer-events: none;
  user-select: none;
  z-index: 0;
`;

const Title = styled.h1`
  position: absolute;
  top: calc(50% + 160px); 
  left: 50%;
  transform: translateX(-50%);
  font-size: 3.3rem; 
  font-weight: 700;
  color: #ffffff13;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.08);
  user-select: none;
  pointer-events: none;
  z-index: 1;
`;

const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #f3f3f3;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: background 0.3s, transform 0.2s;
  z-index: 1000;

  &:hover {
    background: #e5e5e5;
    transform: scale(1.05);
  }

  svg {
    stroke: #7f5af0;
    width: 20px;
    height: 20px;
  }
`;

export default function JurisIA() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const responseRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => setInput(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:3000/api/chat", {
        prompt: input,
      });
      setAnswer(res.data.answer);
      setInput("");

      setTimeout(() => {
        if (responseRef.current) {
          responseRef.current.scrollTop = responseRef.current.scrollHeight;
        }
      }, 100);
    } catch {
      setError("Ocorreu um erro. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form.requestSubmit();
    }
  };

  return (
    <>
      <GlobalStyles />
      <BackButton onClick={() => navigate("/")}>
        <ArrowLeft />
      </BackButton>
      <Link to="/">
        <Logo src={logo} alt="JurisBridge Logo" />
      </Link>

      <BackgroundImage src={bridgejai} alt="Fundo decorativo bridgejai" />
      <Title>Juris IA</Title>

      <Container>
        <ResponseArea
          ref={responseRef}
          aria-live="polite"
          aria-label="Resposta da JurisIA"
          tabIndex={0}
        >
          {answer || "Como posso te ajudar hoje?"}
        </ResponseArea>

        <InputBar onSubmit={handleSubmit} aria-label="Formulário para enviar pergunta">
          <TextInput
            aria-label="Digite sua dúvida jurídica"
            placeholder="Digite sua dúvida jurídica aqui..."
            value={input}
            onChange={handleChange}
            rows={1}
            disabled={loading}
            spellCheck={false}
            onKeyDown={handleKeyDown}
          />
          <SubmitButton
            type="submit"
            disabled={loading}
            aria-busy={loading}
            aria-label="Enviar pergunta"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </SubmitButton>
        </InputBar>

        {error && <ErrorText role="alert">{error}</ErrorText>}
      </Container>
    </>
  );
}