export const modal =  function () {
  resize();
  window.onresize = resize;
}
export const openModal = function () {
  if(document.querySelector('.dialog-box')) {
    document.querySelector('.dialog-box').style.display = 'block';
  }
  if(document.querySelector('.dialog-content')) {
    document.querySelector('.dialog-content').style.display = 'block';
  }
}
export const closeModal = function () {
  if(document.querySelector('.dialog-box')) {
    document.querySelector('.dialog-box').style.display = 'none';
  }
  if(document.querySelector('.dialog-content')) {
    document.querySelector('.dialog-content').style.display = 'none';
  }
}
export const openLoading = function () {
  if(document.querySelector('.loading-box')) {
    document.querySelector('.loading-box').style.display = 'block';
  }

  let loading = '<div class="loading-box"></div>' +
      '<div class="loading-content">' +
        '<div class="mdl-spinner mdl-js-spinner is-active"></div>' +
      '</div>';
  if (document.querySelector('.loading')) {
    document.querySelector('.loading').innerHTML = loading;
  }
  modal();
}
export const closeLoading = function () {
  if(document.querySelector('.loading-box')) {
    document.querySelector('.loading-box').style.display = 'none';
  }

  if(document.querySelector('.loading-content')) {
    document.querySelector('.loading-content').style.display = 'none';
  }
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
  let loadingBox = document.querySelector(".loading-box");
  let loadingContent = document.querySelector(".loading-content");
  if (dialogBox) {
    dialogBox.style.height = myHeight + "px";
    dialogBox.style.width = myWidth + "px";
  }
  if (dialogContent) {
    dialogContent.style.height = myHeight + "px";
    dialogContent.style.width = myWidth + "px";
  }
  if (loadingBox) {
    loadingBox.style.height = myHeight + "px";
    loadingBox.style.width = myWidth + "px";
  }
  if (loadingContent) {
    loadingContent.style.height = myHeight + "px";
    loadingContent.style.width = myWidth + "px";
  }
}
