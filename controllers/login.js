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
            'exists': true,
            'success': true
          }
        }
        return {
          'exists': true,
          'success': false
        }
      })
    .catch(() => {
      return {
        'exists': false,
        'success': false
      }
    });
  return result
}

module.exports = login;