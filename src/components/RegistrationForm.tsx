import { useState, type ChangeEvent } from "react";
import type { FormState } from "../types";
import "../styles/RegistrationForm.css";

type Props = {
  onSubmit: (form: FormState) => void;
  loading: boolean;
};

export default function RegistrationForm({ onSubmit, loading }: Props) {
  const [form, setForm] = useState<FormState>({
    name: "",
    rollNo: "",
    registrationNo: "",
    department: "",
    phone: "",
    idCard: null,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm((prev) => ({ ...prev, idCard: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <div className="form-header"></div>
        <h1 className="form-title">Event Registration</h1>
        <p className="form-subtitle">
          Fill the form below. You'll sign in with Google after submitting.
        </p>

        <form onSubmit={handleSubmit} className="form-body">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="rollNo">Roll No</label>
            <input
              id="rollNo"
              name="rollNo"
              value={form.rollNo}
              onChange={handleInputChange}
              placeholder="Enter your roll number"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="registrationNo">Registration No</label>
            <input
              id="registrationNo"
              name="registrationNo"
              value={form.registrationNo}
              onChange={handleInputChange}
              placeholder="Enter your registration number"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={form.department}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Choose your department
              </option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone No</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="idCard">Upload ID Card Photo</label>
            <input
              id="idCard"
              name="idCard"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            {form.idCard && (
              <span className="helper-text">Selected: {form.idCard.name}</span>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Processing..." : "Submit & Continue to Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
