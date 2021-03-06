
global.data.comparisonMode = false;
global.data.comparisonModelName1 = null;
global.data.comparisonModelName2 = null;

global.data.currentModelName = null;
global.data.currentSpecsModeIsVideo = false;
global.data.currentSpecsAreToggling = false;

global.data.sideConfig = {
    side1: {
        model: {
            position: { x: -3, y: 3.70, z: 1.13 }
        },
        specs: {
            position: { x: -3, y: 3.70, z: -0.56 }
        }
    },
    side2: {
        model: {
            position: { x: 3, y: 3.70, z: -1.13 }
        },
        specs: {
            position: { x: 3, y: 3.70, z: 0.56 }
        }
    },
}

global.data.models = [{
    name: "IP12ProMax",
    side: 2,
    scaleFrom: 12,
    scaleTo: 18.50,
    scaleToComparison: 6,
    comparisonY: 5,
    positionFrom: { x: 3.35, y: 3.28, z: -1.70 },
    rotationFrom: { x: 0, y: 90, z: 0 },
    rotationTo: { x: 0, y: 464, z: 0 }

},
{
    name: "IP12Pro",
    side: 2,
    scaleFrom: 11.50,
    scaleTo: 17.00,
    scaleToComparison: 6,
    comparisonY: 5,
    positionFrom: { x: 3.35, y: 3.20, z: 0 },
    rotationFrom: { x: 0, y: 90, z: 0 },
    rotationTo: { x: 0, y: 464, z: 0 }
},
{
    name: "IP12",
    side: 2,
    // temporal scale
    scaleFrom: 0.17,
    scaleTo: 0.50,
    scaleToComparison: 0.7,
    comparisonY: 5,
    positionFrom: { x: 3.35, y: 3.16, z: 1.70 },
    rotationFrom: { x: 0, y: 90, z: 0 },
    rotationTo: { x: 0, y: 464, z: 0 }
},
{
    name: "IPSE",
    side: 1,
    scaleFrom: 11.50,
    scaleTo: 17.00,
    scaleToComparison: 6,
    comparisonY: 5,
    positionFrom: { x: -3.35, y: 3.20, z: 0.85 },
    rotationFrom: { x: 0, y: 90, z: 0 },
    rotationTo: { x: 0, y: 464, z: 0 }
},
{
    name: "IP11",
    side: 1,
    scaleFrom: 11.50,
    scaleTo: 17.00,
    scaleToComparison: 6,
    comparisonY: 5,
    positionFrom: { x: -3.35, y: 3.20, z: -0.85 },
    rotationFrom: { x: 0, y: 90, z: 0 },
    rotationTo: { x: 0, y: 464, z: 0 }
}
];
global.data.comparisonConfig = {
    side1: {
        first: {
            model: {
                position: { x: 2.90, y: 5.0, z: -1 }
            },
            specs: {
                position: { x: 3.00, y: 3.70, z: -1 },
                scale: 0.35
            }
        },
        second: {
            model: {
                position: { x: 2.90, y: 5.0, z: 1 }
            },
            specs: {
                position: { x: 3, y: 3.70, z: 1 },
                scale: 0.35
            }
        },
        button:{
            position: { x: 2.90, y: 2.05, z: 0 }
        }
        
    },
    // a la espera de data
    side2: {
        first: {
            model: {
                position: { x: -2.90, y: 5, z: 1 }
            },
            specs: {
                position: { x: -3, y: 3.70, z: 1 },
                scale: 0.35
            }
        },
        second: {
            model: {
                position: { x: -2.90, y: 5, z: -1 }
            },
            specs: {
                position: { x: -3, y: 3.70, z: -1 },
                scale: 0.35
            }
        },
        button:{
            position: { x: -2.90, y: 2.05, z: 0 }
        }
    }
}

// animaciones

global.fadeIn = function(obj) {
    obj.animateAlpha({
        to: 1,
        duration: 0.5,
        easing: "cubicInOut"
    });
}

global.fadeOut = function(obj) {
    obj.animateAlpha({
        to: 0,
        duration: 0.5,
        easing: "cubicInOut"
    });
}

global.scaleUp = function(obj, scale){
    obj.animateScale({
        to: scale,
        duration: 0.5,
        easing: "cubicInOut"
    });
}

global.scaleDown = function(obj){
    obj.animateScale({
        to: 0,
        duration: 0.5,
        easing: "cubicInOut"
    });
}

global.swapAnimation = function(){

}





