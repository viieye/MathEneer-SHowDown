var dynamictags = [
    {result:"scandinavian",broadpool:["swedish","norse","danish","norvegian","icelandic"],narwpool:[],intermediary:0,exclpool:[]},
    {result:"serbocroat",broadpool:["serbian","bosnian","montenegrin","croat"],narwpool:[],intermediary:1,exclpool:[]},
    {result:"yugoslavic",broadpool:["serbocroat","macedonian","bulgarian","slovenian"],narwpool:[],intermediary:1,exclpool:["greek"]},
    {result:"hispanic",broadpool:["spanish","argentinian","mexican","colombian"],narwpool:[],intermediary:1,exclpool:[]},
    {result:"latine1",broadpool:["hispanic","brasilian","portuguese"],narwpool:['american',],intermediary:1,exclpool:[]},
    {result:"latine",broadpool:["brasilian",'latine1'],narwpool:[],intermediary:1,exclpool:[]},
    {result:"latino",broadpool:["human"],narwpool:['latine','masculine_gender'],intermediary:0,exclpool:[]},
    {result:"latina",broadpool:["human"],narwpool:['latine','feminine_gender'],intermediary:0,exclpool:[]},
    {result:"humanoid",broadpool:["human","humanoid"],narwpool:[],intermediary:0,exclpool:[]},
    {result:"balcan",broadpool:["albanian","yugoslavic","kosovar","hungarian","romanian",'roma',"greek"],narwpool:[],intermediary:0,exclpool:[]},
    {result:"east_slavic",broadpool:["russian","ukrainian","belarussian"],narwpool:['human'],intermediary:1,exclpool:[]},
    {result:"west_slavic",broadpool:["polish","slovak","czech"],narwpool:['human'],intermediary:1,exclpool:[]},
    {result:"slavic",broadpool:["west_slavic","east_slavic","yugoslavic"],narwpool:['human'],intermediary:0,exclpool:[]},
    {result:"caucasian",broadpool:["georgian","caucasian"],narwpool:['human'],intermediary:0,exclpool:[]},
    {result:"steppian",broadpool:["mongolian","steppian","buryat"],narwpool:['human'],intermediary:0,exclpool:[]},
    {result:"german",broadpool:['prussian','bavarian','german'],narwpool:['human'],intermediary:0,exclpool:[]},
    {result:"romance",broadpool:["italian","spanish","french","roman"],narwpool:['human'],intermediary:1,exclpool:[]},
    {result:"british_isler",broadpool:["british","scottish","irish","welsh"],narwpool:['human'],intermediary:1,exclpool:["american"]},
    {result:"european",broadpool:["caucasian","balcan","slavic",'scandinavian','german','austrian','hungarian','swiss',"romance","british_isler","finnish"],narwpool:['human'],intermediary:0,exclpool:["american",'latine']},
    {result:"roman",broadpool:["french","italian","roman","spanish","portuguese"],narwpool:['anchient'],intermediary:0,exclpool:["greek"]},
    {result:"arab",broadpool:["syrian","arabian","libyan","egyptian","algerian"],narwpool:['human'],intermediary:0,exclpool:['anchient']},
    {result:"obobasnairni",broadpool:['spiderkind','scorpionkind','obobasnairni'],narwpool:[],intermediary:0,exclpool:[]},
    {result:"arthropod",broadpool:['crustacean','insectian','obobasnairni'],narwpool:[],intermediary:0,exclpool:[]},
    {result:"american",broadpool:['floridian','texan','new-yorker','american'],narwpool:['human'],intermediary:0,exclpool:[]},
    {result:"eastasian",broadpool:["chinese","japanese","korean"],narwpool:['human'],intermediary:1,exclpool:[]},
    {result:"asian",broadpool:["steppian","indian","eastasian"],narwpool:['human'],intermediary:0,exclpool:['latine']},
    {result:"lightskin",broadpool:["european",'american'],narwpool:['human'],intermediary:0,exclpool:["darkskin","asian",]},
    {result:"whiteskin",broadpool:["lightskin"],narwpool:['human'],intermediary:0,exclpool:["darkskin","asian","arab","amerindian","mestizo"]},
]


function filltags() {
    for (let i = 0; i < data.length; i++) {
        data[i].fulltags=givefulltags(i)
    }
}


function givefulltags(cardid) {
    let cardtagaray = data[cardid].tags
    let tagarag = []
    let tagaray = []
    for (let i = 0; i < dynamictags.length; i++) {
        let approve = 0
        for (let j = 0; j < cardtagaray.length; j++) {
            if (isin(cardtagaray[j],dynamictags[i].broadpool)) {
                approve = 1
            }
        }
        for (let j = 0; j < tagarag.length; j++) {
            if (isin(tagarag[j],dynamictags[i].broadpool)) {
                approve = 1
            }
        }
        for (let j = 0; j < dynamictags[i].narwpool.length; j++) {
            if (!isin(dynamictags[i].narwpool[j],cardtagaray)&&!isin(dynamictags[i].narwpool[j],tagarag)) {
                approve = 0
            }
        }
        for (let j = 0; j < cardtagaray.length; j++) {
            if (isin(cardtagaray[j],dynamictags[i].exclpool)) {
                approve = 0
            }
        }
        for (let j = 0; j < tagarag.length; j++) {
            if (isin(tagarag[j],dynamictags[i].exclpool)) {
                approve = 0
            }
        }
        if (isin(dynamictags[i].result,tagarag)) {
            approve = 0
        }
        if (approve==1) {
            tagarag.push(dynamictags[i].result)
        }
    }
    if (tagarag.length>0) {
        // console.log(tagarag);
    }
    for (let i = 0; i < tagarag.length; i++) {
        for (let j = 0; j < dynamictags.length; j++) {
            if (tagarag[i]==dynamictags[j].result&&dynamictags[j].intermediary==0) {
                tagaray.push(tagarag[i])
            }
        }
    }
    for (let j = 0; j < cardtagaray.length; j++) {
        if (!isin(cardtagaray[j],tagaray)) {
            tagaray.push(cardtagaray[j])
        }
    }
    return tagaray
}

var taggroups = [
    {name:"default",collection:[],tagcol:"#2fa"},
    {name:"nationalities",collection:["american","european","albanian","yugoslavic","kosovar","hungarian","romanian",'roma',"greek"],tagcol:"#f72"},
    {name:"phenotype",collection:[],tagcol:"#724"},
    {name:"franchise",collection:[],tagcol:"#2bf"},
]

// for (let i = 0; i < array.length; i++) {
//     const element = array[i];
    
// }
// for (let ind = 0; ind < dynamictags.length; ind++) {
//     let isingroups = 0
//     for (let i = 1; i < taggroups.length; i++) {
//         if (isin()) {
            
//         }
//     }
// }