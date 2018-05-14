var ui = {
  gameContainer: document.querySelector('.gameContainer'),
  player: document.querySelector('.player'),
  android: document.querySelector('.android'),
  playButton: document.querySelector('.playButton'),
  leftTextContainer: document.querySelector('.leftTextContainer'),
  rightTextContainer: document.querySelector('.rightTextContainer'),
  answers : document.querySelectorAll('.answers'),
  rightText : document.querySelector('.rightText'),
  worldNav : document.querySelector('.worldNav'),
  navItems : document.querySelectorAll('.navItems'),
}

var worldId = ui.gameContainer.dataset.id;
    countId = 0;
    lastAnswerType = 0;
    leftText = [];
    rightText = '';

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
    ui.player.classList.remove('walking');
    ui.android.classList.remove('opacityAnim');
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
    lastAnswerType = this.dataset.type;

    clearText();
    displayRightText();
  });
}

function displayRightText() {

  rightText = '';

  for (var i = 0; i < data[worldId].pnjTexts.length; i++) {

    if (data[worldId].pnjTexts[i].type == lastAnswerType && data[worldId].pnjTexts[countId].id == countId) {
      rightText = data[worldId].pnjTexts[countId];
      ui.rightText.textContent = rightText.value;
    }
  }
  displayLeftText();
}

function displayLeftText() {

  leftText = [];

  for (var i = 0; i < ui.answers.length; i++) {

    for (var a = 0; a < data[worldId].playerAnswers.length; a++) {

      if (data[worldId].playerAnswers[a].id == countId && ui.answers[i].textContent == '') {

        ui.answers[i].textContent = data[worldId].playerAnswers[a].value;
        ui.answers[i].dataset.type = data[worldId].playerAnswers[a].type;

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

  if (data[worldId].playerAnswers[data[worldId].playerAnswers.length-1].id == -1) {
    ui.rightText.textContent = 'Où veux-tu aller?';
    openWorldNav();
  }

  countId++;
}

function openWorldNav() {
  ui.rightText.textContent = '';
  ui.worldNav.style.zIndex = 99;

  for (var i = 0; i < ui.navItems.length; i++) {

    for (var a = 0; a < data.length; a++) {
      ui.navItems[i].style.backgroundImage = "url(" + data[a].worldImg + ")";
      ui.navItems[i].appendChild.textContent = data[a].worldName;
    }

    ui.navItems[i].addEventListener('click', function() {
      worldId = this.dataset.nb;
      displayWorld();
    });
  }
}

function displayWorld() {
  ui.gameContainer.style.backgroundImage = "url(" + data[worldId].worldImg + ")";
  ui.android.src = data[worldId].worldPnj;

  console.log(worldId);

  ui.worldNav.style.zIndex = -99;
  play();
}

function returnToHome() {

}
