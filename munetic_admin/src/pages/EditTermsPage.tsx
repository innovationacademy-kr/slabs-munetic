import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import Item from '../components/Info/Common/Item';
import * as Api from '../lib/api';

const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  border-radius: 0.3rem;
  margin-bottom: 1rem;
`;

const Label = styled.div`
  font-family: "Roboto","Arial",sans-serif;
  font-size: 2.0rem;
  line-height: 2.2rem;
  font-weight: 400;
  width: 100%;
  margin: 6px;
  padding: 0;
  border: 0;
  background: transparent;
`;

export default function EditTermsPage() {
  const [text, setText] = useState<string>("");

  const getTerms = () => {
    Api.getTerms()
      .then(({ data }: any) => {
        setText(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const saveTerms = () => {
    Api.saveTerms({data: text})
      .then(({ data }: any) => {
        alert("저장하였습니다.");
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    getTerms();
  }, []);

  return (
    <Item>
      <Container>
        <Label>회원가입 약관</Label>
        <Button
          onClick={saveTerms}
          sx={{ fontSize: "1.5rem" }}
          variant="contained">
          저장
        </Button>
      </Container>
      <TextField
        variant="outlined"
        multiline
        defaultValue={text}
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
      />
    </Item>
  );
}
