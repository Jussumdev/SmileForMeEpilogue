

// takes in an email object and appends the appropriate html to the main page
function initEmail(email) {
  document.getElementById("emailParent").innerHTML += generateEmailHTML(email);
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

function generateAllEmails() {
  console.log(allEmails.length+" emails loaded");
  for (var i = 0; i < allEmails.length; i++) {
    initEmail(allEmails[i]);
  }
}

addOnLoad(generateAllEmails);
