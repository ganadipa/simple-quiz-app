"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { TAuthResponse } from "@/lib/types";
import { SignupSchema } from "@/schemas";
import bcrypt from "bcrypt";

export default async function signup(values: any): Promise<TAuthResponse> {
  const validatedFields = SignupSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      ok: false,
      message: validatedFields.error.errors[0].message,
    };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPasword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      ok: false,
      message: "User with this email already exists",
    };
  }

  console.log(db);

  await db.user.create({
    data: {
      email,
      password: hashedPasword,
      name,
    },
  });

  return {
    ok: true,
    message: "Signup successful",
  };
}
