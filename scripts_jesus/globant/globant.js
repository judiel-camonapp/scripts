global.data = {
    subScore: 1,
    level: 0
}

global.gameInit = function(){
    global.next = experience.currentScene.shapeByName("next")
    global.next.hide()
    global.next.clickable = false

    if(experience.currentScene.name == "Juego-01"){
        let innovate = experience.currentScene.shapeByName("innovate")
        let excellence = experience.currentScene.shapeByName("excellence")
        let inclusive = experience.currentScene.shapeByName("inclusive")
        let team = experience.currentScene.shapeByName("team")
        global.incorrect = [inclusive]
        global.correct = [innovate, excellence, team]
    }else if(experience.currentScene.name == "Juego-02"){

        let google = experience.currentScene.shapeByName("google")
        let apple = experience.currentScene.shapeByName("apple")
        let microsoft = experience.currentScene.shapeByName("microsoft")
        let tesla = experience.currentScene.shapeByName("tesla")
        global.incorrect = [apple, microsoft, tesla]
        global.correct = [google]
    }else{
        let three = experience.currentScene.shapeByName("three")
        let ac = experience.currentScene.shapeByName("ac")
        let eight = experience.currentScene.shapeByName("eight")
        let four = experience.currentScene.shapeByName("four")
        global.incorrect = [ac, eight, four]
        global.correct = [three]
    }
}


global.checkOver = function(num){
    if(global.data.subScore == num ){
        
        global.data.subScore = 1
        global.data.level++ 

        delay(
            function(){
                global.next.show()
                global.next.clickable = true
            }, 0.8
        )
        
        
        global.incorrect.forEach(e =>{
            e.clickable = false
        })
    }else{
        global.data.subScore++
    }
}

global.swapToCorrect = function(el, subLevel){
    el.hide()
    el.clickable = false
    experience.currentScene.shapeByName(el.name + "_answer").show()
    
    global.checkOver(subLevel)
}

global.swapToIncorrect = function(el){
    el.hide()
    el.clickable = false
    experience.currentScene.shapeByName(el.name + "_answer").show()
    global.data.subScore = 1
    global.correct.forEach(e =>{
        e.hide()
        e.clickable = false
        experience.currentScene.shapeByName(e.name + "_answer").show()
    })

    delay(
        function(){
            global.next.show()
            global.next.clickable = true
        }, 0.8
    )
}

global.goToScore = function(){
    if( global.data.level == 0){
        experience.transitionToScene("oh no")
        global.data.level = 0
    }else if(global.data.level == 1){
        experience.transitionToScene("Super Fun")
        global.data.level = 0
    }else if(global.data.level == 2){
        experience.transitionToScene("Super Fun 2")
        global.data.level = 0
    }else{
        experience.transitionToScene("Super Fun 3")
        global.data.level = 0
    }
}
