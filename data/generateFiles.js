const fs = require('fs');

const categories = ['cards', 'countr', 'personalaties'];
const numFiles = 3;
const numTimes = 2;

const data = [
  {
    "name": "Albert Einstein",
    "field": "Physics",
    "birth_year": 1879,
    "death_year": 1955
  },
  {
    "name": "Marie Curie",
    "field": "Chemistry",
    "birth_year": 1867,
    "death_year": 1934
  },
  {
    "name": "Nelson Mandela",
    "field": "Politics",
    "birth_year": 1918,
    "death_year": 1929
  }
];

for (let i = 1; i <= numTimes; i++) {
  categories.forEach((category) => {
    for (let j = 1; j <= numFiles; j++) {
      const filename = `${category}_${i}_${j}.json`;
      const content = JSON.stringify({
        category,
        fileNumber: j,
        data: data.map((entry) => ({
          ...entry,
          name: `${entry.name}_${i}_${j}`
        }))
      });
      fs.writeFileSync(filename, content);
    }
  });
}