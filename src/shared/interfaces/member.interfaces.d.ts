interface Member {
  firstName: string;
  lastName?: string;
  country?: string;
  occupation?: string;
  id: string;
  groupId: string;
}

interface GroupLeader extends Member {
  isGroupLeader: boolean;
  phone: string;
  email: string;
  birthDate: string;
}
