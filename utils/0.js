//yusefunk v1.0.2s

var nan = "thisismynansoitequalsitselfbutnotanumber,iwrotitthiswaysoidontcoincidentallymakeavariablewiththesametext"

function isin(el,array) {
    let is = false
    for (let i = 0; i < array.length; i++) {
        if (array[i]==el) {is=true}
    }
    return is
}


function rund(nearlythis) {
    return Math.floor(Math.random()*nearlythis)
}
function araranid(array) {
    return Math.floor(Math.random()*array.length)
}
function araranel(array) {
    return array[Math.floor(Math.random()*array.length)]
}
function weightedrand(weightarray) {
    let rand = arasumval(weightarray)*Math.random()
    let answer = -1
    for (let i = 0; i < weightarray.length; i++) {
        if (rand>weightarray[i]) {
            answer = i
        }
    }
    return answer
}


function aramaxminval(array) {
    let maxmin = [array[0],array[0]]
    for (let i = 0; i < array.length; i++) {
        if (array[i]>maxmin[0]) {
            maxmin[0]=array[i]
        }
        if (array[i]<maxmin[1]) {
            maxmin[1]=array[i]
        }
    }
    return maxmin
}
function arasumval(array) {
    let sum = 0
    for (let i = 0; i < array.length; i++) {
        sum+=array[i]*1
    }
    return sum
}
function araransort(array) {
    let arag = []
    for (let i = 0; i < array.length; i++) {
        arag.push(array[i])
    }
    arag.sort(function(){return 0.5 - Math.random()});
}

function lerp(x1,x2,t) {
    return x1 * (1-t) + x2 * t
}


var cons = ['b',"c","d","g","l","m","n","p","r","s","t","v","w","x","y","z","qu"]
var vovs = ["a","e","i","o","u","a","e","i","o","u","y"]
var cl16 = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f",]
function genname(sillength) {
    let textum = ''
    for (let i = 0; i < sillength; i++) {
        textum+=araranel(cons)+araranel(vovs)+(!rund(3))? "" : araranel(["n","m","ng","p","r","s","t","v","l",])
    }
    return textum
}