const fs = require('fs');
const path = require('path');

const categories = ['cards', 'countr', 'personalities'];
const numFiles = 3;
const numTimes = 2;

for (let i = 1; i <= numTimes; i++) {
  categories.forEach((category) => {
    // Check if directory exists and get highest file number
    const dir = path.join(__dirname, `/${category}`);
    let fileNumber = 1;
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      if (files.length > 0) {
        const lastFile = files[files.length - 1];
        const lastFileNumber = parseInt(lastFile.split('_')[1]);
        if (!isNaN(lastFileNumber)) {
          fileNumber = lastFileNumber + 1;
        }
      }
    } else {
      fs.mkdirSync(dir);
    }

    for (let j = 1; j <= numFiles; j++) {
      const filename = `${category}_${fileNumber}_${j}.json`;
      const content = JSON.stringify({
        category,
        fileNumber,
        data: `This is file number ${j} for category ${category} in run ${i}`
      });
      fs.writeFileSync(path.join(dir, filename), content);
    }
  });
}