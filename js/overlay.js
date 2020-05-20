



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


// Splits an imagePopupData string into a list of its components
function splitImagePopupData(rawData) {
  rawData = rawData.split('_');
  return rawData;
}



//================================================================================//



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
  populateImageOverlay(imageName, authorName, imageLink, authorLink, path);
  openImageOverlay();
}

// Open the image overlay with
function populateImageOverlay(imageName, authorName, imageLink, authorLink, path) {
  // Populate image overylay fields
  document.getElementById("imagePopupImg").src = path;

  var sourceA = document.getElementById("imagePopupSourceLink");
  sourceA.href = imageLink;
  sourceA.innerHTML = imageName;

  var authorA = document.getElementById("imagePopupAuthorLink");
  authorA.href = authorLink;
  authorA.innerHTML = authorName;
}

var timeOpened = "";

function openImageOverlay() {
  // Make the overlay visible
  document.getElementById("imagePopup").style.display = "table";
  disableScroll();
  overlayOpen = true;
  timeOpened = (new Date()).getTime();
}

// Close
function closeImageOverlay() {
  // Make the overlay invisible
  overlayOpen = false;
  document.getElementById("imagePopup").style.display = "none";
  enableScroll();
  positionOverlayClosed();
}



//=================================ON LOAD======================================//


function addLinkPopup() {
  var popupHTML = `
  <div class = linkPopupParent id = imagePopup>
    <div class = popupBackground onclick = "closeImageOverlay()"></div>
    <div class = windowSizer id = windowSizer>
      <div class = "screenBorder-Outset" style="background-color:var(--windows-background)">
        <div class = windowLabel onclick = "closeImageOverlay()">
          <p>Attachment Viewer v. 5.1.1 (tap outside window to exit)
          </p>
        </div>
        <div class = imageContainer>
          <img class = "imagePopupImg insetBorders" id = imagePopupImg></img>
        </div>
        <div class = "outsetBorders imageContainerText">
          <p>
            attachment info:
            <br>name: <a target = "_blank" id = imagePopupSourceLink></a>
            <br>author: <a target = "_blank" id = imagePopupAuthorLink></a>
            <br>(links open in new tab)
          </p>
        </div>
      </div>
    </div>
  </div>
  `
  document.body.innerHTML += popupHTML;
}

addOnLoad(addLinkPopup);


//==============================UPDATE LOOP====================================//

var overlayAnimationLength = .5;
var overlayOpen = false;

var overlayTranslateX = -50;
var overlayTranslateY = -150;

var overlayRotate = 0;
var overlayEndRotation = 3;

function positionOverlay(dt, frameTime) {
  if (overlayOpen) {
    var windowSizer = document.getElementById("windowSizer");
    overlayTranslateY = frameLerp(overlayTranslateY, -50, 0.0001, dt);
    windowSizer.style.transform = `translate(${overlayTranslateX}%,${overlayTranslateY}%)`;

    overlayRotate = frameLerp(overlayRotate, overlayEndRotation, .005, dt);
    windowSizer.style.transform += ` rotate(${overlayRotate}deg)`;
  }
}

function positionOverlayClosed() {
  overlayTranslateX = -50;
  overlayTranslateY = -150;
  windowSizer.style.transform = `translate(${overlayTranslateX}%,${overlayTranslateY}%)`;

  //set up variables for the next time rotation begins to dampen
  overlayRotate = lerp(-20, 20, Math.random());
  overlayEndRotation = lerp(-2, 2, Math.random());
}


//Frames per second
var framerate = 60

var thisFrameTime = (new Date()).getTime()
var lastFrameTime = thisFrameTime

window.setInterval(function(){
  thisFrameTime = (new Date()).getTime()
  var dt = thisFrameTime - lastFrameTime
  lastFrameTime = thisFrameTime

  positionOverlay(dt, thisFrameTime);

}, 1000 / framerate);
