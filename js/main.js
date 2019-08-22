//global state mananger
let EVENT_CATAGORY = "";
let CREW_MEMBER_INFO = {
    width: '',
    id: '',
    opacity: '',
    transform: '',
    zIndex: '',
    left: '',
    filter: ''
};
let EVENT_INFO = {
    top: '',
    left: '',
    borderRadius: '',
    id: ''
};
let DRAG_X = 0;
let START_X = 0;
let IS_DRAGGING = false;
let ShouldDrag = true;
let stateManager = new StateManager();
let eventMenuStateManager = new StateManager();
let eventStateManager = new StateManager();
let crewStateMananger = new StateManager();
let sponsorStateManager = new StateManager();
let xState = new StateManager();
//global components
let componentIntro = _id('intro');
let componentMainMenu = _id('mainMenu');
let componentEventMenu = _id('eventMenu');
let componentEvents = _id('events');
let componentCrew = _id('crew');
//global switchs
let btnGo = _id('btn-go');
let btnInitial = _id('btn-initial');


//global toggle
let viewState = false;
//global event listeners
btnGo.addEventListener('click', () => {
    stateManager.setState('main menu');
    componentEventMenu.style.zIndex = 2;
    fadeBox();
});
btnInitial.addEventListener('click', () => {
    stateManager.setState('intro');
    sponsorStateManager.setState('inactive');
    eventMenuStateManager.setState('inactive');
    eventStateManager.setState('inactive');
    crewStateMananger.setState('inactive');
    ShouldDrag = true;
});
_id('main-menu-item-1').addEventListener('click', () => {
    stateManager.setState('squeez menu');
    sponsorStateManager.setState('inactive');
    stateManager.setState('events menu');
    stateManager.setState('dismiss workshop');
    eventStateManager.setState('inactive');
    crewStateMananger.setState('inactive');
    eventMenuStateManager.setState('display');
    _id('x-code').style.zIndex = 5;
    ShouldDrag = true;

});
_id('main-menu-item-2').addEventListener('click', () => {
    stateManager.setState('squeez menu');
    sponsorStateManager.setState('inactive');
    stateManager.setState('workshop menu');
    stateManager.setState('workshop');
    eventStateManager.setState('inactive');
    eventMenuStateManager.setState('inactive');
    crewStateMananger.setState('inactive');
    componentEventMenu.style.zIndex = -2;
    _id('x-code').style.zIndex = 5;
    ShouldDrag = true;

});
_id('main-menu-item-3').addEventListener('click', () => {
    stateManager.setState('squeez menu');
    stateManager.setState('crew menu');
    stateManager.setState('dismiss workshop');
    sponsorStateManager.setState('inactive');
    eventStateManager.setState('inactive');
    eventMenuStateManager.setState('inactive');
    componentEventMenu.style.zIndex = -2;
    crewStateMananger.setState('visible');
    ShouldDrag = true;
});
_id('main-menu-item-4').addEventListener('click', () => {
    stateManager.setState('squeez menu');
    stateManager.setState('dismiss workshop');
    sponsorStateManager.setState('active');
    eventStateManager.setState('inactive');
    eventMenuStateManager.setState('inactive');
    crewStateMananger.setState('inactive');
    componentEventMenu.style.zIndex = -2;
    _id('x-code').style.zIndex = 5;
    ShouldDrag = true;

});
_id('e-m-technical').addEventListener('click', () => {
    eventMenuStateManager.setState('menu technical');
    EVENT_CATAGORY = 'technical';
    eventStateManager.setState('icons')

});
_id('e-m-nontechnical').addEventListener('click', () => {
    eventMenuStateManager.setState('menu nontechnical');
    EVENT_CATAGORY = 'non-technical';
    eventStateManager.setState('icons')
});
_id('e-m-gaming').addEventListener('click', () => {
    eventMenuStateManager.setState('menu gaming');
    EVENT_CATAGORY = 'gaming';
    eventStateManager.setState('icons')
});
_id('e-m-abstruct').addEventListener('click', () => {
    eventMenuStateManager.setState('menu abstruct');
    EVENT_CATAGORY = 'abstract';
    eventStateManager.setState('icons')
});
_id('btnClose').addEventListener('click', dismissVisualization);
//visualize data
function visualizeData(id) {
    console.log(id);
    if (id == 'e-t-3') {
        EVENT_CATAGORY = 'orbitron';
        eventStateManager.setState('icons')
        return;
    }
    if (!viewState) {
        console.log(id);
        xState.setState('sqeeze');
        EVENT_INFO.top = _id(id).style.top;
        EVENT_INFO.borderRadius = _id(id).style.borderRadius;
        EVENT_INFO.left = _id(id).style.left;
        EVENT_INFO.id = id;
        TweenMax.to(_id(id), 0.6, {
            top: '-20%',
            left: '-25%',
            borderRadius: '0px  0px',
            opacity: 1
        });
        let newElement = document.createElement('template');

        let obj = findObjectByKey(eArray, 'id', id);
        if (id == 'e-a-5')
            newElement.innerHTML = createDataLayout2(obj).trim();
        else
            newElement.innerHTML = createDataLayout(obj).trim();
        _id(id).appendChild(newElement.content.firstChild);
        if (SCREEN_WIDTH > 500) {
            TweenMax.to(_id('data-x'), 0.5, {
                css: {
                    top: '40px',
                    left: '40px',
                    height: '80vh',
                    width: SCREEN_WIDTH * 3 / 4,
                    overflowY: 'scroll',
                    overflowX: 'auto',
                }
            });
        } else {
            TweenMax.to(_id('data-x'), 0.5, {
                css: {
                    top: '40px',
                    left: '10px',
                    height: '75vh',
                    width: SCREEN_WIDTH * 6 / 7,
                    overflowY: 'scroll',
                    overflowX: 'auto',
                }
            });
        }
        console.log(eArray);
        if (id == 'e-a-5')
            setTimeout(loadEvent2(obj), 0.4);
        else
            setTimeout(loadEvent(obj), 0.4);
        viewState = !viewState;
    }
}
function dismissVisualization() {
    xState.setState('normal');
    viewState = !viewState;

    TweenMax.to(_id(EVENT_INFO.id).lastChild, 0.4, {
        css: {
            width: '30%',
            top: '24%',
            left: '25%',
            height: '10%',
            opacity: 0.2,
            zIndex: 10
        }
    });
    setTimeout(() => {
        _id(EVENT_INFO.id).removeChild(_id(EVENT_INFO.id).lastChild);
    }, 400);
    TweenMax.to(_id('events'), 0.5, {
        css: {
            width: '74%',
            top: '24%',
            left: '25%',
            height: '68%',
            opacity: 1,
            zIndex: 10
        }
    });
    TweenMax.to(_id(EVENT_INFO.id), 0.6, {
        top: EVENT_INFO.top,
        left: EVENT_INFO.left,
        borderRadius: EVENT_INFO.borderRadius,
        opacity: 1
    });
}
//x-code states
xState.push('normal', () => {
    TweenMax.to(_id('x-code'), 0.3, {
        css: {
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            transform: 'scale(1)',
            opacity: 1
        }
    });
    TweenMax.to(_class('icon'), 0.3, {
        css: {
            opacity: 1,
        }
    });
    TweenMax.to(_id('btnClose'), 0.3, {
        display: 'none'
    });
});
xState.push('sqeeze', () => {
    TweenMax.to(_id('x-code'), 0.3, {
        css: {
            width: '100%',
            height: '100%',
            top: '50%',
            left: '50%',
            transform: 'translate(-55%, -50%) scale(0.6)',
            opacity: 0.2
        }
    })
    TweenMax.to(_class('icon'), 0.3, {
        css: {
            opacity: 0
        }
    });
    TweenMax.to(_id('btnClose'), 0.3, {
        display: 'block'
    });
});
//general states
function fadeBox() {
    TweenMax.to(_id('x-factor'), 0.9, {
        css: {
            top: '0',
            left: '0',
            width: '100vh',
            height: "100hw"
        }
    });
}
sponsorStateManager.push('inactive', () => {
    if (SCREEN_WIDTH >= 500) {
        TweenMax.to(_id('sponsors'), 0.7,
            {
                css: {
                    height: '30%',
                    width: '22%',
                    top: '60%',
                    left: '75%',
                    transform: 'scale(0.7) rotateY(20deg) ',
                    opacity: 0.2,
                    zIndex: 1

                }
            }
        );
    }
    else {
        TweenMax.to(_id('sponsors'), 0.7,
            {
                css: {
                    height: '30%',
                    width: '22%',
                    top: '80%',
                    left: '24%',
                    transform: 'scale(0.7) rotateY(20deg) ',
                    opacity: 0.2,
                    zIndex: 1

                }
            }
        );
    }
});
sponsorStateManager.push('active', () => {
    if (SCREEN_WIDTH > 500) {
        TweenMax.to(componentIntro, 0.5,
            {
                css: {
                    top: "30%",
                    left: "50%",
                    transform: "rotateY(80deg) scale(0.4)",
                    height: '50%',
                    opacity: 0.3,
                    zIndex: 1
                }
            }
        );
        TweenMax.to(_id('sponsors'), 0.7,
            {
                css: {
                    top: '20%',
                    left: '5%',
                    width: '90%',
                    height: '70%',
                    transform: 'rotateZ(0deg)',
                    opacity: 1,
                    zIndex: 10
                }
            }
        );
        TweenMax.to(_id('main-menu-item-4'), 0.3, {
            css: {
                border: '2px solid rgba(255, 255, 255, 0.701)'
            }
        });

    } else {
        TweenMax.to(componentIntro, 0.5,
            {
                css: {
                    top: "30%",
                    left: "50%",
                    transform: "rotateY(80deg) scale(0.4)",
                    height: '50%',
                    opacity: 0.3,
                    zIndex: 1
                }
            }
        );
        TweenMax.to(_id('sponsors'), 0.5,
            {
                css: {
                    top: '20%',
                    left: '5%',
                    width: '90%',
                    height: '70%',
                    transform: 'rotateZ(0deg)',
                    opacity: 1,
                    zIndex: 10
                }
            }
        );

    }
});



