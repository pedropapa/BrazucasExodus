//Default State
var isSupported = false;
var protocol = null;

//Helper Methods
function getProtocol(){
  return protocol;
}

function getUrl(){
  return getProtocol()+"://"+"localhost";
}

function isProtocolSupported(protocol_name){
  protocol = protocol_name;

  if($.browser.mozilla){
    launchMozilla();
  }else if($.browser.chrome){
    launchChrome();
  }else if($.browser.msie){
    launchIE();
  }
}

function onProtocolSupportVerificationFinish() {
  switch(getProtocol()) {
    case 'samp':
      if(isSupported) {

      } else {
        alert(12332);
      }
      break;
  }

  alert(isSupported);
}

//Handle IE
function launchIE(){
  var url = getUrl(),
    aLink = $('#hiddenLink')[0];

  isSupported = false;
  aLink.href = url;

//Case 1: protcolLong
//        console.log("Case 1");
//        if(navigator.appName=="Microsoft Internet Explorer"
//                && aLink.protocolLong=="Unknown Protocol"){
//            isSupported = false;
//            onProtocolSupportVerificationFinish();
//            return;
//        }
//IE10+
  if(navigator.msLaunchUri){
    navigator.msLaunchUri(url,
      function(){ isSupported = true; onProtocolSupportVerificationFinish(); }, //success
      function(){ isSupported=false; onProtocolSupportVerificationFinish(); } //failure
    );
    return;
  }

//Case2: Open New Window, set iframe src, and access the location.href
  console.log("Case 2");
  var myWindow = window.open('','','width=0,height=0');
  myWindow.document.write("<iframe src='"+ url + "'></iframe>");
  setTimeout(function(){
    try{
      myWindow.location.href;
      isSupported = true;
    }catch(e){
//Handle Exception
    }

    if(isSupported){
      myWindow.setTimeout('window.close()', 100);
    }else{
      myWindow.close();
    }
    onProtocolSupportVerificationFinish();
  }, 100)

};

//Handle Firefox
function launchMozilla(){
  var url = getUrl(),
    iFrame = $('#hiddenIframe')[0];

  isSupported = false;

//Set iframe.src and handle exception
  try{
    iFrame.contentWindow.location.href = url;
    isSupported = true;
    onProtocolSupportVerificationFinish();
  }catch(e){
//FireFox
    if (e.name == "NS_ERROR_UNKNOWN_PROTOCOL"){
      isSupported = false;
      onProtocolSupportVerificationFinish();
    }
  }
}

//Handle Chrome
function launchChrome(){

  var url = getUrl(),
    protcolEl = $('#protocol')[0];

  isSupported = false;


  protcolEl.focus();
  protcolEl.onblur = function(){
    isSupported = true;
    console.log("Text Field onblur called");
  };

//will trigger onblur
  location.href = url;
//Note: timeout could vary as per the browser version, have a higher value
  setTimeout(function(){
    protcolEl.onblur = null;
    onProtocolSupportVerificationFinish()
  }, 500);

}