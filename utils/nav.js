var wikimode=1
var selchar=-1
var simpledisplay = 1
// var filter="stat/rate/wavrg"
// var filter="stat/month/27"
var filter="stat/month/this"
// var filter="stat/image"
// var filter="stat/noimg"

var classDearreyer = [0,"support",2,"uncommon",4,"rare",6,7,"epic",9,"legendary"]
var classes = [1,3,5,8,10]


var monUnit = 2551443
var defunix = 1693513380
//aug 31 2023 the birth: 1693513380

function showallcards() {
    let redata = araglen(data.length,1)
    if (isin(getfilt4(),['ratings','avrgrating','wavrgrating'])) {

        //decides if rating should be total (0), average(1) or weigh. average (2)
        let avrgoris = (getfilt4()=='ratings')?0:(getfilt4()=='avrgrating')?1:2

        for (let j = 0; j < redata.length; j++) {
            for (let i = 1; i < redata.length; i++) {
                let rating1 = cardgetratings(redata[i-1],10)[avrgoris][0]
                let rating2 = cardgetratings(redata[i],10)[avrgoris][0]
                // console.log(rating1,rating2);
                if (rating1<rating2) {
                    let temp = redata[i-1]
                    redata[i-1]=redata[i]
                    redata[i]=temp
                }
            }
        }        
    }
    if (isin(getfilt4(),['chronological',"antichrono"])) {

        //sorts by month
        for (let j = 0; j < redata.length; j++) {
            for (let i = 1; i < redata.length; i++) {
                let rating1 = data[redata[i-1]].month
                let rating2 = data[redata[i]  ].month
                // console.log(rating1,rating2);
                let ineqans = true
                ineqans = rating1<rating2
                if (getfilt4()=="antichrono") {ineqans = !ineqans}
                if (ineqans) {
                    let temp = redata[i-1]
                    redata[i-1]=redata[i]
                    redata[i]=temp
                }
            }
        }        
    }
    let predata = []
    for (let i = 0; i < data.length; i++) {
        if(checkfilt4(redata[i])==1) {
            predata.push(redata[i])
        }
    }

    let toxt = ""
    
    toxt+='<div class="ricegum fullcard">'

    toxt+='<div class="ricegum"><input type="text" id="filterinput" value="'+filter+'">'
    toxt+=`<div class="butt" onclick="filter='';showallcards()" tabindex="0" role="button">x</div>`
    toxt+=`<div class="butt" onclick="filter=document.getElementById('filterinput').value;showallcards()" tabindex="0" role="button">search</div>`
    toxt+=`<div class="butt">`+predata.length+`</div></div>`

    toxt+='<div onclick="statmode()" class="butt" tabindex="0" role="button">statmode</div>'

    toxt+='<div onclick="newcardmenu()" class="butt" tabindex="0" role="button">newcardmenu</div>'


    toxt+='<div onclick="loadboard()" class="butt" tabindex="0" role="button">loadboard</div>'
    toxt+='<div onclick="rolledchars()" class="butt" tabindex="0" role="button">rolledchars</div>'

    

    toxt+='<div class="ricegum"><div onclick="togglewiki()" class="butt" tabindex="0" role="button">toggle wiki mode</div>'
    toxt+='<div class="butt">'+wikimode+'</div></div>'

    toxt+='</div>'

    selchar=-1
    for (let i = 0; i < predata.length; i++) {
        toxt += vizcard(predata[i])
    }
    document.getElementById('content').innerHTML=toxt
}

function cardgetratings(cardid,approx) {
    let leng = data[cardid].ratings.length
    if (leng>0) {
        let totals = [0,0,0,0]
        for (let i = 0; i < leng; i++) {
            totals[0]+=arasumvaln(data[cardid].ratings[i],3)
            totals[1]+=data[cardid].ratings[i][0]
            totals[2]+=data[cardid].ratings[i][1]
            totals[3]+=data[cardid].ratings[i][2]
        }
        let avrijs = [0,0,0,0]
        for (let i = 0; i < totals.length; i++) {
            avrijs[i]=Math.round(approx*totals[i]/leng)/approx
        }
        //wavrg
        let totalsplus = [33,11,11,11]
        for (let i = 0; i < leng; i++) {
            totalsplus[0]+=arasumvaln(data[cardid].ratings[i],3)
            totalsplus[1]+=data[cardid].ratings[i][0]
            totalsplus[2]+=data[cardid].ratings[i][1]
            totalsplus[3]+=data[cardid].ratings[i][2]
        }
        let avrijsplus = [0,0,0,0]
        for (let i = 0; i < totals.length; i++) {
            avrijsplus[i]=Math.round(approx*totalsplus[i]/(leng+2))/approx
        }
        return [totals,avrijs,avrijsplus]
    }
    return [[0,0,0,0],[0,0,0,0],[0,0,0,0]]
}


