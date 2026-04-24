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

export interface registerTeacherPayload{
  fullName: string;
  emailAddress: string;
  password: string;
  assignedCourseId: number,
  experience: string,
  technicalSkills: {
    skills: string[]
  }
}