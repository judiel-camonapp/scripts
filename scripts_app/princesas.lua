
local lastNumber

function unlockScene()
    setUserPreference("lastNumberPrincess", lastNumber)
end

function attachNumber()
    lastNumber = this.name
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

    if getUserPreference("lastNumberPrincess")  == btn_1.name then
        print(btn_2.name)
        swapPositions(btn_1, btn_1_accesible)
        swapPositions(btn_3, btn_3_blocked)
        swapPositions(btn_4, btn_4_blocked)
        swapPositions(btn_5, btn_5_blocked)
        swapPositions(btn_6, btn_6_blocked)
        swapPositions(btn_7, btn_7_blocked)
        swapPositions(btn_8, btn_8_blocked)
        swapPositions(btn_9, btn_9_blocked)

    elseif getUserPreference("lastNumberPrincess") == btn_2.name then
        print(btn_2.name)
        print(getUserPreference("lastNumberPrincess"))
        swapPositions(btn_1, btn_1_accesible)
        swapPositions(btn_2, btn_2_accesible)
        swapPositions(btn_4, btn_4_blocked)
        swapPositions(btn_5, btn_5_blocked)
        swapPositions(btn_6, btn_6_blocked)
        swapPositions(btn_7, btn_7_blocked)
        swapPositions(btn_8, btn_8_blocked)
        swapPositions(btn_9, btn_9_blocked)
    elseif getUserPreference("lastNumberPrincess") == btn_3.name then
        print(btn_3.name)
        print(getUserPreference("lastNumberPrincess"))
        swapPositions(btn_1, btn_1_accesible)
        swapPositions(btn_2, btn_2_accesible)
        swapPositions(btn_3, btn_3_accesible)
        swapPositions(btn_5, btn_5_blocked)
        swapPositions(btn_6, btn_6_blocked)
        swapPositions(btn_7, btn_7_blocked)
        swapPositions(btn_8, btn_8_blocked)
        swapPositions(btn_9, btn_9_blocked)
    elseif getUserPreference("lastNumberPrincess")  == btn_4.name then
        print(btn_4.name)
        print(getUserPreference("lastNumberPrincess"))
        swapPositions(btn_1, btn_1_accesible)
        swapPositions(btn_2, btn_2_accesible)
        swapPositions(btn_3, btn_3_accesible)
        swapPositions(btn_4, btn_4_accesible)
        swapPositions(btn_6, btn_6_blocked)
        swapPositions(btn_7, btn_7_blocked)
        swapPositions(btn_8, btn_8_blocked)
        swapPositions(btn_9, btn_9_blocked)
    elseif getUserPreference("lastNumberPrincess")  == btn_5.name then
        print(btn_5.name)
        print(getUserPreference("lastNumberPrincess"))
        swapPositions(btn_1, btn_1_accesible)
        swapPositions(btn_2, btn_2_accesible)
        swapPositions(btn_3, btn_3_accesible)
        swapPositions(btn_4, btn_4_accesible)
        swapPositions(btn_5, btn_5_accesible)
        swapPositions(btn_7, btn_7_blocked)
        swapPositions(btn_8, btn_8_blocked)
        swapPositions(btn_9, btn_9_blocked)
    elseif getUserPreference("lastNumberPrincess") == btn_6.name then
        print(btn_6.name)
        print(getUserPreference("lastNumberPrincess"))
        swapPositions(btn_1, btn_1_accesible)
        swapPositions(btn_2, btn_2_accesible)
        swapPositions(btn_3, btn_3_accesible)
        swapPositions(btn_4, btn_4_accesible)
        swapPositions(btn_5, btn_5_accesible)
        swapPositions(btn_6, btn_6_accesible)
        swapPositions(btn_8, btn_8_blocked)
        swapPositions(btn_9, btn_9_blocked)
    elseif getUserPreference("lastNumberPrincess") == btn_7.name then
        print(btn_7.name)
        print(getUserPreference("lastNumberPrincess"))
        swapPositions(btn_1, btn_1_accesible)
        swapPositions(btn_2, btn_2_accesible)
        swapPositions(btn_3, btn_3_accesible)
        swapPositions(btn_4, btn_4_accesible)
        swapPositions(btn_5, btn_5_accesible)
        swapPositions(btn_6, btn_6_accesible)
        swapPositions(btn_7, btn_7_accesible)
        swapPositions(btn_9, btn_9_blocked)
    elseif getUserPreference("lastNumberPrincess") == btn_8.name then
        print(btn_8.name)
        print(getUserPreference("lastNumberPrincess"))
        swapPositions(btn_1, btn_1_accesible)
        swapPositions(btn_2, btn_2_accesible)
        swapPositions(btn_3, btn_3_accesible)
        swapPositions(btn_4, btn_4_accesible)
        swapPositions(btn_5, btn_5_accesible)
        swapPositions(btn_6, btn_6_accesible)
        swapPositions(btn_7, btn_7_accesible)
        swapPositions(btn_8, btn_8_accesible)
    else 
        print(btn_1.name)
        print(getUserPreference("lastNumberPrincess"))
        swapPositions(btn_2, btn_2_blocked)
        swapPositions(btn_3, btn_3_blocked)
        swapPositions(btn_4, btn_4_blocked)
        swapPositions(btn_5, btn_5_blocked)
        swapPositions(btn_6, btn_6_blocked)
        swapPositions(btn_7, btn_7_blocked)
        swapPositions(btn_8, btn_8_blocked)
        swapPositions(btn_9, btn_9_blocked)
    end  
