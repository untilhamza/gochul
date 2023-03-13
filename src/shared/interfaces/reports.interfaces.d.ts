interface Report {
  id: string;
  groupId?: string;
  leader?: ReportMember;
  membersPresent: ReportMember[];
  eventsActivities: string;
  online: boolean;
  prayerRequests: string;
  submissionDate: Date;
}

interface ReportMember extends Member {
  id: string;
  firstName: string;
  groupId?: string;
}