global.getModelInfo = function(modelName) {
    var modelInfo = null;
    global.data.models.forEach(m => {
        if (m.name == modelName) {
            modelInfo = m;
        }
    });
    return modelInfo;
}








global.initModels = function() {
    global.data.currentModelName = null;
    global.animateAllModels();
    global.initPoll();
}

global.animateAllModels = function() {
    global.data.models.forEach(m => {
        var model = experience.currentScene.shapeByName(m.name + "_model");
        model.rotation = new Vector(model.rotation.x, model.rotation.y - 15, model.rotation.z);
        model.animateRotation({
            to: new Vector(model.rotation.x, model.rotation.y + 30, model.rotation.z),
            duration: 2.5,
            loop: true,
            yoyo: true,
            easing: "cubicInOut"
        });
    });
}








global.modelTap = function(obj) {
    if (global.data.currentModelName != null) {
        global.minimizeModel(global.data.currentModelName, true);
    }
    var modelName = obj.name.substring(0, obj.name.indexOf("_"));
    global.data.currentModelName = modelName;
    global.maximizeModel(modelName);
}

global.minimizeModel = function(modelName) {
    // global.toggleFloorHints(true);
    global.toggle3DModel(modelName, false);
    global.toggle3DModelSpecs(modelName, false);
    delay(
        function(){
            global.toggleSide([modelName], global.getModelInfo(modelName).side, true);
        }, 0.8
    )
    
    global.data.currentModelName = null;
    global.data.currentSpecsModeIsTariff = false;
}

global.maximizeModel = function(modelName) {
    // global.toggleFloorHints(false);
    global.toggle3DModel(modelName, true);
    setTimeout(function() {
        global.toggle3DModelSpecs(modelName, true);
    }, 1000);
    global.toggleSide([modelName], global.getModelInfo(modelName).side, false);
}

global.toggle3DModel = function(modelName, maximize) {
    var model = experience.currentScene.shapeByName(modelName + "_model");
    var modelInfo = global.getModelInfo(modelName);
    var sideConfig = global.data.sideConfig["side" + modelInfo.side];

    model.clearAnimations();

    if (maximize) {
        model.animateScale({
            to: modelInfo.scaleTo,
            easing: "cubicInOut",
            duration: 1
        });
        model.animatePosition({
            to: new Vector(sideConfig.model.position.x, sideConfig.model.position.y, sideConfig.model.position.z),
            easing: "cubicInOut",
            duration: 1
        });
        model.animateRotation({
            to: new Vector(model.rotation.x, modelInfo.rotationFrom.y + 360, model.rotation.z),
            easing: "cubicInOut",
            duration: 1
        });
        // setTimeout(function() {
        //     model.animateRotation({
        //         to: new Vector(model.rotation.x, model.rotation.y + 360, model.rotation.z),
        //         easing: "cubicInOut",
        //         duration: 8,
        //         loop: true
        //     });
        // }, 1100);
    } else {
        model.animateScale({
            to: modelInfo.scaleFrom,
            easing: "cubicInOut"
        });
        model.animatePosition({
            to: new Vector(modelInfo.positionFrom.x, modelInfo.positionFrom.y, modelInfo.positionFrom.z),
            easing: "cubicInOut",
            duration: 1
        });
        model.animateRotation({
            to: new Vector(model.rotation.x, modelInfo.rotationFrom.y - 15, model.rotation.z),
            easing: "cubicInOut",
            duration: 1
        });
        setTimeout(function() {
            model.animateRotation({
                to: new Vector(model.rotation.x, model.rotation.y + 15, model.rotation.z),
                easing: "cubicInOut",
                duration: 2.5,
                loop: true,
                yoyo: true
            });
        }, 1100);
    }
}

