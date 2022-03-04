const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line


router.post('/request-access/check-answer', function (req, res) {

  var choice = req.session.data['approval-choice'];
  // Check whether the variable matches a condition
  if (choice == 'approve'){
    // Send user to next page
    res.redirect('/request-access/approved')
  } else if (choice == 'deny') {
    // Send user to ineligible page
    res.redirect('/request-access/denied')
  }
  else {
    res.redirect('/request-access/further-information')
  };

})

router.get('/', function (req, res) {
    res.redirect('/request-access')
})

router.get('/request-access/index', function (req, res) {
    res.redirect('/request-access')
})

router.get('/access-management/index', function (req, res) {
    res.redirect('/access-management')
})



module.exports = router
