"use server";

// import Staff from "@/models/Staff";
import { clerkClient } from "@clerk/nextjs/server";

const staffClerk = clerkClient();

const getStaffById = async (id: string) => {
    const user = await staffClerk.users.getUser(id);
  
    if (!user) throw new Error("No staff found with that id");
  
    return JSON.stringify(user);
  }

export { getStaffById };
