const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
let MOUSE_X = SCREEN_WIDTH/2;
let MOUSE_Y = SCREEN_HEIGHT/2;

document.addEventListener('mousemove',(e) => {
    MOUSE_X = e.clientX;
    MOUSE_Y = e.clientY;
});

function _id(id) {
    return document.getElementById(id);
}

function _class(cls) {
    return document.getElementsByClassName(cls);
}
function toss() {
    return Math.random() > 0.5 ? 1 : -1;
}

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}
function requestData(url,cb) {
    fetch(url,{
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        credentials: "same-origin",
    }).then(res => {
        if(res.status != 200) {
            console.error(`there is some problem in fetching data: ${url}`);
            return;
        }
        res.json().then( data => cb(data));
    });
};

function StateManager() {
    this.states = [];
    this.stateFunctions = [];
    this.currentState = '';
    this.push = (state, stateFunction) => {
        this.states.push(state);
        this.stateFunctions.push(stateFunction);
    }
    this.setState = (state) => {
        if(this.states.includes(state)) {
            this.currentState = state;
            let stateindex = this.states.indexOf(state);
            this.stateFunctions[stateindex]();
        }
        else
            console.error(`${state} doesn't exist`);
    }
    this.getState = () => {
        return this.currentState;
    }
};

function stringRender(text, selector, gap) {
    let template = "";
   for(let i = 0; i < text.length; i++) {
       setTimeout(() =>{
        if(text[i] == '|')
            template+='<br>';
        else
            template+= text[i];

            selector.innerHTML = template;
       }, i * gap);
   }
}

function arrayRender(strings, array, gap) {
    if(strings.length != array.length) {
        console.error(`no of strings :${strings.length} doesn't match no of arrays ${array.length}`);
        return;
    }
    for(let i = 0; i < strings.length; i++)
    setTimeout(() => {
        stringRender(strings[i],array[i], gap + Math.random() * gap );
    }, i * gap * 10);
}