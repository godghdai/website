const express = require('express');
const path = require('path');
const app = express();
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(path.join(__dirname, "idiom.sqlite3"));

app.get('/search/:word', function(req, res) {
    db.all(`select * from idiom where name like '${req.params.word}%'`, function(err, rows) {
        res.send(rows);
    });

})

app.use(express.static(path.join(__dirname, 'public')));
app.listen(3389, () => {
    console.log(`App listening at port 3389`);
});