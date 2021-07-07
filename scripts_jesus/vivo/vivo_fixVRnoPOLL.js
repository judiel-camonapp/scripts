
global.data.comparisonMode = false;
global.data.comparisonModelName1 = null;
global.data.comparisonModelName2 = null;
global.data.comparisonMode = false;
global.data.currentModelName = null;
global.data.currentSpecsModeIsVideo = false;
global.data.currentSpecsAreToggling = false;
global.data.sideConfig = {
    side1: {
        model: {
            position: { x: -1.99, y: 2.79, z: 0.93 }
        },
        specs: {
            position: { x: -2.55, y: 2.79, z: -0.59 }
        }
    },
    side2: {
        model: {
            position: { x: 1.99, y: 2.79, z: -0.93 }
        },
        specs: {
            position: { x: 2.55, y: 2.79, z: 0.59 }
        }
    }
}
global.data.models = [{
        name: "s20",
        side: 2,
        scaleFrom: 12,
        scaleTo: 16,
        scaleToComparison: 6,
        comparisonY: 4.5,
        positionFrom: { x: 3, y: 3.44, z: -0.9 },
        rotationFrom: { x: 0, y: -90, z: 0 },
        rotationTo: { x: 0, y: -450, z: 0 }
    },
    {
        name: "note",
        side: 2,
        scaleFrom: 12,
        scaleTo: 16,
        scaleToComparison: 6,
        comparisonY: 4.5,
        positionFrom: { x: 3, y: 3.44, z: 0.9 },
        rotationFrom: { x: 0, y: -90, z: 0 },
        rotationTo: { x: 0, y: -450, z: 0 }
    },
    {
        name: "a21",
        side: 1,
        scaleFrom: 12,
        scaleTo: 16,
        scaleToComparison: 6,
        comparisonY: 4.5,
        positionFrom: { x: -3, y: 3.44, z: 0 },
        rotationFrom: { x: 0, y: 90, z: 0 },
        rotationTo: { x: 0, y: 464, z: 0 }
    },
    {
        name: "a31",
        side: 1,
        scaleFrom: 12,
        scaleTo: 16,
        scaleToComparison: 6,
        comparisonY: 4.5,
        positionFrom: { x: -3, y: 3.44, z: -1.72 },
        rotationFrom: { x: 0, y: 90, z: 0 },
        rotationTo: { x: 0, y: 464, z: 0 }
    },
    {
        name: "fold",
        side: 1,
        scaleFrom: 12,
        scaleTo: 10,
        scaleToComparison: 6,
        comparisonY: 4.5,
        positionFrom: { x: -3, y: 3.44, z: 1.72 },
        rotationFrom: { x: 0, y: 0.1, z: 0 },
        rotationTo: { x: 0, y: 360, z: 0 }
    }
];
global.data.comparisonConfig = {
    side1: {
        first: {
            model: {
                position: { x: -2.22, y: 0, z: 1.07 }
            },
            specs: {
                position: { x: -2.55, y: 2.79, z: 1.2 },
                scale: 0.31
            }
        },
        second: {
            model: {
                position: { x: -2.14, y: 0, z: -1.07 }
            },
            specs: {
                position: { x: -2.55, y: 2.79, z: -1.22 },
                scale: 0.31
            }
        }
    },
    side2: {
        first: {
            model: {
                position: { x: 2.22, y: 0, z: -1.07 }
            },
            specs: {
                position: { x: 2.55, y: 2.79, z: -1.2 },
                scale: 0.31
            }
        },
        second: {
            model: {
                position: { x: 2.14, y: 0, z: 1.07 }
            },
            specs: {
                position: { x: 2.55, y: 2.79, z: 1.22 },
                scale: 0.31
            }
        }
    }
};

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
    experience.currentScene.shapeByName(modelName + "_video").stop();

    global.toggleFloorHints(true);
    global.toggle3DModel(modelName, false);
    global.toggle3DModelSpecs(modelName, false);
    global.toggleSide([modelName], global.getModelInfo(modelName).side, true);
    global.data.currentModelName = null;
    global.data.currentSpecsModeIsVideo = false;
}

