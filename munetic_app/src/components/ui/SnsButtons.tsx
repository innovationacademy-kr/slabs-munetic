import { Instagram, YouTube, CloudQueue } from '@mui/icons-material';
import { IconButton } from '@mui/material';



/**
 * TutorSnsButtons 컴포넌트의 프로퍼티 정의
 */
export interface LessonItemIProps {
  instagramId?: string,
  youtubeChannel?: string,
  soundcloudId?: string
}


export default function SnsButtons(props: LessonItemIProps) {
  return (
    <>
      <IconButton
        color="inherit"
        disabled={props.instagramId === undefined}
        href={`https://www.instagram.com/${props.instagramId || ''}/`}
      >
        <Instagram />
      </IconButton>
      <IconButton
        color="inherit"
        disabled={props.youtubeChannel === undefined}
        href={props.youtubeChannel || ''}
      >
        <YouTube />
      </IconButton>
      <IconButton
        color="inherit"
        disabled={props.soundcloudId === undefined}
        href={`https://soundcloud.com/${props.soundcloudId || ''}/`}
      >
        <CloudQueue />
      </IconButton>
    </>
  );
}