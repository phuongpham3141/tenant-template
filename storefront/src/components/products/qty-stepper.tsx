"use client";

import { useState } from "react";

/**
 * Quantity stepper — increment / decrement / direct input. Used on the
 * product detail page so the +/- buttons actually update a quantity.
 *
 * Server components can render this directly: just pass `defaultValue`
 * and (optionally) the form input `name` so the value gets POSTed when
 * the parent <form> is submitted.
 */
export function QtyStepper({
  defaultValue = 50,
  min = 1,
  max = 1_000_000,
  name = "qty",
}: {
  defaultValue?: number;
  min?: number;
  max?: number;
  name?: string;
}) {
  const [qty, setQty] = useState<number>(defaultValue);

  const clamp = (n: number) => Math.max(min, Math.min(max, Math.floor(n) || min));

  return (
    <div className="flex items-stretch border border-line rounded-sm">
      <button
        type="button"
        onClick={() => setQty((q) => clamp(q - 1))}
        className="px-3 text-mute hover:text-brand hover:bg-bg cursor-pointer disabled:opacity-40"
        disabled={qty <= min}
        aria-label="Giảm số lượng"
      >
        −
      </button>
      <input
        type="number"
        name={name}
        value={qty}
        onChange={(e) => setQty(clamp(parseInt(e.target.value, 10)))}
        min={min}
        max={max}
        className="w-16 text-center text-[13px] font-bold text-ink border-x border-line outline-none focus:bg-bg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label="Số lượng"
      />
      <button
        type="button"
        onClick={() => setQty((q) => clamp(q + 1))}
        className="px-3 text-mute hover:text-brand hover:bg-bg cursor-pointer"
        aria-label="Tăng số lượng"
      >
        +
      </button>
    </div>
  );
}
