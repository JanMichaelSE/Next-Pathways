import { IMentor } from "@/types";
import { prisma } from "../db";
import { excludeFields } from "@/utils/db.util";

async function createMentor(
  userId: string,
  email: string,
  mentorInfo: IMentor
) {
  try {
    const createdMentor = await prisma.mentor.create({
      data: {
        name: mentorInfo.name,
        email: email,
        phone: mentorInfo.phone,
        gender: mentorInfo.gender,
        department: mentorInfo.department,
        academicDegree: mentorInfo.academicDegree,
        officeHours: mentorInfo.officeHours,
        office: mentorInfo.office,
        interests: mentorInfo.interests,
        description: mentorInfo.description,
        facultyStatus: mentorInfo.facultyStatus,
        profilePicture: mentorInfo.profilePicture,
        userId: userId,
      },
    });

    const mentorWithoutId = excludeFields(createdMentor, "id");
    return mentorWithoutId;
  } catch (error) {
    throw error;
  }
}

export {
  createMentor
}
