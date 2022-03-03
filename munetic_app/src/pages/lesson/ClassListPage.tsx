import { useSearchParams } from 'react-router-dom';
import BottomMenu from '../../components/common/BottomMenu';
import ClassList from '../../components/lesson/ClassList';

export default function ClassListPage() {
  const [getParams] = useSearchParams();
  const categoryParam = parseInt(getParams.get('category') as string);
  return (
    <>
      <ClassList category_id={Number.isNaN(categoryParam) ? undefined : categoryParam} />
      {/* <BottomMenu /> */}
    </>
  );
}
