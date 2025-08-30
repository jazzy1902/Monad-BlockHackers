import React from "react";
import { FaRocket, FaTimes } from "react-icons/fa";
import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 15px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 10px 30px ${({ theme }) => theme.colors.shadow};
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.2rem;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

export const ComingSoon = ({ onClose }) => {
  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <Icon>
          <FaRocket />
        </Icon>
        <Title>Coming Soon!</Title>
        <Message>
          We're working hard to bring you this awesome feature. Stay tuned for
          exciting updates and cool new functionality!
        </Message>
      </ModalContent>
    </Modal>
  );
};