stateManager.push('intro', () => {
    if (SCREEN_WIDTH >= 500) {
        TweenMax.to(componentIntro, 0.7,
            {
                css: {
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    height: '50%',
                    opacity: 1,
                    zIndex: 6
                }
            }
        );
        setTimeout(() => {
            TweenMax.to(_id('x-factor'), 0.9, {
                css: {
                    top: '74px',
                    left: '20px',
                    width: '110%',
                    height: "calc(100% + 60px)"
                }
            });
        }, 300);
        TweenMax.to(componentMainMenu, 0.5,
            {
                css: {
                    top: '50%',
                    left: '50%',
                    height: '20%',
                    width: '52%',
                    transform: 'rotateY(50deg)',
                    opacity: 0.15,
                    height: '10%',
                    zIndex: 1
                }
            }
        );
        TweenMax.to(_id('workshops'), 0.7,
            {
                css: {
                    height: '30%',
                    width: '22%',
                    top: '40%',
                    left: '4%',
                    transform: 'scale(0.4) rotateY(-40deg) ',
                    opacity: 0.2,
                    zIndex: 1

                }
            }
        );

    } else {
        TweenMax.to(componentIntro, 0.7,
            {
                css: {
                    top: "5%",
                    left: "5%",
                    transform: "none",
                    height: '65%',
                    width: '90%',
                    opacity: 1,
                    zIndex: 6
                }
            }
        );
        setTimeout(() => {
            TweenMax.to(_id('x-factor'), 0.9, {
                css: {
                    top: '10',
                    left: '10px',
                    width: '80%',
                    height: "10%",
                    zindex: 10
                }
            });
        }, 300);
        TweenMax.to(componentMainMenu, 0.5,
            {
                css: {
                    top: '50%',
                    left: '50%',
                    height: '20%',
                    width: '52%',
                    transform: 'rotateY(50deg)',
                    opacity: 0.15,
                    height: '10%',
                    zIndex: 1
                }
            }
        );
        TweenMax.to(_id('workshops'), 0.7,
            {
                css: {
                    height: '30%',
                    width: '22%',
                    top: '40%',
                    left: '4%',
                    transform: 'scale(0.4) rotateY(-40deg) ',
                    opacity: 0.2,
                    zIndex: 1

                }
            }
        );

    }
});
stateManager.push('dismiss workshop', () => {
    if (SCREEN_WIDTH >= 500) {
        TweenMax.to(_id('workshops'), 0.7,
            {
                css: {
                    height: '30%',
                    width: '22%',
                    top: '40%',
                    left: '40%',
                    transform: 'scale(0.7) rotateY(20deg) ',
                    opacity: 0.2,
                    zIndex: 1

                }
            }
        );
    }
    else {
        TweenMax.to(_id('workshops'), 0.7,
            {
                css: {
                    height: '30%',
                    width: '22%',
                    top: '40%',
                    left: '4%',
                    transform: 'scale(0.7) rotateY(20deg) ',
                    opacity: 0.2,
                    zIndex: 1

                }
            }
        );
    }
});
stateManager.push('workshop', () => {
    if (SCREEN_WIDTH >= 500) {
        TweenMax.to(componentIntro, 0.5,
            {
                css: {
                    top: "30%",
                    left: "50%",
                    transform: "rotateY(80deg) scale(0.4)",
                    height: '50%',
                    opacity: 0.3,
                    zIndex: 1
                }
            }
        );
        TweenMax.to(_id('workshops'), 0.7,
            {
                css: {
                    top: '20%',
                    left: '5%',
                    width: '90%',
                    height: '70%',
                    transform: 'rotateZ(0deg)',
                    opacity: 1,
                    zIndex: 10
                }
            }
        );

    } else {
        TweenMax.to(componentIntro, 0.5,
            {
                css: {
                    top: "30%",
                    left: "50%",
                    transform: "rotateY(80deg) scale(0.4)",
                    height: '50%',
                    opacity: 0.3,
                    zIndex: 1
                }
            }
        );
        TweenMax.to(_id('workshops'), 0.5,
            {
                css: {
                    top: '20%',
                    left: '5%',
                    width: '90%',
                    height: '70%',
                    transform: 'rotateZ(0deg)',
                    opacity: 1,
                    zIndex: 10
                }
            }
        );

    }
});

