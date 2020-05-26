var emailsOut = 0;

function getURLProgress() {
  //From https://www.sitepoint.com/get-url-parameters-with-javascript/
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.has('progress')) {
    return urlParams.get('progress');
  } else {
    // return 0;
    return allEmails.length;  //todo: TEMPORARY DEBUG
  }
}

function setURLProgress(progress) {
  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // urlParams.set('progress', progress)
  window.history.pushState("object or string", '', `index.html?progress=${progress}`);
}

function generateStartEmails() {
  prog = Math.min(getURLProgress(), allEmails.length)
  for (var i = 0; i < prog; i++) {
    newEmail(true);
  }
  updateEmailCloser(false);
  setNotifDelay(3);
}

function newEmail(speeding) {
  if (emailsOut >= allEmails.length) {
    return;
  }

  if (emailsOut==0) {
    initRecipientList();
  }

  initEmail(allEmails[emailsOut], speeding);
  updateEmailCount(emailsOut+1);
  emailsOut++;
  setURLProgress(emailsOut);
  window.scrollTo(0,document.body.scrollHeight);
}

addOnLoad(generateStartEmails);
