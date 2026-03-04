import { type ChangeEvent } from "react";
import heic2any from "heic2any";

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function FileUpload({ onChange }: Props) {
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isHeic =
      file.type === "image/heic" ||
      file.type === "image/heif" ||
      file.name.toLowerCase().endsWith(".heic") ||
      file.name.toLowerCase().endsWith(".heif");

    if (!isHeic) {
      onChange(e);
      return;
    }

    try {
      const convertedBlob = (await heic2any({
        blob: file,
        toType: "image/png",
      })) as Blob;

      const pngFile = new File(
        [convertedBlob],
        file.name.replace(/\.(heic|heif)$/i, ".png"),
        { type: "image/png" },
      );

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(pngFile);

      e.target.files = dataTransfer.files;

      onChange(e);
    } catch (error) {
      console.error("HEIC conversion failed:", error);
    }
  };

  return (
    <div className="input-group">
      <label>Upload ID Card Photo</label>
      <input type="file" accept="image/*" onChange={handleChange} required />
    </div>
  );
}
