import React from 'react';

/** Logo do Brasa: uma brasa com olhos (os olhos são furos, regra evenodd). */
export default function BrasaLogo({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="80 20 840 1160" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M 520 40 C 560 210 700 300 800 470 C 900 640 900 860 790 1000 C 700 1115 580 1160 500 1160 C 420 1160 300 1115 210 1000 C 100 860 110 680 200 560 C 240 505 290 470 320 400 C 360 470 370 540 400 590 C 410 420 450 210 520 40 Z M 453 860 A 48 72 0 1 1 357 860 A 48 72 0 1 1 453 860 Z M 643 860 A 48 72 0 1 1 547 860 A 48 72 0 1 1 643 860 Z"
        stroke="#000000"
        strokeWidth="15"
        strokeLinejoin="round"
        fillRule="evenodd"
        fill="#FF7F00"
      />
    </svg>
  );
}