stateManager.push('main menu', () => {
    if (SCREEN_WIDTH >= 500) {
        TweenMax.to(componentIntro, 1.3,
            {
                css: {
                    top: "30%",
                    left: "50%",
                    transform: "rotateY(80deg) scale(0.4)",
                    height: '50%',
                    opacity: 0.3,
                    zIndex: 1
                }
            }
        );
        setTimeout(() => {
            TweenMax.to(componentMainMenu, 0.7,
                {
                    css: {
                        height: '80%',
                        width: '92%',
                        top: '10%',
                        left: '4%',
                        transform: 'rotateY(0deg)',
                        opacity: 1,
                        zIndex: 10

                    }
                }
            );
        }, 300);
        TweenMax.from(_id('main-menu-item-1'), 1.3, {
            css: {
                //height: '50%',
                //paddingTop: '10%',
                //marginTop : '10%',
                marginTop: toss() * 250,
                marginLeft: toss() * 250,
            }
        });
        TweenMax.from(_id('main-menu-item-2'), 0.5, {
            css: {
                //height: '50%',
                //paddingTop: '10%',
                //marginTop : '10%',
                marginTop: toss() * 250,
                marginLeft: toss() * 250,
                marginBottom: toss() * 250,
                marginBottom: toss() * 250,
            }
        });
        TweenMax.from(_id('main-menu-item-3'), 1.2, {
            css: {
                //height: '50%',
                //paddingTop: '10%',
                //marginTop : '10%',
                marginTop: toss() * 250,
                marginLeft: toss() * 250,
                marginBottom: toss() * 250,
            }
        });
        TweenMax.from(_id('main-menu-item-4'), 0.7, {
            css: {
                //height: '50%',
                //paddingTop: '10%',
                //marginTop : '10%',
                marginTop: toss() * 250,
                marginLeft: toss() * 250,
                marginBottom: toss() * 250,
            }
        });
        TweenMax.to(_class('m-outside'), 0.3, {
            css: {
                padding: '10px',
                marginTop: '200px'
            }
        });
        TweenMax.to(_class('menu-item'), 0.5,
            {
                css: {
                    padding: '10px',
                    height: '100%',
                    margin: '14px',
                    border: '1.5px solid rgba(255, 255, 255, 0.301)'
                }
            }
        );
        TweenMax.to(_class('main-menu-collection'), 0.5,
            {
                css: {
                    padding: '10px',
                    height: '100%',
                    width: '98%'
                }
            }
        );

    } else {
        TweenMax.to(componentIntro, 0.5,
            {
                css: {
                    top: "40%",
                    left: "50%",
                    transform: "rotateY(80deg) scale(0.4)",
                    width: '30%',
                    height: '50%',
                    opacity: 0.3,
                    zIndex: 1
                }
            }
        );
        TweenMax.to(componentMainMenu, 0.7,
            {
                css: {
                    height: '70%',
                    width: '92%',
                    top: '14%',
                    left: '4%',
                    transform: 'rotateY(0deg)',
                    opacity: 1,
                    zIndex: 10
                }
            }
        );
        TweenMax.from(_id('main-menu-item-1'), 1.3, {
            css: {
                //height: '50%',
                //paddingTop: '10%',
                //marginTop : '10%',
                marginTop: toss() * 250,
                marginLeft: toss() * 250,
            }
        });
        TweenMax.from(_id('main-menu-item-2'), 0.5, {
            css: {
                //height: '50%',
                //paddingTop: '10%',
                //marginTop : '10%',
                marginTop: toss() * 250,
                marginLeft: toss() * 250,
                marginBottom: toss() * 250,
                marginBottom: toss() * 250,
            }
        });
        TweenMax.from(_id('main-menu-item-3'), 1.2, {
            css: {
                //height: '50%',
                //paddingTop: '10%',
                //marginTop : '10%',
                marginTop: toss() * 250,
                marginLeft: toss() * 250,
                marginBottom: toss() * 250,
            }
        });
        TweenMax.from(_id('main-menu-item-4'), 0.7, {
            css: {
                //height: '50%',
                //paddingTop: '10%',
                //marginTop : '10%',
                marginTop: toss() * 250,
                marginLeft: toss() * 250,
                marginBottom: toss() * 250,
            }
        });

        TweenMax.to(_class('m-outside'), 0.3, {
            css: {
                padding: '10px',
                marginTop: '20px',
                marginBottom: '20px'
            }
        });
        TweenMax.to(_class('menu-item'), 0.5,
            {
                css: {
                    padding: '10px',
                    height: '50%',
                    margin: '7px',
                    border: '1.5px solid rgba(255, 255, 255, 0.301)'
                }
            }
        );
        TweenMax.to(_class('main-menu-collection'), 0.5,
            {
                css: {
                    top: '10%',
                    padding: '10px',
                    height: '100%',
                    width: '98%',
                    overflow: 'visible'
                }
            }
        );

    }
});

