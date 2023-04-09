import prisma from ".";
import { GochulUser } from "@prisma/client";
export const getGochulUserByEmail = async (email: string) => {
  try {
    const userFromDb = await prisma.gochulUser.findUnique({ where: { email } });
    return { gochulUser: userFromDb };
  } catch (err) {
    return { error: err };
  }
};

export const createGochulUser = async (user: GochulUser) => {
  try {
    const userFromDB = await prisma.gochulUser.create({ data: user });
    return { gochulUser: userFromDB };
  } catch (error) {
    console.log("Error creating new user on db", error);
    return { error };
  }
};
