const fs = require('fs');
const path = require('path');

const svgstore = require('svgstore');

let sprite = svgstore();
// путь к папке с svg иконками
const inputFolder = `./src/assets/icons`;

const getFilesFromFolder = (folder) => {
  return fs.existsSync(folder) ? fs
    .readdirSync(folder, {withFileTypes: true})
    .filter((item) => !item.isDirectory())
    .map((item) => {
      return {name: item.name, folder};
    }) : [];
};

const generateSprite = (outputPath = './src/assets/sprite.svg') => {
  const svgSprites = [...getFilesFromFolder(inputFolder)];
  svgSprites.sort((i1, i2) => i1.name.localeCompare(i2.name));

  svgSprites.forEach((file) => {
    sprite = sprite.add(file.name.split('.')[0], fs.readFileSync(path.join(file.folder, file.name), 'utf8'));
  });

  fs.writeFileSync(outputPath, sprite);
};

// путь, куда выгрузится sprite
generateSprite(`./public/sprite.svg`);