global.toggle3DModelSpecs = function(modelName, show) {
    var modelInfo = global.getModelInfo(modelName);

    var elButtonsEnabled = ["close", "button_tariff", "button_specs_selected", "button_shop", "button_vr"];
    var elButtonsDisabled = ["button_tariff_selected", "button_specs"];

    var elSpecsAll = ["tariff_back", "specs"];


    let info = experience.currentScene.shapeByName(modelName + "_button_info")
    let specs = experience.currentScene.shapeByName(modelName + "_specs")
    let infoBack = experience.currentScene.shapeByName(modelName + "_button_info_back")
    let specsNext = experience.currentScene.shapeByName(modelName + "_specs_next")


    if (show) {
        var element = experience.currentScene.shapeByName(modelName + "_specs");
        info.position = new Vector(info.position.x, info.position.y - 100, info.position.z)
        delay(
            function(){
                global.fadeIn(info)
            },1
        )
        if (element.position.y > 100) {
            var sideConfig = global.data.sideConfig["side" + modelInfo.side];
            element.position = new Vector(sideConfig.specs.position.x, sideConfig.specs.position.y, sideConfig.specs.position.z);
        }
        element.rotation = new Vector(0, modelInfo.side == 1 ? 90 : -90, 0);
        global.fadeIn(element);

        elButtonsEnabled.forEach(elementName => {
            
            var element = experience.currentScene.shapeByName("side" + modelInfo.side + "_" + elementName);
            if (element.position.y > 100) {
                element.position = new Vector(element.position.x, element.position.y - 100, element.position.z);
            }
            element.clickable = true;
            global.fadeIn(element);
        });
        elButtonsDisabled.forEach(elementName => {
            var element = experience.currentScene.shapeByName("side" + modelInfo.side + "_" + elementName);
            if (element.position.y > 100) {
                element.position = new Vector(element.position.x, element.position.y - 100, element.position.z);
            }
            element.alpha = 0;
            element.clickable = false;
        });
    } else {
        if(infoBack.position.y > 100){
            delay(
                function(){
                    info.position = new Vector(info.position.x, info.position.y + 100, info.position.z)
                    specs.position = new Vector(specs.position.x, specs.position.y + 100, specs.position.z)
                },1
            )
            

            global.fadeOut(info)
            global.fadeOut(specs)
            global.fadeOut(infoBack)
            global.fadeOut(specsNext)
        }else{
            delay(
                function(){
                    infoBack.position = new Vector(infoBack.position.x, infoBack.position.y + 100, infoBack.position.z)
                    specsNext.position = new Vector(specsNext.position.x, specsNext.position.y + 100, specsNext.position.z)
                },1
            )
            
            
            global.fadeOut(info)
            global.fadeOut(specs)
            global.fadeOut(infoBack)
            global.fadeOut(specsNext)
        }

        elSpecsAll.forEach(elementName => {
            var element = experience.currentScene.shapeByName(modelName + "_" + elementName);
            global.fadeOut(element);
            if (element.position.y < 100) {
                setTimeout(function() {
                    element.position = new Vector(element.position.x, element.position.y + 100, element.position.z);
                }, 1000);
            };
        });
        elButtonsEnabled.forEach(elementName => {
            var element = experience.currentScene.shapeByName("side" + modelInfo.side + "_" + elementName);
            global.fadeOut(element);
            if (element.position.y < 100) {
                setTimeout(function() {
                    element.position = new Vector(element.position.x, element.position.y + 100, element.position.z);
                }, 1000);
            };
        });
        elButtonsDisabled.forEach(elementName => {
            var element = experience.currentScene.shapeByName("side" + modelInfo.side + "_" + elementName);
            global.fadeOut(element);
            if (element.position.y < 100) {
                setTimeout(function() {
                    element.position = new Vector(element.position.x, element.position.y + 100, element.position.z);
                }, 1000);
            };
        });
    }
}

global.toggleNextSpecs = function(name){
    let info = experience.currentScene.shapeByName(name + "_button_info")
    let specs = experience.currentScene.shapeByName(name + "_specs")
    let infoBack = experience.currentScene.shapeByName(name + "_button_info_back")
    let specsNext = experience.currentScene.shapeByName(name + "_specs_next")

    if(infoBack.position.y > 100){
        infoBack.position = new Vector(infoBack.position.x, infoBack.position.y - 100, infoBack.position.z)
        specsNext.position = new Vector(specsNext.position.x, specsNext.position.y - 100, specsNext.position.z)
        info.position = new Vector(info.position.x, info.position.y + 100, info.position.z)
        specs.position = new Vector(specs.position.x, specs.position.y + 100, specs.position.z)
    }else{
        infoBack.position = new Vector(infoBack.position.x, infoBack.position.y + 100, infoBack.position.z)
        specsNext.position = new Vector(specsNext.position.x, specsNext.position.y + 100, specsNext.position.z)
        info.position = new Vector(info.position.x, info.position.y - 100, info.position.z)
        specs.position = new Vector(specs.position.x, specs.position.y - 100, specs.position.z)
    }
}

