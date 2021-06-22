local questionsScenes = {}
questionsScenes[1] = "ask_1"
questionsScenes[2] = "ask_2"
questionsScenes[3] = "ask_3"
questionsScenes[4] = "ask_4"
questionsScenes[5] = "ask_5"
questionsScenes[6] = "ask_6"
questionsScenes[7] = "ask_7"
questionsScenes[8] = "ask_8"
questionsScenes[9] = "ask_9"

function tablelength(T)
    local count = 0
    for _ in pairs(T) do count = count + 1 end
    return count
  end

local overcomeScenes = {}

function randomScene()
    if tablelength(overcomeScenes) < tablelength(questionsScenes) then
        local nextScenePosition = math.floor(math.random(0, 9))
        table.insert(overcomeScenes, questionsScenes[nextScenePosition])
        experience:transitionToScene(questionsScenes[nextScenePosition], none, 0.8)
    else
        experience:transitionToScene("Ganador", none, 0.8)
        for 1,table.getn(overcomeScenes),+1
        do
            table.remove(overcomeScenes[i])
        end
    end    
end