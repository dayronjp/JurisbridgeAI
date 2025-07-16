import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
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

const RegisterContainer = styled.div`
  max-inline-size: 400px;
  margin: 50px auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
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
  margin-bottom: 0.5rem;
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

const Select = styled.select`
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid #ddd;
  background: #f8f8f8;
  color: #333;
  font-size: 1rem;
  font-family: inherit;
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
  margin-top: -0.5rem;
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

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "user", // 👈 tipo padrão
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        type: formData.type, // 👈 enviado pro backend
      });

      if (response.status === 201) {
        toast.success("Usuário registrado com sucesso!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          type: "user",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.error || "Erro ao registrar usuário");
      toast.error(error.response?.data?.error || "Erro ao registrar usuário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <BackButton onClick={() => navigate("/")}>
      <ArrowLeft />
      </BackButton>
      <Title>Comece por aqui!</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Nome</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

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

        <FormGroup>
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="type">Tipo de Conta</Label>
          <Select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="user">Usuário Comum</option>
            <option value="advogado">Advogado</option>
          </Select>
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrar"}
        </Button>
      </Form>
      <ToastContainer />
    </RegisterContainer>
  );
};

export default Register;