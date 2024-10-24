var boardarray = []
var playernum = 4
var teams = rollforcards(playernum)
var itemteam = rollplayeritems(playernum)
var round = 0
var rolledcards = []

for (let i = 0; i < 16; i++) {
    let arrah = []
    for (let j = 0; j < 9; j++) {
        arrah.push([])
    }
    boardarray.push(arrah)
}
console.log(boardarray);

function loadboard() {
    document.getElementById('content').innerHTML=""

    let commandis = [statmode,showallcards,rolledchars,rounditerate]
    for (let i = 0; i < commandis.length; i++) {
        let link = document.createElement("div");
        link.onclick = commandis[i]
        link.appendChild(document.createTextNode(commandis[i].name))
        link.classList.add("butt")
        document.getElementById('content').appendChild(link)
    }

    let roundnum = document.createElement("div");
    roundnum.classList.add("ricegum")
    let roundnum1 = document.createElement("div");
    roundnum1.appendChild(document.createTextNode("round: "))
    roundnum1.classList.add("butt")
    roundnum.appendChild(roundnum1)
    let roundnum2 = document.createElement("div");
    roundnum2.appendChild(document.createTextNode(round))
    roundnum2.classList.add("butt")
    roundnum2.id = "roundnum"
    roundnum.appendChild(roundnum2)
    document.getElementById('content').appendChild(roundnum)

    let board = document.createElement("div");
    board.id = "board"
    for (let j = 0; j < 4; j++) {
        let area3 = document.createElement("div");
        for (let i = 0; i < 4; i++) {
            area3.appendChild(loadarea(j*4+i))
        }
        board.appendChild(area3)
    }
    document.getElementById('content').appendChild(board)


    for (let i = 0; i < itemteam.length; i++) {
        let ricediv = document.createElement("div");
        ricediv.classList = ["ricegum","fullcard"]


        let temname = document.createElement("div");
        temname.appendChild(document.createTextNode(itemteam[i][0]))
        ricediv.appendChild(temname)

        for (let ind = 1; ind < itemteam[i].length; ind++) {
            let itemimage = itemdata[itemteam[i][ind]].cardlink

            let imgdis = document.createElement("img")
            imgdis.alt = "404"
            imgdis.src = "../../utils/items/_item_cards/" + itemimage
            imgdis.classList.add("itemimage")
            
            ricediv.appendChild(imgdis)
        }
        document.getElementById('content').appendChild(ricediv)
    }
    // itemstartup()
}

var rolleditems = []

function rounditerate() {
    round++

    //do items

    // do initials
    let initialItemPool = []
    let rolled = []
    

    for (let ind = 0; ind < playernum; ind++) {
        initialItemPool = []

        for (let i = 0; i < itemspawn.length; i++) {
            let approved = itemspawn[i].init==1 && !isin(i,rolled) && itemspawn[i].plerol==0
            if (approved && itemspawn[i].phase[1]==round) {
                console.log(approved && itemspawn[i].phase[1]==round);
                initialItemPool.push(i)
            }
            // console.log(i,rolled,approved,itemspawn[i].phase[1]==round,!isin(i,rolled),initialItemPool);
        }
            
        let totweight = 0
        let weigtharray = []

        for (let i = 0; i < initialItemPool.length; i++) {
            weigtharray.push(totweight)
            totweight+=itemspawn[initialItemPool[i]].weigth
        }

        if (initialItemPool.length>0) {
            //weighted randomize
            let ide0=0
            let rand = totweight*Math.random()
            for (let i = 0; i < weigtharray.length; i++) {
                if (rand>weigtharray[i]) {
                    ide0 = initialItemPool[i]
                }
            }
            rolled.push(ide0)
            console.log(rolled);

            //add all items associated with spawn
            let ide=itemspawn[ide0].obj
            for (let j = 0; j < ide.length; j++) {
                let ide2 = -1
                
                for (let i = 0; i < itemdata.length; i++) {
                    if (itemdata[i].name==ide[j]) {
                        ide2=i
                    }
                }
                if (ide2!=-1) {
                    let diapazonArray = getdiapazon(ide0)
                    console.log(diapazonArray);
                    let randloc = araranel(diapazonArray)
                    
                    spawnitemat(randloc[0],randloc[1],ide2)
                }
            }
        }
    }

    // do phasals
    let phasalItemPool = []

    for (let ind = 0; ind < playernum; ind++) {
        phasalItemPool = []

        for (let i = 0; i < itemspawn.length; i++) {
            let approved = itemspawn[i].phase[1]<=round && itemspawn[i].phase[2]>=round
            let approved2 = !isin(i,rolleditems) && !isin(i,rolled) && approved
            // console.log(round,itemspawn[i].phase,approved);
            if (itemspawn[i].init==0 && itemspawn[i].plerol==0 && approved2 && round%itemspawn[i].phase[0]==0) {
                phasalItemPool.push(i)
            }
        }
            
        let totweight = 0
        let weigtharray = []

        for (let i = 0; i < phasalItemPool.length; i++) {
            weigtharray.push(totweight)
            totweight+=itemspawn[phasalItemPool[i]].weigth
        }

        console.log("phasalItemPool", phasalItemPool);
        if (phasalItemPool.length>0) {
            //weighted randomize
            let ide0 = phasalItemPool[weightedrand(weigtharray)]
            if (itemspawn[ide0].plent==0) {
                rolleditems.push(ide0)
            }
            rolled.push(ide0)

            //add all items associated with spawn
            let ide=itemspawn[ide0].obj
            for (let j = 0; j < ide.length; j++) {
                let ide2 = -1
                
                for (let i = 0; i < itemdata.length; i++) {
                    if (itemdata[i].name==ide[j]) {
                        ide2=i
                    }
                }
                if (ide2!=-1) {
                    let diapazonArray = getdiapazon(ide0)
                    console.log(diapazonArray);
                    let randloc = araranel(diapazonArray)
                    
                    spawnitemat(randloc[0],randloc[1],ide2)
                }
            }
        }
    }


    //convert the effected places in textarea

    ///some code here///


    ///gameplay
    for (let i = 0; i < playernum.length; i++) {
        request_round_query(i)
    }

    //automated team AI
    var autoteams = []
    for (let i = 0; i < autoteams.length; i++) {
        request_autoteam_action()
    }

    refreshboard()
    document.getElementById('roundnum').innerText = round
    // console.log(boardarray);
    
}

