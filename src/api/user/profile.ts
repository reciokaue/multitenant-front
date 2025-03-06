import { api } from '@/lib/axios'
import { UserRole } from '../role/get-user-roles';

export interface Profile {
  id: number;
  email: string;
  name: string;
  UserRole: UserRole[];
  Invite: any[];
}

export interface GetProfileResponse {
  profile: Profile;
}

export async function getProfile() {
  const response = await api.get('/user/profile')
  
  return response.data as GetProfileResponse
}
