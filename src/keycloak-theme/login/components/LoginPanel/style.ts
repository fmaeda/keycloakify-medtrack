import styled from "@emotion/styled/macro";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 12px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.05);
  filter: drop-shadow(0px 0px 40px rgba(0, 0, 0, 1));
`;

export const FormContainer = styled.form`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  flex: 1;
  padding: 20px;
  box-shadow: drop-shadow(4px 4px 20px rgba(0, 0, 0, 1));
  backdrop-filter: opacity(20%);
`;

export const Logo = styled.img`
  object-fit: contain;
  height: 40px;
  margin: 40px;
`;
