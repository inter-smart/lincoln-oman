"use client";

import { createContext, useContext } from "react";
import { Direction } from "radix-ui";

const LabelsContext = createContext({});

// Gives client leaves the common UI labels (carousel arrows, ...) and tells Radix the reading direction
// (dropdowns, menus and the sheet then align and animate from the right side in Arabic).
export default function I18nProvider({ dir, labels, children }) {
  return (
    <Direction.DirectionProvider dir={dir}>
      <LabelsContext.Provider value={labels}>{children}</LabelsContext.Provider>
    </Direction.DirectionProvider>
  );
}

export function useLabels() {
  return useContext(LabelsContext);
}
