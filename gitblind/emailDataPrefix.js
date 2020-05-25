//Contains all the data for all of the emails in the thread


//An email objects has the following fields:
//
//sender          {string}
//              The id of the sender, used to get their full information from senderData.js
//text            {string}
//              The displayed text of the email
//attachments     {list of strings}
//              A list of attachment ids (can be blank) used to get their full information from attachments.js
//randomselection {integer}
//              USUALLY 0! The number of attachments to show RANDOMLY from the attachments list.
//              If 0, display all attachements in the list every time.
//eventID         {integer}
//              USUALLY 0! If greater than 0, the idea of the special hard-coded event that this line triggers.
//
var exampleEmail = {
  senderID: 'Kamal'
  ,text: 'This is a test email. Is this working? This should be generated on the fly!'
  ,attachments: ['test', 'test']
  ,randomselection: 0
  ,eventID: 0
}

var allEmails = [];
var emailsAdded = 0;

// Push a new email into the global array that will be iterated in the main loop
function email(senderID, text, attachments, randomselection, eventID) {
  var newemail = {
    senderID: senderID
    ,text: text
    ,attachments: attachments
    ,randomselection: randomselection
    ,eventID: eventID
  }
  allEmails[emailsAdded] = newemail;
  emailsAdded++;
}

// Python script generates all after me:
