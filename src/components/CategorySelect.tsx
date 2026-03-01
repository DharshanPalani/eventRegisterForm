import { type ChangeEvent } from "react";

const CATEGORIES = [
  "UG",
  "PG",
  "Fine Arts",
  "NSS",
  "NCC",
  "Women's Development Cell",
  "Student Council",
];

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export function CategorySelect({ value, onChange }: Props) {
  return (
    <div className="input-group">
      <label>Category</label>
      <select name="category" value={value} onChange={onChange} required>
        <option value="" disabled>
          Select your category
        </option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