global.toggleSide = function(modelExceptions, side, show) {
    var elements = ["model", "title", "btn_specs", "btn_eshop", "btn_compare", "btn_specs_text", "btn_shop_text", "btn_compare_text"];
    global.data.models.forEach(m => {
        if (m.side == side) {
            elements.forEach(elementName => {
                if (modelExceptions.indexOf(m.name) >= 0 && elementName == "model") {
                    // Nada, el model se sigue mostrando?
                } else {
                    var element = experience.currentScene.shapeByName(m.name + "_" + elementName);
                    if (show) {
                        element.clickable = true;
                        global.fadeIn(element);
                    } else {
                        element.clickable = false;
                        global.fadeOut(element);
                    }
                }
            });
        }
    });
}

// global.toggleFloorHints = function(show) {
//     if (show) {
//         global.fadeIn(experience.backgroundScene.shapeByName("side1_floor_hand"));
//         global.fadeIn(experience.backgroundScene.shapeByName("side1_floor_text"));
//         global.fadeIn(experience.backgroundScene.shapeByName("side2_floor_hand"));
//         global.fadeIn(experience.backgroundScene.shapeByName("side2_floor_text"));
//     } else {
//         global.fadeOut(experience.backgroundScene.shapeByName("side1_floor_hand"));
//         global.fadeOut(experience.backgroundScene.shapeByName("side1_floor_text"));
//         global.fadeOut(experience.backgroundScene.shapeByName("side2_floor_hand"));
//         global.fadeOut(experience.backgroundScene.shapeByName("side2_floor_text"));
//     }
// }

global.closeModel = function() {
    global.minimizeModel(global.data.currentModelName);
}

global.toggleModelSpecs = function(showTariff) {

    if (global.data.currentSpecsAreToggling)
    return;
    
    var modelName = global.data.currentModelName;
    let info = experience.currentScene.shapeByName(modelName + "_button_info")
    let specs = experience.currentScene.shapeByName(modelName + "_specs")
    let infoBack = experience.currentScene.shapeByName(modelName + "_button_info_back")
    let specsNext = experience.currentScene.shapeByName(modelName + "_specs_next")

    if ((!global.data.currentSpecsModeIsTariff && showTariff) || (global.data.currentSpecsModeIsTariff && !showTariff)) {
        global.data.currentSpecsAreToggling = true;
        global.data.currentSpecsModeIsTariff = !global.data.currentSpecsModeIsTariff;

        if (showTariff) {
            if(infoBack.position.y > 100){
                info.position = new Vector(info.position.x, info.position.y + 100, info.position.z)
                specs.position = new Vector(specs.position.x, specs.position.y + 100, specs.position.z)
            }else{
                infoBack.position = new Vector(infoBack.position.x, infoBack.position.y + 100, infoBack.position.z)
                specsNext.position = new Vector(specsNext.position.x, specsNext.position.y + 100, specsNext.position.z)
            }
            var element = experience.currentScene.shapeByName(modelName + "_specs");
            global.fadeOut(element);
            if (element.position.y < 100) {
                setTimeout(function() {
                    element.position = new Vector(element.position.x, element.position.y + 100, element.position.z);
                }, 1000);
            };
            setTimeout(function() {
                ["tariff_back"].forEach(elementName => {
                    var element = experience.currentScene.shapeByName(modelName + "_" + elementName);
                    if (element.position.y > 100) {
                        element.position = new Vector(element.position.x, element.position.y - 100, element.position.z);
                    }
                    element.clickable = true;
                    global.fadeIn(element);
                });
            }, 300);
        } else {
            info.position = new Vector(info.position.x, info.position.y - 100, info.position.z)
            
                var element = experience.currentScene.shapeByName(modelName + "_" + "tariff_back");
                element.clickable = false;
                global.fadeOut(element);
                if (element.position.y < 100) {
                    setTimeout(function() {
                        element.position = new Vector(element.position.x, element.position.y + 100, element.position.z);
                    }, 1000);
                };
            

            setTimeout(function() {
                var element = experience.currentScene.shapeByName(modelName + "_specs");
                if (element.position.y > 100) {
                    element.position = new Vector(element.position.x, element.position.y - 100, element.position.z);
                }
                global.fadeIn(element);
            }, 300);
        }

        var modelSide = global.getModelInfo(modelName).side;
        var buttonSpecs = experience.currentScene.shapeByName("side" + modelSide + "_button_specs");
        var buttonSpecsSelected = experience.currentScene.shapeByName("side" + modelSide + "_button_specs_selected");
        var buttonTariff = experience.currentScene.shapeByName("side" + modelSide + "_button_tariff");
        var buttonTariffSelected = experience.currentScene.shapeByName("side" + modelSide + "_button_tariff_selected");

        buttonSpecs.alpha = showTariff ? 1 : 0;
        buttonSpecs.clickable = showTariff;
        buttonSpecsSelected.alpha = showTariff ? 0 : 1;
        buttonSpecsSelected.clickable = !showTariff;
        buttonTariff.alpha = showTariff ? 0 : 1;
        buttonTariff.clickable = !showTariff;
        buttonTariffSelected.alpha = showTariff ? 1 : 0;
        buttonTariffSelected.clickable = showTariff;

        setTimeout(function() {
            global.data.currentSpecsAreToggling = false;
        }, 1000);
    }
}

