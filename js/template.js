var eArray = '';
function loadIcons(url, selector, cb) {
    requestData(url, (data) => {
        let ds = data[selector];
        let numRows = Math.floor(ds.length);
        let offset = 100 / (numRows);
        let dataHtml = "";
        
        for (let i = 0; i < ds.length; i++) {
          if(SCREEN_WIDTH >=600)
            dataHtml += templateEventIcon(ds[i], i * offset, i * offset, 0.8 * offset, 50);
          else
          dataHtml += templateEventIcon(ds[i], '5%', i * offset,'90%',50);
        }
        eArray = ds;
        cb(dataHtml);
    });
}
function templateEventIcon(event, deltaX, deltaY, width, height) {
    let temp = `<div onclick="visualizeData('${event.id}',);" class='icon' id='${event.id}' style=" box-sizing: border-box;position: absolute; top : ${deltaY}%; left: ${deltaX}%; width: ${width}%; height:${height}px; border: 1px solid rgba(255, 255, 255, 0.701);" >
                    <div class='icon-Name' style="text-align:center; margin-top: 10px;">${event.name}</div>
                </div>`;
    return temp;
}

function createDataLayout(obj) {
    let temp = `
            <div id="data-x" style="padding: 10px; position: absolute; text-shadow: 0px 0px 10px;  border: 1px solid rgba(255, 255, 255, 0.701);">
                <div style="position: fixed; height:60px;"></div>
                <br>
                <div id='s-coordinator'>
                    <span class="heading">Coordinators :</span><br>
                    <span class="dyn" id='d-coordinators'style="padding-left: 10px;"></span>
                </div><br>
                <div id='s-contacts'>
                    <span class="heading">Contacts :</span><br>
                    <span class="dyn" id='d-contacts'style="padding-left: 10px;"><span>
                </div><br>
                <div id='s-entry'>
                    <span class="heading">Entry Fee :</span><br>
                    <span class="dyn" id='d-entry'style="padding-left: 10px;"></span>
                </div><br>
                <div id='s-prize'>
                    <span class="heading">Prize Worth :</span><br>
                    <span class="dyn" id='d-prize'style="padding-left: 10px;"></span>
                </div><br>
                <div id='s-date'>
                    <span class="heading">Date :</span><br>
                    <span class="dyn" id='d-date'style="padding-left: 10px;"></span>
                </div><br>
                <div id='s-room'>
                    <span class="heading">Room :</span><br>
                    <span class="dyn" id='d-room'style="padding-left: 10px;"></span>
                </div><br>
                <div id='s-time'>
                    <span class="heading">Time :</span><br>
                    <span class="dyn" id='d-time'style="padding-left: 10px;"></span>
                </div><br>
                <div id='s-description' style="min-height: 100px">
                    <span class="heading">Description :</span><br>
                    <div class="dyn" id='d-description' style="padding-left: 10px;"></div>
                </div><br>
                <div id='s-rules'>
                    <span class="heading">Rules :</span><br/>
                    <div id='x-c-rules' style="padding-left: 10px;">`;
    for (let i = 0; i < obj.data.rules.length; i++)
    temp += `<div style="display: flex;"><span>${i+1}. </span> <div class='x-rule' style="padding-left: 10px;"></div></div>`;

    temp += `</div>
                </div><br/><br><br>
                <div style='text-align: center;'>
                <a href='http://enginerds.byethost15.com/register.html' target="_blank" class='btn-reg'style='color: rgb(52, 218, 230) !important; font-size: 20px !important;'>Click for registration!</a><br><br><br><br><br>
                </div>
            </div>
        `;
    return temp;
}
function createDataLayout2(obj) {
  let temp = `
          <div id="data-x" style="padding: 10px; position: absolute; text-shadow: 0px 0px 10px;  border: 1px solid rgba(255, 255, 255, 0.701);">
              <div style="position: fixed; height:60px;"></div>
              <br>
              <div id='s-description' style="min-height: 100px">
                  <span class="heading">Description :</span><br>
                  <div class="dyn" id='d-description' style="padding-left: 10px;"></div>
              </div><br><br><br>
              <div style='text-align: center;'>
                <a href='https://www.worldcubeassociation.org/competitions/EnginerdsCubeOpen2018#general-info' target="_blank" class='btn-reg'style='color: rgb(52, 218, 230) !important; font-size: 20px !important;'>Visit World Cube Association's site!</a><br><br><br><br><br>
                </div>
          </div>
      `;
  return temp;
}
function loadEvent2(event) {
  let description = _id('d-description');
  let dataString = event.data.description;
  stringRender(dataString,description,10);
}
function loadEvent(event) {
    

    let elementsArray = [];
    let stringsArray = [];
    Array.prototype.forEach.call(_class('dyn'), e => {
        elementsArray.push(e);
    });
    Array.prototype.forEach.call(_class('x-rule'), e => {
        elementsArray.push(e);
    });
    stringsArray.push(event.data.coordinators);
    stringsArray.push(event.data.contacts);
    stringsArray.push(event.data.entry_fee);
    stringsArray.push(event.data.prize);
    stringsArray.push(event.data.date);
    stringsArray.push(event.data.room);
    stringsArray.push(event.data.time);
    stringsArray.push(event.data.description);
    event.data.rules.forEach(r => {
        stringsArray.push(r);
    });
    arrayRender(stringsArray, elementsArray, 10);
}

