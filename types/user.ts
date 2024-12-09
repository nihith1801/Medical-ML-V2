export interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  avatar: string | null;
  emailVerified: boolean;
}

