import { useState } from 'react';
import styled, { css } from 'styled-components';
import { useLocation } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Title from '../Common/Title';
import Button from '../../Button';
import { useInfo } from '../../../contexts/info';
import { TextFields, TextField, TextField_ } from '../Common/TextFields';
import * as Api from '../../../lib/api';

export default function UserInfo() {
  const info = useInfo() as any;
  const path = useLocation().pathname;
  const [type, setType] = useState(info.type);
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const typeUpdate = () => {
    Api.updateUserInfo(info.id, { type }).then(() => {
      window.location.replace(`${info.id}`);
    });
  };

  return (
    <>
      <Title> 유저 정보 </Title>
      <TextFields>
        <TextField>
          <p>이름</p>
          <div>{info.name}</div>
        </TextField>
        <TextField_>
          <p>유형</p>

          {path === `/users/${info.id}` ? (
            <Select
              value={type}
              onChange={handleChange}
              autoWidth
              inputProps={{ readOnly: edit ? false : true }}
              sx={{ '& div': { m: 0, pt: 0.7 } }}
            >
              <MenuItem value={'Student'}>Student</MenuItem>
              <MenuItem value={'Tutor'}>Tutor</MenuItem>
            </Select>
          ) : (
            <Select
              value={type}
              onChange={handleChange}
              autoWidth
              inputProps={{ readOnly: edit ? false : true }}
              sx={{ '& div': { m: 0, pt: 0.7 } }}
            >
              <MenuItem value={'Owner'}>Owner</MenuItem>
              <MenuItem value={'Admin'}>Admin</MenuItem>
            </Select>
          )}

          <CustomButton disabled={!!info.deletedAt} onClick={handleEdit}>
            {edit ? '취소' : '편집'}
          </CustomButton>
          {edit && (
            <CustomButton disabled={info.type === type} onClick={typeUpdate}>
              저장
            </CustomButton>
          )}
        </TextField_>
      </TextFields>
      <TextFields>
        <TextField>
          <p>생년월일</p>
          <div>{info.birth}</div>
        </TextField>
        <TextField_>
          <p>성별</p>
          <div>{info.gender}</div>
        </TextField_>
      </TextFields>
      <TextField>
        <p>이메일</p>
        <div>{info.email || '없음'}</div>
      </TextField>
      <TextField>
        <p>휴대폰</p>
        <div>{info.phone_number || '없음'}</div>
      </TextField>
      <TextField>
        <p>자기 소개</p>
        <div>{info.introduction || '없음'}</div>
      </TextField>
      <TextField>
        <p>생성일</p>
        <div>{info.createdAt}</div>
      </TextField>
      <TextField>
        <p>삭제일</p>
        <div>{info.deletedAt || '없음'}</div>
      </TextField>
    </>
  );
}

const CustomButton = styled(Button)`
  width: 5rem;
  height: auto;
  padding: 0rem;
  margin: 0 0 0 1rem;
  background-color: rgb(82, 111, 255);
  ${props =>
    props.disabled &&
    css`
      background-color: rgb(140, 140, 140);
    `}
  border-radius: 0.5rem;
  line-height: 1;
`;
