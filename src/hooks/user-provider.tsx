import { createContext, useContext, useState } from "react";
import { getUserFromStorage } from "~/helpers/constants/getUserDetails";
import { UserType } from "~/lib/interfaces/app";

type UserContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>(() => {
    const userDetails = getUserFromStorage();

    if (!userDetails) return {};

    if (userDetails.role === "STUDENT") {
      return {
        role: userDetails.role,
        user_course_id: userDetails.user_course_id,
        user_id: userDetails.user_id,
        user_name: userDetails.user_name,
        student_college_id: userDetails.student_college_id,
        student_roll_no: userDetails.student_roll_no,
        branch_name: userDetails.branch_name,
      };
    } else if (userDetails.role === "ADMIN") {
      return {
        user_id: userDetails.user_id,
        user_name: userDetails.user_name,
        user_mail: userDetails.user_mail,
        role: userDetails.role,
      };
    } else {
      return {
        user_id: userDetails.user_id,
        user_name: userDetails.user_name,
        user_mail: userDetails.user_mail,
        user_course_id: userDetails.user_course_id,
        role: userDetails.role,
        teacher_experience: userDetails.teacher_experience,
        teacher_technicalities: userDetails.teacher_technicalities,
      };
    }
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
