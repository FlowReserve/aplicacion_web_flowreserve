import React, { useState, useEffect } from 'react';

interface CheckboxSelectProps {
  label: string;
  onChange: (data: { label: string; checked: boolean; value: string | null }) => void;
  defaultChecked?: boolean;
  defaultValue?: string | null;
  checkboxDesign?: string;
}

const CheckboxSelect: React.FC<CheckboxSelectProps> = ({
  label,
  onChange,
  defaultChecked = false,
  defaultValue = null,
  checkboxDesign = ''
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  const [value, setValue] = useState<string | null>(defaultValue);

  useEffect(() => {
    onChange({ label, checked, value });
  }, [checked, value]);

  return (
    <div className="flex items-center gap-4">
      <label className={`flex items-center gap-2 ${checkboxDesign}`}>
        <input
          type="checkbox"
          className="form-checkbox h-5 min-w-5 text-primary "
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <span className="text-primary font-medium">{label}</span>
      </label>

      <select
        className={`border rounded p-2 ${
          checked ? 'border-primary text-primary' : 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
        title='Seleccionar elemento'
        name='item-selector'
        disabled={!checked}
        required={checked}
        value={value ?? ''}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="" disabled>
          Seleccionar
        </option>
        <option value="Proximal">Proximal</option>
        <option value="Medio">Medio</option>
        <option value="Distal">Distal</option>
      </select>
    </div>
  );
};

export default CheckboxSelect;
