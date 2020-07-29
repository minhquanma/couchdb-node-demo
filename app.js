const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const nano = require('nano')('http://admin:123456@localhost:5984')
const locationDB = nano.use('location');


// Follow changes from Couch db
const feed = locationDB.follow({since: "now", include_docs:true});

feed.on('change', (change) => {
    
    // change:  {
    //     seq: '41-g1AAAACbeJzLYWBgYMpgTmEQTM4vTc5ISXLIyU9OzMnILy7JAUklMiTV____PyuDOVEoFyjAbmqQYmGUaIhNAx5j8liAJEMDkPoPNU0cbJq5eaKhhYk5Nn1ZAGMaMGc',
    //     id: '96c05ceb-0fbf-4f2b-8fe4-9211ed3c8f90',
    //     changes: [ { rev: '1-354ac374e30188d40a4b05630907b45c' } ],
    //     doc: {
    //       _id: '96c05ceb-0fbf-4f2b-8fe4-9211ed3c8f90',
    //       _rev: '1-354ac374e30188d40a4b05630907b45c',
    //       userId: 'quanmm$userId',
    //       deviceId: 'quanmm$deviceId',
    //       create_at: '2020-07-29T08:31:33.277Z',
    //       latitude: 1.365734840045668,
    //       longitude: 103.91941860850035
    //     }
    //   }


    // change (deleted)
    // change:  {
    //     seq: '65-g1AAAACbeJzLYWBgYMpgTmEQTM4vTc5ISXLIyU9OzMnILy7JAUklMiTV____PyuDOVEmFyjAbmqQYmGUaIhNAx5j8liAJEMDkPoPNU0VbJq5eaKhhYk5Nn1ZAGlWMH8',
    //     id: 'abe0f2ec-6265-49b1-affd-f04358bd1dbc',
    //     changes: [ { rev: '2-ec9e2ea349fd868438108f1c770cd470' } ],
    //     deleted: true,
    //     doc: {
    //       _id: 'abe0f2ec-6265-49b1-affd-f04358bd1dbc',
    //       _rev: '2-ec9e2ea349fd868438108f1c770cd470',
    //       _deleted: true
    //     }
    //   }

    console.log("change: ", change);
});
  
feed.follow();
  
process.nextTick(() => {
    console.log('ticks')
    
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Working...');
})

app.listen(3333, () => {
    console.log('Server started.');
})