function loadCrewDetails(cb) {
    let template = `<div id="can-drag" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;">`;
    requestData('data/crew.json', (data) => {
        data.forEach((d,i) => {
            template += `<div id='${d.id}'ondblclick="visualizeCrewDetail('${d.id}')" class="draggable-images noselect" style='position: absolute; background-color:${d.color}; width: 300px; height: 400px; left:${i * 410}px; top: 5%;'>
                            <image class='image-main' draggable="false" src='${d.image}' style="width: 300px; height: 100%;"></image>
                        </div>`
        });
        template += '</div>'
        template += `<div class="info-z">Drag to move. Double click to View.</div>`
        cb(template.trim());
    });
}

function loadCrewDetailsMob(cb) {
  let template = `<div id="can-drag" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow: scroll;">`;
  requestData('data/crew.json', (data) => {
      data.forEach((d,i) => {
          template += `<div id='${d.id}' class=" noselect" style='position: relative; background-color:${d.color}; width: 100%; margin-bottom : 10px'>
                          <image class='image-main' draggable="false" src='${d.image}' style="width: 100%;"></image>
                          <div style="position: absolute; top:35%; left: 50%; transform: translateX(-50%); ">
                            <span class="heading1">${d.name}</span><br>
                            <span class="heading2">${d.position}</span><br>
                            <span class="heading2">+91 ${d.phone}</span><br>
                          </div>
                      </div>`
      });
      template += '</div>'
      cb(template.trim());
  });
}

//templater
Letters = function() {
    this.lettersDOM = null;
    this.active = null;
    this.letters = [];
    this.alphabet = ["a", "b", "c", "d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","i","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"
    ];
    return this;
  };
  
  Letters.prototype.init = function( word ) {
    
    this.lettersDOM = document.querySelectorAll('.letter');
    this.active = true;
    var i;
    var nextChar;
    var lettersMax = this.lettersDOM.length;
    
    for ( i = 0; i < this.lettersDOM.length; i++ ) {
      
      if ( word.charAt( i ) != "" )
        nextChar = word.charAt( i );
      else 
        nextChar = false;
      
      this.letters.push( new Letter( this.lettersDOM[ i ],  nextChar ) );
      
    }
    
    if ( word.length > lettersMax ) {
      
      var wordContainer = document.getElementById("word");
  
      for ( i = lettersMax; i < word.length; i++ ) {
        var letterSpan = document.createElement('span');
        letterSpan.innerHTML = "";
        letterSpan.classList.add('letter');
        wordContainer.appendChild( letterSpan );
        this.letters.push( new Letter( letterSpan,  word.charAt( i ) ) );
      }
    }
    
    this.animate();
    
    return this;
    
  };
  
  Letters.prototype.animate = function() {
    var i;
    var random;
    var char;
    
    if ( this.active ) {
   
      window.requestAnimationFrame( this.animate.bind(this) );
      
      var indexes = [];
  
      for ( i = 0; i < this.letters.length; i++ ) {
      
        var current = this.letters[ i ];  
        
        if ( !current.isDead ) {     
          random = Math.floor(Math.random() * (this.alphabet.length - 0));
          char = this.alphabet[ random ]; 
          current.render( char );
        } else {
          indexes.push( i );
        }
      } 
      
      for ( i = 0; i < indexes.length; i++ ) {
        this.letters.splice( indexes[ i ], 1 );
      }
      
      if ( this.letters.length == 0 ) {
        this.stop();
      }
    }
  };
  
  Letters.prototype.start = function( word ) {
    this.init( word );
  };
  
  Letters.prototype.stop = function() {
    this.active = false;
  };
  
  Letter = function( DOMElement, nextChar ) {
    
    var scope = this;
    
    this.DOMEl = DOMElement;
    this.char = DOMElement.innerHTML;
    this.next = nextChar;
    this.speed = Math.floor(Math.random() * 200 + 100 );
    this.total = 0;
    this.duration = 2000;
    this.animating = true;
    this.isDead = false;
    
    this.timer = setInterval(function() { 
      if ( scope.animating === true ) {
        scope.total += scope.speed;
      } 
      scope.animating = !scope.animating;
    }, this.speed);
  
    this.animate();
    
    return this;
   
  };
  
  Letter.prototype.animate = function() {
    var i;
    var random;
    
    if ( !this.isDead ) {
        window.requestAnimationFrame( this.animate.bind(this) );
    }
    if ( this.total < this.duration ) {
      
      if ( this.animating ) {
        this.DOMEl.innerHTML = this.char;
      }
        
    } else {
      this.isDead = true;
      
      if ( (!this.next) ||this.next ==undefined ) {
        var parent = document.getElementById('word');
        try{
          parent.removeChild( this.DOMEl );
        }catch(e) {
          //do nothing
        }
        
        return;
      }
      
      this.DOMEl.innerHTML = this.next;
    }
  };
  Letter.prototype.render = function( char ) {
    
    if ( !this.animating ) {
      this.char = char;
    }
    
  };
  
  var word = [ "GCELT ", "TECHFEST ", "2K18 " ];
  var nextWord = 1;
  
  var letters = new Letters();
  
  setTimeout( function() {
    
    letters.start( word[ nextWord ] );
    
    setInterval(function() {
      nextWord++;
      if ( nextWord >= word.length )
        nextWord = 0;
      
      letters.start( word[ nextWord ] );
    }, 10000);
    
  }, 2000);
  
  