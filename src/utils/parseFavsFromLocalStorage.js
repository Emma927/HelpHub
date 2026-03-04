/**
 * Safely reads user favorites from localStorage.
 * Returns an empty array if data is missing or invalid to prevent app crashes.
 */
export function parseFavsFromLocalStorage(userId) {
  try {
    const data = localStorage.getItem(`favs_${userId}`);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];  // Safe fallback if stored value is invalid JSON
  }
}
