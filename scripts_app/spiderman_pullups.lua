
local lastNumber

function unlockScene()
    local lastUnlocked

    if this.name == "btndiscover_video1" then
        lastUnlocked = "Video_1"
        setUserPreference("lastNumber", lastNumber)
        setUserPreference(getUserPreference("lastNumber"), lastUnlocked)
        print(lastNumber)
        print(getUserPreference(lastNumber))
    elseif  this.name == "btndiscover_video2" then
        lastUnlocked = "Video_2"
        setUserPreference("lastNumber", lastNumber)
        setUserPreference(getUserPreference("lastNumber"), lastUnlocked)
        print(lastNumber)
        print(getUserPreference(lastNumber))
    elseif  this.name == "btndiscover_video3" then
        lastUnlocked = "Video_3"
        setUserPreference("lastNumber", lastNumber)
        setUserPreference(getUserPreference("lastNumber"), lastUnlocked)
        print(lastNumber)
        print(getUserPreference(lastNumber))
    elseif  this.name == "btndiscover_wallpaper1" then
        lastUnlocked = "Wallpaper_1"
        setUserPreference("lastNumber", lastNumber)
        setUserPreference(getUserPreference("lastNumber"), lastUnlocked)
        print(lastNumber)
        print(getUserPreference(lastNumber))
    elseif  this.name == "btndiscover_wallpaper2" then
        lastUnlocked = "Wallpaper_2"
        setUserPreference("lastNumber", lastNumber)
        setUserPreference(getUserPreference("lastNumber"), lastUnlocked)
        print(lastNumber)
        print(getUserPreference(lastNumber))
    elseif  this.name == "btndiscover_photo1" then
        lastUnlocked = "Photo_1"
        setUserPreference("lastNumber", lastNumber)
        setUserPreference(getUserPreference("lastNumber"), lastUnlocked)
        print(lastNumber)
        print(getUserPreference(lastNumber))
    elseif  this.name == "btndiscover_photo2" then
        lastUnlocked = "Photo_2"
        setUserPreference("lastNumber", lastNumber)
        setUserPreference(getUserPreference("lastNumber"), lastUnlocked)
        print(lastNumber)
        print(getUserPreference(lastNumber))
    elseif  this.name == "btndiscover_selfie" then
        lastUnlocked = "Selfie"
        setUserPreference("lastNumber", lastNumber)
        setUserPreference(getUserPreference("lastNumber"), lastUnlocked)
        print(lastNumber)
        print(getUserPreference(lastNumber))
    else
        local currentNumber = lastNumber
        lastUnlocked = "Memotest"
        setUserPreference("lastNumber", lastNumber)
        setUserPreference(getUserPreference("lastNumber"), lastUnlocked)
    end
end
function attachNumber()
    lastNumber = this.name
    
    print(getUserPreference("lastNumber"))
end

