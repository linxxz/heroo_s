'use client';

import { useState } from 'react';

export default function ServicesChips({ chips, toolsLabel }) {
  const [i, setI] = useState(1);
  const c = chips[i];

  return (
    <div className="panel">
      <div className="chips" role="group">
        {chips.map((chip, idx) => (
          <button
            key={chip.label}
            type="button"
            className="chip"
            aria-pressed={idx === i}
            aria-controls="chip-detail"
            onClick={() => setI(idx)}
          >
            {chip.label}
          </button>
        ))}
      </div>
      <div id="chip-detail" className="chip-detail" aria-live="polite">
        <span className="chip-label">{c.label}</span>
        <p className="chip-text">{c.text}</p>
        <p className="chip-tools">{toolsLabel} <span className="accent">{c.tools}</span></p>
      </div>
    </div>
  );
}