stateManager.push('squeez menu', () => {
    if (SCREEN_WIDTH >= 500) {
        TweenMax.to(componentMainMenu, 0.7,
            {
                css: {
                    height: '40px',
                    width: '92%',
                    top: '2%',
                    left: '4%',
                    transform: 'rotateY(0deg)',
                    opacity: 1,

                }
            }
        );
        TweenMax.to(_class('main-menu-collection'), 0.5,
            {
                css: {
                    padding: '10px',
                    height: '100%',
                    width: '56%'
                }
            }
        );
        TweenMax.to(_class('menu-item'), 0.5,
            {
                css: {
                    padding: '10px',
                    height: '50px',
                    margin: '7px',
                    border: '0px'
                }
            }
        );
        TweenMax.to(_class('m-outside'), 0.3, {
            css: {
                padding: '4px',
                marginTop: '0px'
            }
        });
    } else {
        TweenMax.to(componentMainMenu, 0.7,
            {
                css: {
                    height: '40px',
                    width: '92%',
                    top: '10%',
                    left: '4%',
                    transform: 'rotateY(0deg)',
                    opacity: 1,

                }
            }
        );
        TweenMax.to(_class('main-menu-collection'), 0.5,
            {
                css: {
                    padding: '10px',
                    height: '0%',
                    width: '56%',
                    overflow: 'hidden'
                }
            }
        );
        TweenMax.to(_class('menu-item'), 0.5,
            {
                css: {
                    padding: '10px',
                    height: '50px',
                    margin: '7px',
                    border: '0px'
                }
            }
        );
        TweenMax.to(_class('m-outside'), 0.3, {
            css: {
                padding: '4px',
                marginTop: '0px'
            }
        });
    }

});

