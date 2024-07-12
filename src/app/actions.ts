"use server";

import { db } from "@/db";

export const changePublishStatus = async ({
  id,
  newStatus,
}: {
  id: string;
  newStatus: boolean;
}) => {
  await db.dishes.update({
    where: { dishId: id },
    data: { isPublished: newStatus },
  });
};
