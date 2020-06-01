// A custom template/datastructure for tasks
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Task = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now()
	},
	important: {
		type: Boolean,
		default: true
	}
});

// We give model with name 'Task' a schema Task, defined above
// export default mongoose.model('Task', Task);
module.exports = Task = mongoose.model('Task', Task);
