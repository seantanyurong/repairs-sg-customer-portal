"use server";

// import Staff from "@/models/Staff";
import { createClerkClient } from "@clerk/nextjs/server";

const staffClerk = createClerkClient({
  secretKey: process.env.STAFF_CLERK_SECRET_KEY as string,
});

const getStaffById = async (id: string) => {
  const user = await staffClerk.users.getUser(id);

  if (!user) throw new Error("No staff found with that id");

  return JSON.stringify(user);
};

export { getStaffById };