function selectcard(cardid) {
    selchar=cardid

    let toxt = '<div onclick="showallcards()" id="showolkards" class="butt" tabindex="0" role="button">showallcards</div>'
    toxt+='<div onclick="rolledchars()" class="butt" tabindex="0" role="button">rolledchars</div>'
    toxt+='<div class="fullcard"><div class="half">'

    toxt+='<div class="images">'
    for (let i = 0; i < data[cardid].cardimglink.length; i++) {
        toxt+='<img alt="404" onclick="lookatimg('
        toxt+=cardid+","+i
        toxt+=')" src="'
        toxt+=linker+'images/mainclass_cards/'+data[cardid].cardimglink[i]
        toxt+='" width="'
        toxt+=Math.floor(100/data[cardid].cardimglink.length)
        toxt+='%">'
        // toxt+='" height="10%">'
    }
    toxt+='</div>'
    if (wikimode==0) {
        toxt+=linker+'images/mainclass_cards/'+data[cardid].cardimglink
        
        
        toxt+='<div class="ricegum">'
        
        toxt+=`<input type="text" id="imglinks" onclick="document.getElementById('imagehelp').style.display='flex';">`
        toxt+='<div class="list" id="imagehelp">'
        assignimges()
        for (let i = 0; i < unassignedimgs.length; i++) {
            toxt+=`<div class="item butt" onclick="document.getElementById('imglinks').value+='`
            toxt+=unassignedimgs[i]
            toxt+=`'">`
            toxt+=unassignedimgs[i]
            toxt+='</div>'
        }
        toxt+='</div>'
        toxt+='<div class="list">'
        toxt+=`<div onclick="document.getElementById('imglinks').value+=','" class="butt item">+ ","</div>`
        toxt+=`<div onclick="document.getElementById('imglinks').value+='.png'" class="butt item">+ ".png"</div>`
        toxt+=`<div onclick="document.getElementById('imglinks').value+='`+data[cardid].charcode+`'" class="butt item">+ charcode</div>`
        toxt+=`<div onclick="document.getElementById('imglinks').value+='1-0.png'" class="butt item">+ "1-0.png"</div>`
        toxt+=`<div onclick="document.getElementById('imglinks').value+='2-0.png'" class="butt item">+ "2-0.png"</div>`
        toxt+=`<div onclick="submitimglinks(document.getElementById('imglinks').value,`
        toxt+=cardid
        toxt+=')" class="butt item">submit</div>'
        toxt+='</div>'
        toxt+='</div>'
    }
    
    toxt+='<div class="title">'+data[cardid].name
    toxt+='</div><div class="text">made by:'

    // toxt+=`<div onclick="filter='maker/`
    // toxt+=data[cardid].maker
    // toxt+=`';showallcards()" class="butt">`
    // toxt+=data[cardid].maker
    // toxt+='</div>'

    toxt+=`<div onclick="makerProfile('`
    toxt+=data[cardid].maker
    toxt+=`')" class="butt">`
    toxt+=data[cardid].maker
    toxt+='</div>'

    toxt+='; '

    toxt+=`<div onclick="filter='class/`
    toxt+=classDearreyer[data[cardid].klas]
    toxt+=`';showallcards()" class="butt">`
    toxt+=classDearreyer[data[cardid].klas]
    toxt+='</div>'

    toxt+=' class, id:'+ cardid
    toxt+=', month:'+ data[cardid].month
    toxt+=', charcode:'+ data[cardid].charcode
    

    

    toxt+='<div class="text">'
    if (wikimode==1) {
        toxt+=data[cardid].desc
    } else {
        toxt+=`<textarea id="descinput">`
        toxt+=data[cardid].desc
        toxt+='</textarea>'
        toxt+='<div onclick="data['
        toxt+=cardid
        toxt+=`].desc=document.getElementById('descinput').value" class="butt">submit desc</div>`
    }
    toxt+='</div>'
    toxt+='<div class="text">'
    for (let i = 0; i < givefulltags(cardid).length; i++) {
        toxt+='<div class="item">'
        toxt+=givefulltags(cardid)[i]
        toxt+='</div>'
    }
    toxt+='</div>'
    if (wikimode==0) {        
        toxt+='<div class="ricegum">'
        
        toxt+=`<textarea id="tagsinput" onclick="document.getElementById('tagshelp').style.display='flex';">`
        toxt+=data[cardid].tags[0]
        for (let i = 1; i < data[cardid].tags.length; i++) {
            toxt+=','+data[cardid].tags[i]
        }
        toxt+='</textarea>'
        toxt+='<div class="list" id="tagshelp">'
        reloadtags()
        let noms = araglen(knowntags.length,0)
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].tags.length; j++) {
                let id = findstringid(data[i].tags[j],knowntags)
                if (id!=-1) {
                    noms[id]++
                }
            }
        }
        
        for (let i = 0; i < knowntags.length; i++) {
            toxt+=`<div class="item `
            if (noms[i]>7) {
                toxt+="actiur "
            }
            if (isin(knowntags[i],data[cardid].tags)) {
                toxt+="myasmian "
            }
            toxt+=`butt" onclick="document.getElementById('tagsinput').value+=','+'`
            toxt+=knowntags[i]
            toxt+=`'">`
            toxt+=knowntags[i]
            toxt+='</div>'
        }
        toxt+='</div>'
        toxt+=`<div onclick="submittags(document.getElementById('tagsinput').value,`
        toxt+=cardid
        toxt+=')" class="butt">submit</div>'
        toxt+='</div>'
    }

    toxt+='<div class="butt" onclick="downloadChardata(`'
    toxt+=cardid
    toxt+='`)">'
    toxt+='download character</div>'

    
    let leng = data[cardid].ratings.length
    if (leng>0) {
        let totals = cardgetratings(cardid,10)[0]
        let avrijs = cardgetratings(cardid,10)[1]
        let wavrjs = cardgetratings(cardid,10)[2]
        
        toxt+='<div class="text">'
        toxt+='total score:'+ totals[0]
        toxt+=' ('+ totals[1]+','+ totals[2]+','+ totals[3]+')'
        toxt+='</div>'
        toxt+='<div class="text">'
        toxt+='average score:'+ avrijs[0]
        toxt+=' ('+ avrijs[1]+'|'+ avrijs[2]+'|'+ avrijs[3]+')'
        toxt+='</div>'
        toxt+='<div class="text">'
        toxt+='average+ score:'+ wavrjs[0]
        toxt+=' ('+ wavrjs[1]+'|'+ wavrjs[2]+'|'+ wavrjs[3]+')'
        toxt+='</div>'
        toxt+='<div class="list fullcard">'
        for (let i = 0; i < data[cardid].ratings.length; i++) {
            if (data[cardid].ratings[i].length<4) {
                toxt+='<div class="item">'
                toxt+=data[cardid].ratings[i]
                // toxt+=array3todesbalkre(data[cardid].ratings[i])
                toxt+='</div>'
            } else {
                let mkrdt = ""
                for (let ind = 0; ind < makerdata.length; ind++) {
                    if (makerdata[ind].username==data[cardid].ratings[i][3]) {
                        console.log(makerdata[ind].username,data[cardid].ratings[i][3],ind);
                        
                        mkrdt=ind
                    }
                }
                toxt+=`<div class="comment fullcard list butt" onclick="makerProfile('`
                toxt+=data[cardid].ratings[i][3]
                toxt+=`')">`

                //cpment head
                toxt+='<div class="ricegum">'
                    toxt+='<img alt="404" height="50" src="'+linker+'images/extra/regis_users/'
                if (mkrdt!=="") {
                    toxt+=makerdata[mkrdt].pfp+'">'
                    toxt+='<div class="ricegum">'
                    toxt+=makerdata[mkrdt].displayname+"; @"+makerdata[mkrdt].username
                } else {
                    toxt+='logos_mes.png">'
                    toxt+='<div class="ricegum">'
                    toxt+="@"+data[cardid].ratings[i][3]
                }
                if (data[cardid].ratings[i][3]=="viie" && mkrdt==0) {
                toxt+='<div class="item list">'+array3todesbalkre(data[cardid].ratings[i])+'</div>'
                } else {
                    toxt+='<div class="item list">'+data[cardid].ratings[i][0]
                    toxt+=','+data[cardid].ratings[i][1]+','
                    toxt+=data[cardid].ratings[i][2]+'</div>'
                }
                toxt+='</div>'


                toxt+='</div>'

                ///comment body
                toxt+='<div class="text">'
                let toxt2 = data[cardid].ratings[i][4].split("\n")
                for (let ind = 0; ind < toxt2.length; ind++) {
                    toxt+=toxt2[ind]+"<br>"
                }

                toxt+='</div>'


                toxt+='</div>'
            }
        }
        toxt+='</div>'
    }

        toxt+='</div>'
    

    toxt+='</div>'
    toxt+='<div class="half">'
    if (data[cardid].passives.length>0) {
        toxt+='<div class="ricegum">'
        toxt+='<div class="title">'
        toxt+="top info"
        toxt+='</div>'
        toxt+='<div class="text">'
        toxt+="stats"
        toxt+='</div>'
        
        toxt+='<div class="text">'
        toxt+='<div class="item">'
        toxt+="health: "
        toxt+=data[cardid].passives[0].initial_health
        toxt+="/"
        toxt+=data[cardid].passives[0].max_health
        toxt+='</div>'
        toxt+='<div class="item">'
        toxt+="stagger: "
        toxt+=data[cardid].passives[0].initial_stagger
        toxt+="/"
        toxt+=data[cardid].passives[0].max_stagger
        toxt+='</div>'
        toxt+='</div>'
        
        toxt+='</div>'
    }
    for (let i = 0; i < data[cardid].actions.length; i++) {
        toxt+='<div class="ricegum">'

        toxt+='<div class="title">'
        let defaction = 1
        if (isin("normal",data[cardid].actions[i].action_tags)) {
            toxt+="normal action"
            defaction = 0
        }
        if (isin("special",data[cardid].actions[i].action_tags)) {
            toxt+="special action"
            defaction = 0
        }
        if (defaction) {
            toxt+="action"
        }
        toxt+='</div>'

        toxt+='<div class="text">'
        toxt+=data[cardid].actions[i].action_title
        toxt+='</div>'


        toxt+='<div class="text">'
        for (let ind = 0; ind < data[cardid].actions[i].action_effects.length; ind++) {
            let actiontags = []
            if (!isNaN(data[cardid].actions[i].action_effects[ind].action_effect_tags)) {
                for (let ino = 0; ino < data[cardid].actions[i].action_effects[ind].action_effect_tags.length; ino++) {
                    actiontags.push(data[cardid].actions[i].action_effects[ind].action_effect_tags[ino])
                }
            }
            if (data[cardid].actions[i].action_effects[ind].inherit_action_tags) {
                for (let ino = 0; ino < data[cardid].actions[i].action_tags.length; ino++) {
                    actiontags.push(data[cardid].actions[i].action_tags[ino])
                }
            }
            toxt+='<div class="item">'

            if (isin("simple_damage",actiontags)) {
                toxt+='on net>'
                toxt+=data[cardid].actions[i].action_probabilty
                toxt+=' deal '
                toxt+=data[cardid].actions[i].action_effects[ind].deal_damage_to_target
                toxt+='dmg to target in '
                toxt+=data[cardid].actions[i].action_effects[ind].action_range
                toxt+=' tile range'
            }

            if (isin("simple_heal",actiontags)) {
                toxt+='on net>'
                toxt+=data[cardid].actions[i].action_probabilty
                toxt+=' heal '
                toxt+=data[cardid].actions[i].action_effects[ind].heal_to_target
                toxt+='hp to target in '
                toxt+=data[cardid].actions[i].action_effects[ind].action_range
                toxt+=' tile range'
            }

            if (isin("apply_effect",actiontags)||isin("effect_damage",actiontags)) {
                toxt+='on net>'
                toxt+=data[cardid].actions[i].action_probabilty
                toxt+=' apply effect: ['
                toxt+=data[cardid].actions[i].action_effects[ind].apply_effect
                toxt+='] to target in '
                toxt+=data[cardid].actions[i].action_effects[ind].action_range
                toxt+=' tile range'
            }

            toxt+='</div>'
        }
        toxt+='</div>'
        
        toxt+='<div class="text">'
        toxt+='action_cooldown:'
        toxt+=data[cardid].actions[i].action_cooldown
        toxt+='</div>'


        toxt+='</div>'
    }
    toxt+='</div>'
    document.getElementById('content').innerHTML=toxt
}

