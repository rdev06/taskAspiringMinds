const http = require('http');
const https = require('https');
class Fetch {
  get(url, cb) {
    let target = url.split('://');
    let uri = target[1].split('/');
    let req = eval(target[0]).get(
      {
        host: uri[0],
        path: `/${uri.slice(1, uri.length).join('/')}`
      },
      res => {
        let chunk = [];
        res
          .on('data', chk => chunk.push(chk))
          .on('end', () => {
            let body = Buffer.concat(chunk);
            cb(null, JSON.parse(body));
          });
      }
    );
    req.on('error', err => {
      cb(err, null);
    });
  }
}

module.exports = new Fetch();
