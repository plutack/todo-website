const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  taskTitle: String,
  isCompleted: { type: Boolean, default: false },
});

const Task = model('Task', taskSchema);

exports.connectToDB = async () => {
  let uri =
    'mongodb+srv://plutack:mathematics@cluster0.vmim43e.mongodb.net/<your-database>?retryWrites=true&w=majority';
  try {
    await mongoose.connect(uri);
    console.log('Connected to database');
  } catch (err) {
    console.log(`failed to connect to database: ${err}`);
  }
};

exports.savetoDB = async (newTask) => {
  let task = new Task({ taskTitle: newTask });
  try {
    await task.save();
    console.log('New task saved');
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

exports.retrieveDB = async () => {
  try {
    const taskList = await Task.find({});
    return taskList;
  } catch (err) {
    console.log(err);
  }
};
exports.deleteFromDB = async (taskID) => {
  try {
    await Task.findOneAndRemove({ _id: taskID });
    console.log('deletd sucessfully');
  } catch (err) {
    console.log(`error: ${err}`);
  }
};
