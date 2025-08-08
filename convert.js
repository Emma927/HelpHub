import sharp from 'sharp'; // sharp to popularna biblioteka Node.js do manipulacji obrazami. Umożliwia szybkie i efektywne przetwarzanie obrazów na serwerze.
import fs from 'fs'; // Moduł fs pozwala na interakcję z systemem plików na serwerze. Możesz używać go do odczytywania, zapisywania, aktualizowania i usuwania plików oraz katalogów.
import path from 'path'; //  Moduł path w Node.js służy do pracy ze ścieżkami plików i katalogów. Jest przydatny do manipulacji ścieżkami w sposób niezależny od systemu operacyjnego, co oznacza, że działa poprawnie zarówno na Windows, jak i na Unix/Linux.

const folders = [
  'public/images/accessories',
  'public/images/children',
  'public/images/clothes_and_shoes',
  'public/images/food_hygiene_blanket',
  'public/images/homeless',
  'public/images/house_of_a_single_mother',
];

folders.forEach((folder) => {
  fs.readdir(folder, (err, files) => {
    if (err) {
      console.error(`Błąd przy czytaniu folderu ${folder}:`, err);
      return;
    }

    files
      .filter((f) => f.endsWith('.jpg') || f.endsWith('.png'))
      .forEach((file) => {
        sharp(path.join(folder, file))
          .webp()
          .toFile(path.join(folder, file.replace(/\.(jpg|png)$/, '.webp')))
          .then(() => console.log(`Converted ${file} in folder ${folder}`))
          .catch(console.error);
      });
  });
});
