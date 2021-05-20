// MODELO DE DATOS
global.data.models = [{
    name: "Mayzent_parte1.glb.zip",
    initPosition: {x: -6.12, y: 3.60, z: 1.42},
    closedPosition: {x:-3.06, y: 3.60, z: 1.42},
    openedPosition: {x: -3.06, y: 3.60, z: -0.02},
    scale: 12.00,
    initAlpha: 0,
    alpha: 100,
    // NO ROTA AL ABRIR
},{
    name: "Mayzent_parte2.glb.zip",
    initPosition: {x: -6.00, y: 3.60, z: 1.36},
    closedPosition: {x: -3.00, y: 3.60, z: 1.36},
    openedPosition: {x: -3.06, y: 3.60, z: -0.02},
    scale: 12.00,
    initAlpha: 0,
    alpha: 100,
    closedRotation: {x:180, y: -90, z: 180},
    openedRotation: {x: 85, y: 89, z: -85},
}]
global.data.closedState = true;


// OBTENER INFO DE MODELOS
global.getModelInfo = function(modelName){
    let info = null ;
    global.data.models.forEach(model =>{
        modelName == model.name? info = model : null
    })
    return info
}
// INICIAR ANIMACIONES DE ENTRADA
global.init= function(){
    let first = {
        shape: experience.backgroundScene.shapeByName(global.data.models[0].name),
        info: global.getModelInfo(global.data.models[0].name)
    } 
    let second = {
        shape: experience.backgroundScene.shapeByName(global.data.models[1].name),
        info: global.getModelInfo(global.data.models[1].name)
    }

    first.shape.animateScale({
        to: (first.info.scale),
        duration: 1,
        easing: "cubicOut"
    })
    first.shape.animateAlpha({
        to: (first.info.alpha),
        duration: 1,
        easing: "cubicOut"
    })
    second.shape.animateScale({
        to: (second.info.scale),
        duration: 1,
        easing: "cubicOut"
    })
    second.shape.animateAlpha({
        to: (second.info.alpha),
        duration: 1,
        easing: "cubicOut"
    })
}
// ABRIR Y CERRAR BLISTER
global.openToggle = function(){
    // OBTENER EL ELEMENTO PARA ANIMAR
    let first = {
        shape: experience.backgroundScene.shapeByName(global.data.models[0].name),
        info: global.getModelInfo(global.data.models[0].name)
    } 
    let second = {
        shape: experience.backgroundScene.shapeByName(global.data.models[1].name),
        info: global.getModelInfo(global.data.models[1].name)
    }

    const openBlister = function(part1, part2){
        part2.shape.animatePosition({
            to: new Vector(part2.info.openedPosition.x, part2.info.openedPosition.y, part2.info.openedPosition.z),
            duration: 1, 
            easing: "cubicOut"
        })
        part2.shape.animateRotation({
            to: new Vector(part2.info.openedRotation.x, part2.info.openedRotation.y, part2.info.openedRotation.z),
            duration: 1,
            easing: "cubicOut"
        })
        part1.shape.animatePosition({
            to: new Vector(part1.info.openedPosition.x, part1.info.openedPosition.y, part1.info.openedPosition.z),
            duration: 1, 
            easing: "cubicOut"
        })
    }
    const closeBlister = function(part1, part2){
        part2.shape.animatePosition({
            to: new Vector(part2.info.closedPosition.x, part2.info.closedPosition.y, part2.info.closedPosition.z),
            duration: 1, 
            easing: "cubicOut"
        })
        part2.shape.animateRotation({
            to: new Vector(part2.info.closedRotation.x, part2.info.closedRotation.y, part2.info.closedRotation.z),
            duration: 1,
            easing: "cubicOut"
        })
        part1.shape.animatePosition({
            to: new Vector(part1.info.closedPosition.x, part1.info.closedPosition.y, part1.info.closedPosition.z),
            duration: 1, 
            easing: "cubicOut"
        })
    }

    if(global.data.closedState == true){
        openBlister(first, second)
        global.data.closedState = false
    }else{
        closeBlister(first, second)
        global.data.closedState = true
    }
}
