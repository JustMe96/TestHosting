export interface CategoryPermissions {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  enabled: boolean;
}
