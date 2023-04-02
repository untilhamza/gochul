// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../lib/prisma";

// // PUT /api/publish/:id
// export default async function handle(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   return res.status(200).json({ message: "Not implemented" });
//   const postId = req.query.id;
//   const post = await prisma.post.update({
//     where: { id: Number(postId) },
//     data: { published: true },
//   });
//   return res.json(post);
// }
