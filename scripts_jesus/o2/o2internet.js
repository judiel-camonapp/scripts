
let decol = {
    name: "decol",
    initPos : new Vector(-3.30, 2.30, 0),
    initRot: new Vector(0, 90, 0),
    initScale: 3.50,
    traslation: new Vector(-4.40, 2.34, 0),
    rotation :new Vector(0, -270, 0),
    scale :15
}
let baseport = {
    name: "baseport",
    initPos : new Vector(0, 2.34, 3),
    initRot: new Vector(0, -180, 0),
    initScale: 15,
    traslation : new Vector(0, 1.76, 4.40),
    rotation: new Vector(0, 540, 0),
    scale: 80
}

let hgu = {
    name: "hgu",
    initPos : new Vector(3.00, 2.80, 0),
    initRot: new Vector(0, -90, 0),
    initScale: 30,
    traslation : new Vector(4.40, 2.34, 0),
    rotation: new Vector(0, 270, 0),
    scale: 120
}
global.data = [
    decol,
    baseport,
    hgu
]

global.animateModel = function(x){
        experience.backgroundScene.shapeByName(x.name).animatePosition({
            to: x.traslation,
            duration: 1,
            easing: "cubicOut"
        })
        experience.backgroundScene.shapeByName(x.name).animateRotation({
            to: x.rotation,
            duration: 1,
            easing: "cubicOut"
        })
        experience.backgroundScene.shapeByName(x.name).animateScale({
            to: x.scale,
            duration: 1,
            easing: "cubicOut"
        })

    global.data.forEach(z =>{
        if(z.name != x.name) {
            global.animateReverse(z)
        }
    })
}

global.animateReverse = function(x){
        experience.backgroundScene.shapeByName(x.name).animatePosition({
            to: x.initPos,
            duration: 1,
            easing: "cubicOut"
        })
        experience.backgroundScene.shapeByName(x.name).animateRotation({
            to: x.initRot,
            duration: 1,
            easing: "cubicOut"
        })
        experience.backgroundScene.shapeByName(x.name).animateScale({
            to: x.initScale,
            duration: 1,
            easing: "cubicOut"
        })

}

