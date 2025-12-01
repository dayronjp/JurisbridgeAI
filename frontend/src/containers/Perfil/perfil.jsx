import React, { useState, useEffect, useRef } from "react";
import Globalstyles from "../../styles/globalstyles";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Pencil, ShieldCheck, UserRound, ArrowLeft } from "lucide-react";
import imageCompression from "browser-image-compression";

/* ==============================
      🔥 MOBILE FIXES ADD
============================== */

const BackButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 999;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #f3f3f3;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background-color: #e5e5e5;
    transform: scale(1.05);
  }

  svg {
    stroke: #7f5af0;
    width: 20px;
    height: 20px;
  }

  /* 🔥 Esconder no mobile */
  @media (max-width: 768px) {
    display: none;
  }
`;

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 3rem;
  box-sizing: border-box;

  /* 🔥 reduzir espaçamento no mobile */
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  position: relative;
  gap: 1.5rem;
  width: 100%;
  max-width: 800px;

  /* 🔥 alinhar tudo ao centro no mobile */
  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const AvatarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  /* 🔥 no mobile vira coluna alinhada */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const Avatar = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: #555;
  background-image: ${(props) => (props.src ? `url(${props.src})` : "none")};
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 25px rgba(127, 90, 240, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  /* 🔥 reduzir no mobile */
  @media (max-width: 768px) {
    width: 110px;
    height: 110px;
  }
`;

const AvatarHint = styled.div`
  font-size: 0.8rem;
  color: #aaa;
  text-align: center;
`;

const Username = styled.h1`
  font-size: 1.5rem;
  margin: 0.2rem 0 0 0;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const UserBadge = styled.div`
  font-size: 0.9rem;
  padding: 0.25rem 0.75rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const DescriptionBox = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 12px;
  position: relative;
  font-size: 1.1rem;
  color: #ccc;
  min-height: 180px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
  }
`;

const EditIcon = styled(Pencil)`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 20px;
  height: 20px;
  color: #bbb;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

const DescriptionInput = styled.textarea`
  background: transparent;
  border: none;
  width: 100%;
  height: 100%;
  resize: none;
  font-size: 1.1rem;
  color: white;
  font-family: inherit;
  outline: none;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const UserWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: right;
  cursor: pointer;
  z-index: 10;

  @media (max-width: 768px) {
    right: 10px;
    top: 10px;
  }
`;

const UserDisplay = styled.div`
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  background-color: rgba(255, 255, 255, 0.08);
  padding: 0.5rem 1rem;
  border-radius: 12px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
`;

const Dropdown = styled.div`
  margin-top: 0.3rem;
  background: #222;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: white;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const SearchSection = styled.div`
  margin-top: 3rem;
  text-align: center;
  width: 100%;
  max-width: 800px;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const SearchInput = styled.input`
  padding: 0.8rem 1rem;
  border-radius: 12px;
  border: none;
  width: 100%;
  background-color: #1e1e2e;
  color: white;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.6rem;
  }
`;

const UserGrid = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const UserCard = styled.div`
  flex: 1 1 200px;
  max-width: 240px;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 14px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    max-width: 45%;
    padding: 1rem;
  }
`;

const UserAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-image: ${(props) => (props.src ? `url(${props.src})` : "none")};
  background-size: cover;
  background-position: center;
  margin-bottom: 1rem;
`;

function Perfil() {
  const name = localStorage.getItem("userName");
  const userType = localStorage.getItem("userType") || "user";
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [description, setDescription] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [editingDesc, setEditingDesc] = useState(false);
  const fileInputRef = useRef();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://jurisbridgeai.onrender.com/api/users/profile?name=${name}`);
        setDescription(response.data.description || "");

        const avatarRes = await axios.get(`https://jurisbridgeai.onrender.com/api/users/avatar/${name}`);
        const base64Image = avatarRes.data.image;
        if (base64Image) {
          setAvatarUrl(`data:image/png;base64,${base64Image}`);
        }
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("https://jurisbridgeai.onrender.com/api/users/all");
        setUsers(res.data);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
      }
    };

    if (name) fetchUserData();
    fetchAllUsers();
  }, [name]);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleAvatarClick = () => fileInputRef.current.click();

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true };
        const compressedFile = await imageCompression(file, options);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("avatar", compressedFile);

        await axios.put("https://jurisbridgeai.onrender.com/api/users/update-avatar", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setAvatarUrl(URL.createObjectURL(compressedFile));
      } catch (error) {
        console.error("Erro ao salvar avatar:", error);
      }
    }
  };

  const handleDescriptionSave = async (newDesc) => {
    try {
      await axios.put("https://jurisbridgeai.onrender.com/api/users/update-description", {
        name,
        description: newDesc,
      });
    } catch (err) {
      console.error("Erro ao salvar descrição:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setEditingDesc(false);
      handleDescriptionSave(description);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) && user.name !== name
  );

  return (
    <>
      <Globalstyles />

      {/* 🔙 escondido no mobile */}
      <BackButton onClick={() => navigate("/")}>
        <ArrowLeft />
      </BackButton>

      <Container>
        {name && (
          <UserWrapper onClick={toggleDropdown}>
            <UserDisplay>Olá, {name}</UserDisplay>
            {showDropdown && <Dropdown onClick={handleLogout}>Logout</Dropdown>}
          </UserWrapper>
        )}

        <ProfileCard>
          <AvatarRow>
            <AvatarWrapper>
              <Avatar src={avatarUrl || undefined} onClick={handleAvatarClick} />
              <AvatarHint>Clique para mudar foto</AvatarHint>
              <HiddenInput
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleAvatarChange}
              />
            </AvatarWrapper>

            <UserBadge>
              {userType === "advogado" ? <ShieldCheck size={16} /> : <UserRound size={16} />}
              {userType === "advogado" ? "Conta Advogado" : "Conta Usuário"}
            </UserBadge>
          </AvatarRow>

          <Username>{name}</Username>

          <DescriptionBox>
            {editingDesc ? (
              <DescriptionInput
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => {
                  setEditingDesc(false);
                  handleDescriptionSave(description);
                }}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            ) : (
              <>
                {description || "Clique no lápis para adicionar uma descrição."}
                <EditIcon onClick={() => setEditingDesc(true)} />
              </>
            )}
          </DescriptionBox>

          <SearchSection>
            <SearchInput
              type="text"
              placeholder="Buscar usuários por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchSection>

          <UserGrid>
            {filteredUsers.map((user, index) => (
              <UserCard key={index}>
                <UserAvatar src={`data:image/png;base64,${user.avatar}`} />
                <h3>{user.name}</h3>
                <UserBadge>
                  {user.type === "advogado" ? <ShieldCheck size={16} /> : <UserRound size={16} />}
                  {user.type === "advogado" ? "Advogado" : "Usuário"}
                </UserBadge>
              </UserCard>
            ))}
          </UserGrid>
        </ProfileCard>
      </Container>
    </>
  );
}

export default Perfil;
