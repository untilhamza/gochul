export interface Report {
  id?: string;
  leader?: Member;
  membersPresent: Member[];
  eventsActivities: string;
  online: boolean;
  prayerRequests: string;
  submissionDate: Date;
}

export interface Member {
  name: string;
  id: string;
}
