global.data.models = 
    [
        {
            name:"S21",
            initScale: 0, 
            finalScale: 11,
            initPosition: {x: 0, y: 3.60, z: -2.50},
            initRotation : {x: 0, y: 900, z: 0},
            detailPosition: {x:-0.74, y: 3.92, z: -2.50},
            detailScale: 12,
            toDetailRotation: {x: 0, y: -890, z: 0},
            detailRotation: {x: 0, y: -910, z: 0}
        },
        {
            name:"I11",
            initScale: 0, 
            finalScale: 11,
            initPosition: {x: 0, y: 3.60, z: -2.50},
            initRotation : {x: 0, y: 900, z: 0},
            detailPosition: {x:-0.74, y: 3.92, z: -2.50},
            detailScale: 12,
            toDetailRotation: {x: 0, y: -890, z: 0},
            detailRotation: {x: 0, y: -910, z: 0}
        },
        {
            name:"I12",
            initScale: 0, 
            finalScale: 10.50,
            initPosition: {x: 0, y: 3.60, z: -2.50},
            initRotation : {x: 0, y: 900, z: 0},
            detailPosition: {x:-0.74, y: 3.92, z: -2.50},
            detailScale: 12,
            toDetailRotation: {x: 0, y: -890, z: 0},
            detailRotation: {x: 0, y: -910, z: 0}
        },
        {
            name:"S20",
            initScale: 0, 
            finalScale: 10.50,
            initPosition: {x: 0, y: 3.60, z: -2.50},
            initRotation : {x: 0, y: 900, z: 0},
            detailPosition: {x:-0.74, y: 3.92, z: -2.50},
            detailScale: 12,
            toDetailRotation: {x: 0, y: -890, z: 0},
            detailRotation: {x: 0, y: -910, z: 0}
        },
        {
            name:"HSP",
            initScale: 0, 
            finalScale: 8,
            initPosition: {x: 0, y: 3.66, z: -2.74},
            initRotation : {x: 0, y: 720, z: 0},
            detailPosition: {x:-0.82, y: 3.87, z: -2.49},
            detailScale: 9,
            toDetailRotation: {x: 0, y: -710, z: 0},
            detailRotation: {x: 0, y: -730, z: 0}
        },
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
        }
    ]

    global.pollAnswered = false

    global.initModel = function (e){
        global.data.models.forEach(x =>{
            if(x.name == e){
                experience.backgroundScene.shapeByName(e).show()
                experience.backgroundScene.shapeByName(e).animateRotation({
                    to: new Vector(x.initRotation.x, x.initRotation.y, x.initRotation.z),
                    duration: 1,
                    loop: false,
                    yoyo: false,
                    easing: "cubicOut"
                })
                experience.backgroundScene.shapeByName(e).animateScale({
                    to: x.finalScale,
                    from: x.initScale,
                    start: 0.20,
                    duration: 1,
                    loop: false,
                    yoyo: false,
                    easing: "cubicOut"
                })

            }else{
                experience.backgroundScene.shapeByName(x.name).hide()
                experience.backgroundScene.shapeByName(x.name).scale = 0
                experience.backgroundScene.shapeByName(x.name).clickable = false
                experience.backgroundScene.shapeByName(x.name).rotation = new Vector(0,0,0)
            }
        })
    }
    global.modelDetail = function(e){
        let model = experience.backgroundScene.shapeByName(e)
        let modelInfo = global.data.models.find(x => x.name == e)

        model.animateRotation({
            to: new Vector(modelInfo.toDetailRotation.x, modelInfo.toDetailRotation.y, modelInfo.toDetailRotation.z),
            duration: 1,
            loop: false, 
            yoyo: false, 
            easing: "cubicOut"
        })
        delay(
                function(){
                    model.name == "HSP"? model.rotation = new Vector(0, -710, 0 ) : model.rotation = new Vector(0, -890, 0 )
                    model.animateRotation({
                    to: new Vector(modelInfo.detailRotation.x, modelInfo.detailRotation.y, modelInfo.detailRotation.z),
                    duration:1,
                    loop: true, 
                    yoyo: true, 
                    easing: "cubicInOut"
                })
            }, 1.01
        )
        
        model.animatePosition({
            to:new Vector(modelInfo.detailPosition.x, modelInfo.detailPosition.y, modelInfo.detailPosition.z),
            duration:1,
            loop: false, 
            yoyo: false, 
            easing: "cubicOut"
        })
        model.animateScale({
            to:modelInfo.detailScale,
            duration:1,
            loop: false, 
            yoyo: false, 
            easing: "cubicOut"
        })
    }

    global.closeDetail = function(e){
        let model = experience.backgroundScene.shapeByName(e)
        let modelInfo = global.data.models.find(x => x.name == e)

        model.animateRotation({
            to: new Vector(modelInfo.initRotation.x, modelInfo.initRotation.y, modelInfo.initRotation.z),
            duration: 1,
            loop: false, 
            yoyo: false, 
            easing: "cubicOut"
        })
        
        model.animatePosition({
            to:new Vector(modelInfo.initPosition.x, modelInfo.initPosition.y, modelInfo.initPosition.z),
            duration:1,
            loop: false, 
            yoyo: false, 
            easing: "cubicOut"
        })
        model.animateScale({
            to: modelInfo.finalScale,
            duration:1,
            loop: false, 
            yoyo: false, 
            easing: "cubicOut"
        })
        delay(
            function(){
                model.clearRotationAnimations()
            }, 1.01
        )
        
    }
    
    global.popUp = function(){
        if(global.pollAnswered == false){
            experience.currentScene.getShapes().forEach(x =>{
                x.clickable = false
            })
            
            delay(
                function(){
                    experience.backgroundScene.shapeByName("encuesta").show()
                    experience.backgroundScene.shapeByName("ja").show()
                    experience.backgroundScene.shapeByName("nein").show()
                    experience.backgroundScene.shapeByName("encuesta_2").hide()

                    experience.backgroundScene.shapeByName("encuesta").animateScale({
                    to: 0.22,
                    start: 0.3,
                    duration: 0.5,
                    easing: "cubicOut"
                    })
                    experience.backgroundScene.shapeByName("ja").animateScale({
                    to: 0.12,
                    start: 0.3,
                    duration: 0.5,
                    easing: "cubicOut"
                    })
                    experience.backgroundScene.shapeByName("nein").animateScale({
                    to: 0.12,
                    start: 0.3,
                    duration: 0.5,
                    easing: "cubicOut"
                    })
                    experience.backgroundScene.shapeByName("ja").clickable = true
                    experience.backgroundScene.shapeByName("nein").clickable = true
                }, 4
            )

            
        }
    }

    global.answer = function(){


        experience.currentScene.getShapes().forEach(x =>{
            if(x.name !== "specs"){
                x.clickable = true
            }
            
        })
        delay(
            function(){
                experience.backgroundScene.shapeByName("encuesta").hide()
                
                
            }, 1
        )

        experience.backgroundScene.shapeByName("encuesta").animateScale({
            to: 0,
            start: 0.3,
            duration: 0.5,
            easing: "cubicOut"
        })
        experience.backgroundScene.shapeByName("ja").hide()
        experience.backgroundScene.shapeByName("nein").hide()
        experience.backgroundScene.shapeByName("ja").scale = 0
        experience.backgroundScene.shapeByName("nein").scale= 0

        experience.backgroundScene.shapeByName("ja").clickable = false
        experience.backgroundScene.shapeByName("nein").clickable = false
        experience.backgroundScene.shapeByName("encuesta_2").show()

        delay(
            function(){
                experience.backgroundScene.shapeByName("encuesta_2").animateScale({
                to: 0.22,
                start: 1,
                duration: 0.5,
                easing: "cubicOut"
                })
            }, 0.7
        )
        
        
        
        delay(
            function(){
                experience.backgroundScene.shapeByName("encuesta_2").animateScale({
                    to: 0,
                    duration: 0.5,
                    easing: "cubicOut"
                })
            }, 3.5
        )

        global.pollAnswered = true
    }

