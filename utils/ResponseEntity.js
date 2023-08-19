const {
    calculateHash
} = require('./hash');

module.exports = {
    responseOk(data, res) {

        res.writeHead(200, {
            'Content-Type': 'application/json',
            'cache-control': "max-age=10, must-revalidate",
            "etag": calculateHash(data)
        });

       
        res.end(JSON.stringify(data));

        return;
    },
    responseNotFound(res) {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.write('Data not found');
        res.end();

        return;
    }
};