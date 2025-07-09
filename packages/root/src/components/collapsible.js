import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

export default function Collapsible({ label, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="collapsible">
      <button onClick={() => setIsOpen(!isOpen)} className="collapsible-toggle">
        <span className="toggle-label">{label}</span>
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>

      {isOpen && <div className="collapsible-content">{children}</div>}
    </div>
  );
}
