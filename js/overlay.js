
// An imagePopupData string is in the form:
//
//    imageName_authorName_imageLink_authorLink_imagePath
//
// i.e.
//    displayed string, displayed string, href, href, local image path
//

//Creates the data string that will be attached to a clickable photo in html
function generateImagePopupData(imageName, authorName, imageLink, authorLink, imagePath) {
  var strings = [imageName, authorName, imageLink, authorLink, imagePath];
  strings = strings.join("_");
  return strings;
}



function splitImagePopupData(rawData) {
  rawData = rawData.split('_');
  return rawData
}

// Attach this to the onclick of an element that has a 'data-imagData' attribute in the form described above
//
// Parses the imagePopupData string from the clicked element and passes the relevant variables onto the openImageOverlay function
function openImageLink(el) {
  rawData = splitImagePopupData(
    el.getAttribute("data-imageData")
  );
  var imageName = rawData[0];
  var authorName = rawData[1];
  var imageLink = rawData[2];
  var authorLink = rawData[3];
  var path = rawData[4];
  openImageOverlay(imageName, authorName, imageLink, authorLink, path);
}


// Open
function openImageOverlay(imageName, authorName, imageLink, authorLink, path) {
  // Populate image overylay fields
  document.getElementById("imagePopupImg").src = path;

  var sourceA = document.getElementById("imagePopupSourceLink");
  sourceA.href = imageLink;
  sourceA.innerHTML = imageName;

  var authorA = document.getElementById("imagePopupAuthorLink");
  authorA.href = authorLink;
  authorA.innerHTML = authorName;

  // Make the overlay visible
  document.getElementById("imagePopup").style.display = "table";
  disableScroll()
}

// Close
function closeImageOverlay() {
  // Make the overlay invisible
  document.getElementById("imagePopup").style.display = "none";
  enableScroll();
}
