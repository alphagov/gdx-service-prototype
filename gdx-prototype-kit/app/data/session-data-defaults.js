/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {

  // dataset defaults
  "user": "Charlie",
  "dataset-name": "Death Events",
  "dataset-description": "This is a dataset based on an event driven architecture which publishes events representing deaths",
  "dataset-email-contact": "support@gro.gov.uk",
  "dataset-department": "GRO",
  "dataset-tags": ["Death", "Events"],
  "dataset-sensitivity": "High - for further information on what this means, visit <a href='#'>here</a>",
  "dataset-technical-requirements": "Events based technical protocol",
  "dataset-legal-ops-requirements": "TBC",
  "dataset-other-requirements": "TBC",
  "requesting-department": "HMRC",
  "requesting-department-email": "example@dwp.gov.uk",
  "request-date": new Date().toLocaleDateString("en-GB"),
  "dashboard-department": "DWP",


}
