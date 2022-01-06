declare module Express {
  export interface Request {
    user?: {
      login_id: string;
      id: number;
      login_password?: string;
      type: string;
    };
  }
}
