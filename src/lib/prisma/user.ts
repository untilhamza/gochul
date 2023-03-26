import prisma from ".";

export const getUserByEmail = async (email: string) => {
  try {
    const userFromDb = await prisma.user.findUnique({ where: { email } });
    return { user: userFromDb };
  } catch (err) {
    return { error: err };
  }
};

export const updateUser = async (id: string, data: any) => {
  try {
    const newUserData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      name: data.name,
      emailVerified: data.emailVerified,
      picture: data.picture,
      country: data.country,
      occupation: data.occupation,
      locale: data.locale,
      isApproved: data.isApproved,
    };
    const userFromDb = await prisma.user.update({
      where: { id },
      data: newUserData,
    });
    return { user: userFromDb };
  } catch (err) {
    return { error: err };
  }
};

// export async function getUsers() {
//   try {
//     const users = await prisma.user.findMany();
//     return { users };
//   } catch (error) {
//     return { error };
//   }
// }

// export async function createUser(user: any) {
//   try {
//     const userFromDB = await prisma.user.create({ data: user });
//     return { user: userFromDB };
//   } catch (error) {
//     return { error };
//   }
// }

// export async function getUserById(id: any) {
//   return await prisma.user.findUnique({ where: { id } });
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id },
//       include: { tweets: true },
//     });
//     return { user };
//   } catch (error) {
//     return { error };
//   }
// }
