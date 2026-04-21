export interface RegisterFormType {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
  branchName: string;
  collegeId: number;
  domainId: number;
  rollNo: string;
  courseId: number;
}

export interface CollegeData {
  college_id: number;
  college_address: string;
  college_name: string;
}

export interface DomainsDataType {
  domain_id: number;
  domain_name: string;
}

export interface CoursesDataType {
  course_id: number;
  course_name: string;
  course_meta_data: any;
  course_created_at: string;
  field_id: number;
}

export interface RegisterErrorMessage{
  name?: string,
  email?: string,
  password?: string,
  branch_name?: string,
  college_id?: string,
  domain_id?: string,
  roll_no?: string,
  course_id?: string
}

export interface userDetailsType{
  branch_name: string,
  role: string,
  student_college_id: number,
  student_course_id: number,
  student_email_id: string,
  student_id: number,
  student_name: string,
  student_roll_no: number,
}
