import { createGlobalStyle } from "styled-components";

const Globalstyles = createGlobalStyle`
  * {
    text-align: center;
    color: white;
  }

  body {
    font-family: Arial, sans-serif;
    background: linear-gradient(
      180deg,
      #121020 0%,       /* topo: mais escuro agora */
      #302b63 35%,      /* roxo intermediário */
      #3a4a80 70%,      /* azul escuro */
      #4c5a9a 100%      /* azul mais fechado */
    );
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    margin: 0;
    padding: 0;
  }

  nav ul li a {
    text-decoration: none; 
  }
`;

export default Globalstyles;
