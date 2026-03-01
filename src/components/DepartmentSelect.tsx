import { useState, useRef, useEffect, type ChangeEvent } from "react";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

// const DEPARTMENTS = [
//   "(GAS)B.A. Economics - A",
//   "(GAS)B.A. Economics - B",
//   "(GAS)B.A. Defence",
//   "(GAS)B.Sc Maths",
//   "(GAS)B.Sc. Chemistry",
//   "(GAS)B.Sc. PBPBT",
//   "(GAS)B.Sc. AZBT",
//   "(GAS)B.Com General - A",
//   "(GAS)B.Com General- B",
//   "(GAS)B.Com C.S",
//   "(GAS)M.A. Economics",
//   "(GAS)M.Sc.Chemistry",
//   "(GAS)M.Com General",
//   "(SFS- I)B.A. English",
//   "(SFS- I) B.A. Sociology",
//   "(SFS- I) B.A. Defence",
//   "(SFS- I) B.A. Political science",
//   "(SFS- I)B.Sc. Viscom",
//   "(SFS- I) B.Sc Biotech",
//   "(SFS- I)B.Sc IT",
//   "(SFS- I) B.Sc.Data Analytics",
//   "(SFS- I) B.Com General - D",
//   "(SFS- I)B.Com CS - B",
//   "(SFS- I) B.Com ISM",
//   "(SFS- I)B.Com CA",
//   "(SFS- I) B.Com PA",
//   "(SFS- I) M.A. Defence",
//   "(SFS- I) M.Sc Mathematics",
//   "(SFS- I)M.S.W",
//   "(SFS- I) M.Sc. Zoology",
//   "(SFS- II) BBA - 'A'",
//   "(SFS- II) BBA - 'B'",
//   "(SFS- II) BBA (R.M)",
//   "(SFS- II) B.C.A - 'A'",
//   "(SFS- II) B.C.A - 'B'",
//   "(SFS- II) B.C.A - 'C'",
//   "(SFS- II) B.Sc. CS- A",
//   "(SFS- II) B.Sc. CS- B",
//   "(SFS- II) B.Sc. CS- C",
//   "(SFS- II) B.Com General - A",
//   "(SFS- II) B.Com General - B",
//   "(SFS- II) B.Com General - C",
//   "(SFS -II) B.Com CS - A",
//   "(SFS- II) B.Com A&F - A",
//   "(SFS- II) B.Com A&F - B",
//   "(SFS- II) B.Com Honours",
//   "(SFS- II) B.Com BM",
//   "(SFS- II) B.Com MM",
//   "( SFS- I) MCA",
// ];

export function DepartmentSelect({ value, onChange }: Props) {
  const [query, setQuery] = useState(value);
  // const [open, setOpen] = useState(false);
  // const [highlighted, setHighlighted] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // const listRef = useRef<HTMLUListElement>(null);

  // const filtered = query.trim()
  //   ? DEPARTMENTS.filter((d) => d.toLowerCase().includes(query.toLowerCase()))
  //   : DEPARTMENTS;

  // Sync external value changes (e.g. form reset)
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Close on outside click
  // useEffect(() => {
  //   const handler = (e: MouseEvent) => {
  //     if (!containerRef.current?.contains(e.target as Node)) {
  //       setOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handler);
  //   return () => document.removeEventListener("mousedown", handler);
  // }, []);

  // Scroll highlighted item into view
  // useEffect(() => {
  //   if (highlighted >= 0 && listRef.current) {
  //     const item = listRef.current.children[highlighted] as HTMLElement;
  //     item?.scrollIntoView({ block: "nearest" });
  //   }
  // }, [highlighted]);

  // const select = (dept: string) => {
  //   setQuery(dept);
  //   setOpen(false);
  //   setHighlighted(-1);
  //   // Fire a synthetic change event so the parent's handler works unchanged
  //   const nativeInput = inputRef.current!;
  //   const nativeSetter = Object.getOwnPropertyDescriptor(
  //     window.HTMLInputElement.prototype,
  //     "value",
  //   )!.set!;
  //   nativeSetter.call(nativeInput, dept);
  //   nativeInput.dispatchEvent(new Event("change", { bubbles: true }));
  // };

  // const handleKeyDown = (e: React.KeyboardEvent) => {
  //   if (!open) {
  //     if (e.key === "ArrowDown" || e.key === "Enter") setOpen(true);
  //     return;
  //   }
  //   if (e.key === "ArrowDown") {
  //     e.preventDefault();
  //     setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
  //   } else if (e.key === "ArrowUp") {
  //     e.preventDefault();
  //     setHighlighted((h) => Math.max(h - 1, 0));
  //   } else if (e.key === "Enter") {
  //     e.preventDefault();
  //     if (highlighted >= 0 && filtered[highlighted]) {
  //       select(filtered[highlighted]);
  //     }
  //   } else if (e.key === "Escape") {
  //     setOpen(false);
  //   }
  // };

  return (
    <div className="input-group combobox-wrapper" ref={containerRef}>
      <label>Department</label>
      <div className="combobox-input-wrap">
        <input
          ref={inputRef}
          name="department"
          type="text"
          autoComplete="off"
          placeholder="Type your department…"
          value={query}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
            // setOpen(true);
            // setHighlighted(-1);
            onChange(e);
          }}
          // onFocus={() => setOpen(true)}
          // onKeyDown={handleKeyDown}
          className="combobox-input"
          // aria-haspopup="listbox"
          // aria-expanded={open}
          // aria-autocomplete="list"
        />
        {/* Dropdown arrow commented out as requested */}
        {/* <button
          type="button"
          className="combobox-arrow"
          tabIndex={-1}
          onClick={() => {
            setOpen((o) => !o);
            inputRef.current?.focus();
          }}
          aria-label="Toggle dropdown"
        >
          {open ? "▲" : "▼"}
        </button> */}
      </div>

      {/* Dropdown list commented out as requested */}
      {/* {open && filtered.length > 0 && (
        <ul className="combobox-list" role="listbox" ref={listRef}>
          {filtered.map((dept, idx) => (
            <li
              key={dept}
              role="option"
              aria-selected={dept === value}
              className={`combobox-option${idx === highlighted ? " combobox-option--highlighted" : ""}${dept === value ? " combobox-option--selected" : ""}`}
              onMouseDown={(e) => {
                e.preventDefault(); // prevent blur before click
                select(dept);
              }}
              onMouseEnter={() => setHighlighted(idx)}
            >
              {query.trim()
                ? (() => {
                    const lower = dept.toLowerCase();
                    const idx2 = lower.indexOf(query.toLowerCase());
                    if (idx2 === -1) return dept;
                    return (
                      <>
                        {dept.slice(0, idx2)}
                        <mark>{dept.slice(idx2, idx2 + query.length)}</mark>
                        {dept.slice(idx2 + query.length)}
                      </>
                    );
                  })()
                : dept}
            </li>
          ))}
        </ul>
      )} */}

      {/* {open && filtered.length === 0 && (
        <div className="combobox-empty">No department found</div>
      )} */}
    </div>
  );
}
