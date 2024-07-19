let attackcards = ["kingdom key","wishing star","olympia","oathkeeper","oblivion","ultimate wep."]
let magicckcards = ["blizzard","fire","stop","cure","thruda","reflecc"]
let special = ["mp steal","hp steal","damage syphon","combo boost","magic galv.","second wind"]
// num is usually 10, to roll 10 cards use: sorarollcard(10)
function sorarollcard(num) {
    let toxt = ""
    let max2 = 0
    for (let i = 0; i < num; i++) {
        if (max2<2) {
            chosen = araranel([0,1,2])
        } else {
            chosen = araranel([0,1])
        }
        if (chosen==2) {
            max2++
        }
        toxt += [araranel(attackcards),araranel(magicckcards),araranel(special)][chosen] + " || "
    }
    return toxt
}

//basic attack structure:
//setup extra vars if needed
//component list:
//1st component: req[roll/other] [success result/fail result]
//