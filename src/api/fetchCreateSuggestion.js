// src/api/fetchCrateSuggestion.js

import mockLCASuggestions from "../component/mockData";

export function fetchRandomCrateSuggestion() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * mockLCASuggestions.length);
      resolve(mockLCASuggestions[randomIndex]);
    }, 1000);
  });
}
