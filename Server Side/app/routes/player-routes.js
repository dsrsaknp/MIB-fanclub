module.exports = function(app, db, request) {
    // do not remove this method 

    // app.get('/play', (req, resp)=> {
    //     request('http://cricapi.com/api/playerStats/?pid=253802&&apikey=2a5NqdO0NldQu5laMoXhK5Sp6nn2', (err, res, body) => {
    //         if(err) console.log(err);
    //         else {
    //             console.log(body)
    //             var details = JSON.parse(body);
    //             db.collection('player').insert(details, (err, result) => {
    //                 if(err) console.log(err);
    //                 resp.send(true);
    //                 console.log(true);
    //             })
    //         }
    //     })
    // })

        // request('http://cricapi.com/api/playerStats/?pid=290716&&apikey=2a5NqdO0NldQu5laMoXhK5Sp6nn2', (err, res, body) => {
        //     if(err) console.log(err);
        //     else {
        //         console.log(body)
        //         var details = JSON.parse(body);
        //         db.collection('player').insert(details, (err, result) => {
        //             if(err) console.log(err);
        //             // resp.send(true);
        //             console.log(true);
        //         })
        //     }
        // })
 
    app.get('/allPlayers', (req, res) => {
        db.collection('player').find().toArray((err, result) => {
            if(err) console.log(err);
            res.send(result);
        })
    })


    app.get('/player/:id', (req, res) => {
        var pid = parseInt(req.params.id, 10);
        // console.log(typeof pid)
        obj = { 'pid': pid };
        // console.log(obj)
        db.collection('player').findOne(obj, (err, result) => {
            if (err) console.log(err);
            res.send(result);
            // console.log(result);
        })
    });



    //http://cricapi.com/api/playerStats/?pid=253802&&apikey=2a5NqdO0NldQu5laMoXhK5Sp6nn2




}