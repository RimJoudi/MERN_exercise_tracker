const router = require('express').Router();
let User = require('../models/user.model'); // mongoose model we created

// first route the first endpoint that handels incoming http get requests on /users url path
router.route('/').get((req, res) => {
    User.find() // mongoose method give a list of all the users of mdb database
        .then(users => res.json(users)) // return the result of users in json format
        .catch(err => res.status(400).json('Error: ' + err));
});

// second endpoint handle the incoming http post requests
router.route('/add').post((req, res) => {
    const username = req.body.username;
  
    const newUser = new User({username});
  
    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;