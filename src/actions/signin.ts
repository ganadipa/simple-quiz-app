"use server";

import { TAuthResponse } from "@/lib/types";
import { LoginSchema } from "@/schemas";
import { z } from "zod";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcrypt";

export default async function signin(values: any): Promise<TAuthResponse> {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      ok: false,
      message: validatedFields.error.errors[0].message,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            ok: false,
            message: "Invalid credentials",
          };
        default:
          return {
            ok: false,
            message: "An error occurred",
          };
      }
    }

    throw error;
  }

  return {
    ok: true,
    message: "Signin successful",
  };
}

export async function authorize(
  credentials: Partial<Record<string, unknown>>
) {}
