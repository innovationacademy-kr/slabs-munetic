export interface CommentData {
  id: number;
  content: string;
  stars: number;
  'Lesson.title': string;
  createdAt: string;
  deletedAt: string;
}

export interface CommentHeadCell {
  disablePadding: boolean;
  id: keyof CommentData;
  label: string;
  numeric: boolean;
}

export const CommentHeadCells: readonly CommentHeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'No.',
  },
  {
    id: 'content',
    numeric: false,
    disablePadding: false,
    label: '댓글',
  },
  {
    id: 'stars',
    numeric: false,
    disablePadding: false,
    label: '별점',
  },
  {
    id: 'Lesson.title',
    numeric: false,
    disablePadding: false,
    label: '레슨 제목',
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: '생성일',
  },
  {
    id: 'deletedAt',
    numeric: false,
    disablePadding: false,
    label: '삭제일',
  },
];