function vizcard(cardid) {

    let toxt = ""
    toxt+='<div class="smallcard butt" onclick="selectcard('+cardid
    toxt+=')" tabindex="0" role="button"><div class="images">'
    let len = (simpledisplay==1)? 1:data[cardid].cardimglink.length
    for (let i = 0; i < len; i++) {
        toxt+='<div class="onecard" style="background-image: url('
        if (data[cardid].thumbnail_link===undefined) {
            toxt+=linker+'images/mainclass_cards/'+data[cardid].cardimglink[i]
        } else {
            if (data[cardid].thumbnail_link=="") {
                toxt+=linker+'images/mainclass_cards/'+data[cardid].cardimglink[i]
            } else {
                toxt+=data[cardid].thumbnail_link
            }
        }
        toxt+=');width: '
        toxt+=Math.floor(100/len)
        toxt+='%">'
        toxt+='</div>'
    }
    toxt+='</div><div class="title">'+data[cardid].name
    toxt+='</div><div class="text">'
    toxt+='made by '+ data[cardid].maker
    toxt+=', '+ classDearreyer[data[cardid].klas]
    toxt+=' class</div><div class="text">'
    for (let i = 0; i < givefulltags(cardid).length; i++) {
        toxt+='<div class="item">'
        toxt+=givefulltags(cardid)[i]
        toxt+='</div>'
    }
    toxt+='</div>'
    toxt+='</div>'
    return toxt
}