global.addModelToComparison = function(obj) {
    var modelName = obj.name.substring(0, obj.name.indexOf("_"));

    if (!global.data.comparisonMode) {
        global.data.comparisonMode = true;

        // Se ocultan todos los botones, de aca en mas solo se puede comparar
        var elements = ["btn_specs", "btn_eshop", "btn_shop_text", "btn_specs_text"];
        global.data.models.forEach(m => {
            elements.forEach(elementName => {
                var element = experience.currentScene.shapeByName(m.name + "_" + elementName);
                element.clickable = false;
                global.fadeOut(element);
            });
        });
    }

    if (global.data.comparisonModelName1 == null) {
        global.data.comparisonModelName1 = modelName;
        global.freezeAllModels();
        global.showComparisonInitialDialog();
    } else if (global.data.comparisonModelName2 == null && modelName != global.data.comparisonModelName1) {
        global.data.comparisonModelName2 = modelName;
        global.showComparisonLastDialog();
    }
}

global.showComparisonInitialDialog = function() {
    var modelInfo = global.getModelInfo(global.data.comparisonModelName1);
    var modelCompareButton = experience.currentScene.shapeByName(global.data.comparisonModelName1 + "_btn_compare");

    var firstSelectedPlceholder = experience.currentScene.shapeByName("compare_first_selected");
    firstSelectedPlceholder.position = new Vector(modelCompareButton.position.x, modelCompareButton.position.y, modelCompareButton.position.z);
    firstSelectedPlceholder.rotation = new Vector(modelCompareButton.rotation.x, modelCompareButton.rotation.y, modelCompareButton.rotation.z);
    firstSelectedPlceholder.alpha = 1;
    modelCompareButton.alpha = 0;
    modelCompareButton.clickable = false;

    var dialog = experience.currentScene.shapeByName("compare_first_back");
    dialog.position = new Vector(modelCompareButton.position.x, modelCompareButton.position.y + 0.75, modelCompareButton.position.z);
    dialog.rotation = new Vector(0, modelInfo.side == 1 ? 90 : -90, 0);
    global.fadeIn(dialog);
}

global.showComparisonLastDialog = function() {
    var modelInfo = global.getModelInfo(global.data.comparisonModelName2);
    var modelCompareButton = experience.currentScene.shapeByName(global.data.comparisonModelName2 + "_btn_compare");

    var secondSelectedPlceholder = experience.currentScene.shapeByName("compare_second_selected");
    secondSelectedPlceholder.position = new Vector(modelCompareButton.position.x, modelCompareButton.position.y, modelCompareButton.position.z);
    secondSelectedPlceholder.rotation = new Vector(modelCompareButton.rotation.x, modelCompareButton.rotation.y, modelCompareButton.rotation.z);
    secondSelectedPlceholder.alpha = 1;
    modelCompareButton.alpha = 0;
    modelCompareButton.clickable = false;

    var dialog = experience.currentScene.shapeByName("compare_second_back");
    dialog.position = new Vector(modelCompareButton.position.x, modelCompareButton.position.y + 0.75, modelCompareButton.position.z);
    dialog.rotation = new Vector(0, modelInfo.side == 1 ? 90 : -90, 0);
    global.fadeIn(dialog);

    var deltaXButton = modelInfo.side == 1 ? 0.02 : -0.02;
    var button = experience.currentScene.shapeByName("compare_second_button");
    button.position = new Vector(modelCompareButton.position.x + deltaXButton, modelCompareButton.position.y + 0.64, modelCompareButton.position.z);
    button.rotation = new Vector(0, modelInfo.side == 1 ? 90 : -90, 0);
    global.fadeIn(button);
}

