const login = async (collection, email, password) => {

  const filter = {
    'email': email,
    'password': password
  };

  let result = await collection
    .findOne(filter, { projection: { '_id': 0 } })
    // .toArray()
    .then(
      arrayData => {
        if (filter.email === arrayData.email && filter.password === arrayData.password) {
          return {
            'success': true
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