global.cancion = experience.backgroundScene.shapeByName("cancion_inicial")
global.cancion.play()

global.girasol1_Background = experience.backgroundScene.shapeByName("Girasol_Pack_Clasico.zip")
global.girasol2_Background = experience.backgroundScene.shapeByName("Girasol_Pack_Clasico2.zip")
global.assetBackground = experience.backgroundScene.shapeByName("Logo-Girasol.png Clon Clon Clon")
global.instructivoBackGround = experience.backgroundScene.shapeByName("Instructivo.png Clon Clon Clon")
global.patacon = experience.backgroundScene.shapeByName("Patacon.png Clon Clon Clon")
global.verduras = experience.backgroundScene.shapeByName("Verduras.png Clon Clon Clon")
global.verdurasblur = experience.backgroundScene.shapeByName("Verduras blur.png Clon Clon Clon")
global.light = experience.backgroundScene.shapeByName("Luz.png Clon Clon Clon")
global.title = experience.backgroundScene.shapeByName("title")
global.pollo1 = experience.backgroundScene.shapeByName("pollo1")
global.pollo2 = experience.backgroundScene.shapeByName("pollo2")

global.animateBackground = () =>{
    global.girasol1_Background.scale = 0
    global.girasol2_Background.scale = 0
    global.assetBackground.scale = 0
    global.instructivoBackGround.scale = 0
    global.patacon.scale = 0
    global.verduras.scale = 0
    global.verdurasblur.scale = 0
    global.light.scale = 0
    global.title.scale = 0
    global.pollo1.scale =0
    global.pollo2.scale =0

    global.showBackground()








    global.girasol1_Background.animateScale({
        start: 0.50,
        to: 3.10,
        duration: 1,
        easing: "cubicOut"
    })
    global.girasol2_Background.animateScale({
        start: 0.50,
        to: 2.81,
        duration: 1,
        easing: "cubicOut"
    })
    global.assetBackground.animateScale({
        start: 0,
        to: 0.18,
        duration: 1,
        easing: "cubicOut"
    })
    global.instructivoBackGround.animateScale({
        start: 0.50,
        to: 0.22,
        duration: 1,
        easing: "cubicOut"
    })

    global.patacon.animateScale({
        start: 0.80,
        to: 0.30,
        duration: 1,
        easing: "elasticOutBig"
    })
    global.verduras.animateScale({
        start: 0.80,
        to: 0.30,
        duration: 1,
        easing: "elasticOutBig"
    })
    global.verdurasblur.animateScale({
        start: 0.80,
        to: 0.30,
        duration: 1,
        easing: "elasticOutBig"
    })
    global.light.animateScale({
        start: 0,
        to: 0.18,
        duration: 1,
        easing: "cubicOut"
    })
    global.title.animateScale({
        start: 1,
        to: 0.18,
        duration: 1,
        easing: "cubicOut"
    })
    global.pollo1.animateScale({
        start: 0.80,
        to: 0.18,
        duration: 1,
        easing: "elasticOutBig"
    })
    global.pollo2.animateScale({
        start: 0.80,
        to: 0.18,
        duration: 1,
        easing: "elasticOutBig"
    })
}
global.scale2 = () =>{
    global.girasol2_Background.scale=0
}
global.hideBackground = () =>{
    global.scale2()
    global.girasol1_Background.hide()
    global.girasol2_Background.hide()
    global.girasol2_Background.hide()
    global.assetBackground.hide()
    global.instructivoBackGround.hide()
    global.patacon.hide()
    global.verduras.hide()
    global.verdurasblur.hide()
    global.light.hide()
    global.title.hide()
    global.pollo1.hide()
    global.pollo2.hide()
}
global.showBackground = () =>{
    global.girasol1_Background.show()
    global.girasol2_Background.show()
    global.assetBackground.show()
    global.instructivoBackGround.show()
    global.patacon.show()
    global.verduras.show()
    global.verdurasblur.show()
    global.light.show()
    global.title.show()
    global.pollo1.show()
    global.pollo2.show()
}