function loadarea(id) {
    let area = document.createElement("div");
    area.classList = ["area"]
    for (let j = 0; j < 3; j++) {
        let tile2 = document.createElement("div");
        for (let i = 0; i < 3; i++) {
            
            tile2.appendChild(tilesinobjects(id,j*3+i))
        }
        area.appendChild(tile2)
    }
    return area
}

function tilesinobjects(id,id2) {
    let tile = document.createElement("div");
    tile.classList = ["tile"]
    for (let i = 0; i < boardarray[id][id2].length; i++) {
        //here be item obects
        
        let displayimage = itemdata[boardarray[id][id2][i]].spritelink
        let itemimage = document.createElement("img");
        itemimage.alt = "404"
        itemimage.src = "../../utils/items/_item_sprites/" + displayimage
        itemimage.classList = ["itemimage"]
        

        //some logic for optons if visible
        // tile.appendChild(itemimage)
        let itemname = itemdata[boardarray[id][id2][i]].name
        tile.appendChild(document.createTextNode(itemname))
        // tile.appendChild(document.createTextNode("tile "+id+"-"+id2+","+itemname))
    }
    return tile
}

function rollforcards(teamnumber) {
    let cardclasses = [10,8,5,3,1]
    let legs = [];
    let epcs = [];
    let rars = [];
    let uncs = [];
    let sups = [];
    let teamarray = []
    for (let i = 0; i < teamnumber; i++) {
        teamarray.push(["team"+i])
    }
    console.log(teamarray);
    for (let i = 0; i < teamnumber; i++) {
        for (let id = 0; id < data.length; id++) {
            for (let ind = 0; ind < data[id].bias; ind++) {
                if (data[id].klas==10) {legs.push(id)}
                if (data[id].klas==8) {epcs.push(id)}
                if (data[id].klas==5) {rars.push(id)}
                if (data[id].klas==3) {uncs.push(id)}
                if (data[id].klas==1) {sups.push(id)}
            }
        }
        let leg = araranel(legs)
        let epc = araranel(epcs)
        let rar = araranel(rars)
        let unc = araranel(uncs)
        let sup = araranel(sups)

        teamarray[i].push(leg)
        let temparray = []
        for (let i = 0; i < legs.length; i++) {
            if (legs[i]!=leg) {
                temparray.push(legs[i])
            }
        }
        legs = temparray
        temparray = []
        teamarray[i].push(epc)
        for (let i = 0; i < epcs.length; i++) {
            if (epcs[i]!=epc) {
                temparray.push(epcs[i])
            }
        }
        epcs = temparray
        temparray = []
        teamarray[i].push(rar)
        for (let i = 0; i < rars.length; i++) {
            if (rars[i]!=rar) {
                temparray.push(rars[i])
            }
        }
        rars = temparray
        temparray = []
        teamarray[i].push(unc)
        for (let i = 0; i < uncs.length; i++) {
            if (uncs[i]!=unc) {
                temparray.push(uncs[i])
            }
        }
        uncs = temparray
        temparray = []
        teamarray[i].push(sup)
        for (let i = 0; i < sups.length; i++) {
            if (sups[i]!=sup) {
                temparray.push(sups[i])
            }
        }
        sups = temparray
        temparray = []
        sup = araranel(sups)
        teamarray[i].push(sup)
        for (let i = 0; i < sups.length; i++) {
            if (sups[i]!=sup) {
                temparray.push(sups[i])
            }
        }
        sups = temparray
    }
    return teamarray
}

