export interface UserData {
  id: number;
  name: string;
  login_id: string;
  type: string;
  lastLogin: string;
  createdAt: string;
  deletedAt: string;
}

export interface UserHeadCell {
  disablePadding: boolean;
  id: keyof UserData;
  label: string;
  numeric: boolean;
}

export const userHeadCells: readonly UserHeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'No.',
  },
  {
    id: 'login_id',
    numeric: false,
    disablePadding: false,
    label: '아이디',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: '이름',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: '유형',
  },
  {
    id: 'lastLogin',
    numeric: false,
    disablePadding: false,
    label: '마지막 로그인',
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