function initBoard()

    -- Botones accesibles
    local btn_1 = experience.currentScene:shapeByName("btn1.png")
    local btn_2 = experience.currentScene:shapeByName("btn2.png")
    local btn_3 = experience.currentScene:shapeByName("btn3.png")
    local btn_4 = experience.currentScene:shapeByName("btn4.png")
    local btn_5 = experience.currentScene:shapeByName("btn5.png")
    local btn_6 = experience.currentScene:shapeByName("btn6.png")
    local btn_7 = experience.currentScene:shapeByName("btn7.png")
    local btn_8 = experience.currentScene:shapeByName("btn8.png")
    local btn_9 = experience.currentScene:shapeByName("btn9.png")

    -- Botones accedidos
    local btn_1_accesible = experience.currentScene:shapeByName("btn1yellow.png")
    local btn_2_accesible = experience.currentScene:shapeByName("btn2yellow.png")
    local btn_3_accesible = experience.currentScene:shapeByName("btn3yellow.png")
    local btn_4_accesible = experience.currentScene:shapeByName("btn4yellow.png")
    local btn_5_accesible = experience.currentScene:shapeByName("btn5yellow.png")
    local btn_6_accesible = experience.currentScene:shapeByName("btn6yellow.png")
    local btn_7_accesible = experience.currentScene:shapeByName("btn7yellow.png")
    local btn_8_accesible = experience.currentScene:shapeByName("btn8yellow.png")
    local btn_9_accesible = experience.currentScene:shapeByName("btn9yellow.png")

    -- Botones Bloqueados
    local btn_1_blocked = experience.currentScene:shapeByName("btn1grey.png")
    local btn_2_blocked = experience.currentScene:shapeByName("btn2grey.png")
    local btn_3_blocked = experience.currentScene:shapeByName("btn3grey.png")
    local btn_4_blocked = experience.currentScene:shapeByName("btn4grey.png")
    local btn_5_blocked = experience.currentScene:shapeByName("btn5grey.png")
    local btn_6_blocked = experience.currentScene:shapeByName("btn6grey.png")
    local btn_7_blocked = experience.currentScene:shapeByName("btn7grey.png")
    local btn_8_blocked = experience.currentScene:shapeByName("btn8grey.png")
    local btn_9_blocked = experience.currentScene:shapeByName("btn9grey.png")

    
    -- Swap de posiciones
    function swapPositions(obj1, obj2)
        local position_1 = obj1.position
        local position_2 = obj2.position
        obj2:animatePosition(Vector:new(position_1.x, position_1.y, position_1.z), 0.1, "linear", 0, false, false) 
        obj1:animatePosition(Vector:new(position_2.x, position_2.y, position_2.z), 0.1, "linear", 0, false, false)
        
        
    end

    if getUserPreference("lastNumber")  == btn_1.name then
        print(btn_2.name)
        swapPositions(btn_1, btn_1_accesible)
        swapPositions(btn_3, btn_3_blocked)
        swapPositions(btn_4, btn_4_blocked)
        swapPositions(btn_5, btn_5_blocked)
        swapPositions(btn_6, btn_6_blocked)
        swapPositions(btn_7, btn_7_blocked)
        swapPositions(btn_8, btn_8_blocked)
        swapPositions(btn_9, btn_9_blocked)

    elseif getUserPreference("lastNumber") == btn_2.name then
        print(btn_2.name)
        print(getUserPreference("lastNumber"))
        swapPositions(btn_1, btn_1_accesible)
        swapPositions(btn_2, btn_2_accesible)
        swapPositions(btn_4, btn_4_blocked)
        swapPositions(btn_5, btn_5_blocked)
        swapPositions(btn_6, btn_6_blocked)
        swapPositions(btn_7, btn_7_blocked)
        swapPositions(btn_8, btn_8_blocked)
        swapPositions(btn_9, btn_9_blocked)
    elseif getUserPreference("lastNumber") == btn_3.name then
        print(btn_3.name)
        print(getUserPreference("lastNumber"))
        swapPositions(btn_1, btn_1_accesible)
        swapPositions(btn_2, btn_2_accesible)
        swapPositions(btn_3, btn_3_accesible)
        swapPositions(btn_5, btn_5_blocked)
        swapPositions(btn_6, btn_6_blocked)
        swapPositions(btn_7, btn_7_blocked)
        swapPositions(btn_8, btn_8_blocked)
        swapPositions(btn_9, btn_9_blocked)
    elseif getUserPreference("lastNumber")  == btn_4.name then
        print(btn_4.name)
        print(getUserPreference("lastNumber"))
        swapPositions(btn_1, btn_1_accesible)
        swapPositions(btn_2, btn_2_accesible)
        swapPositions(btn_3, btn_3_accesible)
        swapPositions(btn_4, btn_4_accesible)
        swapPositions(btn_6, btn_6_blocked)
        swapPositions(btn_7, btn_7_blocked)
        swapPositions(btn_8, btn_8_blocked)
        swapPositions(btn_9, btn_9_blocked)
    elseif getUserPreference("lastNumber")  == btn_5.name then
        print(btn_5.name)
        print(getUserPreference("lastNumber"))
        swapPositions(btn_1, btn_1_accesible)
        swapPositions(btn_2, btn_2_accesible)
        swapPositions(btn_3, btn_3_accesible)
        swapPositions(btn_4, btn_4_accesible)
        swapPositions(btn_5, btn_5_accesible)
        swapPositions(btn_7, btn_7_blocked)
        swapPositions(btn_8, btn_8_blocked)
        swapPositions(btn_9, btn_9_blocked)
    elseif getUserPreference("lastNumber") == btn_6.name then
        print(btn_6.name)
        print(getUserPreference("lastNumber"))
        swapPositions(btn_1, btn_1_accesible)
        swapPositions(btn_2, btn_2_accesible)
        swapPositions(btn_3, btn_3_accesible)
        swapPositions(btn_4, btn_4_accesible)
        swapPositions(btn_5, btn_5_accesible)
        swapPositions(btn_6, btn_6_accesible)
        swapPositions(btn_8, btn_8_blocked)
        swapPositions(btn_9, btn_9_blocked)
    elseif getUserPreference("lastNumber") == btn_7.name then
        print(btn_7.name)
        print(getUserPreference("lastNumber"))
        swapPositions(btn_1, btn_1_accesible)
        swapPositions(btn_2, btn_2_accesible)
        swapPositions(btn_3, btn_3_accesible)
        swapPositions(btn_4, btn_4_accesible)
        swapPositions(btn_5, btn_5_accesible)
        swapPositions(btn_6, btn_6_accesible)
        swapPositions(btn_7, btn_7_accesible)
        swapPositions(btn_9, btn_9_blocked)
    elseif getUserPreference("lastNumber") == btn_8.name then
        print(btn_8.name)
        print(getUserPreference("lastNumber"))
        swapPositions(btn_1, btn_1_accesible)
        swapPositions(btn_2, btn_2_accesible)
        swapPositions(btn_3, btn_3_accesible)
        swapPositions(btn_4, btn_4_accesible)
        swapPositions(btn_5, btn_5_accesible)
        swapPositions(btn_6, btn_6_accesible)
        swapPositions(btn_7, btn_7_accesible)
        swapPositions(btn_8, btn_8_accesible)
    elseif getUserPreference("lastNumber") == btn_9.name then
        print(btn_9.name)
        print(getUserPreference("lastNumber"))
        swapPositions(btn_1, btn_1_accesible)
        swapPositions(btn_2, btn_2_accesible)
        swapPositions(btn_3, btn_3_accesible)
        swapPositions(btn_4, btn_4_accesible)
        swapPositions(btn_5, btn_5_accesible)
        swapPositions(btn_6, btn_6_accesible)
        swapPositions(btn_7, btn_7_accesible)
        swapPositions(btn_8, btn_8_accesible)
        swapPositions(btn_9, btn_9_accesible)
    else 
        print(btn_1.name)
        print(getUserPreference("lastNumber"))
        swapPositions(btn_2, btn_2_blocked)
        swapPositions(btn_3, btn_3_blocked)
        swapPositions(btn_4, btn_4_blocked)
        swapPositions(btn_5, btn_5_blocked)
        swapPositions(btn_6, btn_6_blocked)
        swapPositions(btn_7, btn_7_blocked)
        swapPositions(btn_8, btn_8_blocked)
        swapPositions(btn_9, btn_9_blocked)
    end
    
    function goToTrackedScene()

        if this.name == btn_1_accesible.name then
        experience:transitionToScene(getUserPreference(btn_1.name), none, 0.8)
        elseif this.name == btn_2_accesible.name then
        experience:transitionToScene(getUserPreference(btn_2.name), none, 0.8)
        elseif this.name == btn_3_accesible.name then
        experience:transitionToScene(getUserPreference(btn_3.name), none, 0.8)
        elseif this.name == btn_4_accesible.name then
        experience:transitionToScene(getUserPreference(btn_4.name), none, 0.8)
        elseif this.name == btn_5_accesible.name then
        experience:transitionToScene(getUserPreference(btn_5.name), none, 0.8)
        elseif this.name == btn_6_accesible.name then
        experience:transitionToScene(getUserPreference(btn_6.name), none, 0.8)
        elseif this.name == btn_7_accesible.name then
        experience:transitionToScene(getUserPreference(btn_7.name), none, 0.8)
        elseif this.name == btn_8_accesible.name then
        experience:transitionToScene(getUserPreference(btn_8.name), none, 0.8)
        elseif this.name == btn_9_accesible.name then
        experience:transitionToScene(getUserPreference(btn_9.name), none, 0.8)
        end
    end
end