function statmode() {
    let toxt = ""
    let statcateglist = ["tags","creator","monthscores","klass","scores",]
    let statcategtitles = ["tags;amount;amount/total%","creator;total;LEUCS","monthscores,prev,2MAgo","class;quota","scores;total;DBC,DBC%",]


    toxt+=`<div onclick="" id="datexp" class="microfont"></div>`
    toxt+=`<div onclick="vizdata(1)" class="butt" tabindex="0" role="button">export</div>`
    toxt+='<div onclick="showallcards()" id="showolkards" class="butt" tabindex="0" role="button">showallcards</div>'
    toxt+='<div onclick="newcardmenu()" class="butt" tabindex="0" role="button">newcardmenu</div>'
    toxt+='<div onclick="loadboard()" class="butt" tabindex="0" role="button">loadboard</div>'
    toxt+='<div onclick="rolledchars()" class="butt" tabindex="0" role="button">rolledchars</div>'

    toxt+='<div class="ricegum">'
    toxt+='<div class="butt">month</div>'
    toxt+='<div class="butt">'
    toxt+=giveunix(Date.now()/1000,defunix,monUnit)
    toxt+='/'
    toxt+=giveunix(Date.now()/1000,defunix+giveunix(Date.now()/1000,defunix,monUnit)*monUnit,86400)
    toxt+='</div>'
    toxt+='<div class="butt">'
    toxt+=giveunix(defunix+(giveunix(Date.now()/1000,defunix,monUnit)+1)*monUnit,Date.now()/1000,86400)
    toxt+='</div>'
    
    toxt+='</div>'
    
    toxt+='<div class="ricegum shaurma">'
    for (let i = 0; i < statcateglist.length; i++) {
        toxt+='<div id="'
        toxt+=statcateglist[i]
        toxt+='" class="list"></div>'
    }
    toxt+='</div>'
    document.getElementById('content').innerHTML=toxt
    for (let i = 0; i < statcateglist.length; i++) {
        document.getElementById(statcateglist[i]).innerHTML=getcategor(statcateglist[i],statcategtitles[i])
    }
}

