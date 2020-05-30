function addLinkPopup() {
  var emailValue = document.getElementById("composeText").value;
  var h = `
    <div class = thankYouOverlay id = ThankYouOverlay>
      <div class = thankYouContent id = ThankYouContent>
        <p class=maskOff>
          <span id=pp1>Hey You, it's LimboLane speaking.</span>
          <br><br>
          <span id=pp2>Thank you.</span>
          <br><br>
          <span id=pp3>Thank you for taking this journey with us.</span>
          <span id=pp4>When we released Smile For Me, we never could have predicted the community that would form to support us.</span>
          <br><br>
          <span id=pp5>You wrote, played, sang, sewed, memed, cosplayed, drew, or otherwise expressed your love for the habitat and it's denizens.</span>
          <span id=pp7>One year later, it's still hard to believe.</span>
          <br><br>
          <span id=pp8>In the past year, you've shown us that when art is made with sincerity, people will recognize that.</span>
          <span id=pp9>Just as you all recognized and appreciated our sincerity, we wanted to recognize and thank you for yours.</span>
          <br><br>
          <span id=pp10>So we made this site. We can't begin to fit every drawing, every meme, every kind word...
          but nevertheless, this website is written for every last person who supported our passion project.</span>
          <span id=pp11>This is a love letter to sincerity, from the bottom of our hearts.</span>
          <br><br>
          <span id=pp13>Now, more than ever, it is critical that you bring your integrity to everything you do.</span>
          <span id=pp14>Continue to appreciate the sincerity in others, and make your voice heard in its most earnest form.</span>
          <span id=pp16>We're absolutely sure that you will.</span>
          <br><br>
          <span id=pp18>You make us smile</span>
          <br><br>
          <span id=pp19>One more thing.</span>
          <br><br>
          <span id=pp20>
          We would love to see what you had to say to the characters of The Habitat. Are you comfortable sharing with us the email you sent? It may be anonymously posted.
          </span>
          <br>
        </p>
        <form target="_blank" action="https://getsimpleform.com/messages?form_api_token=595f84ac752f7c4e3cb1dac816f453db" method="post">
          <input type='hidden' name='redirect_to' value='https:smilefor.us/thankyou.html'></input>
          <textarea style='display:none;' name='email' value='${emailValue}' tabIndex="-1"></textarea>
          <input type='text' style='display:none;' name='canShare' value='Consent to Sharing' tabIndex="-1"></textarea>
          <br>
          <p class=maskOff id=pp21>
            <input type='submit' value="Yes, forward to LimboLane! Sharing is ok." class=maskOff></input>
          </p>
        </form>
        <p class=maskOff id=pp22>
          <br>Or, if you want us to keep it private:
        </p>
        <form target="_blank" action="https://getsimpleform.com/messages?form_api_token=595f84ac752f7c4e3cb1dac816f453db" method="post">
          <input type='hidden' name='redirect_to' value='https:smilefor.us/thankyou.html'></input>
          <textarea style='display:none;' name='email' value='${emailValue}' tabIndex="-1"></textarea>
          <input type='text' style='display:none;' name='canShare' value='No Sharing' tabIndex="-1"></textarea>
          <br>
          <p class=maskOff id=pp23>
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

  for (var i = 0; i < 25; i++) {
    var e = document.getElementById("pp"+(i+1));
    if (e == null) {continue;}
    var p = (prog-(6+(3.5*i))) / 3;
    var d = (p > 0) ? 'block' : 'none';
    e.style = `opacity: ${p}; display: ${d}`;
  }

}
