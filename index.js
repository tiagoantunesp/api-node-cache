const http = require('http');

const {
    routing
} = require('./routes');


const server = http.createServer((req, res) => {

    routing(req, res);

});

const port = 3000;

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});