function makerProfile(makername) {
    let contenttab = document.getElementById('content')
    contenttab.innerHTML=""
    let displayname = makername
    let monthscores = araglen(giveunix(Date.now()/1000,defunix,monUnit)+1,0)
    let monthnums = araglen(giveunix(Date.now()/1000,defunix,monUnit)+1,0)
    let displayimage = "logos_mes.png"
    let desc = "a card maker"
    for (let i = 0; i < data.length; i++) {
        if (data[i].maker==makername) {
            monthnums[data[i].month]++
            if (data[i].ratings.length>0) {
                monthscores[data[i].month]+=cardgetratings(i,1)[0][0]
            }
        }
    }
    console.log(monthscores);





    for (let i = 0; i < makerdata.length; i++) {
        if (makerdata[i].username==makername) {
            displayname = makerdata[i].displayname
            displayimage = makerdata[i].pfp
            desc = makerdata[i].makerDesc
        }
    }

    
    let bestcards = {bestcard:-1,mostcard:-1,design:-1,balance:-1,creativity:-1,desvcard:-1,ddesign:-1,dbalance:-1,dcreativity:-1,}
    
    ///what was even this for it was in the "if (bestcards.bestcard!=-1)" area replacing bestcards.bestcard 
    let statcheckedid = -1
    for (let i = 0; i < data.length; i++) {
        if (makername==data[i].maker) {
            if (bestcards.bestcard!=-1) {
                if (cardgetratings(i,1000)[1][0]>cardgetratings(bestcards.bestcard,1000)[1][0]) {
                    bestcards.bestcard=i
                }
            } else {bestcards.bestcard=i}

            if (bestcards.mostcard!=-1) {
                if (cardgetratings(i,1000)[0][0]>cardgetratings(bestcards.mostcard,1000)[0][0]) {
                    bestcards.mostcard=i
                }
            } else {bestcards.mostcard=i}

            if (bestcards.design!=-1) {
                if (cardgetratings(i,1000)[1][1]>cardgetratings(bestcards.design,1000)[1][1]) {
                    bestcards.design=i
                }
            } else {bestcards.design=i}

            if (bestcards.balance!=-1) {
                if (cardgetratings(i,1000)[1][2]>cardgetratings(bestcards.balance,1000)[1][2]) {
                    bestcards.balance=i
                }
            } else {bestcards.balance=i}

            if (bestcards.creativity!=-1) {
                if (cardgetratings(i,1000)[1][3]>cardgetratings(bestcards.creativity,1000)[1][3]) {
                    bestcards.creativity=i
                }
            } else {bestcards.creativity=i}

            if (bestcards.mostcard!=-1) {
                if (cardgetratings(i,1000)[0][0]>cardgetratings(bestcards.mostcard,1000)[0][0]) {
                    bestcards.mostcard=i
                }
            } else {bestcards.mostcard=i}

            //deserved

            if (bestcards.desvcard!=-1) {
                if (cardgetratings(i,1000)[1][0]>cardgetratings(bestcards.desvcard,1000)[1][0]) {
                    bestcards.desvcard=i
                }
            } else {bestcards.desvcard=i}

            if (bestcards.ddesign!=-1) {
                if (cardgetratings(i,1000)[1][1]>cardgetratings(bestcards.ddesign,1000)[1][1]) {
                    bestcards.ddesign=i
                }
            } else {bestcards.ddesign=i}

            if (bestcards.dbalance!=-1) {
                if (cardgetratings(i,1000)[1][2]>cardgetratings(bestcards.dbalance,1000)[1][2]) {
                    bestcards.dbalance=i
                }
            } else {bestcards.dbalance=i}

            if (bestcards.dcreativity!=-1) {
                if (cardgetratings(i,1000)[1][3]>cardgetratings(bestcards.dcreativity,1000)[1][3]) {
                    bestcards.dcreativity=i
                }
            } else {bestcards.dcreativity=i}

        }
    }

    //start printing

    // `filter='maker/`+makername+`';showallcards()`

    let commandis = [statmode,showallcards,rolledchars]
    for (let i = 0; i < commandis.length; i++) {
        let link = document.createElement("div");
        link.onclick = commandis[i]
        link.appendChild(document.createTextNode(commandis[i].name))
        link.classList.add("butt")
        link.tabIndex = 0
        link.role = "button"
        document.getElementById('content').appendChild(link)
    }



    let fullcard = document.createElement("div");
    fullcard.classList.add("fullcard")
    // fullcard.classList.add("shaurma")


    //first half
    let half1 = document.createElement("div");
    half1.classList.add("half")

    let imghalf = document.createElement("img")
    imghalf.alt = "404"
    imghalf.src = linker+"images/extra/regis_users/" + displayimage
    imghalf.classList.add("half")

    half1.appendChild(imghalf)

    fullcard.appendChild(half1)

    //second half
    let half2 = document.createElement("div");
    half2.classList.add("half")

    let titl = document.createElement("div");
    titl.classList.add("title")
    titl.appendChild(document.createTextNode(displayname))
    half2.appendChild(titl)

    let usern = document.createElement("div");
    usern.classList.add("text")
    usern.appendChild(document.createTextNode("username: " + makername))
    half2.appendChild(usern)

    let descr = document.createElement("div");
    descr.classList.add("text")
    descr.appendChild(document.createTextNode(desc))
    half2.appendChild(descr)

    let gpa1 = document.createElement("div");
    gpa1.classList.add("text")
    gpa1.appendChild(document.createTextNode("total gpa: "+Math.floor(getGPA(makername,'*')*1000)/1000))
    half2.appendChild(gpa1)

    let totalmade = document.createElement("div");
    totalmade.classList.add("text")
    totalmade.appendChild(document.createTextNode("cards total: "+ arasumval(monthnums)))
    half2.appendChild(totalmade)

    let totalscore = document.createElement("div");
    totalscore.classList.add("text")
    totalscore.appendChild(document.createTextNode("total score: "+ arasumval(monthscores)))
    half2.appendChild(totalscore)

    let sellallcards = document.createElement("div");
    sellallcards.classList.add("butt")
    sellallcards.classList.add("text")
    sellallcards.appendChild(document.createTextNode("see all cards"))
    sellallcards.onclick = function(){filter='maker/'+makername;showallcards()}
    sellallcards.tabIndex = 0
    sellallcards.role = "button"
    half2.appendChild(sellallcards)

    // let gpa2 = document.createElement("div");
    // gpa2.classList.add("text")
    // gpa2.appendChild(document.createTextNode()
    // half2.appendChild(gpa2)

    fullcard.appendChild(half2)
    contenttab.appendChild(fullcard)

    //title
    let recawtit = document.createElement("div");
    recawtit.classList.add("title")
    recawtit.appendChild(document.createTextNode("recieved awards:"))
    contenttab.appendChild(recawtit)

    //awards

    let monthblacklist = [1]
    for (let i = 0; i < monthscores.length; i++) {
        if (monthscores[i]>0 && !isin(i,monthblacklist  )) {
            let rankid = -1
            for (let ind = 0; ind < rankdata.length; ind++) {
                if (rankdata[ind].min<=monthscores[i]&&rankdata[ind].max>=monthscores[i]) {
                    rankid=ind
                }
            }


            let rankkard = document.createElement("div")
            rankkard.classList.add("smallcard")
            
                let images1 = document.createElement("div")
                images1.classList.add("images")
                let images2 = document.createElement("div")
                images2.classList.add("rankcard")
                // console.log(rankid);
                images2.style.backgroundImage = "url("+linker+"images/extra/ranks/" + rankdata[rankid].imgName + ")"
                images2.style.width = "100%"
                images1.appendChild(images2)
                rankkard.appendChild(images1)

            let titel = document.createElement("div")
            titel.classList.add("title")
            titel.appendChild(document.createTextNode(rankdata[rankid].rankName))
            rankkard.appendChild(titel)

            let monthdate = document.createElement("div")
            monthdate.classList.add("text")
            monthdate.appendChild(document.createTextNode("month " + i))
            rankkard.appendChild(monthdate)

            let monthgpa = document.createElement("div")
            monthgpa.classList.add("text")
            monthgpa.appendChild(document.createTextNode("gpa: " + Math.floor(getGPA(makername,i)*10)/10))
            rankkard.appendChild(monthgpa)

            let monthmade = document.createElement("div")
            monthmade.classList.add("text")
            monthmade.appendChild(document.createTextNode("month made: " + monthnums[i]))
            rankkard.appendChild(monthmade)

            contenttab.appendChild(rankkard)
        }
    }

    //title2
    let beskardtit = document.createElement("div");
    beskardtit.classList.add("title")
    beskardtit.appendChild(document.createTextNode("best cards:"))
    contenttab.appendChild(beskardtit)


    //cardshow
    let cardshow = [
        {title:"best rated",id:bestcards.bestcard,relevnum:cardgetratings(bestcards.bestcard,100)[1][0]},
        {title:"most rated",id:bestcards.mostcard,relevnum:cardgetratings(bestcards.mostcard,100)[0][0]},
        {title:"best design",id:bestcards.design,relevnum:cardgetratings(bestcards.design,100)[1][1]},
        {title:"best balance",id:bestcards.balance,relevnum:cardgetratings(bestcards.balance,100)[1][2]},
        {title:"best creativity",id:bestcards.creativity,relevnum:cardgetratings(bestcards.creativity,100)[1][3]},
        {title:"deservedly rated",id:bestcards.desvcard,relevnum:cardgetratings(bestcards.desvcard,100)[2][0]},
        {title:"deserved design",id:bestcards.ddesign,relevnum:cardgetratings(bestcards.ddesign,100)[2][1]},
        {title:"deserved balance",id:bestcards.dbalance,relevnum:cardgetratings(bestcards.dbalance,100)[2][2]},
        {title:"deserved creativity",id:bestcards.dcreativity,relevnum:cardgetratings(bestcards.dcreativity,100)[2][3]},
    ]

    for (let i = 0; i < cardshow.length; i++) {

        let rankkard = document.createElement("div")
        rankkard.classList.add("smallcard")
        rankkard.classList.add("butt")
        rankkard.onclick = function(){selectcard(cardshow[i].id)}        
        
            let images1 = document.createElement("div")
            images1.classList.add("images")
            // for (let ind = 0; ind < data[cardshow[i].id].cardimglink.length; ind++) {
            for (let ind = 0; ind < 1; ind++) {
                let images2 = document.createElement("div")
                images2.classList.add("onecard")
                images2.style.backgroundImage = "url("+ linker +'images/mainclass_cards/' + data[cardshow[i].id].cardimglink[ind] + ")"
                images2.style.width = "100%"
                images1.appendChild(images2)
            }
            rankkard.appendChild(images1)

        let titel = document.createElement("div")
        titel.classList.add("title")
        titel.appendChild(document.createTextNode(cardshow[i].title))
        rankkard.appendChild(titel)

        let monthgpa = document.createElement("div")
        monthgpa.classList.add("text")
        monthgpa.appendChild(document.createTextNode(data[cardshow[i].id].name))
        rankkard.appendChild(monthgpa)

        let monthmade = document.createElement("div")
        monthmade.classList.add("text")
        monthmade.appendChild(document.createTextNode(cardshow[i].relevnum))
        rankkard.appendChild(monthmade)

        contenttab.appendChild(rankkard)
    }





    // contenttab.appendChild(recawtit)
}