stateManager.push('events menu', () => {
    if (SCREEN_WIDTH >= 500) {
        TweenMax.to(_id('main-menu-item-1'), 0.3, {
            css: {
                border: '2px solid rgba(255, 255, 255, 0.701)'
            }
        });

    }
});
stateManager.push('workshop menu', () => {
    if (SCREEN_WIDTH >= 500) {
        TweenMax.to(_id('main-menu-item-2'), 0.3, {
            css: {
                border: '2px solid rgba(255, 255, 255, 0.701)'
            }
        });

    }
});
//crew menu event
stateManager.push('crew menu', () => {
    if (SCREEN_WIDTH >= 500) {
        TweenMax.to(_id('main-menu-item-3'), 0.3, {
            css: {
                border: '2px solid rgba(255, 255, 255, 0.701)'
            }
        });

    }
});
//event menu states
eventMenuStateManager.push('inactive', () => {
    if (SCREEN_WIDTH > 500) {
        TweenMax.to(componentEventMenu, 1.5, {
            css: {
                width: 200,
                height: 300,
                top: '20%',
                left: '10%',
                transform: 'rotateY(-45deg) rotateZ(70deg)',
                opacity: 0.1

            }
        });
        TweenMax.to(_id('e-m-technical'), 0.4, {
            css: {
                width: '58%',
                height: '48%',
                top: '-100%',
                left: '0',
                border: '1px solid rgba(255, 255, 255, 0.701)'
            }
        });
        TweenMax.to(_id('e-m-nontechnical'), 0.4, {
            css: {
                width: '58%',
                height: '48%',
                top: '52%',
                left: '-100%',
                border: '2px solid rgba(255, 255, 255, 0.701)'
            }
        });
        TweenMax.to(_id('e-m-gaming'), 0.4, {
            css: {
                width: '60%',
                height: '100%',
                top: '50%',
                left: '160%',
                border: '2px solid rgba(255, 255, 255, 0.701)'
            }
        });
        TweenMax.to(_id('e-m-abstruct'), 0.4, {
            css: {
                width: '60%',
                height: '100%',
                top: '0',
                left: '160%',
                border: '2px solid rgba(255, 255, 255, 0.701)'
            }
        });
    } else {
        TweenMax.to(componentEventMenu, 1.5, {
            css: {
                width: 200,
                height: 300,
                top: '20%',
                left: '5%',
                transform: 'rotateY(-45deg) rotateZ(70deg)',
                opacity: 0.1

            }
        });
        TweenMax.to(_id('e-m-technical'), 0.4, {
            css: {
                width: '58%',
                height: '48%',
                top: '-100%',
                left: '0',
                border: '1px solid rgba(255, 255, 255, 0.701)'
            }
        });
        TweenMax.to(_id('e-m-nontechnical'), 0.4, {
            css: {
                width: '58%',
                height: '48%',
                top: '52%',
                left: '-100%',
                border: '2px solid rgba(255, 255, 255, 0.701)'
            }
        });
        TweenMax.to(_id('e-m-gaming'), 0.4, {
            css: {
                width: '60%',
                height: '100%',
                top: '50%',
                left: '160%',
                border: '2px solid rgba(255, 255, 255, 0.701)'
            }
        });
        TweenMax.to(_id('e-m-abstruct'), 0.4, {
            css: {
                width: '60%',
                height: '100%',
                top: '0',
                left: '160%',
                border: '2px solid rgba(255, 255, 255, 0.701)'
            }
        });
    }
});
eventMenuStateManager.push('display', () => {
    if (SCREEN_WIDTH > 500) {
        TweenMax.to(componentEventMenu, 0.6, {
            css: {
                top: '20%',
                width: '90%',
                height: '70%',
                transform: 'rotateZ(0deg)',
                opacity: 1,
                zIndex: 6
            }
        });
        TweenMax.to(_id('e-m-technical'), 0.4, {
            css: {
                width: '60%',
                height: '48%',
                top: '0',
                left: '0',
                border: '1px solid rgba(255, 255, 255, 0.701)'
            }
        });
        setTimeout(() => {
            TweenMax.to(_id('e-m-nontechnical'), 0.4, {
                css: {
                    width: '36%',
                    height: '48%',
                    top: '0%',
                    left: '62%',
                    border: '2px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 500);
        setTimeout(() => {
            TweenMax.to(_id('e-m-gaming'), 0.4, {
                css: {
                    width: '36%',
                    height: '48%',
                    top: '52%',
                    left: '0',
                    border: '2px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 500);
        setTimeout(() => {
            TweenMax.to(_id('e-m-abstruct'), 0.4, {
                css: {
                    width: '60%',
                    height: '48%',
                    top: '52%',
                    left: '38%',
                    border: '2px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 300);

    } else {
        TweenMax.to(componentEventMenu, 0.6, {
            css: {
                top: '20%',
                width: '90%',
                height: '70%',
                transform: 'rotateZ(0deg)',
                opacity: 1,
                zIndex: 14
            }
        });
        TweenMax.to(_id('e-m-technical'), 0.4, {
            css: {
                width: '60%',
                height: '48%',
                top: '0',
                left: '0',
                border: '1px solid rgba(255, 255, 255, 0.701)'
            }
        });
        setTimeout(() => {
            TweenMax.to(_id('e-m-nontechnical'), 0.4, {
                css: {
                    width: '36%',
                    height: '48%',
                    top: '0%',
                    left: '62%',
                    border: '2px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 500);
        setTimeout(() => {
            TweenMax.to(_id('e-m-gaming'), 0.4, {
                css: {
                    width: '36%',
                    height: '48%',
                    top: '52%',
                    left: '0',
                    border: '2px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 500);
        setTimeout(() => {
            TweenMax.to(_id('e-m-abstruct'), 0.4, {
                css: {
                    width: '60%',
                    height: '48%',
                    top: '52%',
                    left: '38%',
                    border: '2px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 300);
    }
});
eventMenuStateManager.push('menu technical', () => {
    if (SCREEN_WIDTH > 500) {
        TweenMax.to(componentEventMenu, 0.6, {
            css: {
                top: '20%',
                left: '2%',
                width: '20%',
                height: '70%',
                transform: 'rotateZ(0deg)',
                opacity: 0.3
            }
        });
        TweenMax.to(_id('e-m-technical'), 0.4, {
            css: {
                width: '80%',
                height: '24%',
                top: '0',
                left: '0',
                border: '4px solid rgba(120, 200, 255, 0.701)'
            }
        });
        setTimeout(() => {
            TweenMax.to(_id('e-m-nontechnical'), 0.4, {
                css: {
                    width: '80%',
                    height: '25%',
                    top: '25%',
                    left: '-2%',
                    border: '1px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 300);
        setTimeout(() => {
            TweenMax.to(_id('e-m-abstruct'), 0.4, {
                css: {
                    width: '80%',
                    height: '24%',
                    top: '50%',
                    left: '-2%',
                    border: '1px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 500);
        setTimeout(() => {
            TweenMax.to(_id('e-m-gaming'), 0.4, {
                css: {
                    width: '80%',
                    height: '24%',
                    top: '75%',
                    left: '-2%',
                    border: '1px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 500);
    } else {
        TweenMax.to(componentEventMenu, 0.6, {
            css: {
                top: '2%',
                left: '2%',
                width: '85%',
                height: '15%',
                transform: 'rotateZ(0deg)',
                opacity: 0.3
            }
        });
        TweenMax.to(_id('e-m-technical'), 0.4, {
            css: {
                width: '40%',
                height: '48%',
                top: '0',
                left: '0',
                border: '4px solid rgba(120, 200, 255, 0.701)'
            }
        });
        setTimeout(() => {
            TweenMax.to(_id('e-m-nontechnical'), 0.4, {
                css: {
                    width: '40%',
                    height: '48%',
                    top: '0',
                    left: '42%',
                    border: '1px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 300);
        setTimeout(() => {
            TweenMax.to(_id('e-m-abstruct'), 0.4, {
                css: {
                    width: '40%',
                    height: '48%',
                    top: '50%',
                    left: '42%',
                    border: '1px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 500);
        setTimeout(() => {
            TweenMax.to(_id('e-m-gaming'), 0.4, {
                css: {
                    width: '40%',
                    height: '48%',
                    top: '50%',
                    left: '0%',
                    border: '1px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 500);
    }
});
eventMenuStateManager.push('menu nontechnical', () => {
    if (SCREEN_WIDTH > 500) {
        TweenMax.to(componentEventMenu, 0.6, {
            css: {
                top: '20%',
                left: '2%',
                width: '20%',
                height: '70%',
                transform: 'rotateZ(0deg)',
                opacity: 0.3
            }
        });
        TweenMax.to(_id('e-m-nontechnical'), 0.4, {
            css: {
                width: '80%',
                height: '24%',
                top: '0',
                left: '0',
                border: '4px solid rgba(120, 200, 255, 0.701)'
            }
        });
        TweenMax.to(_id('e-m-technical'), 0.4, {
            css: {
                width: '80%',
                height: '24%',
                top: '25%',
                left: '-2%',
                border: '1px solid rgba(255, 255, 255, 0.701)'
            }
        });
        TweenMax.to(_id('e-m-abstruct'), 0.4, {
            css: {
                width: '80%',
                height: '24%',
                top: '50%',
                left: '-2%',
                border: '1px solid rgba(255, 255, 255, 0.701)'
            }
        });
        TweenMax.to(_id('e-m-gaming'), 0.4, {
            css: {
                width: '80%',
                height: '24%',
                top: '75%',
                left: '-2%',
                border: '1px solid rgba(255, 255, 255, 0.701)'
            }
        });
    } else {
        TweenMax.to(componentEventMenu, 0.6, {
            css: {
                top: '2%',
                left: '2%',
                width: '85%',
                height: '15%',
                transform: 'rotateZ(0deg)',
                opacity: 0.3
            }
        });
        TweenMax.to(_id('e-m-nontechnical'), 0.4, {
            css: {
                width: '40%',
                height: '48%',
                top: '0',
                left: '0',
                border: '4px solid rgba(120, 200, 255, 0.701)'
            }
        });
        setTimeout(() => {
            TweenMax.to(_id('e-m-technical'), 0.4, {
                css: {
                    width: '40%',
                    height: '48%',
                    top: '0',
                    left: '42%',
                    border: '1px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 300);
        setTimeout(() => {
            TweenMax.to(_id('e-m-abstruct'), 0.4, {
                css: {
                    width: '40%',
                    height: '48%',
                    top: '50%',
                    left: '42%',
                    border: '1px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 500);
        setTimeout(() => {
            TweenMax.to(_id('e-m-gaming'), 0.4, {
                css: {
                    width: '40%',
                    height: '48%',
                    top: '50%',
                    left: '0%',
                    border: '1px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 500);
    }
});
eventMenuStateManager.push('menu abstruct', () => {
    if (SCREEN_WIDTH > 500) {
        TweenMax.to(componentEventMenu, 0.6, {
            css: {
                top: '20%',
                left: '2%',
                width: '20%',
                height: '70%',
                transform: 'rotateZ(0deg)',
                opacity: 0.3
            }
        });
        TweenMax.to(_id('e-m-abstruct'), 0.4, {
            css: {
                width: '80%',
                height: '24%',
                top: '0',
                left: '0',
                border: '4px solid rgba(120, 200, 255, 0.701)'
            }
        });

        TweenMax.to(_id('e-m-technical'), 0.4, {
            css: {
                width: '80%',
                height: '24%',
                top: '25%',
                left: '-2%',
                border: '1px solid rgba(255, 255, 255, 0.701)'
            }
        });
        TweenMax.to(_id('e-m-gaming'), 0.4, {
            css: {
                width: '80%',
                height: '24%',
                top: '50%',
                left: '-2%',
                border: '1px solid rgba(255, 255, 255, 0.701)'
            }
        });
        TweenMax.to(_id('e-m-nontechnical'), 0.4, {
            css: {
                width: '80%',
                height: '24%',
                top: '75%',
                left: '-2%',
                border: '1px solid rgba(255, 255, 255, 0.701)'
            }
        });
    } else {
        TweenMax.to(componentEventMenu, 0.6, {
            css: {
                top: '2%',
                left: '2%',
                width: '85%',
                height: '15%',
                transform: 'rotateZ(0deg)',
                opacity: 0.3
            }
        });
        TweenMax.to(_id('e-m-abstruct'), 0.4, {
            css: {
                width: '40%',
                height: '48%',
                top: '0',
                left: '0',
                border: '4px solid rgba(120, 200, 255, 0.701)'
            }
        });
        setTimeout(() => {
            TweenMax.to(_id('e-m-technical'), 0.4, {
                css: {
                    width: '40%',
                    height: '48%',
                    top: '0',
                    left: '42%',
                    border: '1px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 300);
        setTimeout(() => {
            TweenMax.to(_id('e-m-nontechnical'), 0.4, {
                css: {
                    width: '40%',
                    height: '48%',
                    top: '50%',
                    left: '42%',
                    border: '1px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 500);
        setTimeout(() => {
            TweenMax.to(_id('e-m-gaming'), 0.4, {
                css: {
                    width: '40%',
                    height: '48%',
                    top: '50%',
                    left: '0%',
                    border: '1px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 500);
    }
});
eventMenuStateManager.push('menu gaming', () => {
    if (SCREEN_WIDTH > 500) {
        TweenMax.to(componentEventMenu, 0.6, {
            css: {
                top: '20%',
                left: '2%',
                width: '20%',
                height: '70%',
                transform: 'rotateZ(0deg)',
                opacity: 0.3
            }
        });
        TweenMax.to(_id('e-m-gaming'), 0.4, {
            css: {
                width: '80%',
                height: '24%',
                top: '0',
                left: '0',
                border: '4px solid rgba(120, 200, 255, 0.701)'
            }
        });

        TweenMax.to(_id('e-m-abstruct'), 0.4, {
            css: {
                width: '80%',
                height: '24%',
                top: '25%',
                left: '-2%',
                border: '1px solid rgba(255, 255, 255, 0.701)'
            }
        });
        TweenMax.to(_id('e-m-nontechnical'), 0.4, {
            css: {
                width: '80%',
                height: '24%',
                top: '50%',
                left: '-2%',
                border: '1px solid rgba(255, 255, 255, 0.701)'
            }
        });
        TweenMax.to(_id('e-m-technical'), 0.4, {
            css: {
                width: '80%',
                height: '24%',
                top: '75%',
                left: '-2%',
                border: '1px solid rgba(255, 255, 255, 0.701)'
            }
        });
    } else {
        TweenMax.to(componentEventMenu, 0.6, {
            css: {
                top: '2%',
                left: '2%',
                width: '85%',
                height: '15%',
                transform: 'rotateZ(0deg)',
                opacity: 0.3
            }
        });
        TweenMax.to(_id('e-m-gaming'), 0.4, {
            css: {
                width: '40%',
                height: '48%',
                top: '0',
                left: '0',
                border: '4px solid rgba(120, 200, 255, 0.701)'
            }
        });
        setTimeout(() => {
            TweenMax.to(_id('e-m-technical'), 0.4, {
                css: {
                    width: '40%',
                    height: '48%',
                    top: '0',
                    left: '42%',
                    border: '1px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 300);
        setTimeout(() => {
            TweenMax.to(_id('e-m-nontechnical'), 0.4, {
                css: {
                    width: '40%',
                    height: '48%',
                    top: '50%',
                    left: '42%',
                    border: '1px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 500);
        setTimeout(() => {
            TweenMax.to(_id('e-m-abstruct'), 0.4, {
                css: {
                    width: '40%',
                    height: '48%',
                    top: '50%',
                    left: '0%',
                    border: '1px solid rgba(255, 255, 255, 0.701)'
                }
            });
        }, 500);
    }
});
//event states
eventStateManager.push('inactive', () => {
    TweenMax.to(_id('events'), 0.4, {
        css: {
            width: '24%',
            top: '24%',
            left: '25%',
            height: '28%',
            opacity: 0.1,
            zIndex: -1,
        }
    });
    TweenMax.to(_id('eventMenu'), 0.4, {
        css: {
            zIndex: 1,
        }
    });
    setTimeout(() => {
        _id('events').innerHTML = "";
    }, 400);
});
eventStateManager.push('icons', () => {
    TweenMax.to(_id('events'), 0.5, {
        css: {
            width: '74%',
            top: '24%',
            left: '25%',
            height: '68%',
            opacity: 1,
            zIndex: 10
        }
    });
    let template = loadIcons('data/events.json', EVENT_CATAGORY, (template) => {
        _id('events').innerHTML = template;
        TweenMax.to(_class('icon'), 0.7, {
            css: {
                borderRadius: '20px 0px'
            }
        })
    });

});
stateManager.setState('intro');
eventMenuStateManager.setState('inactive');
eventStateManager.setState('inactive');
xState.setState('normal');
sponsorStateManager.setState('inactive');

//--------------crew states -----------------------------
crewStateMananger.push('inactive', () => {
    TweenMax.to(_id('crew'), 0.3, {
        css: {
            top: '4%',
            left: '4%',
            width: '10%',
            opacity: 0,
            height: '78%',
            zIndex: -2,
        }
    });
    _id('crew').innerHTML = '';
});
crewStateMananger.push('visible', () => {
    if (SCREEN_WIDTH > 500) {
        TweenMax.to(_id('crew'), 0.5, {
            css: {
                top: '20%',
                left: '5%',
                width: '90%',
                height: '78%',
                opacity: 1,
                zIndex: 10,
            }
        });
        loadCrewDetails((htm) => {
            _id('crew').innerHTML = htm;
            adjustSlider(0);
        });
    }
    else {
        TweenMax.to(_id('crew'), 0.5, {
            css: {
                top: '10%',
                left: '5%',
                width: '90%',
                height: '88%',
                opacity: 1,
                zIndex: 14
            }
        });
        loadCrewDetailsMob((htm) => {
            _id('crew').innerHTML = htm;
            adjustSlider(0);
        });
    }

});
ShouldDrag = true;
crewStateMananger.push('focus', () => {

});

//--------------crew drag slider-------------------------

document.addEventListener("mouseup", (e) => {
    if (ShouldDrag) {
        IS_DRAGGING = false;
        DRAG_X = 0;
    }
});
document.addEventListener("mousedown", (e) => {
    if (ShouldDrag) {
        START_X = e.clientX;
        IS_DRAGGING = true;
    }
});

document.addEventListener('mousemove', (e) => {
    if (IS_DRAGGING && ShouldDrag) {
        if (START_X == 0) START_X = MOUSE_X;
        DRAG_X = MOUSE_X - START_X;
        DRAG_X = DRAG_X * 0.62;
        START_X = MOUSE_X;
        adjustSlider(DRAG_X);
    }
});


function adjustSlider(dragX) {
    Array.prototype.forEach.call(_class('draggable-images'), (d, i) => {
        let offset = Math.abs((parseInt(d.style.left, 10) - SCREEN_WIDTH / 3.1));
        let scale = (SCREEN_WIDTH / 2 - offset) / (SCREEN_WIDTH / 2) * 1.2;
        scale = Math.abs(scale);
        let opacity = scale / 2;
        if (scale > 0.8) opacity = 1;
        d.style.left = `${parseInt(d.style.left, 10) + dragX}px`;
        TweenMax.to(d, 0.2, {
            css: {
                transform: `scale(${scale})`,
                zIndex: (scale * 10 - 2),
                filter: `sepia(${1.6 - scale}) contrast(1.2) brightness(1.3)`,
                opacity: opacity,
                boxShadow: `0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)`
            }
        })
    });
};
function visualizeCrewDetail(id) {
    if (ShouldDrag) {
        ShouldDrag = false;
        requestData('data/crew.json', (data) => {
            CREW_MEMBER_INFO.id = id;
            CREW_MEMBER_INFO.left = _id(id).style.left;
            CREW_MEMBER_INFO.transform = _id(id).style.transform;
            CREW_MEMBER_INFO.width = _id(id).style.width;
            CREW_MEMBER_INFO.opacity = _id(id).style.opacity;
            CREW_MEMBER_INFO.zIndex = _id(id).style.zIndex;
            CREW_MEMBER_INFO.filter = _id(id).style.filter;
            let ds = findObjectByKey(data, 'id', id);
            //console.log(ds);
            let inside = `<div id="inside" style="position: absolute; left: 300px;right: 0; top: 0">
                        <div class="crew-back" onclick="hideCrewData();"> X</div>
                        <span class="heading1">${ds.name}</span><br>
                        <span class="heading2">${ds.position}</span><br>
                        <span class="heading2">+91 ${ds.phone}</span><br>
                    </div>`
            TweenMax.to(_id(id), 0.4, {
                css: {
                    top: 0,
                    left: 0,
                    width: '100%',
                    opacity: 1,
                    transform: 'scale(1)',
                    filter: 'brightness(1.1)',
                    zIndex: 9999

                }
            })
            let newElement = document.createElement('template');
            newElement.innerHTML = inside.trim();
            _id(id).appendChild(newElement.content.firstChild);

        });
    }

}
function hideCrewData() {
    console.log(CREW_MEMBER_INFO);
    _id(CREW_MEMBER_INFO.id).removeChild(_id(CREW_MEMBER_INFO.id).lastChild);
    TweenMax.to(_id(CREW_MEMBER_INFO.id), 0.4, {
        css: {
            top: CREW_MEMBER_INFO.id,
            left: CREW_MEMBER_INFO.left,
            width: CREW_MEMBER_INFO.width,
            opacity: CREW_MEMBER_INFO.opacity,
            filter: CREW_MEMBER_INFO.filter,
            transform: CREW_MEMBER_INFO.transform,
            zIndex: CREW_MEMBER_INFO.zIndex

        }
    });
    setTimeout(() => { ShouldDrag = true }, 400);
}
