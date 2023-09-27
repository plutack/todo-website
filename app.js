// require neccessary packages
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const reload = require('reload');

// initialize express js instance
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('files'), bodyParser.urlencoded({ extended: true }));

// Define variables
const { Today } = require(path.join(__dirname, 'files/module/date.js'));
const { connectToDB, savetoDB, retrieveDB, deleteFromDB } = require(path.join(
  __dirname,
  'files/module/dbFunction.js'
));
const port = 3000

app.delete('/api/tasks/:taskID', async (req, res) => {
  let taskID = req.params.taskID;
  try {
    await deleteFromDB(taskID);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
  }
});

connectToDB();

app.get('/', async (req, res) => {
  let presentDate = Today();
  let taskList = await retrieveDB();
  res.render('homepage', { presentDate, taskList });
});

app.post('/', async (req, res) => {
  let newTask = req.body.newTask;
  await savetoDB(newTask);
  res.redirect('/');
});

app.listen(port, () => console.log(`server started on port ${port}`));
reload(app);
