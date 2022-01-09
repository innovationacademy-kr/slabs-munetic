import styled from 'styled-components';

export const TextFields = styled.div`
  display: flex;
  width: 100%;
`;

export const TextField = styled.div`
  margin: auto 0;
  flex: 1;
  padding-top: 1rem;
  padding-left: 1rem;
  display: flex;
  width: 100%;
  & p {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.7rem;
    width: 8rem;
  }
  & div {
    margin: auto 0;
    padding-bottom: 0.3rem;
    font-size: 1.3rem;
    min-width: 10rem;
    max-width: 30rem;
  }
`;

export const TextField_ = styled.div`
  flex: 1;
  padding-top: 1rem;
  display: flex;
  width: 100%;
  & p {
    border-left: 0.1rem solid grey;
    padding-left: 3rem;
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.7rem;
    width: 8rem;
  }
  & div {
    padding-bottom: 0.3rem;
    font-size: 1.3rem;
  }
`;
