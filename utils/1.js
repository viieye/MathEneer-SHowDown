var knowntags = ['empty_tag',]

var datasort = 1
var sorts = 0
var neodata = []

//temp thing so the chars could be added normally
for (let i = 0; i < data2.length; i++) {
    data.push(data2[i])
}
for (let i = 0; i < data.length; i++) {
    // let blackist = ["joshua","saba"]
    // let blackist = ["eno"]
    let blackist = []
    let cardblackist = []
    let obiyek = data[i]
    if (!isin(obiyek.maker,blackist) && !isin(obiyek.name,cardblackist)) {
        neodata.push(obiyek)
    }
}
if (datasort==1) {
    // console.log("sortmode: "+(datasort==1));
    for (let j = 0; j < neodata.length; j++) {
        for (let i = 1; i < neodata.length; i++) {
            let obiyek = neodata[i-1]
            if (neodata[i].name.toLowerCase()<obiyek.name.toLowerCase()) {
                neodata[i-1]=neodata[i]
                neodata[i]=obiyek
            }
        }
    }
}
///less statting from the very end
var haverated = []
for (let i = 0; i < ratings.length; i++) {
    let orphant=0
    for (let j = 0; j < neodata.length; j++) {
        //if charcode matches the ratings
        if (neodata[j].name==ratings[ratings.length-i-1][0] || neodata[j].charcode==ratings[ratings.length-i-1][0]) {
            //will not happen if rating was already cast
            if (!isin(ratings[ratings.length-i-1][1][3]+neodata[j].name,haverated)) {
                haverated.push(ratings[ratings.length-i-1][1][3]+neodata[j].name)
                // console.log(haverated);
                
                neodata[j].ratings.push(ratings[ratings.length-i-1][1])
            }
            orphant++
        }
    }
    if (orphant<1) {
        orphantratings.push(ratings[ratings.length-i-1][0])
    }
}
//free up space
// haverated = []

console.log(orphantratings);

data=neodata

function vizdata(expoert) {
    let toxt = "var data = [\n"
    for (let i = 0; i < data.length; i++) {
        toxt+="{"
        toxt+="name:'"+data[i].name+"',"
        toxt+="bias:'"+data[i].bias+"',"
        toxt+="klas:"+data[i].klas+","
        toxt+="maker:'"+data[i].maker+"',fulltags:[],"
        toxt+="tags:["
        for (let j = 0; j < data[i].tags.length; j++) {
            toxt+="'"+data[i].tags[j]+"',"
        }toxt+="],"
        toxt+="attacks:[],actions:[],passives:[],"
        toxt+="desc:'"
        toxt+=data[i].desc
        toxt+="',month:"
        toxt+=data[i].month
        toxt+=",ratings:["
        for (let j = 0; j < data[i].ratings.length; j++) {
            toxt+="["+data[i].ratings[j]+"],"
        }toxt+="],"
        toxt+="cardimglink:["
        for (let j = 0; j < data[i].cardimglink.length; j++) {
            toxt+="'"+data[i].cardimglink[j]+"',"
        }toxt+="],"
        toxt+="},\n"
    }
    toxt+="]"
    if (expoert==1) {document.getElementById('datexp').innerText=toxt}
    return toxt
}

setTimeout(startup, 100);

function startup() {
    filltags()
    statmode()
    // showallcards()
    // selectcard(0)
}

