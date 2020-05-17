import express from 'express';
const Task = require('../models/task');
const router = express.Router();

/*
router.post('/', (req, res) => {

    let task = new Task(req.body);
	task
		.save()
		.then((task) => {
			res.status(200).json({ task: 'Added successfullyyyyyyyy' });
		})
		.catch((err) => {
			res.status(400).send('Failed to create new record');
		});
  });
*/

// Retrieve all tasks
router.route('/tasks').get((req, res) => {
	Task.find((err, tasks) => {
		if (err) console.log(err);
		else res.json(tasks);
	});
});

// Retrieve one specific task by id
router.route('/tasks/:id').get((req, res) => {
	Task.findById(req.params.id, (err, task) => {
		if (err) console.log(err);
		else res.json(task);
	});
});

// Post a new task
router.route('/tasks/add').post((req, res) => {
	let task = new Task(req.body);
	task
		.save()
		.then((task) => {
			res.status(200).json({ task: 'Added successfully :D' });
		})
		.catch((err) => {
			res.status(400).send('Failed to create new record');
		});
});

// Update existing task via post method
router.route('/tasks/update/:id').post((req, res) => {
	Task.findById(req.params.id, (err, task) => {
		if (!task) return next(new Error('Could not load document'));
		else {
			task.title = req.body.title;
			task.description = req.body.description;
			task.date = req.body.date;
			task.important = req.body.important;

			// saving task
			task
				.save()
				.then((task) => {
					res.json('Update done');
				})
				.catch((err) => {
					res.status(400).send('Update failed');
				});
		}
	});
});

// Delete certain task, found by id
router.route('/tasks/delete/:id').get((req, res) => {
	Task.findByIdAndRemove({ _id: req.params.id }, (err, task) => {
		if (err) res.json(err);
		else res.json('Remove successfully');
	});
});

module.exports = router;