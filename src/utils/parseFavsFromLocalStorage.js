// Pobiera i zwraca ulubione ogłoszenia użytkownika z localStorage jako tablicę, używa pustej tablicy, jeśli brak danych. Dzięki użyciu operatora OR(lub)||, nawet jeśli localStorage nie zawiera danych (zwraca null lub undefined), metoda JSON.parse zawsze otrzymuje poprawną wartość do przetworzenia – w tym przypadku pustą tablicę '[]'. To sprawia, że ten zapis jest bezpieczny i nie powoduje błędów parsowania.
export function parseFavsFromLocalStorage(userId) {
  return JSON.parse(localStorage.getItem(`favs_${userId}`) || '[]');
}