function getcategor(category,categorytitles) {
    let nams = []
    let numbs = []

    let legs = [];let epix = [];let rars = [];let ucms = [];let sups = []; let xtra = []

    if (category=="klass") {
        nams.push(classDearreyer[10],classDearreyer[8],classDearreyer[5],classDearreyer[3],classDearreyer[1])
        numbs.push(0,0,0,0,0)
        legs.push(0,0,0,0,0)
    }
    for (let i = 0; i < data.length; i++) {
        if (category=="creator") {
            if (!isin(data[i].maker,nams)) {
                nams.push(data[i].maker)
                numbs.push(0)
                legs.push(0)
                epix.push(0)
                rars.push(0)
                ucms.push(0)
                sups.push(0)
            }
            for (let ind = 0; ind < nams.length; ind++) {
                if (data[i].maker==nams[ind]) {
                    numbs[ind]++
                    switch(data[i].klas) {
                        case 1:sups[ind]++;break;
                        case 3:ucms[ind]++;break;
                        case 5:rars[ind]++;break;
                        case 8:epix[ind]++;break;
                        case 10:legs[ind]++;
                    }
                }
            }
        }
        if (category=="klass") {
            for (let ind = 0; ind < nams.length; ind++) {
                if (classDearreyer[data[i].klas]==nams[ind]) {
                    numbs[ind]++
                }
            }
        }
        if (category=="tags") {
            for (let j = 0; j < data[i].fulltags.length; j++) {
                if (!isin(data[i].fulltags[j],nams)) {
                    nams.push(data[i].fulltags[j])
                    numbs.push(1)
                    legs.push(0+"%")
                } else {
                    for (let ind = 0; ind < nams.length; ind++) {
                        if (data[i].fulltags[j]==nams[ind]) {
                            numbs[ind]++
                            legs[ind]=Math.floor(100*numbs[ind]/data.length)+"%"
                        }
                    }
                }
            }
            // console.log(numbs);
        }
        if (category=="scores"||category=="scores%") {
            let target = data[i].maker
            if (!isin(target,nams)) {
                nams.push(target)
                numbs.push(0)
                legs.push(0)
                epix.push(0)
                rars.push(0)
                ucms.push(0)
                sups.push(0)
                xtra.push(0)
            }
            for (let ind = 0; ind < nams.length; ind++) {
                if (target==nams[ind]) {
                    for (let ond = 0; ond < data[i].ratings.length; ond++) {
                        let ratearray = data[i].ratings[ond]
                        // console.log(i,ind);
                        numbs[ind]+= ratearray[0]+ratearray[1]+ratearray[2]
                        legs[ind]+= ratearray[0]
                        epix[ind]+= ratearray[1]
                        rars[ind]+= ratearray[2]
                    }
                }
            }
        }
        if (category=="monthscores") {
            let target = data[i].maker
            if (!isin(target,nams)) {
                nams.push(target)
                numbs.push(0)
                legs.push(0)
                epix.push(0)
            }
            for (let ind = 0; ind < nams.length; ind++) {
                if (target==nams[ind]) {
                    if (data[i].month==giveunix(Date.now()/1000,defunix,monUnit)) {
                        numbs[ind]+=cardgetratings(i,1)[0][0]
                    }
                    if (data[i].month==giveunix(Date.now()/1000,defunix,monUnit)-1) {
                        legs[ind]+=cardgetratings(i,1)[0][0]
                    }
                    if (data[i].month==giveunix(Date.now()/1000,defunix,monUnit)-2) {
                        epix[ind]+=cardgetratings(i,1)[0][0]
                    }
                }
            }
        }
        // if (category=="example") {
        //     let target = data[i].klas
        //     if (!isin(target,nams)) {
        //         nams.push(target)
        //         numbs.push(1)
        //     } else {
        //         for (let ind = 0; ind < nams.length; ind++) {
        //             if (target==nams[ind]) {
        //                 numbs[ind]++
        //             }
        //         }
        //     }
        // }
    }
    let toxt = ""
    toxt+='<div class="item ricegum">'
    toxt+=categorytitles
    toxt+='</div>'
    if (category=="klass") {
        for (let ind = 0; ind < nams.length; ind++) {
            legs[ind]=aramaxminval(numbs)[0]-numbs[ind]
            // console.log(aramaxminval(numbs)[0],numbs[ind]);
        }
    }
    // if (category=="tags") {
    //     for (let ind = 0; ind < nams.length; ind++) {
    //         for (let i = 1; i < nams.length; i++) {
    //             let temp = [nams[i-1],numbs[i-1]]
    //             if (numbs[i-1]<numbs[i]) {
    //                 nams[i-1]=nams[i]
    //                 numbs[i-1]=numbs[i]
    //                 nams[i]=temp[0]
    //                 numbs[i]=temp[1]
    //             }
    //         }
    //     }
    // }
    if (category=="tags") {
        for (let ind = 0; ind < nams.length; ind++) {
            for (let i = 1; i < nams.length; i++) {
                let temp = [nams[i-1],numbs[i-1],legs[i-1]]
                if (numbs[i-1]<numbs[i]) {
                    nams[i-1]=nams[i]
                    numbs[i-1]=numbs[i]
                    legs[i-1]=legs[i]
                    nams[i]=temp[0]
                    numbs[i]=temp[1]
                    legs[i]=temp[2]
                }
            }
        }
    }
    if (category=="scores") {
        for (let i = 0; i < nams.length; i++) {
            let total = numbs[i]
            if (total!=0) {
                ucms[i]=Math.round(100*legs[i]/total)
                sups[i]=Math.round(100*epix[i]/total)
                xtra[i]=Math.round(100*rars[i]/total)
            }
        }
    }
    if (category=="monthscores") {
        for (let ind = 0; ind < nams.length; ind++) {
            for (let i = 1; i < nams.length; i++) {
                let temp = [nams[i-1],numbs[i-1],legs[i-1],epix[i-1]]
                if (numbs[i-1]<numbs[i]) {
                    nams[i-1]=nams[i]
                    numbs[i-1]=numbs[i]
                    legs[i-1]=legs[i]
                    epix[i-1]=epix[i]
                    nams[i]=temp[0]
                    numbs[i]=temp[1]
                    legs[i]=temp[2]
                    epix[i]=temp[3]
                }
            }
        }
    }
    for (let i = 0; i < nams.length; i++) {
        if (isin(category,["tags","creator"])) {
            if (category=="tags") {
                toxt+='<div class="item ricegum"><div class="extrawide item">'
            } else {
                toxt+=`<div class="item ricegum"><div class="wide item butt" onclick="makerProfile('`
                toxt+=nams[i]
                toxt+=`')">`
            }
        } else {
            toxt+='<div class="item ricegum"><div class="wide item">'
        }
        toxt+=nams[i]
        toxt+='</div><div class="item">'
        toxt+=numbs[i]
        if (category=="creator") {
            toxt+='</div><div class="item">'+legs[i]
            toxt+='</div><div class="item">'+epix[i]
            toxt+='</div><div class="item">'+rars[i]
            toxt+='</div><div class="item">'+ucms[i]
            toxt+='</div><div class="item">'+sups[i]
        }
        if (category=="klass"||category=="tags") {
            toxt+='</div><div class="item">'+legs[i]
        }
        if (category=="scores") {
            toxt+='</div><div class="item">'+legs[i]
            toxt+='</div><div class="item">'+epix[i]
            toxt+='</div><div class="item">'+rars[i]
            toxt+='</div><div class="item">'+ucms[i]
            toxt+='</div><div class="item">'+sups[i]
            toxt+='</div><div class="item">'+xtra[i]
        }
        if (category=="scores%"||category=="monthscores") {
            toxt+='</div><div class="item">'+legs[i]
            toxt+='</div><div class="item">'+epix[i]
        }
        toxt+='</div></div>'
    }
    if (category=="klass") {
        toxt+='<div class="item ricegum"><div class="wide item">sums'
        toxt+='</div><div class="item">'+arasumval(numbs)
        toxt+='</div><div class="item">'+arasumval(legs)
        toxt+='</div></div>'
    }
    return toxt
}

