import { Route } from 'react-router';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      Home 입니다.
      <Link to="/lesson/category">
        <button>레슨 찾기</button>
      </Link>
    </div>
  );
}
