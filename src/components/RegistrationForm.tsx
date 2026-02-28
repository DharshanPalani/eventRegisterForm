import { useState, type ChangeEvent } from "react";
import type { FormState } from "../types";
import "../styles/RegistrationForm.css";
import "../styles/SelfDeclarationForm.css";

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

  const [declarations, setDeclarations] = useState({
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
    if (e.target.files && e.target.files.length > 0) {
      setForm((prev) => ({ ...prev, idCard: e.target.files![0] }));
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setDeclarations((prev) => ({ ...prev, [name]: checked }));
  };

  const allChecked = Object.values(declarations).every(Boolean);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!allChecked) {
      alert(
        "Please agree to all the self-declaration terms before submitting.",
      );
      return;
    }

    onSubmit(form);
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <div className="form-header"> </div>
        <h1 className="form-title">Thinai 2K26</h1>
        <p className="form-subtitle">
          Fill the form below. You'll sign in with Google after submitting.
        </p>

        <form onSubmit={handleSubmit} className="form-body">
          <div className="input-group">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Roll No</label>
            <input
              name="rollNo"
              value={form.rollNo}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Registration No</label>
            <input
              name="registrationNo"
              value={form.registrationNo}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Department</label>
            <select
              name="department"
              value={form.department}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Choose your department
              </option>
              <option value="(GAS)B.A. Economics - B">
                (GAS) B.A. Economics - A
              </option>
              <option value="(GAS)B.A. Economics - B">
                (GAS)B.A. Economics - B
              </option>
              <option value="(GAS)B.A. Defence">(GAS)B.A. Defence</option>
              <option value="(GAS)B.Sc Maths">(GAS)B.Sc Maths</option>
              <option value="(GAS)B.Sc. Chemistry">(GAS)B.Sc. Chemistry</option>
              <option value="(GAS)B.Sc. PBPBT">(GAS)B.Sc. PBPBT</option>
              <option value="(GAS)B.Sc. AZBT">(GAS)B.Sc. AZBT</option>
              <option value="(GAS)B.Com General - A">
                (GAS)B.Com General - A
              </option>
              <option value="(GAS)B.Com General- B">
                (GAS)B.Com General- B
              </option>
              <option value="(GAS)B.Com C.S">(GAS)B.Com C.S</option>
              <option value="(GAS)M.A. Economics">(GAS)M.A. Economics</option>
              <option value="(GAS)M.Sc.Chemistry">(GAS)M.Sc.Chemistry</option>
              <option value="(GAS)M.Com General">(GAS)M.Com General</option>
              <option value="(SFS- I)B.A. English">(SFS- I)B.A. English</option>
              <option value="(SFS- I) B.A. Sociology">
                (SFS- I) B.A. Sociology
              </option>
              <option value="(SFS- I) B.A. Defence">
                (SFS- I) B.A. Defence
              </option>
              <option value="(SFS- I) B.A. Political science">
                (SFS- I) B.A. Political science
              </option>
              <option value="(SFS- I)B.Sc. Viscom">(SFS- I)B.Sc. Viscom</option>

              <option value="(SFS- I) B.Sc Biotech">
                (SFS- I) B.Sc Biotech
              </option>
              <option value="(SFS- I)B.Sc IT">(SFS- I)B.Sc IT</option>
              <option value="(SFS- I) B.Sc.Data Analytics">
                (SFS- I) B.Sc.Data Analytics
              </option>
              <option value="(SFS- I) B.Com General - D">
                (SFS- I) B.Com General - D
              </option>
              <option value="(SFS- I)B.Com CS - B">(SFS- I)B.Com CS - B</option>
              <option value="(SFS- I) B.Com ISM">(SFS- I) B.Com ISM</option>
              <option value="(SFS- I)B.Com CA">(SFS- I)B.Com CA</option>
              <option value="(SFS- I) B.Com PA">(SFS- I) B.Com PA</option>
              <option value="(SFS- I) M.A. Defence">
                (SFS- I) M.A. Defence
              </option>
              <option value="(SFS- I) M.Sc Mathematics">
                (SFS- I) M.Sc Mathematics
              </option>
              <option value="(SFS- I)M.S.W">(SFS- I)M.S.W</option>
              <option value="(SFS- I) M.Sc. Zoology">
                (SFS- I) M.Sc. Zoology
              </option>
              <option value="(SFS- II) BBA - 'A'">(SFS- II) BBA - 'A'</option>
              <option value="(SFS- II) BBA - 'B'">(SFS- II) BBA - 'B'</option>
              <option value="(SFS- II) BBA (R.M)">(SFS- II) BBA (R.M)</option>
              <option value="(SFS- II) B.C.A - 'A'">
                (SFS- II) B.C.A - 'A'
              </option>
              <option value="(SFS- II) B.C.A - 'B'">
                (SFS- II) B.C.A - 'B'
              </option>
              <option value="(SFS- II) B.C.A - 'C'">
                (SFS- II) B.C.A - 'C'
              </option>
              <option value="(SFS- II) B.Sc. CS- A">
                (SFS- II) B.Sc. CS- A
              </option>
              <option value="(SFS- II) B.Sc. CS- B">
                (SFS- II) B.Sc. CS- B
              </option>
              <option value="(SFS- II) B.Sc. CS- C">
                (SFS- II) B.Sc. CS- C
              </option>
              <option value="(SFS- II) B.Com General - A">
                (SFS- II) B.Com General - A
              </option>
              <option value="(SFS- II) B.Com General - B">
                (SFS- II) B.Com General - B
              </option>
              <option value="(SFS- II) B.Com General - C">
                (SFS- II) B.Com General - C
              </option>
              <option value="(SFS -II) B.Com CS - A">
                (SFS -II) B.Com CS - A
              </option>
              <option value="(SFS- II) B.Com A&F - A">
                (SFS- II) B.Com A&F - A
              </option>
              <option value="(SFS- II) B.Com A&F - B">
                (SFS- II) B.Com A&F - B
              </option>
              <option value="(SFS- II) B.Com Honours">
                (SFS- II) B.Com Honours
              </option>
              <option value="(SFS- II) B.Com BM">(SFS- II) B.Com BM</option>
              <option value="(SFS- II) B.Com MM">(SFS- II) B.Com MM</option>
              <option value="(SFS- I) MBA">( SFS- I) MCA</option>
              {/* <option value="Civil">Civil</option> */}
            </select>
          </div>

          <div className="input-group">
            <label>Phone No</label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Upload ID Card Photo</label>
            <input
              name="idCard"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="declaration-section">
            <h3>Self-Declaration for Cultural Program Participation</h3>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="d1"
                  onChange={handleCheckboxChange}
                />
                I will participate responsibly and maturely.
              </label>
              <label>
                <input
                  type="checkbox"
                  name="d2"
                  onChange={handleCheckboxChange}
                />
                I understand misconduct may result in disciplinary action.
              </label>
              <label>
                <input
                  type="checkbox"
                  name="d3"
                  onChange={handleCheckboxChange}
                />
                I will not consume drugs or alcohol.
              </label>
              <label>
                <input
                  type="checkbox"
                  name="d4"
                  onChange={handleCheckboxChange}
                />
                I will maintain respect and dignity.
              </label>
              <label>
                <input
                  type="checkbox"
                  name="d5"
                  onChange={handleCheckboxChange}
                />
                I will uphold my department and college reputation.
              </label>
              <label>
                <input
                  type="checkbox"
                  name="d6"
                  onChange={handleCheckboxChange}
                />
                I will carry valid entry pass and ID card.
              </label>
              <label>
                <input
                  type="checkbox"
                  name="d7"
                  onChange={handleCheckboxChange}
                />
                I will follow regular dress code.
              </label>
              <label>
                <input
                  type="checkbox"
                  name="d8"
                  onChange={handleCheckboxChange}
                />
                I understand CCTV monitoring is active.
              </label>
              <label>
                <input
                  type="checkbox"
                  name="d9"
                  onChange={handleCheckboxChange}
                />
                I accept bag checks if required.
              </label>
              <label>
                <input
                  type="checkbox"
                  name="d10"
                  onChange={handleCheckboxChange}
                />
                I will not disrupt the event.
              </label>
              <label>
                <input
                  type="checkbox"
                  name="d11"
                  onChange={handleCheckboxChange}
                />
                I have informed my parents.
              </label>
              <label>
                <input
                  type="checkbox"
                  name="d12"
                  onChange={handleCheckboxChange}
                />
                I commit to a peaceful celebration.
              </label>

              <label className="final-agreement">
                <input
                  type="checkbox"
                  name="finalAgree"
                  onChange={handleCheckboxChange}
                />
                I wholeheartedly agree to all the above terms and accept
                disciplinary action if violated.
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading || !allChecked}
          >
            {loading ? "Processing..." : "Submit & Continue to Sign In"}
          </button>
        </form>
      </div>
    </div>
    // </div>
  );
}
