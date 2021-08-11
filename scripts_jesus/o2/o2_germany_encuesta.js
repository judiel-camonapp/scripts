global.pollAnswered = false



global.models = [
        {
            name: "ja"
        },
        {
            name: "nein"
        },
        {
            name:"encuesta"
        },
        {
            name: "encuesta_2"
        },
        {
            name: "ja_back"
        },
        {
            name: "nein_back"
        },
        {
            name:"encuesta_back"
        },
        {
            name: "encuesta_2_back"
        }
]

global.models.forEach(x =>{
        experience.backgroundScene.shapeByName(x.name).hide()
        experience.backgroundScene.shapeByName(x.name).rotation = new Vector(0, 0, 0)
        experience.backgroundScene.shapeByName(x.name).scale = 0
        experience.backgroundScene.shapeByName(x.name).clickable = false
})

global.popUp = function(a, b, c, d){
        if(global.pollAnswered == false){
            experience.currentScene.getShapes().forEach(x =>{
                x.clickable = false
            })
            
            delay(
                function(){
                    experience.backgroundScene.shapeByName(a).show()
                    experience.backgroundScene.shapeByName(b).show()
                    experience.backgroundScene.shapeByName(c).show()
                    experience.backgroundScene.shapeByName(d).hide()

                    experience.backgroundScene.shapeByName(a).animateScale({
                    to: 0.22,
                    start: 0.3,
                    duration: 0.5,
                    easing: "cubicOut"
                    })
                    experience.backgroundScene.shapeByName(b).animateScale({
                    to: 0.12,
                    start: 0.3,
                    duration: 0.5,
                    easing: "cubicOut"
                    })
                    experience.backgroundScene.shapeByName(c).animateScale({
                    to: 0.12,
                    start: 0.3,
                    duration: 0.5,
                    easing: "cubicOut"
                    })
                    experience.backgroundScene.shapeByName(b).clickable = true
                    experience.backgroundScene.shapeByName(c).clickable = true
                }, 4
            )
            
        }
    }

global.answer = function(a, b, c, d){


        experience.currentScene.getShapes().forEach(x =>{
            if(x.name !== "specs"){
                x.clickable = true
            }
            
        })
        delay(
            function(){
                experience.backgroundScene.shapeByName(a).hide()
                
                
            }, 1
        )

        experience.backgroundScene.shapeByName(a).animateScale({
            to: 0,
            start: 0.3,
            duration: 0.5,
            easing: "cubicOut"
        })
        experience.backgroundScene.shapeByName(b).hide()
        experience.backgroundScene.shapeByName(c).hide()
        experience.backgroundScene.shapeByName(b).scale = 0
        experience.backgroundScene.shapeByName(c).scale= 0

        experience.backgroundScene.shapeByName(b).clickable = false
        experience.backgroundScene.shapeByName(c).clickable = false
        experience.backgroundScene.shapeByName(d).show()

        delay(
            function(){
                experience.backgroundScene.shapeByName(d).animateScale({
                to: 0.22,
                start: 1,
                duration: 0.5,
                easing: "cubicOut"
                })
            }, 0.7
        )
        
        
        
        delay(
            function(){
                experience.backgroundScene.shapeByName(d).animateScale({
                    to: 0,
                    duration: 0.5,
                    easing: "cubicOut"
                })
            }, 3.5
        )
        global.pollAnswered = true
    }