function rollforclass(classparam) {
    
}

//if player roll
//add to player roll pool

//else
//if not equidistributed
//if not 

function rollplayeritems(teamnumber) {
    let itemsperplayer = 2
    let pool = []
    let rolled = []
    let totweight = 0
    console.log(pool);
    let teamarray = []
    for (let i = 0; i < teamnumber; i++) {
        teamarray.push(["team"+i])
    }
    for (let team = 0; team < teamarray.length; team++) {
        for (let ind = 0; ind < itemsperplayer; ind++) {
            pool=[]
            totweight = 0
            for (let i = 0; i < itemspawn.length; i++) {
                if (itemspawn[i].plerol==1 && !isin(i,rolled)) {
                    pool.push([i,totweight])
                    totweight+=itemspawn[i].weigth
                }
            }
            // console.log("pool "+pool);
            // console.log(rolled);

            if (pool.length>0) {
                //weighted randomize
                let ide0=0
                let rand = totweight*Math.random()
                for (let i = 0; i < pool.length; i++) {
                    if (rand>pool[i][1]) {
                        // console.log(i,rand,pool[i][1]);
                        ide0 = pool[i][0]
                    }
                }
                rolled.push(ide0)
                console.log(ide0,rand,pool);
    
                //add all items associated with spawn
                let ide=itemspawn[ide0].obj
                for (let j = 0; j < ide.length; j++) {
                    let ide2 = -1
                    
                    for (let i = 0; i < itemdata.length; i++) {
                        if (itemdata[i].name==ide[j]) {
                            ide2=i
                        }
                    }
                    if (ide2!=-1) {
                        teamarray[team].push(ide2)
                    }
                }
            }
        }
    }
    return teamarray
}

function itemstartup(params) {
    //look for equidestributed initial? items


}

function refreshboard() {
    board.innerHTML = ""
    for (let j = 0; j < 4; j++) {
        let area3 = document.createElement("div");
        for (let i = 0; i < 4; i++) {
            area3.appendChild(loadarea(j*4+i))
        }
        board.appendChild(area3)
    }
}

//[[0,0],[0,1],....[15,8]]
var cappedTiles = []

function getdiapazon(spawnitemid) {
    let diapazonArray = []
    if (itemspawn[spawnitemid].diap=="all") {
        for (let j = 0; j < 16; j++) {
            for (let i = 0; i < 9; i++) {
                if (!isin([j,i],cappedTiles)) {
                    diapazonArray.push([j,i])
                }
            }
        }
    } else {
        for (let ind = 0; ind < itemspawn[spawnitemid].diap.length; ind++) {
            if (itemspawn[spawnitemid].diap[ind][1]=="all") {
                for (let i = 0; i < 9; i++) {
                    let value = [temspawn[spawnitemid].diap[ind][0],i]
                    if (!isin(value,diapazonArray) && !isin(value,cappedTiles)) {
                        diapazonArray.push(value)
                    }
                }
            } else {
                let value = temspawn[spawnitemid].diap[ind]
                if (!isin(value,diapazonArray) && !isin(value,cappedTiles)) {
                    diapazonArray.push(value)
                }
            }
        }
    }






    //remove captured tiles and areas here


    return diapazonArray
}

function spawnitemat(locout,locin,itemid) {
    // console.log(locout,locin,itemid);
    boardarray[locout][locin].push(itemid)

    

    //pentagrid
    console.log(rund(6),rund(6),rund(6),itemdata[itemid].name)
}


function capparea(areaid) {
    for (let i = 0; i < 9; i++) {
        if (!isin([j,i],cappedTiles)) {
            cappedTiles.push([areaid,i])
        }
    }
}

function request_round_query(playerid) {
    playermoves = 2
    do {
        //query for a player action

        prompt("Please enter available attack", "Harry Potter");
    } while (playernum>0);
}