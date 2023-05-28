// functions for the group model in prisma

import prisma from ".";
import { Group } from "@prisma/client";

export const getGroups = async () => {
  try {
    const groups = await prisma.group.findMany();
    return { groups };
  } catch (error) {
    return { error };
  }
};

export const getGroupById = async (id: string) => {
  try {
    const group = await prisma.group.findUnique({
      where: { id },
    });
    return { group };
  } catch (error) {
    return { error };
  }
};

export const createGroup = async (group: Group) => {
  try {
    const groupFromDB = await prisma.group.create({ data: group });
    return { group: groupFromDB };
  } catch (error) {
    return { error };
  }
};

// Path: src/lib/prisma/index.ts
