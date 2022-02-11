import styled from 'styled-components';

const VideoWrapper = styled.div`
  border-radius: 40px;
  padding: 20px;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
`;

const Video = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

export default function BestPlayingVideo() {
  return (
    <VideoWrapper>
      <Label>베스트 연주 영상</Label>
      <VideoContainer>
        <Video src={"https://www.youtube.com/embed/ldxVFDvWCgg"} />
      </VideoContainer>
    </VideoWrapper>
  );
}