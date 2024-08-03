const http = require('http');
const PORT = 3005;
const fs = require('fs');

const server = http.createServer((req, res) => {
    let log = `${Math.floor(Math.random() * 100)}:${req.url}\n`;

    fs.appendFile('log.txt', log, (err) => {
        if (!err) {
            console.log('File appended successfully');
        }
    });

    if (req.url == '/') {
        fs.readFile('log1.txt', 'utf-8', (err, data) => {
            if (!err) {
                
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Internal Server Error');
                return;
            }

            fs.appendFile('log1.txt', 'hyy', (err) => {
                if (err) {
                  
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Internal Server Error');
                    return;
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Hello IM Home...');
            });
        });

    } else if (req.url == '/about') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello IM About...');
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Page Not Found...');
    }
});

server.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server running on port ${PORT}`);
    }
});