function togglewiki() {
    wikimode=(wikimode==1)?0:1;
    showallcards()
}

function submitimglinks(stringus,cardid) {
    data[cardid].cardimglink=stringus.split(",")
    document.getElementById('imagehelp').style.display="none";
    selectcard(cardid)
}

function submittags(stringus,cardid) {
    data[cardid].tags=stringus.split(",")
    document.getElementById('tagshelp').style.display="none";
    selectcard(cardid)
}

function reloadtags() {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].tags.length; j++) {
            if (!isin(data[i].tags[j],knowntags)) {
                knowntags.push(data[i].tags[j])
            }
        }
    }
    knowntags.sort()
}

function lookatimg(cardid,imgid) {
    let toxt = ""
    
    toxt+='<div class="butt" onclick="selectcard('+cardid
    toxt+=')">back to card</div>'

    toxt+='<img alt="404" src="'+linker+'images/mainclass_cards/'
    toxt+=data[cardid].cardimglink[imgid]
    toxt+='" width="100%">'

    document.getElementById('content').innerHTML=toxt
}

function checkfilt4(cardid) {
    let filterallow = 0
    let filtertype = getfilt4()
    if (filtertype=='broad') {
        if (data[cardid].name.toLowerCase().indexOf(filter.toLowerCase())>-1) {
            filterallow=1
        }
        if (data[cardid].maker.indexOf(filter)>-1) {
            filterallow=1
        }
        for (let i = 0; i < data[cardid].fulltags.length; i++) {
            if (data[cardid].fulltags[i].indexOf(filter)>-1) {
                filterallow=1
            }
        }
    }
    if (filtertype == 'class') {
        filterallow=(filter=='class/'+classDearreyer[data[cardid].klas])?1:0
    }
    if (filtertype == 'maker') {
        filterallow=(filter=='maker/'+data[cardid].maker)?1:0
    }
    if (filtertype == 'stat') {}
    if (isin(filtertype,['ratings','avrgrating','alphrating','wavrgrating'])) {
        filterallow=(data[cardid].ratings.length>0)?1:0
    }
    if (filtertype == 'image') {
        filterallow=(data[cardid].cardimglink.length>0)?1:0
    }
    if (isin(filtertype,['chronological','antichrono'])) {
        filterallow=1
    }
    if (filtertype == 'noimage') {
        filterallow=(data[cardid].cardimglink.length==0||data[cardid].cardimglink[0]=='')?1:0
    }
    if (filtertype == 'monthly') {
        filterallow=(filter=='stat/month/'+data[cardid].month)?1:0
    }
    if (filtertype == 'thismonth') {
        filterallow=(data[cardid].month==giveunix(Date.now()/1000,defunix,monUnit))?1:0
    }
    if (filtertype == 'exacttag') {
        let tagarray = filter.split("/")[1].split(",")
        filterallow=1
        for (let i = 0; i < tagarray.length; i++) {
            if (tagarray[i].indexOf('-')==0) {
                if (isin(tagarray[i].substring(1),data[cardid].fulltags)) {
                    filterallow=0
                }
            } else {
                if (!isin(tagarray[i],data[cardid].fulltags)) {
                    filterallow=0
                }
            }
        }
    }
    // console.log(filter,filtertype,filterallow);
    return filterallow
}

