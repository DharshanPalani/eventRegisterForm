import { type ChangeEvent } from "react";

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function FileUpload({ onChange }: Props) {
  return (
    <div className="input-group">
      <label>Upload ID Card Photo</label>
      <input type="file" accept="image/*" onChange={onChange} required />
    </div>
  );
}
