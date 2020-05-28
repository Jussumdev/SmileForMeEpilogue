

// takes in an email object and appends the appropriate html to the main page
function initEmail(email, speeding, lastEmail) {
  document.getElementById("emailCloser").insertAdjacentHTML('beforebegin',generateEmailHTML(email));
  bumpUpRecipient(email.senderID);
  handleEvent(email.eventID, speeding);
  if (lastEmail) {
    updateEmailCloser(1);
    setSendNotifDelay(3);
  } else {
    updateEmailCloser(1);
    if (!speeding) {
      setNotifDelay(3);
    }
  }
}

function setNotifDelay(s) {
  setTimeout(function() {
    updateEmailCloser(0);
  }, s * 1000);
}

function setSendNotifDelay(s) {
  setTimeout(function() {
    updateEmailCloser(2);
  }, s * 1000);
}


function updateEmailCloser(mode) {
  var html;
  switch(mode) {
    case 0:
      html = `
      <a class='' onclick='newEmail(false)'>
        <img class=inlineimg src='images/ui/newMail.gif'/> refresh ( 1 ) new message
      </a>
      `;
      break;
    case 1:
      html = `
      <span class=noNewMail>
        <img class=inlineimg src='images/ui/hourglass.gif'/> ( 0 ) new messages
      </span>
      `;
      break;
    case 2:
    html = `
    <span class='' onclick='openComposeWindow()'>
      <img class=inlineimg src='images/ui/new.gif'/> Compose new message
    </span>
    `;
      break;
    default:
      break;
  }
  document.getElementById("newMessage").innerHTML=html;
}

function updateEmailCount(count) {
  var remaining = allEmails.length - count + 1;
  document.getElementById("messagesRemaining").innerHTML=`${remaining}`;
}

function handleEvent(eventID, speeding) {
  switch(eventID) {
    case 1:
      if (speeding) {
        enableMusicWindow();
      } else {
        //TODO: player can not advance until musicWindowOpen = true
      }
      break;
    default:
      break;
  }
}


//==================================Recipient List====================================

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
    recipientList.insertAdjacentHTML('beforeend',genRecipientString(senderID, 20));
  }
}

function genRecipientString(senderID, opacity) {
  var sender = senderDictionary[senderID];
  return `
  <span style="opacity:${opacity}%" id = recipientList${senderID}>
  ${sender.name}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
  <span class="emailAddress">&lt${sender.email}&gt</span>
  <br>
  </span>
  `;
}


//====================================Generation======================================


// Takes in an email object and returns the html for that email
function generateEmailHTML(email) {
  var sender = senderDictionary[email.senderID];
  var t = email.text;
  t = t.replace('<song>','<a onclick="openMusicWindow()">platitudes.wav</a>');

  var emailHTML = fillTemplate(
    name=sender.name,
    subject=sender.email,
    profilesrc=sender.profPicSource,
    profileimgdata=generateImagePopupData(sender.profPicName, sender.profPicAuthor, sender.profPicLink, sender.profPicAuthorLink, sender.profPicSource),
    text=t,
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
      attachment.name.replace(' ', '&nbsp'),
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