end




box1 = nil
box2 = nil
matches = 0
usedBoxes = {}
animationDuration = 0.5
animationInProgress = false

function resetGame()
    box1 = nil
    box2 = nil
    matches = 0
    usedBoxes = {}
    animationInProgress = false
    
    shape = experience.currentScene:shapeByName("a1")
    shape:animateRotation(Vector:new(0, 0, 0), animationDuration, "cubicInOut", 0, false, false)

    shape = experience.currentScene:shapeByName("a2")
    shape:animateRotation(Vector:new(0, 0, 0), animationDuration, "cubicInOut", 0, false, false)

    shape = experience.currentScene:shapeByName("b1")
    shape:animateRotation(Vector:new(0, 0, 0), animationDuration, "cubicInOut", 0, false, false)

    shape = experience.currentScene:shapeByName("b2")
    shape:animateRotation(Vector:new(0, 0, 0), animationDuration, "cubicInOut", 0, false, false)

    shape = experience.currentScene:shapeByName("c1")
    shape:animateRotation(Vector:new(0, 0, 0), animationDuration, "cubicInOut", 0, false, false)

    shape = experience.currentScene:shapeByName("c2")
    shape:animateRotation(Vector:new(0, 0, 0), animationDuration, "cubicInOut", 0, false, false)

    shape = experience.currentScene:shapeByName("d1")
    shape:animateRotation(Vector:new(0, 0, 0), animationDuration, "cubicInOut", 0, false, false)

    shape = experience.currentScene:shapeByName("d2")
    shape:animateRotation(Vector:new(0, 0, 0), animationDuration, "cubicInOut", 0, false, false)

end

function startGame()
    resetGame()
	global.data.gameId = delay(goToLoser, 300)
end

function boxTap(box)
    if not isValidBox(box) or animationInProgress then
        return
    end

    if box1 == nil then
        box1 = box
	    animateShow(box1)
    elseif (box.name ~= box1.name) and (box2 == nil) then
	    box2 = box
        animateShow(box2)
	    delay(checkMatch, 1.1)
    end
end

function setAnimationInProgress(animationDelay)
    clearAnimInProgressIfNeeded()
    animationInProgress = true
    global.data.anim = delay(resetAnimationInProgress, animationDelay)
end

function clearAnimInProgressIfNeeded()
    if global.data.anim ~= nil then
        cancelDelay(global.data.anim)
        global.data.anim = nil
        animationInProgress = false
    end    
end

function resetAnimationInProgress()
    animationInProgress = false
end

function isValidBox(box)
    for index, name in ipairs(usedBoxes) do
        if name == box.name then
            return false
        end
    end

    return true
end

function checkMatch()
	if (box1.name:sub(1,1) == box2.name:sub(1,1)) then
		matches = matches + 1
		table.insert(usedBoxes, box1.name)
		table.insert(usedBoxes, box2.name)
		clearAnimInProgressIfNeeded()
		delay(checkWon, 1)
	else
		animateUndoShow(box1, box2)
	end

	box1 = nil
	box2 = nil
end

function checkWon() 
	if matches == 4 then
		delay(goToWinner, 0.1)
	end
end

function goToWinner()
    cancelDelay(global.data.gameId)
	experience:transitionToScene("Ganaste", "none", 0.8)
end


function animateShow(box)
	box:animateRotation(Vector:new(box.rotation.x, box.rotation.y+180, box.rotation.z), animationDuration, "cubicInOut", 0, false, false)
    if box2 ~= nil then
        setAnimationInProgress(1)
    end
end

function animateUndoShow(box1, box2)
	box1:animateRotation(Vector:new(box1.rotation.x, box1.rotation.y-180, box1.rotation.z), animationDuration, "cubicInOut", 0, false, false)
	box2:animateRotation(Vector:new(box2.rotation.x, box2.rotation.y-180, box2.rotation.z), animationDuration, "cubicInOut", 0, false, false)
    setAnimationInProgress(1)
end