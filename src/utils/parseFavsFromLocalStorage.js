// Pobiera ulubione ogłoszenia użytkownika z localStorage.
// localStorage.getItem(...) zwraca string lub null, jeśli klucz nie istnieje.
// JSON.parse konwertuje string do tablicy/obiektu. Jeśli dostanie null, wyrzuci błąd.
// Operator || '[]' zapewnia, że JSON.parse zawsze dostaje poprawny JSON (pustą tablicę),
// nawet gdy w localStorage nic nie ma.
// Dzięki temu zawsze otrzymujemy tablicę i unikamy błędów typu:
// TypeError: Cannot read properties of null (np. push, map itp.)
export function parseFavsFromLocalStorage(userId) {
  return JSON.parse(localStorage.getItem(`favs_${userId}`) || '[]');
}