function rollchars(plernum) {
    let makelists = [[],[],[],[],[]]
    for (let i = 0; i < plernum; i++) {
        araranel
    }
}

function findbyname(name) {
    for (let i = 0; i < data.length; i++) {
        if (name==data[i].name) {
            return i
        }
    }
    return -1
}

function findstringid(string,array) {
    for (let i = 0; i < array.length; i++) {
        if (string==array[i]) {
            return i
        }
    }
    return -1
}

function araglen(num,numd) {
    let arrag = []
    for (let i = 0; i < num; i++) {
        arrag.push((numd==1)?i:0)
    }
    return arrag
}

function listnamesbyclass(clas) {
    let toxt = ""
    for (let i = 0; i < data.length; i++) {
        if (data[i].klas==clas) {
            toxt+=data[i].name+"\n"
        }
    }
    return toxt
}
//less\ncode i stole from stackoverflow.com///
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}


function downloadChardata(charID) {
    let name = data[charID].name
    let chrcd = data[charID].charcode
    if (chrcd === undefined) {
        chrcd=name.toLowerCase().replace(" ", "_");
    }
    
    ///charcode.js text
    let toxt = ""
    toxt+='{\ncharcode:"'+chrcd
    toxt+='",\nname:"'+name
    toxt+='",\nbias:'+data[charID].bias+',\nklas:'+data[charID].klas
    toxt+=',\nmaker:"'+data[charID].maker
    toxt+='",\ntags:['
    for (let i = 0; i < data[charID].tags.length; i++) {
        toxt+='"'+data[charID].tags[i]+'",'
    }
    toxt+='],\nfulltags:[],\nactions:['
    for (let i = 0; i < data[charID].actions.length; i++) {
        toxt+='\n\t{action_title:"'+data[charID].actions[i].action_title+'",'

        toxt+='\n\taction_probabilty:'+data[charID].actions[i].action_probabilty+','
        toxt+='dont_duplicate_on_max_roll:'+data[charID].actions[i].dont_duplicate_on_max_roll+','
        toxt+='action_cooldown:'+data[charID].actions[i].action_cooldown+','

        toxt+='\n\taction_tags:['
        for (let ind = 0; ind < data[charID].actions[i].action_tags.length; ind++) {
            toxt+= '"'+ data[charID].actions[i].action_tags[ind] + '",';
            
        }
        toxt+='],'
        toxt+='action_effects:['
        for (let ind = 0; ind < data[charID].actions[i].action_effects.length; ind++) {
            toxt+= '\n\t\t'+ JSON.stringify(data[charID].actions[i].action_effects[ind]) + ',';
            
        }
        toxt+=']},'
    }
    toxt+='\n],\npassives:['

    if (data[charID].passives.length>0) {
        toxt+='\n\t{initial_health:'+data[charID].passives[0].initial_health+','
        toxt+='max_health:'+data[charID].passives[0].max_health+','

        toxt+='\n\tinitial_stagger:'+data[charID].passives[0].initial_stagger+','
        toxt+='max_stagger:'+data[charID].passives[0].max_stagger+','

        toxt+='\n\tobject_sprite:""},'
    } else {
        toxt+='\n\t{initial_health:'+data[charID].klas*50+','
        toxt+='max_health:'+data[charID].klas*50+','

        toxt+='\n\tinitial_stagger:'+100+','
        toxt+='max_stagger:'+100+','

        toxt+='\n\tobject_sprite:""},'
    }

    for (let i = 1; i < data[charID].passives.length; i++) {
    }
    toxt+='\n],\ndesc:"desc",\nmonth:'+data[charID].month
    toxt+=',\nratings:['
    // for (let i = 0; i < data[charID].ratings.length; i++) {
    //     toxt+= '['+ data[charID].ratings[i][0]+','+ data[charID].ratings[i][1]+','+ data[charID].ratings[i][2]
    //     if (!data[charID].ratings[i][3]===undefined) {
    //         toxt+= ',"'+ data[charID].ratings[i][3]+'","'+data[charID].ratings[i][4]+'"'
    //     }
    //     toxt+= '],'
    // }
    toxt+='],\ncardimglink:['
    for (let i = 0; i < data[charID].cardimglink.length; i++) {
        toxt+='"'+data[charID].cardimglink[i]+'",'
    }
    toxt+='],\nthumbnail_link:"",\n},'

    download(toxt, chrcd+".UXDOM", 'text/plain')
}