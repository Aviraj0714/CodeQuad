import React from "react";
import styled from "styled-components";

const Loader: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <span>&lt;</span>
        <span>LOADING...</span>
        <span>/&gt;</span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1A1A1A;
  padding: 20px;

  .loader {
    font-size: 6vw; /* Responsive font size */
    font-weight: 900;
    text-align: center;
    white-space: nowrap;
  }

  .loader > * {
    color: #863BCB;
  }

  .loader span {
    display: inline-flex;
  }

  .loader span:nth-child(2) {
    letter-spacing: -1em;
    overflow: hidden;
    animation: reveal 1.5s cubic-bezier(0.645, 0.045, 0.355, 1) infinite alternate;
  }

  @keyframes reveal {
    0%, 100% {
      opacity: 0.5;
      letter-spacing: -1em;
    }
    50% {
      opacity: 1;
      letter-spacing: 0em;
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .loader {
      font-size: 8vw;
    }
  }

  @media (max-width: 480px) {
    .loader {
      font-size: 10vw;
      flex-direction: column;
      align-items: center;
    }
  }
`;

export default Loader;