function getfilt4() {
    let filtertype = 'broad'
    let specfil = 0
    if (filter.split("/").length>1) {
        specfil=1
    }
    if (specfil==1) {
        if (filter.indexOf('class/')==0) {
            filtertype = 'class'
        }
        if (filter.indexOf('maker/')==0) {
            filtertype = 'maker'
        }
        if (filter.indexOf('tags/')==0) {
            filtertype = 'exacttag'
        }
        if (filter.indexOf('stat/')==0) {
            filtertype = 'stat'
            if (isin(filter.split("/")[1],['ratings','rate'])) {
                filtertype = 'ratings'
                if (isin(filter.split("/")[2],['avrg'])) {
                    filtertype = 'avrgrating'
                }
                if (isin(filter.split("/")[2],['wavrg'])) {
                    filtertype = 'wavrgrating'
                }
                if (isin(filter.split("/")[2],['alph'])) {
                    filtertype = 'alphrating'
                }
            }
            if (isin(filter.split("/")[1],['image'])) {
                filtertype = 'image'
            }
            if (isin(filter.split("/")[1],['noimg','noimage'])) {
                filtertype = 'noimage'
            }
            if (isin(filter.split("/")[1],['month'])) {
                filtertype = 'monthly'
                if (filter.split("/").length>2) {
                    if (isin(filter.split("/")[2],['this'])) {
                        filtertype = 'thismonth'
                    }
                }
            }
            if (isin(filter.split("/")[1],['chrono',"age","chr"])) {
                filtertype = 'chronological'
            }
            if (isin(filter.split("/")[1],['antichrono',"unage","achr"])) {
                filtertype = 'antichrono'
            }
        }
    }
    // console.log(filtertype);
    return filtertype
}

function rolledchars() {
    let toxt = ""
    toxt += '<div class="ricegum fullcard">'
    toxt+='<div onclick="statmode()" class="butt">statmode</div>'
    toxt += '</div>'
    for (let team = 0; team < teams.length; team++) {
        toxt += '<div class="ricegum fullcard">'
        toxt += teams[team][0]
        toxt += '</div>'
        for (let i = 1; i < teams[team].length; i++) {
            if (i%3==1) {
                toxt += '<div class="ricegum fullcard">'
            }
            let cardid = teams[team][i]
            toxt += rolledcard(cardid)
            if (i%3==0) {
                toxt += '</div>'
            }
        }
        toxt+="MC:" + MCCs[mcs[team]]
    }
    toxt+="warning, MCs list is imcomplete (very outdated (2024) ) some MCs might not appear"
    document.getElementById('content').innerHTML=toxt
}

function rolledcard(cardid) {
    let toxt = ""
    toxt+='<div class="smallcard butt" onclick="selectcard('+cardid
    toxt+=')"><div class="images">'
    let leng = (simpledisplay==1)?1:data[cardid].cardimglink.length
    leng=(data[cardid].cardimglink.length>0)?leng:0
    for (let i = 0; i < leng; i++) {
        toxt+='<div class="onecard" style="background-image: url('+linker+'images/mainclass_cards/'
        toxt+=data[cardid].cardimglink[i]
        toxt+=');width: '
        toxt+=Math.floor(100/data[cardid].cardimglink.length)
        toxt+='%">'
        toxt+='</div>'
    }
    toxt+='</div><div class="title">'+data[cardid].name
    toxt+='</div>'
    toxt+='</div>'
    return toxt
}


var newchar = ['el',1,'character_'+data.length,["empty_tag"],[0,0,0,0]]

