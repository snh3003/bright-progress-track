var axios = require('axios');


const thinkficApiCall = async (email) => {

  var config = {
    method: 'get',
    url: 'https://api.thinkific.com/api/public/v1/enrollments',
    headers: {
      'X-Auth-API-Key': 'd6b5f7a2908e2edd052478bfe0dd2dc3',
      'X-Auth-Subdomain': 'brightcourse',
      'Content-Type': 'application/json'
    }
  };

  let resp;
  await axios(config)
    .then(function (response) {
      var a = response.data.items.filter(item => item.user_email === email);
      if (a.length > 0) {
        resp = {
          exists: true,
          err: false
        }
      } else {
        resp = {
          exists: false,
          err: false
        }
      }
    })
    .catch(function (error) {
      resp = {
        exists: false,
        err: true
      }
    });
  return resp
}

const dbQuery = async (collection, filter) => {
  return await collection
    .findOne(
      filter,
      { projection: { '_id': 0, email: 1, password: 1 } }
    ).then(a => {
      a.exists = true
      return a
    })
    .catch(err => {
      return {
        exists: false
      }
    })
}

const login = async (collection, email, password) => {
  const filter = {
    'email': email,
    // 'password': password
  };

  let thinkficResponse = await thinkficApiCall(filter.email)
  console.log(thinkficResponse);
  // check if email exists in thinkfic
  if (thinkficResponse.exists === true) {
    // query email in db
    var inDB = await dbQuery(collection, filter)
    // check if email exists in db
    if (inDB.exists) {
      // check if password in empty string
      if (inDB.password === '') {
        console.log('1', inDB.password, password);
        // update with given password
        let update = await collection.findOneAndUpdate(filter, { $set: { password } })
        // say that user exists in db
        return {
          exists: true,
          setPassword: false
        }
      } else if (inDB.password === password) {
        console.log('2', inDB.password, password);
        // if password was same
        return {
          exists: true,
          success: true
        }
      } else {
        console.log('3', inDB.password, password);
        // if email does not exist in db
        // insert a new email user with empty password
        await collection.insertOne({ email, password: '' })
        // say that user exists and ask to set password
        return {
          exists: true,
          setPassword: true
        }
      }
    }
  }
  // console.log('4', inDB.password, password);
  // in case email does not exist in thinkfic
  return {
    exists: false,
    inThinkfic: false
  }
}

module.exports = login;