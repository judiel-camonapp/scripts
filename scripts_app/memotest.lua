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
		delay(goToWinner, 1)
	end
end

function goToWinner()
    cancelDelay(global.data.gameId)
	experience:transitionToScene("Ganaste", "none", 0)
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
