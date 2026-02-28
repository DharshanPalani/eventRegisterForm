import { type ChangeEvent } from "react";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export function DepartmentSelect({ value, onChange }: Props) {
  const options = [
    "(GAS)B.A. Economics - A",
    "(GAS)B.A. Economics - B",
    "(GAS)B.A. Defence",
    "(GAS)B.Sc Maths",
    "(GAS)B.Sc. Chemistry",
    "(GAS)B.Sc. PBPBT",
    "(GAS)B.Sc. AZBT",
    "(GAS)B.Com General - A",
    "(GAS)B.Com General- B",
    "(GAS)B.Com C.S",
    "(GAS)M.A. Economics",
    "(GAS)M.Sc.Chemistry",
    "(GAS)M.Com General",
    "(SFS- I)B.A. English",
    "(SFS- I) B.A. Sociology",
    "(SFS- I) B.A. Defence",
    "(SFS- I) B.A. Political science",
    "(SFS- I)B.Sc. Viscom",
    "(SFS- I) B.Sc Biotech",
    "(SFS- I)B.Sc IT",
    "(SFS- I) B.Sc.Data Analytics",
    "(SFS- I) B.Com General - D",
    "(SFS- I)B.Com CS - B",
    "(SFS- I) B.Com ISM",
    "(SFS- I)B.Com CA",
    "(SFS- I) B.Com PA",
    "(SFS- I) M.A. Defence",
    "(SFS- I) M.Sc Mathematics",
    "(SFS- I)M.S.W",
    "(SFS- I) M.Sc. Zoology",
    "(SFS- II) BBA - 'A'",
    "(SFS- II) BBA - 'B'",
    "(SFS- II) BBA (R.M)",
    "(SFS- II) B.C.A - 'A'",
    "(SFS- II) B.C.A - 'B'",
    "(SFS- II) B.C.A - 'C'",
    "(SFS- II) B.Sc. CS- A",
    "(SFS- II) B.Sc. CS- B",
    "(SFS- II) B.Sc. CS- C",
    "(SFS- II) B.Com General - A",
    "(SFS- II) B.Com General - B",
    "(SFS- II) B.Com General - C",
    "(SFS -II) B.Com CS - A",
    "(SFS- II) B.Com A&F - A",
    "(SFS- II) B.Com A&F - B",
    "(SFS- II) B.Com Honours",
    "(SFS- II) B.Com BM",
    "(SFS- II) B.Com MM",
    "( SFS- I) MCA",
  ];

  return (
    <div className="input-group">
      <label>Department</label>
      <select name="department" value={value} onChange={onChange} required>
        <option value="" disabled>
          Choose your department
        </option>
        {options.map((dep) => (
          <option key={dep} value={dep}>
            {dep}
          </option>
        ))}
      </select>
    </div>
  );
}
