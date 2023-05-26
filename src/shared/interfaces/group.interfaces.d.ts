interface Group {
  id: string;
  leader?: GroupLeader;
  members: Member[];
  district: District;
}

interface GroupLeader extends Member {
  isGroupLeader: boolean;
  phone: string;
  email: string;
  birthDate: string;
}
