function login(param, email, password){

    const filter = {
        'email': email, 
        'password': password
      };

    let data = param.find(filter, (cmdErr, result) => {
        assert.equal(null, cmdErr);
        console.log(result);
        return result;
      });
    //console.log(data);
    return data;
}

module.exports = login;