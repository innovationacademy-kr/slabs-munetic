import InfoGrid from '../components/Info/InfoGrid';
import { useInfoUpdate } from '../contexts/info';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import * as Api from '../lib/api';

export default function LessonInfoPage() {
  const path = useLocation().pathname;
  const setInfo = useInfoUpdate();

  useEffect(() => {
    const lessonId = parseInt(path.slice(9));
    Api.getLesson(lessonId).then(res => {
      if (setInfo) setInfo(res.data.data);
    });
  }, []);

  return <InfoGrid />;
}
