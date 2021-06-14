items = {}

function arrangeItems()
    for i, v in ipairs(items) do
        if (v ~= 0) then
            local position = getCoordinates(i)
            local shape = experience.currentScene:shapeByName("m_"..v)
            shape:animatePosition(Vector:new(position.x, position.y, shape.position.z), 0.1, "linear", 0, false, false)
        end
    end
    print("Puzzle initialized...")
end  

function itemTap(item)
	local id = tonumber(item.name:sub(item.name:find("_")+1))
    if canMove(id) then
        move(id)
        if won() then
            experience:transitionToScene("4_ganador", "none", 0)
        end
    end
end

function canMove(itemId)
	local emptyPlace = getEmptyPlace()
	local itemPlace = getItemPlaceById(itemId)
	local validPlaces = getValidPlaces(emptyPlace)

	local can = false
	local itemPlace = getItemPlaceById(itemId)
	for i,v in ipairs(validPlaces) do 
	    if (v == itemPlace) then
	        can = true
	        break
	    end
	end
	return can
end

function getValidPlaces(emptyPlace)
    local validPlaces = {}
	if ( emptyPlace ~= 1 and emptyPlace ~= 4 and emptyPlace ~= 7 ) then validPlaces[#validPlaces+1]=emptyPlace-1 end
	if ( emptyPlace ~= 3 and emptyPlace ~= 6 and emptyPlace ~= 9 ) then validPlaces[#validPlaces+1]=emptyPlace+1 end
	if ( emptyPlace > 3 ) then validPlaces[#validPlaces+1]=emptyPlace-3 end
	if ( emptyPlace < 7 ) then validPlaces[#validPlaces+1]=emptyPlace+3 end
    return validPlaces
end

function move(itemId)
	local itemPlace = getItemPlaceById(itemId)
    local emptyPlace = getEmptyPlace()
	items[itemPlace] = 0
	items[emptyPlace] = itemId
	visualMove(itemId, emptyPlace)
end

function visualMove(itemId, toPlace)
    local position = getCoordinates(toPlace)
	local shape = experience.currentScene:shapeByName("m_"..itemId)
	shape:animatePosition(Vector:new(position.x, position.y, shape.position.z), 0.1, "linear", 0, false, false)
end

function getCoordinates(place)
    local newX = 0
	local newY = 0

	if (place == 1 or place == 4 or place == 7) then newX = -1.98 end
	if (place == 2 or place == 5 or place == 8) then newX = 0 end
	if (place == 3 or place == 6 or place == 9) then newX = 1.98 end

	if (place == 1 or place == 2 or place == 3) then newY = 4.58 end
	if (place == 4 or place == 5 or place == 6) then newY = 2.6 end
	if (place == 7 or place == 8 or place == 9) then newY = 0.6 end

    return Vector:new(newX, newY, 0)
end    

function getEmptyPlace()
	local emptyPlace = 0
	for i,v in ipairs(items) do 
	    if (v == 0) then
	        emptyPlace = i
	        break
	    end
    end
    return emptyPlace
end

function getItemPlaceById(id) 
	local place = 0
	for i,v in ipairs(items) do 
	    if (v == id) then
	        place = i
	        break
	    end
    end
	return place
end

function won()
    local won = true
    for i=1,8 do
        if (i ~= getItemPlaceById(i)) then
            won = false
        end
    end

	return won
end