const https = require('https');
const fs = require('fs');

https.get('https://zekepujols.eo.page/gkvwd', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    fs.writeFileSync('eo_page.html', data);
    console.log('Saved to eo_page.html');
  });
});
