export type Interview = {
  _id: string;
  title: string; // title of the interview. i.e. Phone Interview, 1st Engineer Interview, System Design Interview
  applicationId: string;
  dateTime?: Date; // date time when the interview will take place
  venue?: string; // online / company address, place where the interview will take place
  joinLink?: string; // for online interview join link
  duration?: string; // how long the interview will be. i.e. 45min, 1hour
  description?: string; // any description provided by the recruiter, copy-paste into this field
  notes?: string; // any personal notes fot the round
};
