import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import * as ProfileAPI from '../../lib/api/profile';

const TutorsWrapper = styled.div`
  margin: 20px 0;
  padding: 20px;
  width: 100%;
  height: 100%;
  border-radius: 40px;
`;

const ImagesWrapper = styled.div`
  margin-top: 20px;
  padding: 0;
  border: 0;
`;

const Label = styled.div`
  font-family: 'Roboto', 'Arial', sans-serif;
  font-size: 1.6rem;
  line-height: 2.2rem;
  font-weight: 400;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
`;

/**
 * TutorListElement 컴포넌트의 프로퍼티 정의
 */
interface TutorListElementIProps {
  tutor_id: number;
  image_uri: string;
  tutor_name: string;
  reviews: number;
}

/**
 * 튜터 리스트 중 하나의 요소
 */
function TutorListElement(props: TutorListElementIProps) {
  return (
    <ImageListItem key={props.tutor_id} sx={{ width: 150 }}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={<Badge badgeContent={props.reviews} color="secondary" />}
      >
        <Avatar src={props.image_uri} sx={{ width: 150, height: 150 }} />
      </Badge>
      <ImageListItemBar title={props.tutor_name} />
    </ImageListItem>
  );
}

/**
 * ViewTutorsProfile 컴포넌트에 들어가는 데이터 타입 정의
 */
export interface ViewTutorsProfileDataIProps {
  tutor_id: number;
  num: number;
}

/**
 * ViewTutorsProfile 컴포넌트의 프로퍼티 정의
 */
export interface ViewTutorsProfileIProps {
  label: string;
  row: ReadonlyArray<ViewTutorsProfileDataIProps>;
}

export default function ViewTutorsProfile(props: ViewTutorsProfileIProps) {
  const [startutors, setStartutors] = useState<TutorListElementIProps[]>([]);

  useEffect(() => {
    async function init() {
      try {
        const startutors_new = await Promise.all(
          props.row.map(
            async (
              row: ViewTutorsProfileDataIProps,
            ): Promise<TutorListElementIProps> => {
              const tutor = await ProfileAPI.getProfileById(row.tutor_id);
              return {
                tutor_id: row.tutor_id,
                image_uri: tutor.data.data.image_url,
                tutor_name: tutor.data.data.name,
                reviews: row.num,
              };
            },
          ),
        );
        setStartutors(startutors_new);
      } catch (e) {
        console.log(e, '튜터 프로필을 불러오지 못했습니다.');
      }
    }
    init();
  }, []);

  return (
    <TutorsWrapper>
      <Label>{props.label}</Label>
      <ImagesWrapper>
        <ImageList
          rowHeight={200}
          sx={{
            gridAutoFlow: 'column',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(160px,1fr)) !important',
            gridAutoColumns: 'minmax(160px, 1fr)',
          }}
        >
          {startutors.length >= 1 ? (
            startutors.map(tutor => (
              <TutorListElement
                key={tutor.tutor_id}
                tutor_id={tutor.tutor_id}
                image_uri={tutor.image_uri}
                tutor_name={tutor.tutor_name}
                reviews={tutor.reviews}
              />
            ))
          ) : (
            <li>No content</li>
          )}
        </ImageList>
      </ImagesWrapper>
    </TutorsWrapper>
  );
}
