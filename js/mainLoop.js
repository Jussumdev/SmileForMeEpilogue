
function generateAllEmails() {
  console.log(allEmails.length+" emails loaded");
  for (var i = 0; i < allEmails.length; i++) {
    initEmail(allEmails[i]);
  }
}

addOnLoad(generateAllEmails);
