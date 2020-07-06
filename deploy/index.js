const fs = require('fs');
const path = require('path');
const request = require('request');
const uploadUrl = 'http://localhost:3000/upload/';
const clearUrl = 'http://localhost:3000/upload/clear';

request(clearUrl, (err, httpResponse, body) => {
    if (err) {
        return console.error('upload failed:', err);
    }
    console.log('clean successfully');
    uploadFile(path.resolve(__dirname, '../dist'));
});

function uploadFile(distPath) {
    fs.readdir(distPath, (err, files) => {
        if (!err) {
            files.forEach(file => {
                const currentPath = path.join(distPath, file);
                if (!fs.statSync(currentPath).isDirectory()) {
                    const r = request.post(uploadUrl, (err, httpResponse, body) => {
                        if (err) {
                            return console.error('upload failed:', err);
                        }
                        console.log(body);
                    });
                    const form = r.form();
                    form.append('my_field', 'my_value');
                    form.append('dir', currentPath.replace(/\\/g, '/').split('/dist/')[1]);
                    form.append('data', fs.createReadStream(currentPath));
                } else {
                    uploadFile(currentPath);
                }
            });
        }
    });
}

