import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
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

const LoginContainer = styled.div`
  max-inline-size: 400px;
  margin: 50px auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  margin-block-end: 1.5rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-block-end: 0.5rem;
  color: #555;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  background: #f8f8f8;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #7f5af0;
    outline: none;
    box-shadow: 0 0 8px rgba(127, 90, 240, 0.2);
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  text-align: center;
  font-size: 0.9rem;
  margin-block-start: -0.5rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #7f5af0, #916bff);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-transform: uppercase;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(127, 90, 240, 0.4);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(127, 90, 240, 0.5);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const RegisterLink = styled.p`
  text-align: center;
  margin-block-start: 1rem;
  color: #555;

  a {
    color: #7f5af0;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Enviando login para o servidor...", formData);

      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Resposta do servidor:", response.data);

      if (response.status === 200) {
        const userName = response.data.name || "Usuário";
        const userType = response.data.type || "user";

        localStorage.setItem("userName", userName);
        localStorage.setItem("userType", userType)

        toast.success("Login efetuado com sucesso!");
        setTimeout(() => {
          navigate("/perfil");
        }, 2000);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);

      setError(error.response?.data?.error || "Algo deu errado. Tente novamente!");
      toast.error(error.response?.data?.error || "Algo deu errado. Tente novamente!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
        <BackButton onClick={() => navigate("/")}>
      <ArrowLeft />
      </BackButton>
      <Title>Olá! Bem-Vindo novamente.</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </Button>
      </Form>

      <RegisterLink>
        Ainda não tem uma conta? <Link to="/register">Registre-se</Link>
      </RegisterLink>

      <ToastContainer />
    </LoginContainer>
  );
};

export default Login;
