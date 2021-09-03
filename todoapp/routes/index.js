const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Naganaga6',
  database: 'todo_app100'
});

router.get('/', function (req, res, next) {
  connection.query(
    `select * from tasks;`,
    (error, results) => {
      console.log(error);
      console.log(results);
      res.render('index', {
        title: '買い物リストアプリ',
        todos: results,
      });
    }
  );
});

router.post('/', function (req, res, next) {
  connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return
    }
    console.log('success');
  });
  const todo = req.body.add;
  connection.query(
    `insert into tasks (content) values ('${todo}');`,
    (error, results) => {
      console.log(error);
      res.redirect('/');
    }
  );
});


router.post('/delete', function (req, res, next) { 
  connection.connect((err) => {
     if (err) {
       console.log('error connecting: ' + err.stack);
       return
     }
     console.log('success');
   });
   connection.query(
     'DELETE FROM tasks WHERE id=?',
     [req.body.id],
     (error, results) => {
       console.log(error);
       res.redirect('/');
     }
   );
 });
 

module.exports = router;