var worldId = 0;
    countId = 0;
    lastAnswerType = 0;
    leftText = [];
    rightText = '';

var ui = {
  game: document.getElementById('game'),
  player: document.querySelector('.player'),
  android: document.querySelector('.android'),
  playButton: document.querySelector('.playButton'),
  leftTextContainer: document.querySelector('.leftTextContainer'),
  rightTextContainer: document.querySelector('.rightTextContainer'),
  answers : document.querySelectorAll('.answers'),
  rightText : document.querySelector('.rightText'),
}

ui.playButton.addEventListener('click', function() {
  //loadData();
  play();
});


/*  AJAX REQUEST
function loadData() {
  // XML request
  const req = new XMLHttpRequest();

  req.open('GET', 'file://C:/Users/geoff/Desktop/Projets/Interactive_Story/data.json', true);

  req.addEventListener('load', function() {

    if (req.status >= 200 && req.status < 400) {
      data = JSON.parse(req.responseText);
      play();
    } else {
      console.log("We connected to the server, but it returned an error.");
    }
  });

  req.addEventListener('error', function() {
    console.log("Connection error");
  });

  console.log(data);
  req.send(null);
}
*/


// INIT GAME
function play() {

  ui.player.classList.add('walking');
  ui.player.addEventListener('animationend', function() {
    displayTextContainer();
  });

  ui.android.classList.add('opacityAnim');

  ui.playButton.style.display = 'none';
}

function displayTextContainer() {

  ui.leftTextContainer.classList.add('opacityAnim');
  ui.rightTextContainer.classList.add('opacityAnim');

  ui.rightTextContainer.addEventListener('animationend', function() {
    displayRightText();
  });
}


// DISPLAY & UPDATE TEXT FUNCTIONS

// Text Event Listener
function clickOnText(count) {
  ui.answers[count].addEventListener('click', function() {
    clearText();
    displayRightText();
  });
}

function displayRightText() {

  rightText = '';

  for (var i = 0; i < data[worldId].pnjTexts.length; i++) {
    if (data[worldId].pnjTexts[i].type == lastAnswerType && data[worldId].pnjTexts[countId].id == countId ) {
      rightText = data[worldId].pnjTexts[countId];
      ui.rightText.textContent = rightText.value;
      console.log(i);
    }
  }
  displayLeftText();
}

function displayLeftText() {

  console.log('OUI');
  leftText = [];

  for (var i = 0; i < ui.answers.length; i++) {

    for (var a = 0; a < data[worldId].playerAnswers.length; a++) {

      if (data[worldId].playerAnswers[a].id == countId && ui.answers[i].textContent == '') {
        ui.answers[i].textContent = data[worldId].playerAnswers[a].value;
        leftText.push(data[worldId].playerAnswers[a]);
        var count = i;
        clickOnText(count);
        data[worldId].playerAnswers[a].id = -1;
      }

      ui.answers[i].classList.add('opacityAnim');

    }
  }
}

function clearText() {

  ui.rightText.textContent = '';

  for (var i = 0; i < ui.answers.length; i++) {
    ui.answers[i].textContent = '';
    ui.answers[i].classList.remove('opacityAnim');
  }

  countId++;
}
//
