export interface Person {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role_code: string;
}

export interface User extends Person {
  id: string;
  code: string;
  updated_at: string;
  user_status: string;
  subscribe: any[];
}
