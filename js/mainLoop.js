var emailsOut = 0;

function getURLProgress() {
  //From https://www.sitepoint.com/get-url-parameters-with-javascript/
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.has('progress')) {
    return urlParams.get('progress');
  } else {
    return 0;
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
  if (prog==0) {
    updateEmailCloser(1);
    setNotifDelay(3);
  } else {
    for (var i = 0; i < prog-1; i++) {
      newEmail(true);
    }
    newEmail(false);
  }
}

function newEmail(speeding) {
  if (emailsOut >= allEmails.length) {
    return;
  }
  var lastEmail = (emailsOut == allEmails.length - 1);

  if (emailsOut==0) {
    initRecipientList();
  }

  initEmail(allEmails[emailsOut], speeding, lastEmail);
  updateEmailCount(emailsOut+1);
  emailsOut++;
  if (!speeding) {
    setURLProgress(emailsOut);
  }
  window.scrollTo(0,document.body.scrollHeight);
}

addOnLoad(generateStartEmails);
