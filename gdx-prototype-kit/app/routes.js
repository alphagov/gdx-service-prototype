const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// Run this code when a form is submitted to 'user'
router.post('/user-answer', function (req, res) {

  var user = req.session.data['user'];
  var users = ["Charlie", "Kartheek", "James"];
  // Check whether the variable matches a condition
  if (users.includes(user)){
    // Send user to next page
    res.redirect('/dashboard')
  } else {
    // Send user to ineligible page
    res.redirect('/ineligible')
  }

})


router.get('/check-answer', function (req, res) {

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
