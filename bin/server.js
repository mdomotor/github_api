if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

const app = require('../src/app');

const port = '3000';

app.listen(port, function () {
    console.log(`app listening on port ${port}`)
})