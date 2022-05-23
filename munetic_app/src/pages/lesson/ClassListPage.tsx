import { useSearchParams } from 'react-router-dom';
import BottomMenu from '../../components/common/BottomMenu';
import ClassList from '../../components/lesson/ClassList';
import SearchTarget from '../../components/SearchTarget';

// export default function ClassListPage() {
//   const [getParams] = useSearchParams();
//   const categoryParam = parseInt(getParams.get('category') as string);
//   return (
//     <>
//       <ClassList category_id={Number.isNaN(categoryParam) ? undefined : categoryParam} />
//       {/* <BottomMenu /> */}
//     </>
//   );
// }

export default function SearchPageTarget() {
  const [getParams] = useSearchParams();
  const categoryParam = getParams.get('category') as string;
  return (
    <div>
      <SearchTarget category_id = { categoryParam } />
      {/* <BottomMenu /> */}
    </div>
  );
}
