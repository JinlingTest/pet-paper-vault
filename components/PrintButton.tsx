"use client";

export function PrintButton() {
  return (
    <button className="button primary" type="button" onClick={() => window.print()}>
      浏览器打印
    </button>
  );
}
