const user_routes = require("./user-routes.js");
const player_routes = require("./player-routes");
const about_routes = require('./about-routes');
const gallery_routes = require('./gallery-routes');
const home_routes = require('./home-routes');
const stories_routes = require('./stories-routes');
const store_routes = require('./store-routes');
const contest_routes = require('./contest-routes');

module.exports = function(app, db, request, mongo) {
    user_routes(app, db);
    player_routes(app, db, request);
    about_routes(app, db);
    gallery_routes(app, db);
    home_routes(app, db);
    stories_routes(app, db);
    store_routes(app, db, mongo);
    contest_routes(app, db, request);
};