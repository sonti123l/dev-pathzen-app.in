export type loginPayload = {
  email: string;
  password: string;
};

export interface registerPayload {
  name: string;
  email: string;
  password: string;
  branchName: string;
  collegeId: number;
  domainId: number;
  rollNo: string;
  courseId: number;
}
