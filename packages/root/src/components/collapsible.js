import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

/**
 * Collapsible container that shows children when expanded.
 * Props:
 * - label: string
 * - children: ReactNode
 */
export default function Collapsible({ label, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-2">
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center bg-transparent border-none p-1 font-bold cursor-pointer focus:outline-none"
      >
        <span className="mr-2">{label}</span>
        {isOpen ? (
          <ChevronUpIcon className="w-4 h-4" />
        ) : (
          <ChevronDownIcon className="w-4 h-4" />
        )}
      </button>
      {isOpen && <div className="pl-4 mt-1">{children}</div>}
    </div>
  );
}
