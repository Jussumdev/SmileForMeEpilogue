//Contains all the data for all of the attachments which can appear in the emails


// Add new attachment objects here with UNIQUE ids
var test = {
name:             'Test Attachment'
,author:          'Teste McTester'
,sourceLink:      'google.com'
,authorLink:      'google.com'
,source:          'images/full/test.png'
}
var test2 = {
name:             'Test Attachment'
,author:          'Teste McTester'
,sourceLink:      'google.com'
,authorLink:      'google.com'
,source:          'images/full/test.png'
}

//Here, write an entry in the format:
//
//      "id_name" : id_name ,
//
var attachmentDictionary = {
  "test" : test,
  "test2" : test2,
}
