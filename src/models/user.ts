export interface User {
  uid: string; // The user's unique ID.
  email: string | null;
  displayName: string | null;
  phoneNumber?: string | null;
  photoURL?: string | null;
  authenticated?: boolean;
  lastActivityDate?: any;
  locale: string;
}
