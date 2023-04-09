import prisma from ".";

// export async function getReports() {
//   try {
//     const reports = await prisma.report.findMany();
//     return { reports };
//   } catch (error) {
//     return { error };
//   }
// }

// export async function createReport(report: any) {
//   try {
//     const reportFromDB = await prisma.report.create({ data: report });
//     return { report: reportFromDB };
//   } catch (error) {
//     return { error };
//   }
// }

// export async function getReportById(id: any) {
//   return await prisma.report.findUnique({ where: { id } });
//   try {
//     const report = await prisma.report.findUnique({
//       where: { id },
//       include: { tweets: true },
//     });
//     return { report };
//   } catch (error) {
//     return { error };
//   }
// }
