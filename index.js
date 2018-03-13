const express = require('express')
const app = express();
const PORT = process.env.PORT || 8080;


app.get('*', (req, res) => {
    res.send('Coucou')
})

app.listen(PORT, (err) => {
    if (err) {
        return console.log(`Error ${err}`)
    }
    console.log(`Server runnning on port ${PORT}`)
});

