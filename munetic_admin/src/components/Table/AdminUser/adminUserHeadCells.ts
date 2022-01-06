export interface AdminUserData {
  id: number;
  name: string;
  login_id: string;
  type: string;
  createdAt: string;
  deletedAt: string;
}

export interface AdminUserHeadCell {
  disablePadding: boolean;
  id: keyof AdminUserData;
  label: string;
  numeric: boolean;
}

export const adminUserHeadCells: readonly AdminUserHeadCell[] = [
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
    label: '이메일',
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
