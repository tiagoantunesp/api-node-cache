const {
    createHash
} = require('crypto');


module.exports = {
    calculateHash(str) {

        str = JSON.stringify(str);

        const hash = createHash('sha256');
        hash.update(str);
        return hash.digest('hex');
    }
};