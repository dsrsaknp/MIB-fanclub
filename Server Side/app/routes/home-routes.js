module.exports = function (app, db) {
    app.get('/home/getAllPlayers', (request, response) => {
        db.collection('player').find().toArray(function (error, result) {
            result.length = 5;
            response.send(result)
        });
    });
    app.get('/home/getImages', function (request, response) {
        db.collection('Gallery').find().toArray(function (error, result) {
            
            
            result.length = 4;
            response.send(result);
        });
    });
    app.get('/home/getNews', function (request, response) {
        db.collection('News').find().toArray(function (error, result) {
            
            result.length = 5;
            response.send(result);
        });
    });
    app.get('/home/getRecentMatches', function (request, response) {
        db.collection('RecentMatches').find().toArray(function (error, result) {
            result.length = 3;
            response.send(result);
        });
    });
    app.get('/home/getCalender', function (request, response) {
        db.collection('Calendar').find().toArray(function (error, result) {
            result.length = 4;
            response.send(result);
        });
    });
    app.get('/home/getVideos', function (request, response) {
        db.collection('Video').find().toArray(function (error, result) {
            result.length = 4;
            response.send(result);
        });
    });

    
app.get('/calendar', (req, res) => {
    db.collection('Calendar').find({}).toArray((err, result) => {
        if(err) console.log(err);
        res.send(result);
    })
});

app.get('/pastMatches', (req, res)=> {
    db.collection('pastMatches').find().toArray((err, result) => {
        if(err) console.log(err);
        res.send(result);

    })

})

}