const fetch = require('./fetch');
const fs = require('fs');
const readline = require('readline');
const path = './data.json';
fetch.get('http://demo4657392.mockable.io/list-tag-ids', (err, res) => {
  if (err) {
    console.log(err);
  }
  fs.writeFile(path, JSON.stringify(res.student_id), { flag: 'w' }, function (
    error
  ) {
    if (error) throw error;
    // console.log('Updated!');
  });
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is student id ? ', function (id) {
  console.time('time to fetch student id');
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    }
    JSON.parse(data).forEach(e => {
      let key = Object.keys(e)[0];
      if (e[key] == id) {
        console.log(key);
        rl.close();
      }
    });
  });
});

rl.on('close', function () {
  console.timeEnd('time to fetch student id');
  process.exit(0);
});
