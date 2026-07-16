export type Profile = {
  id: string;
  user_id: string;
  username: string;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type Experience = {
  id: string;
  user_id: string;
  title: string;
  company: string;
  description: string | null;
  category: 'Magang' | 'Organisasi' | 'Kerja';
  image_url: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  created_at: string;
};

export type Certificate = {
  id: string;
  user_id: string;
  title: string;
  issuer: string;
  issued_date: string;
  credential_url: string | null;
  image_url: string | null;
  created_at: string;
};

export type Project = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  role: string | null;
  image_url: string | null;
  project_url: string | null;
  created_at: string;
};

export type Skill = {
  id: string;
  user_id: string;
  name: string;
  category: string;
  proficiency_level: string;
  created_at: string;
};

export type AuthUser = {
  id: string;
  email: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
}; 
