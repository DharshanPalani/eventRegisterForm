import { type ChangeEvent } from "react";
import type { FormState } from "../types";

type Props = {
  form: FormState;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function PersonalInfoFields({ form, onChange }: Props) {
  return (
    <>
      <div className="input-group">
        <label>Name</label>
        <input name="name" value={form.name} onChange={onChange} required />
      </div>
      <div className="input-group">
        <label>Roll No</label>
        <input name="rollNo" value={form.rollNo} onChange={onChange} required />
      </div>
      <div className="input-group">
        <label>Registration No</label>
        <input
          name="registrationNo"
          value={form.registrationNo}
          onChange={onChange}
          required
        />
      </div>
      <div className="input-group">
        <label>Phone No</label>
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={onChange}
          required
        />
      </div>
    </>
  );
}
