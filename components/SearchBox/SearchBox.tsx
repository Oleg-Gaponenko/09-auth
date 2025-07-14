import { useState } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  const [searchNote, setSearchNote] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchNote(event.target.value);
    onChange(event.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={searchNote}
      onChange={handleChange}
    />
  );
}
