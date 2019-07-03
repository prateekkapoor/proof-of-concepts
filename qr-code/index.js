const fs = require('fs');
const qrcode = require('qrcode');
const uuidv1 = require('uuid/v1');
const uuid = uuidv1();

/*run().catch(error => console.error(error.stack));

async function run() {
    const res = await qrcode.toString(uuid);

    fs.writeFileSync('./qr.html', `<img src="${res}">`);
    console.log('Wrote to ./qr.html');
}*/

qrcode.toFile('QR-code.png', uuid, {
    color: {
      dark: '#00F',  // Blue dots
      light: '#0000' // Transparent background
    }
  }, function (err) {
    if (err) throw err
    console.log('done')
  })
