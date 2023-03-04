export interface Report {
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
