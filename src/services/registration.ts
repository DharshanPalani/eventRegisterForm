import supabase from "../supabaseClient";
import type { FormState } from "../types";
import imageCompression from "browser-image-compression";

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
    const originalFile = imageFile || formData.idCard;

    if (!originalFile) {
      throw new Error("No ID card file");
    }

    // 🔥 Compress here
    const compressedFile = await imageCompression(originalFile, {
      maxSizeMB: 1, // compress to max 1MB
      maxWidthOrHeight: 1200, // resize large images
      useWebWorker: true,
    });

    if (compressedFile.size > MAX_FILE_SIZE) {
      throw new Error("File still exceeds 10MB limit");
    }

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("id-cards")
      .upload(fileName, compressedFile, {
        contentType: "image/jpeg",
      });

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
        category: formData.category,
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