global.hideComparisonDialogs = function() {
    experience.currentScene.shapeByName("compare_first_selected").alpha = 0;
    experience.currentScene.shapeByName("compare_second_selected").alpha = 0;

    var modelCompareButton1 = experience.currentScene.shapeByName(global.data.comparisonModelName1 + "_btn_compare");
    modelCompareButton1.alpha = 1;
    modelCompareButton1.clickable = true;

    var modelCompareButton2 = experience.currentScene.shapeByName(global.data.comparisonModelName2 + "_btn_compare");
    modelCompareButton2.alpha = 1;
    modelCompareButton2.clickable = true;

    var dialogFirst = experience.currentScene.shapeByName("compare_first_back");
    global.fadeOut(dialogFirst);
    var dialogSecond = experience.currentScene.shapeByName("compare_second_back");
    global.fadeOut(dialogSecond);
    var dialogSecondButton = experience.currentScene.shapeByName("compare_second_button");
    global.fadeOut(dialogSecondButton);

    setTimeout(function() {
        dialogFirst.position = new Vector(dialogFirst.position.x, 100, dialogFirst.position.z);
        dialogSecond.position = new Vector(dialogSecond.position.x, 100, dialogSecond.position.z);
        dialogSecondButton.position = new Vector(dialogSecondButton.position.x, 100, dialogSecondButton.position.z);
    }, 1000);
}

global.compareModels = function() {
    // global.toggleFloorHints(false);
    global.hideComparisonDialogs();

    var firstModel = global.getModelInfo(global.data.comparisonModelName1);
    var secondModel = global.getModelInfo(global.data.comparisonModelName2);

    if (firstModel.side == secondModel.side) {
        global.toggleSide([firstModel.name, secondModel.name], firstModel.side, false);
        global.toggleSide([], firstModel.side == 1 ? 2 : 1, false);
    } else {
        global.toggleSide([firstModel.name], firstModel.side, false);
        global.toggleSide([secondModel.name], secondModel.side, false);
    }

    global.toggle3DModelForComparison(firstModel.name, true, secondModel.side, true);
    global.toggle3DModelForComparison(secondModel.name, false, secondModel.side, true);

    setTimeout(function() {
        global.toggle3DModelSpecsForComparison(firstModel.name, true, secondModel.side, true);
        global.toggle3DModelSpecsForComparison(secondModel.name, false, secondModel.side, true);
        global.toggleCloseForComparison(secondModel.side, true);
    }, 1000);
}

global.freezeAllModels = function() {
    global.data.models.forEach(m => {
        experience.currentScene.shapeByName(m.name + "_model").animateRotation({
            to: new Vector(m.rotationFrom.x, m.rotationFrom.y, m.rotationFrom.z),
            duration: 0.5,
            easing: "cubicInOut"
        });
    });
}

global.toggleCloseForComparison = function(side, show) {
    
    var close = experience.currentScene.shapeByName("side" + side + "_comparison_close");
    if (show) {
        if (close.position.y > 100) {
            close.position = new Vector(close.position.x, close.position.y - 100, close.position.z);
        }
        close.clickable = true;
        global.fadeIn(close);
    } else {
        close.clickable = false;
        global.fadeOut(close);
        if (close.position < 100) {
            setTimeout(function() {
                close.position = new Vector(close.position.x, close.position.y + 100, close.position.z);
            }, 1000);
        }
    }
}

global.toggle3DModelForComparison = function(modelName, isFirst, side, maximize) {
    if(side == 2){
        side = side-1
    }else{
        side = side+1
    }
    var model = experience.currentScene.shapeByName(modelName + "_model");
    var modelInfo = global.getModelInfo(modelName);
    var comparisonSideConfig = global.data.comparisonConfig["side" + side][isFirst ? "first" : "second"];

    model.clearAnimations();

    if (maximize) {
        model.animateScale({
            to: modelInfo.scaleToComparison,
            easing: "cubicInOut",
            duration: 1
        });
        model.animatePosition({
            to: new Vector(comparisonSideConfig.model.position.x, modelInfo.comparisonY, comparisonSideConfig.model.position.z),
            easing: "cubicInOut",
            duration: 1
        });
        model.animateRotation({
            to: new Vector(model.rotation.x, modelInfo.rotationFrom.y + 360, model.rotation.z),
            easing: "cubicInOut",
            duration: 1
        });
        setTimeout(function() {
            model.animateRotation({
                to: new Vector(model.rotation.x, model.rotation.y + 360, model.rotation.z),
                easing: "cubicInOut",
                duration: 8,
                loop: true
            });
        }, 1100);
    } else {
        model.animateScale({
            to: modelInfo.scaleFrom,
            easing: "cubicInOut",
        });
        model.animatePosition({
            to: new Vector(modelInfo.positionFrom.x, modelInfo.positionFrom.y, modelInfo.positionFrom.z),
            easing: "cubicInOut",
            duration: 1
        });
        model.animateRotation({
            to: new Vector(model.rotation.x, modelInfo.rotationFrom.y - 15, model.rotation.z),
            easing: "cubicInOut",
            duration: 1
        });
        setTimeout(function() {
            model.animateRotation({
                to: new Vector(model.rotation.x, model.rotation.y + 15, model.rotation.z),
                easing: "cubicInOut",
                duration: 2.5,
                loop: true,
                yoyo: true
            });
        }, 1100);
    }
}

