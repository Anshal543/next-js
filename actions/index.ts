"use server";

import { z, Schema } from "zod";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FormState } from "@/types/upload-types";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

interface ActionResponse {
  type?: "error" | "success";
  message?: string;
  errors?: {
    name?: string[];
    price?: string[];
    description?: string[];
    imageUrl?: string[];
    contactEmail?: string[];
  } | null;
}

export async function sellYourItemAction(
  prevState: FormState,
  formData: FormData
): Promise<ActionResponse> {
  console.log({ prevState });
  console.log(formData.get("name"));
  console.log(formData.get("description"));
  console.log(formData.get("contactEmail"));
  console.log(formData.get("price"));
  console.log(formData.get("imageUrl"));

  const schema: Schema = z.object({
    name: z.string().min(4),
    description: z.string().min(5),
    contactEmail: z.string().min(1).email("this is not a valid email address"),
    price: z.string().min(1),
    imageUrl: z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, "Max image size is 5MB")
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        `Only .jpg, .jpeg, .png, and webp files are supported`
      ),
  });
  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    contactEmail: formData.get("contactEmail"),
    price: formData.get("price"),
    imageUrl: formData.get("imageUrl"),
  });
  if (!validatedFields.success) {
    console.log("Error", validatedFields.error);
    return {
      type: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields, Failed to create Product",
    };
  }

  const { name, contactEmail, description, price, imageUrl } =
    validatedFields.data;
  try {
    const fileName = `${Math.random()}-${imageUrl.name}`;
    const supabase = createServerActionClient({ cookies });
    const { data, error } = await supabase.storage
      .from("storage")
      .upload(fileName, imageUrl, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("error", error);
      return {
        type: "error",
        message: "Failed to upload image",
      };
    }

    if (data) {
      const path = data.path;
      const { error: productsError,data:productsData } = await supabase
        .from("easysell-products")
        .insert({ name, contactEmail, description, price, imageUrl: path });
      if (productsError) {
        console.error("error", productsError);
        return {
          type: "error",
          message: "Failed to create Product",
        };
      }
      if(productsData){
        return {
          type: "success",
          message: "Product created successfully",
        };
      }
    }
  } catch (e) {
    console.error("error", e);
    return {
      type: "error",
      message: "Failed to create Product",
    };
  }
  revalidatePath("/");
  redirect("/");
}
