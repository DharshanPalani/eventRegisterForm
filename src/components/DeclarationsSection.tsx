import { type ChangeEvent } from "react";

type Props = {
  declarations: Record<string, boolean>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function DeclarationsSection({ declarations, onChange }: Props) {
  const declarationList = [
    "I will participate responsibly and maturely.",
    "I understand misconduct may result in disciplinary action.",
    "I will not consume drugs or alcohol.",
    "I will maintain respect and dignity.",
    "I will uphold my department and college reputation.",
    "I will carry valid entry pass and ID card.",
    "I will follow regular dress code.",
    "I understand CCTV monitoring is active.",
    "I accept bag checks if required.",
    "I will not disrupt the event.",
    "I have informed my parents.",
    "I commit to a peaceful celebration.",
  ];

  return (
    <div className="declaration-section">
      <h3>Self-Declaration for Cultural Program Participation</h3>
      <div className="checkbox-group">
        {declarationList.map((text, idx) => (
          <label key={idx}>
            <input
              type="checkbox"
              name={`d${idx + 1}`}
              onChange={onChange}
              checked={declarations[`d${idx + 1}`]}
            />
            {text}
          </label>
        ))}
        <label className="final-agreement">
          <input
            type="checkbox"
            name="finalAgree"
            onChange={onChange}
            checked={declarations.finalAgree}
          />
          I wholeheartedly agree to all the above terms and accept disciplinary
          action if violated.
        </label>
      </div>
    </div>
  );
}
