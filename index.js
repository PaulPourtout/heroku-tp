const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use('/api', require('./back/app.js'));

app.use('/', express.static(path.join(__dirname, 'front', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'build'));
})

app.listen(PORT, (err) => {
    if (err) {
        return console.log(`Error ${err}`)
    }
    console.log(`Server runnning on port ${PORT}`)
});

