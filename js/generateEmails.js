
var lastEmailSentBefore = false;

// takes in an email object and appends the appropriate html to the main page
function initEmail(email, speeding, lastEmail) {
  document.getElementById("emailCloser").insertAdjacentHTML('beforebegin',generateEmailHTML(email));
  bumpUpRecipient(email.senderID);
  handleEvent(email.eventID, speeding);
  if (lastEmail && lastEmailSentBefore) { //flower kid email
    updateEmailCloser(1);
    setDoneNotifDelay(3);
  } else if (lastEmail) {
    updateEmailCloser(1);
    setSendNotifDelay(6);
    lastEmailSentBefore = true;
  } else {
    updateEmailCloser(1);
    if (!speeding) {
      setNotifDelay(notifDelayFromText(email.text));
    }
  }
}

function notifDelayFromText() {
  return lerp(1, 10, text.length/500);
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

function setDoneNotifDelay(s) {
  setTimeout(function() {
    updateEmailCloser(3);
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
    case 3:
      html = `
      <span class=noNewMail>
        Free message limit reached
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
  recipientList.insertAdjacentHTML('afterbegin', genRecipientString(senderID, true));
}

function initRecipientList() {
  var recipientList = document.getElementById("recipientList");
  for (var senderID in senderDictionary) {
    recipientList.insertAdjacentHTML('beforeend',genRecipientString(senderID, false));
  }
}

function genRecipientString(senderID, spoken) {
  var sender = senderDictionary[senderID];
  var opacity = spoken ? 100 : 50;
  var name = spoken ? (sender.name+"<br>") : "";
  return `
  <span style="opacity:${opacity}%" id = recipientList${senderID}>
  ${name}
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
  t = t.replace('<i>','<span style="font-style: italic;">');
  t = t.replace('</i>','</span>');
  t = t.replace('<sh>','<span style="font-style: italic; opacity: 90%">');
  t = t.replace('</sh>','</span>');
  t = t.replace('<s>','<span style="font-style: italic;">');
  t = t.replace('</s>','</span>');
  t = t.replace('<playlist>','<a href="https://open.spotify.com/playlist/4U39LZliqZ8ISzBuhQG0n3?si=v8wyJZzVQqiOkiSW3XDtbg" target="_blank">Look at this one!</a>');
  t = t.replace('<zine>','<a href="https://twitter.com/smileformezine" target="_blank">The Smile For Me Zine</a>');
  t = t.replace('<letsplay>','<a href="https://www.youtube.com/watch?v=zTATKZUtKSw" target="_blank">SnapCube - Smile For Me</a>');
  t = t.replace('<platitudes>','<a onclick="openMusicWindow()">Platitudes_final_FINAL2.mus</a>');

  var emailHTML = fillTemplate(
    name=sender.name,
    subject=sender.email,
    profilesrc=sender.profPicSource,
    profileimgdata=generateImagePopupData(sender.profPicName, sender.profPicAuthor, sender.profPicLink, sender.profPicAuthorLink, 'images/profiles/Expanded/'+sender.profPicSource),
    hasProfilePic=sender.profPicName!='',
    text=t,
    attachmentHTML= generateAttachmentHTML(randomSelection(email.attachments, email.randomselection))
  );
  return emailHTML;
}

function randomSelection(list, num) {
  if (num==0) {return list;}
  var out = [];
  var start = Math.floor(Math.random() * list.length);     // returns a random integer from 0 to num-1
  for (var i=0;i<num;i++){
    out[i]=list[start+i];
  }
  return out;
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
