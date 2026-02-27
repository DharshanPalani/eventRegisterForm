import supabase from "../supabaseClient";
import type { FormState } from "../types";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const checkExisting = async (userId: string) => {
  const { data } = await supabase
    .from("registrations")
    .select("*")
    .eq("user_id", userId)
    .limit(1);

  return data?.[0] || null;
};

export const uploadAndRegister = async (
  formData: FormState,
  userId: string,
  imageFile?: File,
) => {
  const existing = await checkExisting(userId);
  if (existing) {
    throw new Error("Already registered");
  }

  let idCardUrl = "";

  if (imageFile || formData.idCard) {
    const file = imageFile || formData.idCard;

    if (!file) {
      throw new Error("No ID card file");
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File exceeds 10MB limit");
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("id-cards")
      .upload(fileName, file);

    if (uploadError) {
      throw new Error("Upload failed: " + uploadError.message);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("id-cards").getPublicUrl(fileName);

    idCardUrl = publicUrl;
  }

  const { data, error } = await supabase
    .from("registrations")
    .insert([
      {
        user_id: userId,
        name: formData.name,
        roll_no: formData.rollNo,
        registration_no: formData.registrationNo,
        department: formData.department,
        phone: formData.phone,
        id_card_url: idCardUrl,
      },
    ])
    .select();

  if (error) {
    throw new Error("Registration failed: " + error.message);
  }

  return data[0];
};
