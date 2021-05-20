// MODELO DE DATOS
global.data.models = [{
    name: "Ruleta",
    rotation: {x:0, y: 90, z: randomZ(5000, 500)},
}]
// GENERAR UN Z RANDOM
const randomZ = function(max, min){
    return Math.random() * (max - min) + min
}
// OBTENER INFO DE LOS MODELOS
let getModelInfo = function(modelName){
    let info = null;
    global.data.models.forEach(m =>{
        m.name == modelName? info = m.name :  null
    })
    return info;
}
// RANDOM ROTATION
const botonRuleta = function(){
    let ruleta = getModelInfo("Ruleta")
    let model = experience.currentScene.shapeByName(ruleta.name)
    model.animateRotation({
        to: new Vector(model.rotation.x, model.rotation.y, model.rotation.z),
        duration: 3.75,
        easing: cubicOut
    })
    
}

