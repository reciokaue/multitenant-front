import { api } from "@/lib/axios";
import { Profile } from "../user/profile";
import { Role } from "../role/get-user-roles";

interface GetTeamResponse {
  members: Member[]
}

type Member = {
  role: Role;
  user: Profile;
};

interface GetTeamMembersProps {
  teamId: number | string | undefined
}

export async function getTeamMembers({ teamId }: GetTeamMembersProps) {
  if(!teamId) return
  const response = await api.get(`/team/members/${teamId}`)
  return response.data as GetTeamResponse
}