import styled from 'styled-components';


import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';

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
  font-family: "Roboto","Arial",sans-serif;
  font-size: 1.6rem;
  line-height: 2.2rem;
  font-weight: 400;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
`;

const favTutors = [
  { tutor_id: 1, image_uri: "/img/basicProfileImg.png", tutor_name: "베토벤", reviews: 98},
  { tutor_id: 2, image_uri: "/img/basicProfileImg.png", tutor_name: "모짜르트", reviews: 70},
  { tutor_id: 3, image_uri: "/img/basicProfileImg.png", tutor_name: "쇼팽", reviews: 40},
  { tutor_id: 4, image_uri: "/img/basicProfileImg.png", tutor_name: "바흐", reviews: 30},
  { tutor_id: 5, image_uri: "/img/basicProfileImg.png", tutor_name: "쇼팽", reviews: 20},
  { tutor_id: 6, image_uri: "/img/basicProfileImg.png", tutor_name: "루피", reviews: 10},
  { tutor_id: 7, image_uri: "/img/basicProfileImg.png", tutor_name: "에스파", reviews: 9},
  { tutor_id: 8, image_uri: "/img/basicProfileImg.png", tutor_name: "키츠요지", reviews: 8},
  { tutor_id: 9, image_uri: "/img/basicProfileImg.png", tutor_name: "다이나믹듀오", reviews: 7},
  { tutor_id: 10, image_uri: "/img/basicProfileImg.png", tutor_name: "피타입", reviews: 6},
  { tutor_id: 11, image_uri: "/img/basicProfileImg.png", tutor_name: "Lil Mosey", reviews: 5},
  { tutor_id: 12, image_uri: "/img/basicProfileImg.png", tutor_name: "Drake", reviews: 4},
  { tutor_id: 13, image_uri: "/img/basicProfileImg.png", tutor_name: "Alexander O'Neal", reviews: 3},
  { tutor_id: 14, image_uri: "/img/basicProfileImg.png", tutor_name: "Aron Afshar", reviews: 2},
];


export default function ViewTutorsProfile() {
  return (
    <TutorsWrapper>
      <Label>리뷰 많은 강사 (상위 20명)</Label>
      <ImagesWrapper>
        <ImageList
          rowHeight={200}
          sx={{
            gridAutoFlow: "column",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr)) !important",
            gridAutoColumns: "minmax(160px, 1fr)"
          }}
        >
        {favTutors.map((tutor) => (
          <ImageListItem>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                (<Badge badgeContent={tutor.reviews} color="secondary" />)
              }>
              <Avatar src={tutor.image_uri} sx={{ width: 150, height: 150 }} />
            </Badge>
            <ImageListItemBar title={tutor.tutor_name} />
          </ImageListItem>
        ))}
        </ImageList>
      </ImagesWrapper>
    </TutorsWrapper>
  );
}