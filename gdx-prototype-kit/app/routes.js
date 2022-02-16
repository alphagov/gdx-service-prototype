const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line


router.post('/check-answer', function (req, res) {

  var choice = req.session.data['approval-choice'];
  // Check whether the variable matches a condition
  if (choice == 'approve'){
    // Send user to next page
    res.redirect('/approved')
  } else if (choice == 'deny') {
    // Send user to ineligible page
    res.redirect('/denied')
  }
  else {
    res.redirect('/further-information')
  };

})


module.exports = router
