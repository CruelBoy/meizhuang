//-------init dom--
var h5botInitJsId="h5botJs";

//-- CTXPATH FOR EXAMPLE:http://localhost/Mdj
var testUrl=window.location.href;
var testCtx=testUrl.substr(testUrl.indexOf("/",window.location.protocol.length)).split("/");
var h5botCTXPath="http://localhost/Mdj";
if("Mdj"==testCtx[3]||"testMdj" ==testCtx[3] ){
    h5botCTXPath=window.location.protocol+"//"+testCtx[2]+"/"+testCtx[3];
}else{
    h5botCTXPath=window.location.protocol+"//mp.meidaojia.com/Mdj";
}

//-- h5bot param -- don't modify
var h5botDivId="h5bot";
var h5botCustomBtnClass="zhiCustomBtn";

function htbotLog(info){
    if(typeof console !="undefined"){
        console.log(info);
    }
}
setTimeout(function(){
    var divObj=document.getElementById(h5botDivId)
    if(divObj ==null){
        var domFontSize=document.documentElement.style.fontSize;
        if(domFontSize=="" ){
            domFontSize= "50px";
            document.documentElement.style.fontSize="50px";
        }
        var remRatio=domFontSize.match(/[\d]+/);
        var scaleSize=0.8;
        var pixArr= [72,82,188];
        var remArr=[1.44,1.64,3.76];
        for(var wh in pixArr){
            remArr[wh]=pixArr[wh]*scaleSize/remRatio;
        }
        var isMobile=navigator.userAgent.indexOf("Mobile")>0?true:false;
        divObj=document.createElement("div");
        divObj.id=h5botDivId;
        divObj.setAttribute('class',h5botDivId);
        divObj.className=h5botDivId;

        divObj.innerHTML='<div class="fixed-title '+h5botCustomBtnClass+'" ><span onclick="h5botClick(this)" href="javaScript:void(0)"  class="icon">&nbsp;</span></div>';
        var styles = [];
        if(!isMobile){
            styles.push('#'+h5botDivId+' .fixed-title { height:'+remArr[1]+'rem; position:fixed; right:0; bottom:1rem; z-index:999;}');
            styles.push('#'+h5botDivId+' .fixed-title .icon { width:'+remArr[0]+'rem; height:'+remArr[1]+'rem;  background:url('+h5botCTXPath+'/public/h5bot/icon1.jpg) no-repeat left center;background-size: 100%; display:block; cursor:pointer;}');
            styles.push('#'+h5botDivId+' .fixed-title .icon:hover { width:'+remArr[2]+'rem; background:url('+h5botCTXPath+'/public/h5bot/icon2.jpg) no-repeat left center;background-size: 100%; transition:all 0.2s;-webkit-transition:all 0.2s;-moz-transition:all 0.2s;}');
        }else{
            remArr[0]=0.9;
            remArr[1]=0.9;
            styles.push('#'+h5botDivId+' .fixed-title { height:'+remArr[1]+'rem; position:fixed; right:0.2rem; bottom:1rem; z-index:999;}');
            styles.push('#'+h5botDivId+' .fixed-title .icon { width:'+remArr[0]+'rem; height:'+remArr[1]+'rem;  background:url('+h5botCTXPath+'/public/h5bot/icon3.png) no-repeat left center;background-size: 100%; display:block; cursor:pointer;}');
        }


        includeStyleElement(styles.join(""),"h5botCss");
        document.body.appendChild(divObj);
    }

},2000);
function getAppendContainer(){
    return document.getElementsByTagName("head")[0] || document.body;
}
function includeStyleElement(styles, styleId) {
	if (document.getElementById(styleId)) {
		return
	}
	var style = document.createElement("style");
	style.id = styleId;
    style.type = "text/css";	 
	getAppendContainer().appendChild(style);
	if (style.styleSheet) { //for ie
		style.styleSheet.cssText = styles;
	} else { //for w3c
		style.appendChild(document.createTextNode(styles));
	}
}


