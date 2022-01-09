import { useState } from 'react';
import styled, { css } from 'styled-components';
import { useLocation } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Title from '../Common/Title';
import Button from '../../Button';
import { useUser } from '../../../contexts/user';
import * as Api from '../../../lib/api';

export default function UserInfo() {
  const userInfo = useUser() as any;
  const path = useLocation().pathname;
  const [type, setType] = useState(userInfo.type);
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const typeUpdate = () => {
    Api.updateUserInfo(userInfo.id, { type }).then(() => {
      window.location.replace(`${userInfo.id}`);
    });
  };

  console.log(type);
  return (
    <>
      <Title> 유저 정보 </Title>
      <TextFields>
        <TextField>
          <p>이름</p>
          <div>{userInfo.name}</div>
        </TextField>
        <TextField_>
          <p>유형</p>

          {path === `/users/${userInfo.id}` ? (
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

          <CustomButton disabled={!!userInfo.deletedAt} onClick={handleEdit}>
            {edit ? '취소' : '편집'}
          </CustomButton>
          {edit && (
            <CustomButton
              disabled={userInfo.type === type}
              onClick={typeUpdate}
            >
              저장
            </CustomButton>
          )}
        </TextField_>
      </TextFields>
      <TextFields>
        <TextField>
          <p>생년월일</p>
          <div>{userInfo.birth}</div>
        </TextField>
        <TextField_>
          <p>성별</p>
          <div>{userInfo.gender}</div>
        </TextField_>
      </TextFields>
      <TextField>
        <p>이메일</p>
        <div>{userInfo.email || '없음'}</div>
      </TextField>
      <TextField>
        <p>휴대폰</p>
        <div>{userInfo.phone_number || '없음'}</div>
      </TextField>
      <TextField>
        <p>자기 소개</p>
        <div>{userInfo.introduction || '없음'}</div>
      </TextField>
      <TextField>
        <p>생성일</p>
        <div>{userInfo.createdAt}</div>
      </TextField>
      <TextField>
        <p>삭제일</p>
        <div>{userInfo.deletedAt || '없음'}</div>
      </TextField>
    </>
  );
}

const TextFields = styled.div`
  display: flex;
  width: 100%;
`;

const TextField = styled.div`
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
    width: 7rem;
  }
  & div {
    margin: auto 0;
    padding-bottom: 0.3rem;
    font-size: 1.3rem;
    min-width: 10rem;
    max-width: 30rem;
  }
`;

const TextField_ = styled.div`
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
    width: 5rem;
  }

  & div {
    padding-bottom: 0.3rem;
    font-size: 1.3rem;
  }
`;

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
