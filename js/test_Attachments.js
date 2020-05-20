
//this is an override to lose the paperclip
function fillAttachmentTemplate(src, imgdata) {
return `
<div class = imgAttachment onclick = "openImageLink(this)" data-imageData = "${imgdata}">
  <img src="${src}" class = imgAttachIMG></img>
</div>
`
}


function test_createAttachmentFlexBoxes() {
  var html = "";

  for (var key in attachmentDictionary) {
    // check if the property/key is defined in the object itself, not in parent
    // from https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript
    if (attachmentDictionary.hasOwnProperty(key)) {
      html += generateAttachmentHTML([key]);
    }
  }

  document.getElementById("attachmentGrid").innerHTML = html;
}


addOnLoad(test_createAttachmentFlexBoxes);
