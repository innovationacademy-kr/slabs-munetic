import styled from 'styled-components';

const VideoWrapper = styled.div`
  border-radius: 2px;
  padding: 10px;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
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
  padding: 5px;
  border: 0;
  background: transparent;
`;

/**
 * VideoEmbed 컴포넌트의 프로퍼티 정의
 */
export interface VideoEmbedIProps {
  title?: string;
  id: string;
}

/**
 * 유튜브 영상의 고유 ID를 받아 유튜브 임베드를 하는 컴포넌트
 * 
 * @param props.title optional string 비디오 라벨
 * @param props.id string 비디오 고유 ID
 * @returns 리액트 컴포넌트
 */
export default function VideoEmbed(props: VideoEmbedIProps) {
  return (
    <VideoWrapper>
      {props.title && <Label>{props.title}</Label>}
      <VideoContainer>
        <Video src={`https://www.youtube.com/embed/${props.id}`} />
      </VideoContainer>
    </VideoWrapper>
  );
}