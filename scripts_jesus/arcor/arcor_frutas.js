global.wordToGuess = null;
global.currentWord = null;
global.allGames = [
    { word: "FRUTILLA", pending: true, delta: { x: -0.1, y: 0, z: 0 } },
    { word: "BANANA", pending: true, delta: { x: 0, y: 0, z: -0.1 } },
    { word: "ANANA", pending: true, delta: { x: 0.1, y: 0, z: 0 } },
];
global.currentTimer = null;

global.resetAll = function() {
    global.allGames.forEach(g => g.pending = true);
}

global.initGame = function(wordToGuess) {
    // BTN-N-1
    // LETRA-N-1
    global.wordToGuess = wordToGuess;
    global.currentWord = "";
    if (global.currentTimer != null) {
        clearTimeout(global.currentTimer);
        global.currentTimer = null;
    }

    global.showHideTimer(true);

    global.updateWonPopups();

    global.currentTimer = setTimeout(global.showLoser, 31000);
}

global.showHideTimer = function(show) {
    experience.currentScene.shapeByName("timer").scale = show ? 0.22 : 0.0001;
}

global.showLoser = function() {
    global.currentTimer = null;
    var game = null;
    global.allGames.forEach(g => {
        if (g.word == global.wordToGuess) {
            game = g;
        }
    });

    global.showHideTimer(false);

    var loserButton = experience.currentScene.shapeByName(game.word + "_loser_button");
    var popupLoser = experience.currentScene.shapeByName(game.word + "_popup_loser");

    var diff = 5;
    var positionDelta = { x: game.delta.x * diff, y: game.delta.y * diff, z: game.delta.z * diff };

    var popupLoserScale = 0.4;
    var popupLoserPosition = { x: popupLoser.position.x + positionDelta.x, y: popupLoser.position.y + positionDelta.y, z: popupLoser.position.z + positionDelta.z };
    var loserButtonScale = 0.4;
    var loserButtonPosition = { x: loserButton.position.x + positionDelta.x, y: loserButton.position.y + positionDelta.y, z: loserButton.position.z + positionDelta.z };

    loserButton.animatePosition({
        to: loserButtonPosition,
        duration: 0.1
    });
    loserButton.animateScale({
        to: loserButtonScale,
        easing: "elasticOutBig"
    });
    popupLoser.animatePosition({
        to: popupLoserPosition,
        duration: 0.1
    });
    popupLoser.animateScale({
        to: popupLoserScale,
        easing: "elasticOutBig"
    });
}
global.shapePosition = function(obj){
    if(global.wordToGuess == "FRUTILLA"){
       return new Vector(obj.position.x - 0.05 , obj.position.y , obj.position.z  )
    }else if(global.wordToGuess == "ANANA"){
       return new Vector(obj.position.x + 0.05 , obj.position.y , obj.position.z  )
    }else{
       return new Vector(obj.position.x , obj.position.y , obj.position.z - 0.05)
    }
}

global.showWrongLetter = function(obj) {
    
    console.log(obj.rotation)
    var el = experience.currentScene.newElement({
        name: Math.random().toString(36).substring(7),
        type: "sprite",
        asset: "cruz",
        position: global.shapePosition(obj),
        scale: 0.01,
        opacity: 0,
        rotation: obj.rotation,
        onLoad: function() {
            console.log(el.rotation)
            el.animateScale({
                to: 0.2,
                duration: 0.3,
                easing: "cubicInOut"
            });
            el.animateAlpha({
                to: 1,
                duration: 0.3,
                easing: "cubicInOut"
            });
            delay(function() {
                el.animateScale({
                    to: 0.01,
                    duration: 0.3,
                    easing: "cubicInOut"
                });
                el.animateAlpha({
                    to: 0,
                    duration: 0.3,
                    easing: "cubicInOut"
                });
            }, 1.5);
        }
    });
}

global.hidePotion = function(game) {
    var popupWinner = experience.currentScene.shapeByName(game.word + "_popup_winner");
    var potionPopup = experience.currentScene.shapeByName(game.word + "_pocima");
    var potionText = experience.currentScene.shapeByName(game.word + "_pocima_text");
    var hand = experience.currentScene.shapeByName(game.word + "_manito");
    var effect = experience.currentScene.shapeByName(game.word + "_efecto");

    popupWinner.hide();

    potionPopup.position = new Vector(potionPopup.position.x, potionPopup.position.y + 1000, potionPopup.position.z);
    potionPopup.hide();

    potionText.position = new Vector(potionText.position.x, potionText.position.y + 1000, potionText.position.z);
    potionText.hide();

    hand.position = new Vector(hand.position.x, hand.position.y + 1000, hand.position.z);
    hand.hide();

    effect.position = new Vector(effect.position.x, effect.position.y + 1000, effect.position.z);
    effect.hide();
}

global.showPotion = function(game) {
    var potionPopup = experience.currentScene.shapeByName(game.word + "_pocima");
    var potionText = experience.currentScene.shapeByName(game.word + "_pocima_text");
    var hand = experience.currentScene.shapeByName(game.word + "_manito");
    var effect = experience.currentScene.shapeByName(game.word + "_efecto");

    potionPopup.position = new Vector(potionPopup.position.x, potionPopup.position.y - 1000, potionPopup.position.z);
    potionPopup.show();

    potionText.position = new Vector(potionText.position.x, potionText.position.y - 1000, potionText.position.z);
    potionText.show();

    hand.position = new Vector(hand.position.x, hand.position.y - 1000, hand.position.z);
    hand.show();

    effect.position = new Vector(effect.position.x, effect.position.y - 1000, effect.position.z);
    effect.show();
}

