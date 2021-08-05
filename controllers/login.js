const login = async (collection, email, password) => {

  const filter = {
    'email': email,
    // 'password': password
    
  };

  let result = await collection
    .findOne(filter)
    // .toArray()
    .then(
      arrayData => {
        if (filter.email === arrayData.email && password === arrayData.password) {
          console.log(arrayData);
          return {
            'success': true
          }
        }else if(filter.email === arrayData.email && arrayData.password === ""){
          console.log(arrayData);
          return {
            'success': false,
            "setPassword": true
          }
          
        }
        return {
          'success': false
        }
      })
    .catch(() => {
      return {
        'success': false
      }
    });
  return result
}

module.exports = login;