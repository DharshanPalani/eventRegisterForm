import { useState, type ChangeEvent } from "react";
import type { FormState } from "../types";
import "../styles/RegistrationForm.css";
import "../styles/SelfDeclarationForm.css";

import { PersonalInfoFields } from "./PersonalInfoField";
import { CategorySelect } from "./CategorySelect";
import { DepartmentSelect } from "./DepartmentSelect";
import { FileUpload } from "./FileUpload";
import { DeclarationsSection } from "./DeclarationsSection";

type Props = {
  onSubmit: (form: FormState) => void;
  loading: boolean;
};

export default function RegistrationForm({ onSubmit, loading }: Props) {
  const [form, setForm] = useState<FormState>({
    name: "",
    rollNo: "",
    registrationNo: "",
    category: "",
    department: "",
    phone: "",
    idCard: null,
  });

  const [declarations, setDeclarations] = useState<Record<string, boolean>>({
    d1: false,
    d2: false,
    d3: false,
    d4: false,
    d5: false,
    d6: false,
    d7: false,
    d8: false,
    d9: false,
    d10: false,
    d11: false,
    d12: false,
    finalAgree: false,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList?.length) {
      setForm((prev) => ({ ...prev, idCard: fileList[0] }));
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setDeclarations((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const allChecked = Object.values(declarations).every(Boolean);

    if (!allChecked) {
      alert(
        "Please agree to all the self-declaration terms before submitting.",
      );
      return;
    }

    onSubmit(form);
  };

  return (
    <div className="form-container">
      <div className="banner">
        <div className="banner-pattern"></div>
        <img src="/banner.png" alt="Thinai 2K26 Banner" />
      </div>

      <h1 className="form-title">Thinai 2K26</h1>
      <p
        className="form-subtitle"
        style={{
          fontWeight: 700,
          color: "var(--primary)",
          marginTop: "-4px",
          marginBottom: "16px",
        }}
      >
        Cultural Festival
      </p>

      <p
        className="form-subtitle"
        style={{
          fontWeight: 700,
          color: "var(--primary)",
          marginTop: "-4px",
          marginBottom: "16px",
        }}
      >
        Kalai Kondattam
      </p>

      <div className="tribal-decoration">
        <div></div>
        <span>◈</span>
        <div></div>
      </div>

      <p className="form-subtitle">
        Join the celebration of our heritage. Fill the form below. You'll sign
        in with Google after submitting.
      </p>

      <form onSubmit={handleSubmit} className="form-body">
        <PersonalInfoFields form={form} onChange={handleInputChange} />
        <CategorySelect value={form.category} onChange={handleInputChange} />
        <DepartmentSelect
          value={form.department}
          onChange={handleInputChange}
        />
        <FileUpload onChange={handleFileChange} />
        <DeclarationsSection
          declarations={declarations}
          onChange={handleCheckboxChange}
        />

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Processing..." : "Submit & Continue to Sign In"}
        </button>
      </form>
    </div>
  );
}
