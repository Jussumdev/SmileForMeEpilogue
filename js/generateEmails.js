

// takes in an email object and appends the appropriate html to the main page
function initEmail(email) {
  document.getElementById("emailCloser").insertAdjacentHTML('beforebegin',generateEmailHTML(email));
  bumpUpRecipient(email.senderID);
}

function updateEmailCount(count) {
  document.getElementById("messagesUsed").innerHTML=`${count}/150`; //TODO: real number
}

function bumpUpRecipient(senderID) {
  //move the recipient to the top of the list and make their name more visible
  var senderEl = document.getElementById(`recipientList${senderID}`);
  senderEl.remove();
  var recipientList = document.getElementById("recipientList");
  recipientList.insertAdjacentHTML('afterbegin', genRecipientString(senderID, 100));
}

function initRecipientList() {
  var recipientList = document.getElementById("recipientList");
  for (var senderID in senderDictionary) {
    recipientList.insertAdjacentHTML('beforeend',genRecipientString(senderID, 40));
  }
}

function genRecipientString(senderID, opacity) {
  var sender = senderDictionary[senderID];
  return `
  <span style="opacity:${opacity}%" id = recipientList${senderID}>
  ${sender.name} &lt${sender.email}&gt<br>
  </span>
  `;
}

// Takes in an email object and returns the html for that email
function generateEmailHTML(email) {
  var sender = senderDictionary[email.senderID];
  var emailHTML = fillTemplate(
    name=sender.name,
    subject=email.subject,
    profilesrc=sender.profPicSource,
    profileimgdata=generateImagePopupData(sender.profPicName, sender.profPicAuthor, sender.profPicLink, sender.profPicAuthorLink, sender.profPicSource),
    text=email.text,
    attachmentHTML=(email.attachments == null) ? "" : generateAttachmentHTML(email.attachments)
  );
  return emailHTML;
}

// Takes a list of attachment id strings in the form:
//
//        ["photoOfDog", "secondPhotoOfDog"]
//
// ...and generates a long html string that will be inserted into the email html template
//
function generateAttachmentHTML(attachmentIDs) {

  var attachmentPopupDatas = [];  //accumulator for image popup datas
  var attachmentHTML = ""; //accumulator for attachment html string

  for (var i = 0; i < attachmentIDs.length; i++) {
    var id = attachmentIDs[i];
    var attachment = attachmentDictionary[id];
    var imagePopupData = generateImagePopupData(
      attachment.name,
      attachment.author,
      attachment.sourceLink,
      attachment.authorLink,
      attachment.source
    );
    attachmentPopupDatas[i] = imagePopupData;

    attachmentHTML += fillAttachmentTemplate(attachment.source, attachmentPopupDatas[i]);
  }

  return attachmentHTML;
}
