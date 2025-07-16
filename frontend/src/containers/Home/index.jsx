import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Globalstyles from "../../styles/globalstyles.js";
import styled, { keyframes } from "styled-components";
import logo from "../../assets/logo_jb.png";
import Femida_Royalt from "../../assets/Femida_Royalty.png";
import TypingEffect from "../../components/TypingEffect/Typing.jsx";
import Male_Judge from "../../assets/Male_Judge.svg";

// animações
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(25px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeInScale = keyframes`
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
`;

const glowLoop = keyframes`
  0%, 100% { text-shadow: 0 0 5px rgba(180, 132, 255, 0.7); }
  50% { text-shadow: 0 0 15px rgba(180, 132, 255, 1); }
`;

const rock = keyframes`
  0%   { transform: rotate(-1.5deg) translateY(0px); }
  25%  { transform: rotate(1.5deg) translateY(-5px); }
  50%  { transform: rotate(-1.5deg) translateY(0px); }
  75%  { transform: rotate(1.5deg) translateY(5px); }
  100% { transform: rotate(-1.5deg) translateY(0px); }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 0, 30, 0.75);
  backdrop-filter: blur(3px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #1d1030;
  padding: 2.5rem;
  border-radius: 18px;
  box-shadow: 0 0 20px #b884ffaa;
  text-align: center;
  max-width: 400px;
  color: white;
  font-family: "Georgia", serif;
  animation: ${fadeInScale} 0.5s ease forwards;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }

  button {
    background: #b884ff;
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 50px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
      background: #9f6de2;
      box-shadow: 0 0 10px #b884ffcc;
    }
  }
`;

const StatusLogin = styled.div`
  position: absolute;
  top: 18px;
  left: 20px;
  background: rgba(70, 0, 100, 0.5);
  color: white;
  padding: 6px 16px;
  border-radius: 18px;
  font-size: 0.95rem;
  font-weight: bold;
  box-shadow: 0 0 10px #b884ff88;
  animation: ${fadeInUp} 0.8s ease forwards, ${glowLoop} 4s infinite;
  font-family: "Georgia", serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoutButton = styled.div`
  background-color: rgba(255, 255, 255, 0.08);
  padding: 0.4rem 0.8rem;
  border-radius: 10px;
  font-size: 0.85rem;
  margin-left: 0.5rem;
  color: #ffcccc;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    color: #fff;
  }
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem 6rem 2rem;
  animation: ${fadeInUp} 0.8s ease forwards;
`;

const StyledLogo = styled.img`
  position: absolute;
  top: 13px;
  right: 20px;
  width: 130px;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.1))
          drop-shadow(0 0 12px rgba(128, 0, 128, 0.4));
  cursor: pointer;
  animation: ${fadeInScale} 1s ease forwards;
  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 20px #b57affcc);
  }
`;

const StyledSearchBar = styled.input`
  display: block;
  width: 250px;
  padding: 8px 12px;
  margin: 20px auto 25px auto;
  border: 2px solid #ddd;
  border-radius: 25px;
  font-size: 14px;
  background-color: transparent;
  color: white;
  text-align: center;
  transition: all 0.3s ease;
  outline: none;
  animation: ${fadeInUp} 0.7s ease forwards;

  &::placeholder {
    color: white;
    opacity: 0.7;
  }

  &:focus {
    border-color: purple;
  }
  &:focus::placeholder {
    opacity: 0;
  }
`;

const LinksContainer = styled.div`
  text-align: center;
  margin-top: 0;
  animation: ${fadeInUp} 0.7s ease forwards;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  margin: 20px 10px 0 10px;
  border: 2px solid #ddd;
  border-radius: 25px;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;

  &:hover {
    color: purple;
    transform: scale(1.1);
    text-shadow: 0 0 5px rgba(128, 0, 128, 0.6);
  }
`;

const StyledButtonLink = styled.button`
  background: none;
  border: 2px solid #ddd;
  border-radius: 25px;
  padding: 10px 20px;
  color: white;
  margin: 20px 10px 0 10px;
  cursor: pointer;
  font-size: 1rem;
  user-select: none;
  transition: all 0.3s ease;

  &:hover {
    color: purple;
    transform: scale(1.1);
    text-shadow: 0 0 5px rgba(128, 0, 128, 0.6);
  }
`;

const Divider = styled.hr`
  border: none;
  height: 2px;
  width: 100%;
  margin: 40px 0;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.8), transparent);
  box-shadow: 0 0 10px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.2);
  opacity: 0.9;
  animation: pulseGlow 2s ease-in-out infinite;

  @keyframes pulseGlow {
    0%, 100% {
      box-shadow: 0 0 10px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.2);
    }
    50% {
      box-shadow: 0 0 15px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.5), 0 0 45px rgba(255,255,255,0.3);
    }
  }
`;

const TypingWrapper = styled.div`
  animation: ${fadeInUp} 0.8s ease forwards;
`;

const InfoSection = styled.section`
  display: flex;
  gap: 3rem;
  margin-top: 4rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  animation: ${fadeInUp} 0.9s ease forwards;
`;

const TextArea = styled.div`
  flex: 1 1 480px;
  color: #ddd;
  font-size: 1.25rem;
  line-height: 1.8;
  padding: 1.5rem 2rem;
  background: rgba(40, 10, 60, 0.6);
  border-radius: 18px;
  box-shadow: 0 0 18px #b884ff77;
  font-family: "Georgia", serif;
  animation: ${fadeInScale} 1s ease forwards, ${glowLoop} 3s ease-in-out infinite;
`;

const BoatFloat = styled.img`
  flex: 1 1 300px;
  width: 280px;
  animation: ${rock} 6s ease-in-out infinite, ${fadeInScale} 1s ease forwards;
  filter: drop-shadow(0 0 12px rgba(128, 0, 128, 0.5));
`;

const FeaturesSection = styled.section`
  margin-top: 4rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

const FeatureCard = styled.div`
  flex: 1 1 250px;
  background: rgba(30, 10, 50, 0.8);
  padding: 1.8rem 1.2rem;
  border-radius: 15px;
  box-shadow: 0 0 15px #aa7fff77;
  color: #eee;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 0 30px #b884ffcc;
  }

  svg {
    width: 40px;
    height: 40px;
    margin-bottom: 12px;
    fill: #b884ff;
  }

  h3 {
    margin-bottom: 8px;
  }
`;

const StatsSection = styled.section`
  margin-top: 5rem;
  background: rgba(30, 10, 60, 0.7);
  padding: 3rem 2rem;
  border-radius: 20px;
  box-shadow: 0 0 25px #bb88ffcc;
  text-align: center;
  color: white;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const CTASection = styled.section`
  margin-top: 5rem;
  background: linear-gradient(135deg, #7e57c2, #b884ff);
  padding: 3rem 2rem;
  border-radius: 25px;
  text-align: center;
  box-shadow: 0 0 25px #b884ffcc;

  h2 {
    margin-bottom: 0.8rem;
  }

  p {
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
`;

const CTAButton = styled(Link)`
  background: white;
  color: #7e57c2;
  padding: 0.8rem 2.4rem;
  font-size: 1rem;
  border-radius: 50px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px transparent;

  &:hover {
    background: #d1b3ff;
    box-shadow: 0 0 20px #b884ffcc;
    transform: scale(1.05);
  }
`;

const Footer = styled.footer`
  margin-top: 7rem;
  padding: 1.2rem 1rem;
  background: rgba(33, 0, 70, 0.3);
  backdrop-filter: blur(8px);
  color: white;
  text-align: center;
  font-size: 0.9rem;
  font-family: "Georgia", serif;
  border-radius: 12px;
  box-shadow: 0 0 15px #b884ff66;
`;

function Home() {
  const [userName, setUserName] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTarget, setModalTarget] = useState("login");
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    setUserName(name);
  }, []);

  const handleJurisIA = () => {
    if (userName) {
      navigate("/jurisia");
    } else {
      setModalTarget("jurisia");
      setShowModal(true);
    }
  };

  const handlePerfil = () => {
    if (userName) {
      navigate("/perfil");
    } else {
      setModalTarget("perfil");
      setShowModal(true);
    }
  };

  const closeModalAndGoToLogin = () => {
    setShowModal(false);
    navigate("/login", { state: { redirectTo: modalTarget } });
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setUserName(null);
    navigate(0);
  };

  return (
    <>
      <Globalstyles />
      <StyledLogo src={logo} alt="Logo" />
      <StatusLogin>
        {userName ? (
          <>
            Olá, {userName}
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          "Você não está logado"
        )}
      </StatusLogin>

      <Container>
        <StyledSearchBar type="text" placeholder="Como posso te ajudar hoje?" />
        <LinksContainer>
          <StyledLink to="/register">Registre-Se</StyledLink>
          <StyledLink to="/login">Login</StyledLink>
          <StyledButtonLink onClick={handleJurisIA}>
            Juris IA {userName ? "" : "🔒"}
          </StyledButtonLink>
          <StyledButtonLink onClick={handlePerfil}>
            Meu Perfil {userName ? "" : "🔒"}
          </StyledButtonLink>
          <StyledLink to="/conectese">Conecte-se com um Advogado</StyledLink>
        </LinksContainer>

        <Divider />
        <TypingWrapper>
          <TypingEffect />
        </TypingWrapper>

        <InfoSection>
          <TextArea>
            <h2>O que é o JurisBridge?</h2>
            <p>
              O <strong>JurisBridge</strong> nasceu com o propósito de integrar tecnologia e justiça
              em uma única plataforma...
            </p>
          </TextArea>
          <BoatFloat src={Male_Judge} />
        </InfoSection>

        <FeaturesSection>
          <FeatureCard>
            <svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" /></svg>
            <h3>Consulta IA</h3>
            <p>Respostas jurídicas rápidas e precisas com inteligência artificial.</p>
          </FeatureCard>
          <FeatureCard>
            <svg viewBox="0 0 64 64"><rect width="50" height="50" x="7" y="7" rx="8" /></svg>
            <h3>Acompanhamento</h3>
            <p>Acompanhe seu processo jurídico em tempo real, sem complicações.</p>
          </FeatureCard>
          <FeatureCard>
            <svg viewBox="0 0 64 64"><polygon points="32,5 59,59 5,59" /></svg>
            <h3>Documentos Automáticos</h3>
            <p>Geração automática de documentos legais, personalizados e confiáveis.</p>
          </FeatureCard>
        </FeaturesSection>

        <StatsSection>
          <p>
            Com seu feedback, nosso sistema evolui constantemente — tornando o JurisBridge mais confiável.
          </p>
        </StatsSection>

        <CTASection>
          <h2>Quer facilitar sua vida jurídica?</h2>
          <p>Cadastre-se agora e descubra como o JurisBridge pode te ajudar.</p>
          <CTAButton to="/register">Começar Agora</CTAButton>
        </CTASection>

        <Footer>
          &copy; 2025 JurisBridge. Todos os direitos reservados.
        </Footer>
      </Container>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>⚠️ Acesso restrito</h3>
            <p>Para acessar essa área, você precisa estar logado.</p>
            <button onClick={closeModalAndGoToLogin}>Fazer Login</button>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

export default Home;