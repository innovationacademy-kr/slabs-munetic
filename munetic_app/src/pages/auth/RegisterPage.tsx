import Register from '../../components/auth/Register';
import TutorRegister from '../../components/auth/TutorRegister';
import { useSearchParams } from 'react-router-dom';
import BottomMenu from '../../components/common/BottomMenu';

export default function RegisterPage() {
  const [getParams] = useSearchParams();
  const tutorParam = getParams.get('tutor');
  return (
    <>
      {tutorParam ? <TutorRegister /> : <Register />}
      {/* <BottomMenu /> */}
    </>
  );
}
