import { IStudent } from "@/types";
import { prisma } from "../db";
import { excludeFields } from "@/utils/db.util";

async function createStudent(
  userId: string,
  email: string,
  studentInfo: IStudent
) {
  try {
    const createdStudent = await prisma.student.create({
      data: {
        name: studentInfo.name,
        email: email,
        phone: studentInfo.phone,
        gender: studentInfo.gender,
        graduationDate: studentInfo.graduationDate
          ? new Date(studentInfo.graduationDate)
          : undefined,
        gpa: studentInfo.gpa,
        institution: studentInfo.institution,
        fieldOfStudy: studentInfo.fieldOfStudy,
        hasResearch: studentInfo.hasResearch,
        profilePicture: studentInfo.profilePicture,
        userId: userId,
      },
    });

    const studentWithoutId = excludeFields(createdStudent, "id");
    return studentWithoutId;
  } catch (error) {
    throw error;
  }
}

export { createStudent };