var tuext = ""
function newcardmenu() {
    let toxt = ""
    
    toxt+='<div class="ricegum fullcard">'

    toxt+='<div onclick="showallcards()" class="butt">showallcards</div>'

    toxt+='</div>'





    toxt+='<div class="ricegum fullcard">'
    
    toxt+='<div class="list">'


    toxt+='<div class="item">'
    toxt+=newchar[2]+", "
    toxt+=classDearreyer[newchar[1]]+", by:"
    toxt+=newchar[0]
    toxt+='</div>'


    toxt+='<div class="item">name</div>'
    toxt+=`<input type="text" id="charname">`
    toxt+=`<div class="butt" onclick="newchar[2]=document.getElementById('charname').value;newcardmenu()">`
    toxt+='submit name</div>'



    
    toxt+='<div class="item">maker</div>'
    toxt+='<div class="ricegum">'
    toxt+=`<input type="text" id="imglinks" onclick="document.getElementById('imagehelp').style.display='flex';">`
    toxt+='<div class="list" id="imagehelp">'//openlist imagehelp
    let arrag = []
    for (let i = 0; i < data.length; i++) {
        if (!isin(data[i].maker,arrag)) {
            arrag.push(data[i].maker)
            toxt+=`<div class="item butt" onclick="document.getElementById('imglinks').value='`
            toxt+=data[i].maker
            toxt+=`'">`
            toxt+=data[i].maker
            toxt+='</div>'
        }
    }
    toxt+='</div>'// closelist imagehelp
    toxt+=`<div class="butt" onclick="newchar[0]=document.getElementById('imglinks').value;newcardmenu()">`
    toxt+='submit maker</div>'
    
    toxt+='</div>'



    
    toxt+='<div class="item">class</div>'
    toxt+='<div class="list" style="min-height: 125px;">'//openlist for class
    
    for (let i = 0; i < classes.length; i++) {
        if (classes[i]==newchar[1]) {
            toxt+=`<div class="item butt actiur" onclick="newchar[1]=`
        } else {
            toxt+=`<div class="item butt" onclick="newchar[1]=`
        }
        toxt+=classes[i]
        toxt+=`;newcardmenu()">`
        toxt+=classDearreyer[classes[i]]
        toxt+='</div>'
    }
    toxt+='</div>'// closelist for class

    toxt+='<div class="item">chartags</div>'
    toxt+=`<textarea type="text" id="chartags" onchange="newchar[3]=document.getElementById('chartags').value.split(',')">`
    for (let i = 0; i < newchar[3].length; i++) {
        toxt+=newchar[3][i]+","
    }
    toxt+=`</textarea>`

    toxt+='<div class="item">hp: init-max</div>'
    toxt+='<div class="ricegum">'
    toxt+=`<input type="text" id="charHPinit" onchange="newchar[4][0]=document.getElementById('charHPinit').value">`
    toxt+=`<input type="text" id="charHPmax" onchange="newchar[4][1]=document.getElementById('charHPmax').value">`
    toxt+='</div>'
    toxt+='<div class="item">stagger: init-max</div>'
    toxt+='<div class="ricegum">'
    toxt+=`<input type="text" id="charSTGinit" onchange="newchar[4][3]=document.getElementById('charSTGinit').value">`
    toxt+=`<input type="text" id="charSTGmax" onchange="newchar[4][4]=document.getElementById('charSTGmax').value">`
    toxt+='</div>'

    toxt+='<div class="item">'
    toxt+='<div class="item">'

    ///charcode.js text
    tuext=""
    tuext+='{\ncharcode:"'
    tuext+=newchar[2].toLowerCase().replace(" ", "_");
    tuext+='",\nname:"'
    tuext+=newchar[2];
    tuext+='",\nbias:3,\nklas:'
    tuext+=newchar[1];
    tuext+=',\nmaker:"'
    tuext+=newchar[0];
    tuext+='",\ntags:'+JSON.stringify(newchar[3])+',\nfulltags:[],\nactions:[\n],\npassives:['
    if (!isin(0,newchar[4])) {
        tuext+='\n\t{initial_health:'+newchar[4][0]+','
        tuext+='max_health:'+newchar[4][1]+','

        tuext+='\n\tinitial_stagger:'+newchar[4][3]+','
        tuext+='max_stagger:'+newchar[4][4]+','

        tuext+='\n\tobject_sprite:""},'
    } else {
        tuext+='\n\t{initial_health:'+newchar[1]*50+','
        tuext+='max_health:'+newchar[1]*50+','

        tuext+='\n\tinitial_stagger:'+100+','
        tuext+='max_stagger:'+100+','

        tuext+='\n\tobject_sprite:""},'
    }
    tuext+='\n],\ndesc:"desc",\nmonth:'
    tuext+=giveunix(Date.now()/1000,defunix,monUnit)
    tuext+=',\nratings:[],\ncardimglink:[],\nthumbnail_link:"",\n},'
    
    
    
    toxt+='</div>'
    toxt+='</div>'

    
    toxt+='<div class="butt" onclick="download(tuext,`'
    toxt+=newchar[2].toLowerCase().replace(" ", "_");
    toxt+='.UXDOM`,`js`)">'
    toxt+='submit character</div>'



    toxt+='</div>'

    toxt+='</div>'
    document.getElementById('content').innerHTML=toxt
}

function sunbmitchar() {

    // {name:newchar[2],bias:4,klas: newchar[1],maker: newchar[0],tags:['empty_tag'],desc:'desc',month:giveunix(Date.now()/1000,defunix,monUnit),ratings:[],fulltags:[],attacks:[],actions:[],passives:[],cardimglink:[]}
    // showallcards()
}

function giveunix(endtime,submitunix,unit) {
    return Math.floor((endtime-submitunix)/unit)
}

function giveunixwindow(unitid,submitunix,unit) {
    return [unitid*unit+submitunix,(unitid+1)*unit+submitunix]
    
}

function getGPA(authorname,month) {
    let numofcards = 0
    let total = 0
    for (let i = 0; i < data.length; i++) {
        let req = data[i].maker==authorname&&data[i].ratings.length>0
        if (month!="*") {
            req = req && data[i].month==month
        }
        if (req) {
            numofcards++
            total = total + cardgetratings(i,1000)[1][0]*1
        }
    }
    return total/numofcards
}

function assignimges() {
    let neounissigned = []
    for (let i = 0; i < archeounissigned.length; i++) {
        let unassigned = 1
        for (let j = 0; j < data.length; j++) {
            if (isin(archeounissigned[i],data[j].cardimglink)) {
                unassigned=0
            }
        }
        if (unassigned==1) {
            neounissigned.push(archeounissigned[i])
        }
    }
    unassignedimgs=neounissigned
}