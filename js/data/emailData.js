//Contains all the data for all of the emails in the thread



//An email objects has the following fields:
//
//sender          {string}
//              The id of the sender, used to get their full information from senderData.js
//subject         {string}
//              The displayed subject line of the email
//text            {string}
//              The displayed text of the email
//
//      OPTIONAL:
//
//attachments     {list of strings}
//              A list of attachment ids (can be blank) used to get their full information from attachments.js
//randomselection {integer}
//              USUALLY 0! The number of attachments to show RANDOMLY from the attachments list.
//              If 0, display all attachements in the list every time.
//
var exampleEmail = {
  senderID: 'Kamal'
  ,subject: 'what is up'
  ,text: 'This is a test email. Is this working? This should be generated on the fly!'
  ,attachments: ['test', 'test']
  ,randomselection: 0
}
var exampleEmail_Simple = {
  senderID: 'Kamal'
  ,subject: 'what is up'
  ,text: 'This is a test email. Is this working? This should be generated on the fly!'
}

var allEmails = [];
var emailsAdded = 0;

// Push a new email into the global array that will be iterated in the main loop
function email(senderID, subject, text, attachments, randomselection) {
  var newemail = {
    senderID: senderID
    ,subject: subject
    ,text: text
    ,attachments: attachments
    ,randomselection: randomselection
  }
  allEmails[emailsAdded] = newemail;
  emailsAdded++;
}

// Add new email objects here
email (
  'Kamal'
  ,'what is up'
  ,'This is a test email. Is this working? This should be generated on the fly!'
  ,['test', 'test']
  ,0
);
email (
  'Kamal2'
  ,'what is up'
  ,'This is a test email. Is this working? This should be generated on the fly!'
  ,['test']
  ,0
);
email (
  'Kamal3'
  ,'what is up'
  ,'This is a test email. Is this working? This should be generated on the fly!'
  ,['test', 'test']
  ,0
);
email (
  'Kamal2'
  ,'what is up'
  ,'This is a test email. Is this working? This should be generated on the fly!'
  ,['test', 'test']
  ,0
);
email (
  'Kamal'
  ,'what is up'
  ,'This is a test email. Is this working? This should be generated on the fly!'
  ,['test', 'test']
  ,0
);
email (
  'Kamal'
  ,'what is up'
  ,'This is a test email. Is this working? This should be generated on the fly!'
  ,['test', 'test']
  ,0
);
email (
  'Kamal3'
  ,'what is up'
  ,'This is a test email. Is this working? This should be generated on the fly!'
  ,['test', 'test']
  ,0
);
email (
  'Kamal'
  ,'what is up'
  ,'This is a test email. Is this working? This should be generated on the fly!'
  ,['test', 'test']
  ,0
);
email (
  'Kamal2'
  ,'what is up'
  ,'This is a test email. Is this working? This should be generated on the fly!'
  ,['test', 'test']
  ,0
);