function includeJSElement(jsId,jsUrl,args,attrs,callback)
{    var jsDom=document.getElementById( jsId );
    if ( ( jsUrl != null ) && ( !jsDom ) ){
        var oContain = getAppendContainer();
        var oScript = document.createElement( "script" );
        oScript.type = "text/javascript";
        oScript.id = jsId;        
        oScript.src = jsUrl;
        if(attrs){        
            for(var attr in attrs){
              oScript.setAttribute(attr,attrs[attr]);
            }
        }
        if(args){            
            oScript.setAttribute("data-args",args);
        }
        if(typeof callback =="function"){
            oScript.onload=callback;
        }        
        oContain.appendChild( oScript );
    }
}
 
function h5botClick(btn){  
  if(!btn.initedBot){  
    var href = window.location.href;
	var refer = document.referrer;
    var title=document.title;
    var url =h5botCTXPath + "/h5bot/user";
    var param={vTitle:encodeURIComponent(title),
                 vUrl:encodeURIComponent(href)
    };
    var h5botJs=document.getElementById(h5botInitJsId);
   
    var data_args=h5botJs ? h5botJs.getAttribute("data-args"):"";
    var data_initargs= h5botJs ? h5botJs.getAttribute("data-initargs"):""; 
    
    var kvs= data_initargs.split("&")
    for(var i in kvs){
        var kvItem= kvs[i];
        var kva=kvItem.split("=");
        if(kva.length>=2){
            param[ kva[0]]=encodeURIComponent(kva[1]);           
        }
    }
    var router= param["router"];    
    if(router == "server"){
       clientRedirect(param,url)
          return ;
        
    }else{
         jQuery.getJSON(url,param,function(data){
             if(data.status ==1 || data.status ==2){                 
                 //h5跳转
                  window.location.href = data.data; 
                  return;                  
             }else if(data.status ==3){
                 //内嵌脚本 
                 var fullUrl= data.data;
                 var firstSplit= fullUrl.indexOf("&");
                 var h5botUrlAndSysNun= "";
                 var h5botArgs=data_args;
                 if(firstSplit >0){
                     h5botUrlAndSysNun=fullUrl.substring(0,firstSplit);
                     if(h5botArgs.indexOf("=")>0){
                         h5botArgs=h5botArgs+"&"
                     }
                     h5botArgs =h5botArgs+ fullUrl.substr(firstSplit+1);
                 }else{
                     h5botUrlAndSysNun= fullUrl;
                 }
                 var h5botJsId="zhichiScript";
                 var attrs={"class":h5botCustomBtnClass};  
                 btn.initedBot=1;   
                 var callbackfunc=
                 function(){ 
                    var zhiManager = null;
                    try{
                    zhiManager=(getzhiSDKInstance());
                    }catch(e){
                        htbotLog(" zhiManager.init err!"+ e);                                    
                    }
                      if(zhiManager){
                          htbotLog("bind zhiManager.Event");
                          zhiManager.on("load", function(ret) {
                                htbotLog("catch Event:zhiManager.on.load");
                                 var divObj=document.getElementById(h5botDivId);
                                 jQuery("."+h5botCustomBtnClass,divObj)[0].click();
                            });
                          
                      }else{
                          htbotLog("==zhiManager.not available,fallback!");
                       setTimeout(
                        (function( param,url){
                                    param["router"]="server";                                                                                                                      
                                    return function(){clientRedirect(param,url)};
                            })(param,url)
                       ,5
                        );          
                      } 
                 }                 
                 includeJSElement(h5botJsId,h5botUrlAndSysNun,h5botArgs,attrs,callbackfunc); 
             }else if(data.status ==4){
                 //TODO old pc script                 
             }            
       }); 
    }
  }   
return true;  
}

function clientRedirect(param,url){
     var arr=[];
     var split= url.indexOf("?")>0?"&":"?";
       if(param){
          for(var k in param ){
              arr.push(""+k+"="+param[k]);
          }  
       }         
      url = url+split +arr.join("&");
      window.location.href = url;
}
