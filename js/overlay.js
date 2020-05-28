



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
// Parses the imagePopupData string from the clicked element and passes the relevant variables onto the openAttachmentWindow function
function openImageLink(el) {
  rawData = splitImagePopupData(
    el.getAttribute("data-imageData")
  );
  var imageName = rawData[0];
  var authorName = rawData[1];
  var imageLink = rawData[2];
  var authorLink = rawData[3];
  var path = rawData[4];
  populateAttachmentWindow(imageName, authorName, imageLink, authorLink);
  waitForFullImageLoad(path);
}

//================================================================================//


// Open the image overlay with
function populateAttachmentWindow(imageName, authorName, imageLink, authorLink) {
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
}

function waitForFullImageLoad(path) {
  var largeImage = document.getElementById("imagePopupImg");
  largeImage.onload = function() {
    resizeAttachmentWindow();
    openAttachmentWindow();
  }
  largeImage.src = "images/profiles/expanded/"+path;
}

function resizeAttachmentWindow() {
  var largeImage = document.getElementById("imagePopupImg");
  var imageAspect = largeImage.naturalWidth / largeImage.naturalHeight;
  var windowMoverWidth = window.innerWidth * 0.9;       //constant from .windowMover
  var windowMoverHeight = window.innerHeight * 0.7;
  var windowMoverAspect = windowMoverWidth / windowMoverHeight;
  var windowSizer = document.getElementById("windowSizer");
  var w, h, lr, tb; //width, height, left-right, top-bottom
  if (windowMoverAspect > imageAspect) {    // WindowMover is wider than the image
    h = 100;
    w = 100 * imageAspect / windowMoverAspect;
  } else {  // WindowMover is taller than the image
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

function toggleMusicWindow() {
  if (musicWindowOpen) {
    closeCurrentOverlay();
  } else {
    openMusicWindow();
  }
}

var timeOpened = "";

function openAttachmentWindow() {
  document.getElementById("popupBG").style.display = "inline";
  document.getElementById("windowMover").style.display = "inline";
  document.getElementById("ImageCredits").style.display = "inline";
  overlayOpen = true;
  timeOpened = (new Date()).getTime();
}
function openMusicWindow() {
  document.getElementById("musicTransform").style.display = "inline";
  document.getElementById("popupBG").style.display = "inline";
  musicWindowOpen = true;
  timeOpened = (new Date()).getTime();
}
function openComposeWindow() {
  document.getElementById("composeTransform").style.display = "inline";
  document.getElementById("popupBG").style.display = "inline";
  composeOpen = true;
}
function openRadio() {
  var writtenMail = document.getElementById("composeText").value.replace(/^\s+|\s+$/g,'');
  if (writtenMail == '') {return;}
  document.getElementById("radioParent").style.display = "inline";
  radioParentOpen = true;
}

function enableMusicWindow() {
  document.getElementById("musicTransform").style.display = "inline";
}


// Close
function closeCurrentOverlay() {
  if (overlayOpen) {
    overlayOpen = false;
    document.getElementById("windowMover").style.display = "none";
    document.getElementById("ImageCredits").style.display = "none";
    positionAttachmentWindowClosed();
    setLetterBobbingEnabled(false);
    document.getElementById("popupBG").style.display = "none";
  } else if (musicWindowOpen) {
    musicWindowOpen = false;
    document.getElementById("popupBG").style.display = "none";
  } else if (radioParentOpen) {
    radioParentOpen = false;
    //DON'T turn off the background
  } else if (composeOpen) {
    document.getElementById("composeTransform").style.display = "none";
    document.getElementById("popupBG").style.display = "none";
    composeOpen = false;
  }
}

function tryToConfirmRadio() {
  if( document.getElementById('canShare1').checked ||
      document.getElementById('canShare2').checked ||
      document.getElementById('canShare3').checked) {
    closeCurrentOverlay();
    closeCurrentOverlay();
  }
}

//==============================ATTACHMENT WINDOW UPDATE LOOP====================================//

var overlayAnimationLength = .5;
var overlayOpen = false;

var overlayTranslateX = -43;
var overlayTranslateY = -150;

var creditsTranslateY = 150;

var overlayRotate = 0;
var overlayEndRotation = 3;

function positionAttachmentWindow(dt, frameTime) {
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

function positionAttachmentWindowClosed() {
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

//==============================MUSIC WINDOW UPDATE LOOP====================================//

var musicWindowOpen = false;
var radioParentOpen = false;
var composeOpen = false;

var dict = {};

function positionCenteredElement(name, open, lowestTop, offsetCalc, dt) {
  if (dict[name+"_top"] == undefined) {dict[name+"_top"] = 100;}
  if (dict[name+"_Y"] == undefined) {dict[name+"_Y"] = 0;}
  var music = document.getElementById(name);
  var t = open ? 50 : lowestTop;
  dict[name+"_top"] = frameLerp(dict[name+"_top"], t, 0.0001, dt);
  var t2 = open ? -50 : 0;
  dict[name+"_Y"] = frameLerp(dict[name+"_Y"], t2, 0.0001, dt);
  var top = roundDecimals(dict[name+"_top"], 4);
  var transformY = roundDecimals(dict[name+"_Y"], 4);
  music.style["top"] = `calc(${top}% ${offsetCalc})`;
  music.style.transform = `translate(-50%,${transformY}%)`;
}





//Frames per second
var framerate = 60

var thisFrameTime = (new Date()).getTime()
var lastFrameTime = thisFrameTime

window.setInterval(function(){
  thisFrameTime = (new Date()).getTime()
  var dt = thisFrameTime - lastFrameTime
  lastFrameTime = thisFrameTime

  positionAttachmentWindow(dt, thisFrameTime);
  scrollWaveBorder(thisFrameTime);
  positionCenteredElement("musicTransform", musicWindowOpen, 100, '- 2em', dt);
  positionCenteredElement("composeTransform", composeOpen, 100, '', dt);
  positionCenteredElement("radioParent", radioParentOpen, 150, '', dt);

}, 1000 / framerate);



//=================================ON LOAD======================================//


function addLinkPopup() {
  var popupHTML = `
  <div class = linkPopupParent>

    <div class = popupBackground id = popupBG onclick = "closeCurrentOverlay()"></div>

    <div class = windowMover id = windowMover onclick = "closeCurrentOverlay()">
      <div class = windowSizer id = windowSizer onclick = "closeCurrentOverlay()">
        <div class = "screenBorder-Outset floatingWindow" style="background-color:var(--windows-background)">
          <div class = windowLabel onclick = "closeCurrentOverlay()">
            <p>Attachment Viewer v. 5.1.1
            </p>
          </div>
          <div class = imageContainer>
            <img class = "imagePopupImg insetBorders" id = imagePopupImg></img>
          </div>
        </div>
      </div>
    </div>

    <div class = musicTransform id = musicTransform onclick = "toggleMusicWindow()">
      <div class = "screenBorder-Outset floatingWindow musicWindowBackground">
        <div class = windowLabel>
          <p>Super Pedal Music Player v.9.e
          </p>
        </div>
        <div class = imageContainer>
          <div class = albumDataArea>
            <img class = "albumCover insetBorders" src = ""></img>
            <div class = "albumDataRight">
              <p>
                Platitudes
              </p>
            </div>
            <div class = "albumDataBottom">
              <p>
                Album: Test this stuff
                <br>Artist: Test this stuff
              </p>
            </div>
            <audio controls loop class="audioplayer">
              <source src="audio/platitudes.mp3" type="audio/mpeg">
              <!-- <source src="audiofile.ogg" type="audio/ogg"> -->
              <!-- fallback for non supporting browsers goes here -->
              <p>Your browser does not support HTML5 audio, but you can still
                 <a href="audio/platitudes.mp3">download the music</a> and listen along.</p>
            </audio>
          </div>
        </div>
      </div>
    </div>

    <div class = "composeTransform" id = composeTransform>
      <div class = "screenBorder-Outset floatingWindow composeWindowBackground">
        <div class = windowLabel onclick = "closeCurrentOverlay()">
          <p>What's new, flower child?
          </p>
        </div>
        <div class = "EmailComposeContent">
          <div class = "composeRecipients">
            <p> TO; everyone
            </p>
          </div>
          <form class="EmailForm" target="_blank" action="https://getsimpleform.com/messages?form_api_token=595f84ac752f7c4e3cb1dac816f453db" method="post">
            <input type='hidden' name='redirect_to' value='https://smileformegame.com'></input>
            <textarea id=composeText type='textarea' class="insetBorders" name='email' placeholder="Hey everyone... it's been a while.."></textarea>
            <div class="submitParent">
              <div type='' value='Send Email' class="outsetBorders button" style="float:right;" onclick="openRadio()">Send Email</div>
            </div>
            <div class="radioParent" id=radioParent>
              <p class=maskOff>
                Send a copy of your response to LimboLane?
                Some messages might be posted anonymously in the future.
              </p>
              <input type='radio' name='canShare' id='canShare1' value='yes' required></input>
                <label for="yes" class=maskOff>Sure!</label>
              <br>
              <input type='radio' name='canShare' id='canShare2' value='yesNoPost'></input>
                <label for="yesNoPost" class=maskOff>Send it, but please don't post!</label>
              <br>
              <input type='radio' name='canShare' id='canShare3' value='no'></input>
                <label for="no" class=maskOff>No thanks</label>
              <br>
              <p class=maskOff>
                <input type='submit' value='Confirm' class=maskOff onclick="tryToConfirmRadio()"></input>
                <a onclick="closeCurrentOverlay()">Keep editing</a>
              </p>
            </div>
          </form>
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
      <p class=maskOff>
        <span class = mobileHide>credit:&nbsp&nbsp&nbsp</span><a target = "_blank" id = imagePopupSourceLink></a>  &nbsp by&nbsp&nbsp&nbsp<a target = "_blank" id = imagePopupAuthorLink></a>
      </p>
    </div>

  </div>
  `
  document.body.innerHTML += popupHTML;
}

addOnLoad(addImageCreditsPopup);