global.maximizeModel = function(modelName) {
    global.toggleFloorHints(false);
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

    var elButtonsEnabled = ["close", "button_video", "button_specs_selected"];
    var elButtonsDisabled = ["button_video_selected", "button_specs"];

    var elSpecsAll = ["video", "video_back", "specs"];
    if (show) {
        var element = experience.currentScene.shapeByName(modelName + "_specs");
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

global.toggleSide = function(modelExceptions, side, show) {
    var elements = ["model", "title", "btn_specs", "btn_ar", "btn_compare", "btn_specs_arrow", "btn_ar_arrow", "btn_compare_arrow"];
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

global.toggleFloorHints = function(show) {
    if (show) {
        global.fadeIn(experience.backgroundScene.shapeByName("side1_floor_hand"));
        global.fadeIn(experience.backgroundScene.shapeByName("side1_floor_text"));
        global.fadeIn(experience.backgroundScene.shapeByName("side2_floor_hand"));
        global.fadeIn(experience.backgroundScene.shapeByName("side2_floor_text"));
    } else {
        global.fadeOut(experience.backgroundScene.shapeByName("side1_floor_hand"));
        global.fadeOut(experience.backgroundScene.shapeByName("side1_floor_text"));
        global.fadeOut(experience.backgroundScene.shapeByName("side2_floor_hand"));
        global.fadeOut(experience.backgroundScene.shapeByName("side2_floor_text"));
    }
}

global.closeModel = function() {
    global.minimizeModel(global.data.currentModelName);
}

global.toggleModelSpecs = function(showVideo) {
    if (global.data.currentSpecsAreToggling)
        return;

    var modelName = global.data.currentModelName;

    if ((!global.data.currentSpecsModeIsVideo && showVideo) || (global.data.currentSpecsModeIsVideo && !showVideo)) {
        global.data.currentSpecsAreToggling = true;
        global.data.currentSpecsModeIsVideo = !global.data.currentSpecsModeIsVideo;

        if (showVideo) {
            var element = experience.currentScene.shapeByName(modelName + "_specs");
            global.fadeOut(element);
            if (element.position.y < 100) {
                setTimeout(function() {
                    element.position = new Vector(element.position.x, element.position.y + 100, element.position.z);
                }, 1000);
            };
            setTimeout(function() {
                ["video", "video_back"].forEach(elementName => {
                    var element = experience.currentScene.shapeByName(modelName + "_" + elementName);
                    if (element.position.y > 100) {
                        element.position = new Vector(element.position.x, element.position.y - 100, element.position.z);
                    }
                    element.clickable = true;
                    global.fadeIn(element);
                });
            }, 300);
        } else {
            ["video", "video_back"].forEach(elementName => {
                var element = experience.currentScene.shapeByName(modelName + "_" + elementName);
                element.clickable = false;
                global.fadeOut(element);
                if (element.position.y < 100) {
                    setTimeout(function() {
                        element.position = new Vector(element.position.x, element.position.y + 100, element.position.z);
                    }, 1000);
                };
            });
            experience.currentScene.shapeByName(modelName + "_video").stop();

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
        var buttonVideo = experience.currentScene.shapeByName("side" + modelSide + "_button_video");
        var buttonVideoSelected = experience.currentScene.shapeByName("side" + modelSide + "_button_video_selected");

        buttonSpecs.alpha = showVideo ? 1 : 0;
        buttonSpecs.clickable = showVideo;
        buttonSpecsSelected.alpha = showVideo ? 0 : 1;
        buttonSpecsSelected.clickable = !showVideo;
        buttonVideo.alpha = showVideo ? 0 : 1;
        buttonVideo.clickable = !showVideo;
        buttonVideoSelected.alpha = showVideo ? 1 : 0;
        buttonVideoSelected.clickable = showVideo;

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
        var elements = ["btn_specs", "btn_ar", "btn_specs_arrow", "btn_ar_arrow"];
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
    dialog.position = new Vector(modelCompareButton.position.x, modelCompareButton.position.y + 0.65, modelCompareButton.position.z);
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
    global.toggleFloorHints(false);
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
    var comparisonSideConfig = global.data.comparisonConfig["side" + side][isFirst ? "first" : "second"];
    var specs = experience.currentScene.shapeByName(modelName + "_specs");

    if (show) {
        specs.position = new Vector(comparisonSideConfig.specs.position.x, comparisonSideConfig.specs.position.y, comparisonSideConfig.specs.position.z);
        specs.rotation = new Vector(0, side == 1 ? 90 : -90, 0);
        specs.scale = comparisonSideConfig.specs.scale;
        global.fadeIn(specs);
    } else {
        global.fadeOut(specs);
        setTimeout(function() {
            specs.position = new Vector(specs.position.x, specs.position.y + 100, specs.position.z);
        }, 1000);
    }
}

global.exitComparisonMode = function() {
    global.toggleFloorHints(true);
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
    var elements = ["btn_specs", "btn_ar", "btn_specs_arrow", "btn_ar_arrow"];
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