global.toggle3DModelSpecsForComparison = function(modelName, isFirst, side, show) {
    if(side == 2){
        side = side-1
    }else{
        side = side+1
    }
    var comparisonSideConfig = global.data.comparisonConfig["side" + side][isFirst ? "first" : "second"];
    var comparisonButtonSideConfig = global.data.comparisonConfig["side" + side]
    var specs = experience.currentScene.shapeByName(modelName + "_specs_compare");
    var specs2 = experience.currentScene.shapeByName(modelName + "_specs_compare_next")
    var moreInfo = experience.currentScene.shapeByName("comparison_button_info")
    var moreInfo2 = experience.currentScene.shapeByName("comparison_button_info_back")

    if (show) {
        specs.position = new Vector(comparisonSideConfig.specs.position.x, comparisonSideConfig.specs.position.y, comparisonSideConfig.specs.position.z);
        specs.rotation = new Vector(0, side == 1 ? -90 : 90, 0);
        specs.scale = comparisonSideConfig.specs.scale;
        moreInfo.position = new Vector(comparisonButtonSideConfig.button.position.x, comparisonButtonSideConfig.button.position.y, comparisonButtonSideConfig.button.position.z)
        moreInfo.rotation = new Vector(0, side == 1 ? -90 : 90, 0);
        global.fadeIn(specs);
        global.fadeIn(moreInfo)
    } else {
        global.fadeOut(specs);
        global.fadeOut(specs2);
        global.fadeOut(moreInfo);
        global.fadeOut(moreInfo2);
        moreInfo.position = new Vector(moreInfo.position.x, 100, moreInfo.position.z);
        moreInfo2.position = new Vector(moreInfo2.position.x, 100, moreInfo2.position.z);
        setTimeout(function() {
            specs.position = new Vector(specs.position.x, 103.70, specs.position.z);
            specs2.position = new Vector(specs2.position.x, 103.70, specs2.position.z);
        }, 1000);
    }
}

