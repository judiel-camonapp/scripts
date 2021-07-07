//MODELO DE DATOS
global.data.models = [{
    name: "castle",
    position: {x:0, y: 3.59, z: 1.83},
    initPosition: {x: 0, y: 2.60, z: 2.00},
    rotation: {x:0, y: 540, z: 0},
    initRotation: {x: 0, y: 180, z: 0},
    axisRotationEnd: {x: 0, y: 550, z: 0},
    scale: 1.30,
    initScale: 2.20
}, {
name: "olaf",
position: {x:1.79, y: 3.81, z: 0},
initPosition: {x: 2.00, y:2.96, z: 0},
rotation: {x:0, y: 260, z: 0},
initRotation: {x: 0, y: 635, z: 0},
axisRotationEnd: {x: 0, y: 270, z: 0},
scale: 1.30,
initScale: 1.95
}, {
    name: "bota",
    position: {x:-1.80, y: 3.60, z: 0},
    initPosition: {x: -2.00, y: 2.60, z: 0},
    rotation: {x:0, y: 450, z: 0},
    initRotation: {x: 0, y: -270, z: 0},
    axisRotationEnd: {x: 0, y: 460, z: 0},
    scale: 2.00,
    initScale: 3.00
}];

//OCULTAR WIDGETS AL PRINCIPIO
global.init = function(){
    global.data.models.forEach(m => {
        let dialog = experience.currentScene.shapeByName(m.name + "_dialog");
        let snow = experience.currentScene.shapeByName(m.name + "_snow");
        let closeButton = experience.currentScene.shapeByName(m.name + "_closeBtn");
        let imgButton = experience.currentScene.shapeByName(m.name + "_imgBtn");
        let buyButton = experience.currentScene.shapeByName(m.name + "_buyBtn");
        let arButton = experience.currentScene.shapeByName(m.name + "_arBtn");
        let shopButton = experience.currentScene.shapeByName(m.name + "_shopBtn");
        let hand_1 = experience.currentScene.shapeByName(m.name + "_hand1");
        let hand_2 = experience.currentScene.shapeByName(m.name + "_hand2");
        delay(
            function(){
                dialog.hide()
                snow.hide()
                closeButton.hide()
                closeButton.clickable = false
                imgButton.hide()
                imgButton.clickable = false
                buyButton.hide()
                buyButton.clickable = false
                arButton.hide()
                shopButton.hide()
                hand_1.hide()
                hand_2.hide()
            }
        , 0.5)
        
    });
}

//OBTENER INFO DEL MODELO SELECCIONADO
global.getModelInfo = function(modelName) {
    let info = null;
    global.data.models.forEach(m => {
        if (m.name == modelName) {
            info = m;
        }
    });
    return info;
}

global.data.currentModel = null;

//MOSTRAR Y OCULTAR WIDGETS AL CERRAR
global.hideAndShow = function(target, state){
    let dialog = experience.currentScene.shapeByName(target + "_dialog");
    let snow = experience.currentScene.shapeByName(target + "_snow");
    let infoButton = experience.currentScene.shapeByName(target + "_button");
    let closeButton = experience.currentScene.shapeByName(target + "_closeBtn");
    let imgButton = experience.currentScene.shapeByName(target + "_imgBtn");
    let buyButton = experience.currentScene.shapeByName(target + "_buyBtn");
    let arButton = experience.currentScene.shapeByName(target + "_arBtn");
    let shopButton = experience.currentScene.shapeByName(target + "_shopBtn");
    let moreInfoButton = experience.currentScene.shapeByName(target + "_moreInfo");
    let hand_1 = experience.currentScene.shapeByName(target + "_hand1");
    let hand_2 = experience.currentScene.shapeByName(target + "_hand2");
    let hand_3 = experience.currentScene.shapeByName(target + "_hand3");
    
    
    if(state){
        dialog.fadeIn();
        snow.fadeIn();
        infoButton.hide();
        moreInfoButton.hide()
        hand_3.hide()
        infoButton.clickable = false;
        delay(function(){
        imgButton.fadeIn();
        imgButton.clickable = true;
        buyButton.fadeIn();
        buyButton.clickable = true;
        arButton.fadeIn();
        shopButton.fadeIn();
        hand_1.fadeIn();
        hand_2.fadeIn();
        }, 0.8);
        delay(function(){
        closeButton.show();
        closeButton.clickable = true;
        }, 1.2);
    } else{
        dialog.fadeOut();
        snow.fadeOut();
        delay(function(){
        infoButton.fadeIn();
        infoButton.clickable = true;
        moreInfoButton.fadeIn();
        hand_3.fadeIn()
        }, 1);
        imgButton.fadeOut();
        imgButton.clickable = false;
        buyButton.fadeOut();
        buyButton.clickable = false;
        arButton.fadeOut();
        shopButton.fadeOut();
        hand_1.fadeOut();
        hand_2.fadeOut();
        closeButton.hide();
        closeButton.clickable = false;
    }
}

//BOTONES PARA MÁS INFORMACIÓN DE CADA PRODUCTO
global.botonInfo = function(target){
    let modelName = target.name.substring(0, target.name.indexOf("_"));
    
    if (global.data.currentModel != null && global.data.currentModel != modelName) {
        let currentModel = global.data.currentModel;
        global.close(currentModel);
    }
    global.data.currentModel = modelName;
    let model = experience.currentScene.shapeByName(modelName + "_model");
    let modelInfo = global.getModelInfo(modelName);
    
    model.animatePosition({
        to: new Vector(modelInfo.position.x, modelInfo.position.y, modelInfo.position.z),
        duration: 1,
        easing: "cubicOut"
    });
    model.animateRotation({
        to: new Vector(modelInfo.rotation.x, modelInfo.rotation.y, modelInfo.rotation.z),
        duration: 1,
        easing: "cubicInOut"
    });
    delay(function(){
        model.animateRotation({
        to: new Vector(modelInfo.axisRotationEnd.x, modelInfo.axisRotationEnd.y, modelInfo.axisRotationEnd.z),
        duration: 1,
        easing: "cubicInOut",
        loop: true,
        yoyo: true
        });
    }, 1);

    model.animateScale({
        to: modelInfo.scale,
        duration: 1,
        easing: "cubicOut",
    });
    global.hideAndShow(modelName, true);
}
//   BOTÓN PARA CERRAR LA INFO DEL PRODUCTO 
//   Y CASO PARA CUANDO HAY MÁS DE 2 DETALLES ABIERTOS

global.close = function(target){
    let currentModel = global.data.currentModel;
    let infoButton = experience.currentScene.shapeByName(currentModel + "_button");
    let model = experience.currentScene.shapeByName(currentModel + "_model");
    let modelInfo = global.getModelInfo(currentModel);
    
    
    delay(function(){
        model.animatePosition({
        to: new Vector(modelInfo.initPosition.x, modelInfo.initPosition.y, 
        modelInfo.initPosition.z),
        duration: 1,
        easing: "cubicIn"
        });
        model.animateRotation({
            to: new Vector(modelInfo.initRotation.x, modelInfo.initRotation.y, 
            modelInfo.initRotation.z),
            duration: 1,
            easing: "cubicInOut"
        });
        model.animateScale({
            to: modelInfo.initScale,
            duration: 1,
          easing: "cubicIn",
        });
    }, 0.5);
    
    //VALIDACIÓN PARA EL CASO EN QUE SE ABRA OTRO DETALLE LUEGO DE HABER CERRADO UNO
    if(infoButton.clickable == true){
        return;
    } else{
        global.hideAndShow(currentModel, false);
    }
}
