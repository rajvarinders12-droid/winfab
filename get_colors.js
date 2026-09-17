const fs = require('fs');
const PNG = require('pngjs').PNG;

fs.createReadStream('final-logo.png')
    .pipe(new PNG())
    .on('parsed', function () {
        let colors = {};
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let idx = (this.width * y + x) << 2;
                let r = this.data[idx];
                let g = this.data[idx + 1];
                let b = this.data[idx + 2];
                let a = this.data[idx + 3];

                if (a < 50) continue; // ignore transparent
                let hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                colors[hex] = (colors[hex] || 0) + 1;
            }
        }
        let sorted = Object.keys(colors).sort((a, b) => colors[b] - colors[a]);
        console.log(sorted.slice(0, 20));
    });
