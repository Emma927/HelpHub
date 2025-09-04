import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Lista folderów, w których będą szukane obrazy do konwersji
const folders = [
  'public/images/accessories',
  'public/images/children',
  'public/images/clothes_and_shoes',
  'public/images/food_hygiene_blanket',
  'public/images/homeless',
  'public/images/house_of_a_single_mother',
  'public',
  'src/assets',
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
        const inputPath = path.join(folder, file);
        const outputPath = path.join(
          folder,
          file.replace(/\.(jpg|png)$/, '.webp'),
        );

        sharp(inputPath)
          .webp()
          .toFile(outputPath)
          .then(() => {
            console.log(`Converted ${file} in folder ${folder}`);

            fs.unlink(inputPath, (err) => {
              if (err) console.error(`Nie udało się usunąć ${file}:`, err);
              else console.log(`Deleted original file: ${file}`);
            });
          })
          .catch(console.error);
      });
  });
});
