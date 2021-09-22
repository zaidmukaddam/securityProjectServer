// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to Crytpo Apps API crafted with love!',
    });
});
var userController = require('./controller/userController');

router.route('/asy/keys')
    .get(userController.getAll)
    .post(userController.create);

router.route('/asy/keys/:username')
    .get(userController.fineOne)

router.route('/asy/remove')
    .get(userController.removeAll)

// Export API routes
module.exports = router;