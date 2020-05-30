//Contains all the data for all of the emails in the thread


//An email objects has the following fields:
//
//sender          {string}
//              The id of the sender, used to get their full information from senderData.js
//text            {string}
//              The displayed text of the email
//attachments     {list of strings}
//              A list of attachment ids (can be blank) used to get their full information from attachments.js
//randomselection {integer}
//              USUALLY 0! The number of attachments to show RANDOMLY from the attachments list.
//              If 0, display all attachements in the list every time.
//eventID         {integer}
//              USUALLY 0! If greater than 0, the idea of the special hard-coded event that this line triggers.
//
var exampleEmail = {
  senderID: 'Kamal'
  ,text: 'This is a test email. Is this working? This should be generated on the fly!'
  ,attachments: ['test', 'test']
  ,randomselection: 0
  ,eventID: 0
}

var allEmails = [];
var emailsAdded = 0;

// Push a new email into the global array that will be iterated in the main loop
function email(senderID, text, attachments, randomselection, eventID) {
  var newemail = {
    senderID: senderID
    ,text: text
    ,attachments: attachments
    ,randomselection: randomselection
    ,eventID: eventID
  }
  allEmails[emailsAdded] = newemail;
  emailsAdded++;
}

// Python script generates all after me:
email('Kamal',"Hey gaaang. It's been a minute, huh? What, about a year since, yeah? Yeah. Somethin' like that. Nuts stuff.<br>Anyways, uh, I just thought I'd check in with everyone.",[],0,0);email('Kamal',"Me? I've been doing pretty gooooood. I've been taking a break to do some hobbies (bike riding, painting those cool lil robot sets) before I get back into the dental stuff. ;-) Maybe we all need a break from dental stuff. Am I right?!?! Haha. Uh. Just kidding. Please don't neglect those pearly whites.",[],0,0);email('Kamal',"Shoot, I'm rambling. Lol<br>Uh...",[],0,0);email('Marv',"E",['marvfish'],0,0);email('Kamal',"Thank you Marv, for that. Very classic.<br>Well since I've gathered everyone's emails, how are we all doing? I've been, er, thinking about you all.",[],0,0);email('Randy',"Greetings and Salutations, Kamal, and fellow friends! Hoho! What a lovely day to reminisce upon times past!!<br>Marvin, I must thank you for bequeathing the wonderful fish photograph- I can practically smell her through my monitor. Simply glorious, yes indeed!",[],0,0);email('Kamal',"Randy! Long time no... smell? Smell.",[],0,0);email('Kamal',"Who else is online? Hellooooo?",[],0,0);email('Questionette',"<i>Ramdi-o, et see wall set frank pool...? :-//</i>",[],0,0);email('Randy',"What has Randy been ''''up to'''' you ponder? I have been workshopping my poetry day in and day out, perfecting my odes to smells, life, and love. Believe it or not, I have a small book of my works published- Randy, In the Real. I'm sure you all received my various promotional emails, yes yes!<br>I have attached some -exclusive- poetry here for you all to witness! I hope you all enjoy.",['randypoem'],0,0);email('Mirphy',"Hey gang! It's been too long! Happy to hear from you all.<br>Randy, I actually did get those promo emails. I'm glad you're chasing your dreams. Sign me up for a copy!",[],0,0);email('TimTam',"I have copy. got free.",[],0,0);email('Randy',"Ah? But Tim Tam, my books are unfortunately not free! As much as I would love to bequeath the world with volumes of free art, book stores are carrying my work for the reasonable reasonable price of ",[],0,0);email('Randy',"Wait. I get it now.",[],0,0);email('Mirphy',"Ah, yes. hello Tim Tam.",[],0,0);email('Putunia',"TIJM TAM!!! WJATJ FIFD TELL YOIU?? YOU ENEED JTTO BE NIVCE. I WJYANT TO STYEAL TOO SOMTIMES BTU ATJ LIEAST I KPEEP IT TO MYSEFL.",[],0,0);email('Gillis',"Dear Randy:<br>...um, hey Randy w. what happened to the poem w. where I'm totally beating up giant dinosaurs and the president...something totally cool...and you wrote my muscles all huge. Can you read it to me again please okay<br>-Gillis",[],0,0);email('Millie',"Yo Gillis we can read this.",[],0,0);email('Gillis',"OH NO now everyone knows...Randyyyyyyyyyyyyyyyyy. Raaaandyyyy.<br>Aghhhhhhh I can never talk to anyone againnn I'm gonna hide under my beedddd<br>Randy text me",[],0,0);email('Millie',"Adults r gross.",[],0,0);email('TimTam',"^",[],0,0);email('Millie',"I'm gettign me mallet",[],0,0);email('TimTam',"^ ^ ^",[],0,0);email('Mirphy',"Oh Gillis don't worry, we all knew already :)",[],0,0);email('Jerafina',"Every1 knows, Mister Soco. Ur so silly Gilly. Lolololol. Take a chill pill you cuteypants, relax.<br>& B-have children...I'll see u in class on Monday...Tim Tam plz stop bringing sewer rats 2 show and tell.",[],0,0);email('Jimothan',"My god! Why, this is the reason I say kids should stay off the net 'till they're older. These 'uns are so misbehaved. What is Millie, 7, 8 years old? It's no good, I tell you what.",[],0,0);email('Millie',"Buzz off twerp I'm like 10",[],0,0);email('Jimothan',"My apologies; 10 years old.",[],0,0);email('Millie',"Buzz off twerp I'm like 12",[],0,0);email('Dallas',"Heeyyy you allll. Not to change the topic, but look at this puurdy little painting of me. Any idea who made it? I totally got this little doodad in the mail yesterday. It's shockingly, stunningly accurate to my groovy visage, if I dooo say so myself.",['dallas'],0,0);email('Parsley',"Hey Dallas, I had the same question. I've been getting letters TOO? With drawings of ME? WHO did this? Should we SUE for using our likenesses and EXPOSING our secrets??? OUR LIVES??? HOW DO THEY EVEN KNOW THESE THINGS?!? ",['parsley1', 'parsley2', 'parsley3'],0,0);email('Mirphy',"Well first of all, calm down.",[],0,0);email('Parsley',"ok I'm calm.",[],0,0);email('Mirphy',"Second of all, I think I know. It all comes back to our friend the flower kid. Apparently, since they left the Habitat, they've been spreading the story all around. They've told the world about what went on at the Habitat, and all the people they met (US!).",[],0,0);email('Lulia',"Yes, believe it or not, the flower child has been spreading the tale of the Habitat. In my star-studded travels across boulevards and red carpets, I've heard bountiful gossip. The tale has spread from person to person... to celebrity. To person.",[],0,0);email('Jimothan',"The kid did 'hwat now? That lil' scamp wasn't much of a gabber.",[],0,0);email('Mirphy',"They wrote a memoir, actually, and shared it all around. Look at this, it's about us! ALL of us!<br><br><zine>",[],0,0);email('Wallus',"They even remembered...me...oh...",[],0,0);email('Nat',"who are you?",[],0,0);email('Parsley',"....<br>....Ok I looked through it all and. I mean. It's kind of beautiful...and...uh...I might be crying actually. Oh my god? Ok. No suing. If anyone's sued anything it's my HEART. AGH. Sniff...",['parsley4'],0,0);email('Mirphy',"Let it out, parsley.",[],0,0);email('Kamal',"Oh... I heard rumors about that. Let me take a quick look.",[],0,0);email('Kamal',"OH... -SNIFF",['kamal5'],0,0);email('Mirphy',"LET IT OUT KAMAL.",[],0,0);email('Mirphy',"there's even forums on places like neocities. I'm not much of an internet person... maybe one of you can check things out. ",[],0,0);email('Millie',"You didn't know? I'm only 7 & an internet master. We r the talk of the town baybe. And check thiz out. A dramatic retellin' of our story by someone named ''''Penny''''. Look at it. Iz SHOCKingly accurate.<br><br><letsplay>",[],0,0);email('Jerafina',"O-M-G She called me prettyyyy... ;))))): )",[],0,0);email('Lulia',"I'll call you pretty<br><br>Just say the word<br><br>Please.",[],0,0);email('Millie',"It's MALLET time",[],0,0);email('Gerry',"Oh no'z, my ...buzsiness endeavahs... retold across da countree... I'm gonna hafta go inta hidin.",['gerry'],0,0);email('Kamal',"You'll uh, be okay, Gerry. Yeah.<br>Anywho. Mirphy, I've been browsin' the sites...it looks like there are even... it looks like a big ol' group of people were even throwin' events. Week-long sorts of things. Making TONS of art of us all?! That's nuts. That's dedication.",['kamal1', 'kamal2', 'kamal3', 'kamal4'],0,0);email('Dallas',"Whoaaaaaaaa. No kidding... this art is soooo chill... and there's sooo much.<br>Heh, I bet I could totalllllyy participate in these. All I gotta do is paint a picture of myself.",[],0,0);email('Kamal',"Dallas, do you know how to use a scanner?",[],0,0);email('Dallas',"A what?",[],0,0);email('Wallus',"Hey... you all.<br>I uh also have something to share.<br>Since I came out of hiding, I've discovered that there is NEW music? In fact, there's a bunch of it. I didn't get to listen to any new albums when I was<br>Well<br>living in a wall.<br>But look, people have put together mixtapes suiting our story. They're wonderful...<br><playlist>",[],0,0);email('Trencil',"My word. I feel so incredibly... how shall I say it... <i>honored and humbled</i> by all of this. These past months are <i>surely</i> some of the most memorable in my countless centuries of living.",[],0,0);email('Ronbo',"Your honkin' <i>what</i>?",[],0,0);email('Trencil',"OH! It was... it was a mere slip of the tongue.<br>Nothing more.",[],0,0);email('Trencil',"...<br>Oh, how dreadful, I may have exposed myself.",[],0,0);email('Trencil',"Well, I suppose this is as good as a moment as any.",[],0,0);email('Trencil',"Everyone, I gathered you all here to make a confession. I, Trencil Varnnia, am a vampire. I have attached evidence to demonstrate.",['trencil'],0,0);email('Jimothan',"We know, son.",[],0,0);email('Mirphy',"Yeah, We know, Trencil. It's... SO obvious.",[],0,0);email('Kamal',"Also? You didn't gather us here, I did.",[],0,0);email('Trevor',">:V WHAT HAVE I BEEN TELLING YOU GUYSSSS. VAMPIRE!! SEE!! YAAAAGH.",[],0,0);email('Wallus',"Yes, yes you have been saying that. You never shut your yap in the boilers. I was held prisoner (by myself) and I spent all day watching you and your...your ramblings. Your every thought *sob*",[],0,0);email('Trevor',"...you're a PSYCHIC?!??!?!?!??!",[],0,0);email('Mirphy',"Ahem.",[],0,0);email('Mirphy',"Another thing, the flower kid's journeys have continued since they left the Habitat.<br>They've gone on to meet a whole variety of new people.<br>They've kept my old camera, and they take photos of each new person they meet... they've been sending me big letters full of photos!",[],0,0);email('Mirphy',"Check it out.<br>I just grabbed a random handful, but there are HEAPS more. The flower kid is making a ton of new friends!",['Emmy Brujita', 'Scout Skotch', 'Kayfoo Toodle', 'Alphonse Youminium', 'Eddie Ponaire', 'Gala Cos', 'Big Iron', 'Shiloh Crowley', 'Hendrick Pogram', 'Cher Riffer', 'Zipp Tramplin', 'Shayla Berke', 'Marro Skavenge', 'Luna E Clipse', 'Gourdo Pulaski', 'Rope Bardot', 'Sid Queuepid', 'Greg Robert', 'Deanna Keyes', 'Bridgette Fabbris', 'Maren Slip', 'Stellar Bello', 'Wilton Wazee', 'Percival Podsnappery', 'JoojDraws', 'Eggo Fekshun', 'Unnamed Photo'],6,0);email('Parsley',"My eyes are making that... ''''liquid'''' again...",[],0,0);email('Jimothan',"That's right, son! Be open with your emotions.",[],0,0);email('Mirphy',"The flower kid has grown a lot. In their letters to me, they tell me all about their life and the new people they're meeting.<br>All about how they've been using the lessons they learned at the Habitat to help themself and others.<br>They've really found their place. They aren't just the same silent benefactor we once knew. I mean, look at how they've told our story.<br>The flower kid has grown into their voice.",[],0,0);email('Kamal',"Really??",[],0,0);email('Habit',"Hel o? everyone",[],0,0);email('Putunia',"WAIT. OHOFDHOHO. NO. WAY.E The GFREEN MENACE IS HERE?",[],0,0);email('Wallus',"Doc...?",[],0,0);email('Mirphy',"HABIT, YOU'RE in this thread? NO one's been in touch with you, since, well. Since we left the Habitat. We didn't know WHAT you were doing, or WHERE to find you!!! Are you ok?",[],0,0);email('Habit',"W, ell I've   I'v been diuneg some thikning. I want'nt to speak tu you'll because I waould like toapologize for what I did. I ngot so obsesed wiht the big Picture that I ddn't mind hutring all of you. Yuo don't need to forgve me.., but I hope we can be friensd when each fo you are comforble.<br><br>Adn it isn't true that NO-ONE has been in touch.. One speciale per-son has be-en there, to help me do all the grow grow grow-ing thisa past year.",[],0,0);email('Kamal',"Ha ha... guilty  :`",[],0,0);email('Nat',"wait doc that's all well and good but it's a little hard to like, understand you. what with how you type. it's bad. i don't even know how you do that",[],0,0);email('Habit',"<sh>[sent with spellcheck]</sh><br><br><s>Ah, you must accept my humblest apologies for my dreadful misspellings. My fingers are so large, an accident is bound to happen by-and-by. But worry not! I have just noticed, and subsequently enabled, an innovative feature of this online email service entitled ''''spell check.'''' Does this make it somewhat easier to decipher my typings?</s>",[],0,0);email('Nat',"nevermind you sound like my dad. turn it off",[],0,0);email('Habit',"Bokay",[],0,0);email('Trencil',"..A stunning blow from my daughter. I am wounded, and yet deeply impressed with her wit.",[],0,0);email('Habit',"Any way, i m feeligne good. Next mumth, i m going to finall-e b ablle to do what i've always wanted. Im goign to take care of plants & spurots adn flowers,; strartng at the flowe r kid's fam-lily's stor downtwon. I m practactally SPLODIGn w exi-ted mint. Plants r alwyays kind and i want t be too. :-)",[],0,0);email('Wallus',"Wow. That's...really great.<br>I don't know what to say...",[],0,0);email('Habit',"Beign kind has made all the differnce. People can c,are about me without fea r! Espec ally Kamal.",[],0,0);email('Kamal',"Boris has made a bunch of friends. He's been getting gifts in the mail from his fans. Look at these!",['habitStatue', 'habitPillow'],0,0);email('Trevor',"Holy cow... that plushie. That FIGURINE. MY COLLECTIBLE RADAR IS OFF THE CHARTS. THE BOUNDARIES OF THE CHARTS HAVE NEVER BEEN SO CROSSED.",[],0,0);email('Habit',"yes ,with each effigy, my power grows hi gher.",[],0,0);email('Mirphy',"I think we've heard from almost everyone in the email list, but there's an address here I don't recognize. bloomed@PedalMail.Cob... Who is that?<br>Wait.. is that the flower kid????",[],0,0);email('Kamal',"Oh mygod, I just added a stack of emails from Boris's filing cabinet. I didn't realize the flower kid was one of them. OH MY GOD! FLOWER KID!?",[],0,0);email('Ronbo',"....EY,... FLORIST KID, IS IT YOU? YER READING THIS? ... There's so much t'share! You did me a world'a good, kid my life has been lookin' up up up! I'm on the road again, touring with Tiff. Now that y'helped me through my Breakup Blues, we've gotten t'appreciate our friendship. We'v been entertainin' folks together! The show must go on, and it's all thanks ta' you, kid.",[],0,0);email('Jimothan',"Hey, champ.<br>Thanks to your forwardness and...gall...my son and I have been closer n' ever. I learn new things every day. It's darn beautiful.",[],0,0);email('Borbra',"HEY FLOWER KID, IF U R THERE WE MISS YA, ME AN' MY NEW Y'OWL RICE PILAF (HE'S DOING DANDY BY THE WAY HE HAS GROWN 10 FEET TALL).<br>XOXOXO",[],0,0);email('Kamal',"Hey Tiff, if the flower kid is here, this might be the perfect time.",[],0,0);email('Tiff',"I'm right there with you.",[],0,0);email('Tiff',"Flower Kid, we made you a little something.",[],0,0);email('Ronbo',"It's nothin' much, but we wanted ya to have it. You've helped us'all so much, ey.",[],0,0);email('Tiff',"We wrote you a song. Sure, that's cheesy, but sometimes you need to be a little cheesy to be sincere, don't you think?<br>Give it a listen. Please?<br><br><platitudes>",[],0,1);email('Tiff',"I wrote and orchestrated it. My tour has kept me way busy, but I made the time.<br>It's a little abstract, but... it's about what you mean to us. About the impact you've had on our lives.<br>A bunch of us pitched in.",[],0,0);email('Questionette',"<i>Suen wow sands nor :&) Bior furrow twin sie.</i>",[],0,0);email('Tiff',"Yes, Questionette sang; she wanted you to know what you meant to her.",[],0,0);email('Kamal',"I played the cello! :)",[],0,0);email('Ronbo',"I pulled out my old guitar fer tha' first time in YEARS.",[],0,0);email('Wallus',"I played a mandolin!",[],0,0);email('TimTam',"I once stole a horse",[],0,0);email('Tiff',"I hope you like it, flower kid. It's just a demo... but everything starts that way, doesn't it? Maybe someday it'll be a full fledged production, with a 10-part band and a trio of vocalists. A fancy illustration and a dozen remixes. We could perform it to the world, and nearly everyone would hear it.<br><br>But give us a label, a record deal, a primetime spot on every station... it doesn't matter so much.<br><br>This demo is plenty to let you know what you mean to us, flower kid.",[],0,0);email('Borbra',"PS WHAT DOES IT MEAN AT THE BOTTOM OF THE WINDOW WHERE IS SAYS THAT THERE ARE 5 FREE MESSAGES REMAINING<br>XOXOXO",[],0,0);email('Mirphy',"Uh oh, it's at 4 messages remaining now. Kamal, does this service limit the emails we can send????",[],0,0);email('Kamal',"wAIT WAIT WAIT<br>NO ONE TYPE<br>NOT ONE SI NGLE EMAIL",[],0,0);email('Kamal',"Okay okay. OKAY. Listen.<br>We only have ONE free email left. And I know EXACTLY who it's for.<br><br>Flower kid, little buddy, you've changed our lives. ALL of our lives. You've listened to our woes, become our friend, and shared our stories with the world.<br><br>And... I can't thank you enough for that. I know it's the same for everyone here.<br><br>When you met us in the Habitat, you were silent. Now, Mirphy says you've found a voice. You spent ages listening to our woes, and now it's time for us to listen to you. What have you been doing since leaving the Habitat? What's been keeping you afloat? What's been troubling you, or bringing you happiness?<br><br>What would you like to say to us? To me? To Habit?<br><br>If you aren't ready, there's no need to rush. Copy this URL and come back anytime. We'll wait patiently, and we'll leave this last email for you.<br><br>This is your moment, flower hero. We can't wait to hear how you use your voice.",[],0,0);