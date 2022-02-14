const router = require('express').Router();
let Exercise = require('../models/exercise.model');
 // mongoose model we created

// first route the first in point that handels incoming http get requests on /users url path
router.route('/').get((req, res) => {
    Exercise.find() // mongoose method give a list of all the users of mdb database
        .then(exercises => res.json(exercises)) // return the result of users in json format
        .catch(err => res.status(400).json('Error: ' + err));
});

// second inpoint handle the incoming http post requests
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

//get an id(get info abt the exercise)
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise)) //once we get the exercise we return it in a json format
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete an id
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted. '))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update => find the current exercise and update it
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated! '))
                .catch(err => res.status(400).json('Error: ' + err));
        }) 
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
