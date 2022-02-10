import { useParams } from 'react-router-dom';
import ViewAllCommentByUser from "../../components/comment/ViewAllCommentByUser";

export default function ViewCommentPage() {
  const userId: string = (useParams().id == undefined) ? "" : useParams().id as string;

  return (
    <>
      <ViewAllCommentByUser userId={userId} />
    </>
  );
}
