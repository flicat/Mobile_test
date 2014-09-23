var print_e = function(e) {
    //console.log(e.type, e, 'touches', e.touches.length, e.touches, 'changedTouches', e.changedTouches.length, e.changedTouches);
};

document.addEventListener('touchstart', print_e, false);
document.addEventListener('touchmove', print_e, false);
document.addEventListener('touchend', print_e, false);
document.addEventListener('touchcancel', print_e, false);