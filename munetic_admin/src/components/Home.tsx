import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      Home 입니다.
      <Link to="/users">
        <button>회원 관리</button>
      </Link>
    </div>
  );
}
