// const bcrypt = require('bcrypt');

async function encrypt(password) {
    const salt = '123456'; //await bcrypt.genSalt(10);
    const hashed = salt + password; //await bcrypt.hash('1234', salt);
    return hashed;
};

async function compare(password, userPassword){
    const salt = '123456'; //await bcrypt.genSalt(10);
    const userPasswordHashed = salt + userPassword;
    
    return password === userPasswordHashed;
}

module.exports.encrypt = encrypt;
module.exports.compare = compare;