global.comparisonSpecsToggle = function(model1, model2){
    let firstSpecs_1 = experience.currentScene.shapeByName(model1 + "_specs_compare")
    let firstSpecs_2 = experience.currentScene.shapeByName(model1 + "_specs_compare_next")
    let secondSpecs_1 = experience.currentScene.shapeByName(model2 + "_specs_compare")
    let secondSpecs_2 = experience.currentScene.shapeByName(model2 + "_specs_compare_next")
    let moreInfo_1 = experience.currentScene.shapeByName("comparison_button_info")
    let moreInfo_2 = experience.currentScene.shapeByName("comparison_button_info_back")

    let firstSpecs_1_position = new Vector(firstSpecs_1.position.x, firstSpecs_1.position.y, firstSpecs_1.position.z)
    let firstSpecs_2_position = new Vector(firstSpecs_2.position.x, firstSpecs_2.position.y, firstSpecs_2.position.z)
    let secondSpecs_1_position = new Vector(secondSpecs_1.position.x, secondSpecs_1.position.y, secondSpecs_1.position.z)
    let secondSpecs_2_position = new Vector(secondSpecs_2.position.x, secondSpecs_2.position.y, secondSpecs_2.position.z)
    let moreInfo_1_position = new Vector(moreInfo_1.position.x, moreInfo_1.position.y, moreInfo_1.position.z)
    let moreInfo_2_position = new Vector(moreInfo_2.position.x, moreInfo_2.position.y, moreInfo_2.position.z)

    let firstSpecs_1_rotation = new Vector(firstSpecs_1.rotation.x, firstSpecs_1.rotation.y, firstSpecs_1.rotation.z)
    let firstSpecs_2_rotation = new Vector(firstSpecs_2.rotation.x, firstSpecs_2.rotation.y, firstSpecs_2.rotation.z)
    let secondSpecs_1_rotation = new Vector(secondSpecs_1.rotation.x, secondSpecs_1.rotation.y, secondSpecs_1.rotation.z)
    let secondSpecs_2_rotation = new Vector(secondSpecs_2.rotation.x, secondSpecs_2.rotation.y, secondSpecs_2.rotation.z)
    let moreInfo_1_rotation = new Vector(moreInfo_1.rotation.x, moreInfo_1.rotation.y, moreInfo_1.rotation.z)
    let moreInfo_2_rotation = new Vector(moreInfo_2.rotation.x, moreInfo_2.rotation.y, moreInfo_2.rotation.z)

    firstSpecs_2.position = new Vector(firstSpecs_1_position.x, firstSpecs_1_position.y, firstSpecs_1_position.z)
    firstSpecs_1.position = new Vector(firstSpecs_2_position.x, firstSpecs_2_position.y, firstSpecs_2_position.z)
    secondSpecs_2.position = new Vector(secondSpecs_1_position.x, secondSpecs_1_position.y, secondSpecs_1_position.z)
    secondSpecs_1.position = new Vector(secondSpecs_2_position.x, secondSpecs_2_position.y, secondSpecs_2_position.z)
    moreInfo_2.position = new Vector(moreInfo_1_position.x, moreInfo_1_position.y, moreInfo_1_position.z)
    moreInfo_1.position = new Vector(moreInfo_2_position.x, moreInfo_2_position.y, moreInfo_2_position.z)
    
    firstSpecs_2.rotation = new Vector(firstSpecs_1_rotation.x, firstSpecs_1_rotation.y, firstSpecs_1_rotation.z)
    firstSpecs_1.rotation = new Vector(firstSpecs_2_rotation.x, firstSpecs_2_rotation.y, firstSpecs_2_rotation.z)
    secondSpecs_2.rotation = new Vector(secondSpecs_1_rotation.x, secondSpecs_1_rotation.y, secondSpecs_1_rotation.z)
    secondSpecs_1.rotation = new Vector(secondSpecs_2_rotation.x, secondSpecs_2_rotation.y, secondSpecs_2_rotation.z)
    moreInfo_2.rotation = new Vector(moreInfo_1_rotation.x, moreInfo_1_rotation.y, moreInfo_1_rotation.z)
    moreInfo_1.rotation = new Vector(moreInfo_2_rotation.x, moreInfo_2_rotation.y, moreInfo_2_rotation.z)
    
    

    firstSpecs_2.alpha = 1
    firstSpecs_1.alpha = 1
    secondSpecs_2.alpha = 1
    secondSpecs_1.alpha = 1

    firstSpecs_2.alpha = 1
    firstSpecs_1.alpha = 1
    secondSpecs_2.alpha = 1
    secondSpecs_1.alpha = 1
    
    moreInfo_2.alpha = 1
    moreInfo_1.alpha = 1
}

global.exitComparisonMode = function() {
    // global.toggleFloorHints(true);
    global.animateAllModels();

    var firstModel = global.getModelInfo(global.data.comparisonModelName1);
    var secondModel = global.getModelInfo(global.data.comparisonModelName2);

    if (firstModel.side == secondModel.side) {
        global.toggleSide([firstModel.name, secondModel.name], firstModel.side, true);
        global.toggleSide([], firstModel.side == 1 ? 2 : 1, true);
    } else {
        global.toggleSide([firstModel.name], firstModel.side, true);
        global.toggleSide([secondModel.name], secondModel.side, true);
    }

    global.toggle3DModelForComparison(firstModel.name, true, secondModel.side, false);
    global.toggle3DModelSpecsForComparison(firstModel.name, true, secondModel.side, false);
    global.toggle3DModelForComparison(secondModel.name, false, secondModel.side, false);
    global.toggle3DModelSpecsForComparison(secondModel.name, false, secondModel.side, false);
    global.toggleCloseForComparison(secondModel.side, false);

    // Se vuelven a mostrar todos los botones
    var elements = ["btn_specs", "btn_eshop", "btn_compare_text", "btn_specs_text"];
    global.data.models.forEach(m => {
        elements.forEach(elementName => {
            var element = experience.currentScene.shapeByName(m.name + "_" + elementName);
            element.clickable = true;
            global.fadeIn(element);
        });
    });

    global.data.comparisonMode = false;
    global.data.comparisonModelName1 = null;
    global.data.comparisonModelName2 = null;
}
