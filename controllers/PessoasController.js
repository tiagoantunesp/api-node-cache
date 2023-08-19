const {
  responseOk,
  responseNotFound
} = require('../utils/ResponseEntity');

const {
  calculateHash
} = require('../utils/hash');

const data = require('../entities/pessoas.json');

module.exports = {
  get(req, res) {

    if (req.headers['if-none-match'] === calculateHash(data)) {
			res.writeHead(304);
			res.end();
			return;
		}

    responseOk(data, res);
  },
  find(req, res) {
    
    const result = data.find(entity => entity.id === req.params.id);

    if (result) {

      if (req.headers['if-none-match'] === calculateHash(result)) {
        res.writeHead(304);
        res.end();
        return;
      }

      responseOk(result, res);
      
    } else {
      responseNotFound(res);
    }
  }
};