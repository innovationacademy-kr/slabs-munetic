import styled, { css } from 'styled-components';
import { Grid } from '@mui/material';
import { useInfo } from '../../../contexts/info';
import Item from '../Common/Item';
import LessonContent from './LessonContent';
import LessonInfo from './LessonInfo';
import WriterInfo from './WriterInfo';
import Button from '../../Button';
import * as Api from '../../../lib/api';

export default function LessonGrid() {
  const info = useInfo() as any;

  const deleteLesson = () => {
    if (window.confirm(`이 게시물을 삭제하시겠습니까?`)) {
      Api.deleteLesson(info.id)
        .then(() => {
          alert('삭제되었습니다.');
          window.location.replace(`${info.id}`);
        })
        .catch(err => alert(err.response.data));
    }
  };

  return (
    <>
      <CustomButton disabled={!!info.deletedAt} onClick={deleteLesson}>
        게시물 삭제
      </CustomButton>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid item xs={3} sx={{ mb: 3 }}>
          <Item>
            <WriterInfo />
          </Item>
        </Grid>
        <Grid item xs={9} sx={{ mb: 3 }}>
          <Item>
            <LessonInfo />
          </Item>
        </Grid>
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Item>
            <LessonContent />
          </Item>
        </Grid>
      </Grid>
    </>
  );
}

const CustomButton = styled(Button)`
  width: 10rem;
  border-radius: 0.5rem;
  background-color: rgb(82, 111, 255);
  display: block;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  ${props =>
    props.disabled &&
    css`
      background-color: rgb(140, 140, 140);
    `}
`;