global.showWinnerPopup = function(game, animated) {
    var popupWinner = experience.currentScene.shapeByName(game.word + "_popup_winner");
    var popupWinnerText = experience.currentScene.shapeByName(game.word + "_popup_winner_text");
    var potionPopup = experience.currentScene.shapeByName(game.word + "_pocima");
    var potionText = experience.currentScene.shapeByName(game.word + "_pocima_text");
    var hand = experience.currentScene.shapeByName(game.word + "_manito");
    var effect = experience.currentScene.shapeByName(game.word + "_efecto");
    var diff = 5;
    var positionDelta = { x: game.delta.x * diff, y: game.delta.y * diff, z: game.delta.z * diff };

    var popupWinnerScale = 0.4;
    var popupWinnerPosition = { x: popupWinner.position.x + positionDelta.x, y: popupWinner.position.y + positionDelta.y, z: popupWinner.position.z + positionDelta.z };
    var popupWinnerTextScale = 0.4;
    var popupWinnerTextPosition = { x: popupWinnerText.position.x + positionDelta.x, y: 0.60, z: popupWinnerText.position.z + positionDelta.z };

    if (animated) {
        popupWinner.animatePosition({
            to: popupWinnerPosition,
            duration: 0.1
        });
        popupWinner.animateScale({
            to: popupWinnerScale,
            easing: "elasticOutBig"
        });
        popupWinnerText.animatePosition({
            to: popupWinnerTextPosition,
            duration: 0.1
        });
        popupWinnerText.animateScale({
            to: popupWinnerTextScale,
            easing: "elasticOutBig"
        });
    } else {
        potionPopup.hide();
        potionPopup.scale = 0.01;
        potionText.hide();
        potionText.scale = 0.01;
        hand.hide();
        hand.scale = 0.01;
        effect.hide();
        effect.scale = 0.01;

        popupWinner.scale = popupWinnerScale;
        popupWinner.position = popupWinnerPosition;
        popupWinnerText.scale = popupWinnerTextScale;
        popupWinnerText.position = popupWinnerTextPosition;
    }
}

global.updateWonPopups = function() {
    global.allGames.forEach(game => {
        if (game.pending) {
            if (game.word != global.wordToGuess)
                global.hidePotion(game);
        } else {
            global.showWinnerPopup(game, false);
        }
    });
}

global.showPendingPotions = function() {
    global.allGames.forEach(game => {
        if (game.pending) {
            global.showPotion(game);
        }
    });
}

global.tapLetterButton = function(letterButtonObj) {
    // Expected format: letterObj.name = BTN-N-1
    var letter = letterButtonObj.name.substring(4, 5);
    var tmpWordToGuess = global.wordToGuess.substring(global.currentWord.length);
    if (tmpWordToGuess[0] == letter) {
        // Letter ok
        global.currentWord += letter;
        global.playSound(true);
        letterButtonObj.hide();
        letterButtonObj.clickable = false;

        var letterNameToAnimate = "LETRA-" + global.currentWord.length;
        var letterToAnimate = experience.currentScene.shapeByName(letterNameToAnimate);

        var currentLetterDelta = global.getDeltaForCurrentWord();
        letterToAnimate.animatePosition({
            to: {
                x: letterToAnimate.position.x + currentLetterDelta.x,
                y: letterToAnimate.position.y + currentLetterDelta.y,
                z: letterToAnimate.position.z + currentLetterDelta.z
            },
            duration: 0.1
        });

        if (global.currentWord == global.wordToGuess) {
            global.won();
        }
    } else {
        // Wrong
        global.showWrongLetter(letterButtonObj);
        global.playSound(false);
    }
}

global.playSound = function(success) {
    experience.playSound(success ? "_correct" : "_incorrect");
}

global.markGameWon = function(wonGame) {
    global.allGames.forEach(game => {
        if (game.word == wonGame) {
            game.pending = false;
        }
    });
}

global.anyPendingGame = function(wonGame) {
    var pending = false;
    for (var i = 0; i < global.allGames.length; i++) {
        if (global.allGames[i].pending) {
            pending = true;
            break;
        }
    }
    return pending;
}

global.won = function() {
    global.showHideTimer(false);

    clearTimeout(global.currentTimer);
    global.currentTimer = null;

    global.markGameWon(global.wordToGuess);

    global.showPendingPotions();

    setTimeout(function() {
        if (!global.anyPendingGame()) {
            experience.transitionToScene("Ganador_Total", "none", 0.1);
        } else {
            for (var i = 0; i < global.allGames.length; i++) {
                if (global.allGames[i].word == global.wordToGuess) {
                    global.showWinnerPopup(global.allGames[i], true);
                    break;
                }
            }
        }
    }, 1000);
}

global.getDeltaForWord = function(word) {
    return global.allGames.find(g => g.word == word).delta;
}

global.getDeltaForCurrentWord = function() {
    return global.getDeltaForWord(global.wordToGuess);
}