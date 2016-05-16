export const modal =  function () {
  resize();
  window.onresize = resize;
}
export const openModal = function () {
  document.querySelector('.dialog-box').style.display = 'block';
  document.querySelector('.dialog-content').style.display = 'block';
}
export const closeModal = function () {
  document.querySelector('.dialog-box').style.display = 'none';
  document.querySelector('.dialog-content').style.display = 'none';
}

function resize() {
  if ( typeof(window.componentHandler) != 'undefined' ) {
    setTimeout(() => {window.componentHandler.upgradeDom()},10);
  }
  let myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  let dialogBox = document.querySelector(".dialog-box");
  let dialogContent = document.querySelector(".dialog-content");
  if (dialogBox && dialogContent) {
    dialogBox.style.height = myHeight + "px";
    dialogBox.style.width = myWidth + "px";
    dialogContent.style.height = myHeight + "px";
    dialogContent.style.width = myWidth + "px";
  }
}
