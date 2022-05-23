import BottomMenu from '../../components/common/BottomMenu';
import CategoryContainer from '../../components/lesson/CategoryContainer';
import ClassListAll from '../../components/lesson/ClassListAll';
import ClassList from '../../components/lesson/ClassList';/////test

export default function CategoryPage() {
  return (
    <>
      <CategoryContainer />
      <ClassListAll />
      {/* <ClassList category_id={ 3 } /> */}
      {/* <BottomMenu /> */}
    </>
  );
}
