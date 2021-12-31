import { useState } from 'react';
import styled from 'styled-components';
import { MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import ModalTitle from '../ModalTitle';
import {
  FlexContainer,
  LeftContainer,
  RightContainer,
} from '../FlexComponents';

export default function UserAuthType() {
  const [type, setType] = useState('tutor');
  const [auth, setAuth] = useState('user');

  const typeHandleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const AuthHandleChange = (event: SelectChangeEvent) => {
    setAuth(event.target.value);
  };

  return (
    <FlexContainer>
      <LeftContainer>
        <ModalTitle>가입 유형</ModalTitle>
        <FlexInner>
          <FormControl sx={{ minWidth: 100 }}>
            <Select
              sx={{ fontSize: 13 }}
              value={type}
              onChange={typeHandleChange}
            >
              <MenuItem sx={{ fontSize: 13 }} value={'student'}>
                student
              </MenuItem>
              <MenuItem sx={{ fontSize: 13 }} value={'tutor'}>
                tutor
              </MenuItem>
            </Select>
          </FormControl>
          <ButtonDiv>
            <SmallButton>save</SmallButton>
            <SmallButton>edit</SmallButton>
          </ButtonDiv>
        </FlexInner>
      </LeftContainer>
      <RightContainer>
        <ModalTitle>권한</ModalTitle>
        <FlexInner>
          <FormControl sx={{ minWidth: 100 }}>
            <Select
              sx={{ fontSize: 13 }}
              value={auth}
              onChange={AuthHandleChange}
            >
              <MenuItem sx={{ fontSize: 13 }} value={'user'}>
                user
              </MenuItem>
              <MenuItem sx={{ fontSize: 13 }} value={'admin'}>
                admin
              </MenuItem>
            </Select>
          </FormControl>
          <ButtonDiv>
            <SmallButton>edit</SmallButton>
            <SmallButton>save</SmallButton>
          </ButtonDiv>
        </FlexInner>
      </RightContainer>
    </FlexContainer>
  );
}

const FlexInner = styled.div`
  display: flex;
`;

const ButtonDiv = styled.div``;
const SmallButton = styled.button`
  margin: 0 1rem 1rem 1rem;
  width: 5rem;
  height: 2rem;
`;
