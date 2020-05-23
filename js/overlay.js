



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
  var sourceA = document.getElementById("imagePopupSourceLink");
  sourceA.href = imageLink;
  sourceA.innerHTML = imageName;

  var authorA = document.getElementById("imagePopupAuthorLink");
  authorA.href = authorLink;
  authorA.innerHTML = authorName;

  AddNewBobElement(sourceA);
  AddNewBobElement(authorA);
  updateAllBobChars();
  setLetterBobbingEnabled(true);

  var largeImage = document.getElementById("imagePopupImg");
  largeImage.src = path;
  var imageAspect = largeImage.naturalWidth / largeImage.naturalHeight;
  resizeImageOverlay(imageAspect);
}

function resizeImageOverlay(imageAspect) {
  // Use image size to resize overlay
  var windowMoverWidth = window.innerWidth * 0.9;  //constant from .windowMover
  var windowMoverHeight = window.innerHeight * 0.7;

  // windowMoverWidth += 8;
  // windowMoverHeight += 100;

  var windowMoverAspect = windowMoverWidth / windowMoverHeight;

  var windowSizer = document.getElementById("windowSizer");

  var w, h, lr, tb; //width, height, left-right, top-bottom
  if (windowMoverAspect > imageAspect) {
    // WindowMover is wider than the image
    h = 100;
    w = 100 * imageAspect / windowMoverAspect;
  } else {
    // WindowMover is taller than the image
    w = 100;
    h = 100 * windowMoverAspect / imageAspect;
  }
  t = (100 - h);
  lr = (100 - w) / 2;

  var widthStr = `${w}%`;
  var heightStr = `${h}% + 8px + 1em + 0.2cm`;

  var paddingLRStr = `${lr}% - 4px`;
  var paddingTopStr = `${t}% - 8px - 1em - 0.2cm`;

  windowSizer.style = `
    width:calc(${widthStr});
    height:calc(${heightStr});
    padding:calc(${paddingTopStr}) calc(${paddingLRStr}) calc(${paddingLRStr});
  `;
}

var timeOpened = "";

function openImageOverlay() {
  // Make the overlay visible
  document.getElementById("imagePopup").style.display = "table";
  document.getElementById("ImageCredits").style.display = "table";
  overlayOpen = true;
  timeOpened = (new Date()).getTime();
}

// Close
function closeImageOverlay() {
  // Make the overlay invisible
  overlayOpen = false;
  document.getElementById("imagePopup").style.display = "none";
  document.getElementById("ImageCredits").style.display = "none";
  positionOverlayClosed();
  setLetterBobbingEnabled(false);
}



//=================================ON LOAD======================================//


function addLinkPopup() {
  var popupHTML = `
  <div class = linkPopupParent id = imagePopup>
    <div class = popupBackground onclick = "closeImageOverlay()"></div>
    <div class = windowMover id = windowMover>
      <div class = windowSizer id = windowSizer>
        <div class = "screenBorder-Outset" style="background-color:var(--windows-background)">
          <div class = windowLabel onclick = "closeImageOverlay()">
            <p>Attachment Viewer v. 5.1.1 (tap outside window to exit)
            </p>
          </div>
          <div class = imageContainer>
            <img class = "imagePopupImg insetBorders" id = imagePopupImg></img>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
  document.body.innerHTML += popupHTML;
}

addOnLoad(addLinkPopup);

function addImageCreditsPopup() {
  var popupHTML = `
  <div class = "ImageCredits" id = ImageCredits>

    <div style="width:100%;height:20px;background:none;padding:0px;margin:0px">
      <svg width="100%" height="20">
        <defs>
          <pattern id="wavePattern" x="0" y="0" width="160" height="100%" patternUnits="userSpaceOnUse">
            <path d="M 0 10 Q 40 -10 80 10 Q 120 30 160 10 L 160 20 L 0 20 Z" style="stroke: none;fill: black"></path>
          </pattern>
        </defs>

        <rect x="0" y="0" width="100%" height="100%" fill="url(#wavePattern)"></rect>
      </svg>
    </div>

    <div class = "ImageCreditsText">
      <p>
        credit:&nbsp&nbsp&nbsp<a target = "_blank" id = imagePopupSourceLink></a>  &nbsp by&nbsp&nbsp&nbsp<a target = "_blank" id = imagePopupAuthorLink></a>
      </p>
    </div>

  </div>
  `
  document.body.innerHTML += popupHTML;
}

addOnLoad(addImageCreditsPopup);

//==============================UPDATE LOOP====================================//

var overlayAnimationLength = .5;
var overlayOpen = false;

var overlayTranslateX = -43;
var overlayTranslateY = -150;

var creditsTranslateY = 150;

var overlayRotate = 0;
var overlayEndRotation = 3;

function positionOverlay(dt, frameTime) {
  if (overlayOpen) {
    //Move the main overlay
    var windowMover = document.getElementById("windowMover");
    overlayTranslateY = frameLerp(overlayTranslateY, -35, 0.0001, dt);
    windowMover.style.transform = `translate(${overlayTranslateX}%,${overlayTranslateY}%)`;

    overlayRotate = frameLerp(overlayRotate, overlayEndRotation, .005, dt);
    windowMover.style.transform += ` rotate(${overlayRotate}deg)`;

    //Move the attachment info window label
    var credits = document.getElementById("ImageCredits");
    creditsTranslateY = frameLerp(creditsTranslateY, 0, 0.0001, dt);
    credits.style.transform = `translate(0%,${creditsTranslateY}%)`;
  }
}

function scrollWaveBorder(frameTime) {
  document.getElementById("wavePattern").setAttribute('x', frameTime / 10 % 160);
}

function positionOverlayClosed() {
  overlayTranslateX = -43;
  overlayTranslateY = -150;
  windowMover.style.transform = `translate(${overlayTranslateX}%,${overlayTranslateY}%)`;

  var credits = document.getElementById("ImageCredits");
  creditsTranslateY = 150;
  credits.style.transform = `translate(0%,${creditsTranslateY}%)`;

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
  scrollWaveBorder(thisFrameTime);

}, 1000 / framerate);
