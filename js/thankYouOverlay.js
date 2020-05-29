function addLinkPopup() {
  var emailValue = document.getElementById("composeText").value;
  var h = `
    <div class = thankYouOverlay id = ThankYouOverlay>
      <div class = thankYouContent id = ThankYouContent>
        <p class=maskOff>
          <span id=pp1>Hey You, it's LimboLane speaking.</span>
          <br>
          <span id=pp2>
          <br>Thank you.
          <br>Thank you for taking this journey with us. When we released Smile For Me, we never could have predicted the community that would form to support us. We watched in utter awe as tons of talented individuals wrote, played, sang, sewed, memed, cosplayed, drew, or otherwise expressed their love for the world we built. One year later, it's still hard to believe.
          </span>
          <br>
          <span id=pp3>
          <br>In the past year, you've shown us just how rewarding making games can be. Furthermore, you've shown us that when art is made with sincerity, fans will recognize that. Just as you all recognized and appreciated our sincerity, we wanted to recognize and thank you for yours.
          </span>
          <br>
          <span id=pp4>
          <br>So we made this site. We can't begin to fit every drawing, every meme, every kind word... but nevertheless, this website is for every last person who supported our passion project. And we wrote it with each of you in mind.
          </span>
          <br>
          <span id=pp5>
          <br>This is a love letter to sincerity, from the bottom of our hearts.
          <br>You make us smile
          </span>
          <br>
          <span id=pp6>
          <br>One more thing.
          </span>
          <br>
          <span id=pp7>
          <br>We would love to see what you had to say to the characters of The Habitat. Are you comfortable sharing with us the email you sent? In the future, we might post a few anonymously!
          </span>
          <br>
        </p>
        <form target="_blank" action="https://getsimpleform.com/messages?form_api_token=595f84ac752f7c4e3cb1dac816f453db" method="post">
          <input type='hidden' name='redirect_to' value='https:smilefor.us/thankyou.html'></input>
          <textarea style='display:none;' name='email' value='${emailValue}' tabIndex="-1"></textarea>
          <input type='text' style='display:none;' name='canShare' value='Consent to Sharing' tabIndex="-1"></textarea>
          <br>
          <p class=maskOff id=pp8>
            <input type='submit' value="Yes, forward to LimboLane! Sharing is ok." class=maskOff></input>
          </p>
        </form>
        <p class=maskOff id=pp9>
          <br>Or, if you want us to keep it private:
        </p>
        <form target="_blank" action="https://getsimpleform.com/messages?form_api_token=595f84ac752f7c4e3cb1dac816f453db" method="post">
          <input type='hidden' name='redirect_to' value='https:smilefor.us/thankyou.html'></input>
          <textarea style='display:none;' name='email' value='${emailValue}' tabIndex="-1"></textarea>
          <input type='text' style='display:none;' name='canShare' value='No Sharing' tabIndex="-1"></textarea>
          <br>
          <p class=maskOff id=pp10>
            <input type='submit' value="For LL's eyes only!" class=maskOff></input>
          </p>
        </form>
      </div>
    </div>
  `;
  var a = document.getElementById("emailParent");
  console.log(a);
  a.insertAdjacentHTML("afterend", h);
}


var framerate = 60

var openedTime = 0;

function fadeInThankYou() {
  addLinkPopup();
  openedTime = (new Date()).getTime() / 1000;
  window.setInterval(function(){
    updateOpacity();
  }, 1000 / framerate);
}

function updateOpacity() {
  thisFrameTime = (new Date()).getTime() / 1000;
  var prog = thisFrameTime - openedTime;

  var op1 = lerp(0, 1, (prog-2)/5);
  document.getElementById("ThankYouOverlay").style = `opacity: ${op1};`;

  for (var i = 0; i < 10; i++) {
    var p = (prog-(6+(4*i))) / 3;
    document.getElementById("pp"+(i+1)).style = `opacity: ${p};`;
  }

}
