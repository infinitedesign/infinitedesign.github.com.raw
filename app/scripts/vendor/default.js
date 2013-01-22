/*
	Slideshow(string:id, int:index, boolean:wrap)
	usage: mySlideshow = new Slideshow("coming-soon", 0, true);
*/
function Slideshow(_id, _totalslides, _wrap) {
	var totalslides, index, wrap, prefix, suffix, image, src, context, current;
	var slideshow = document.getElementById(_id);
	var _images = slideshow.getElementsByTagName("img");
	image = _images[0];
	context = this;

	src = image.getAttribute("src");
	// parse the url
	// assumes image_001@640.jpg
	var _a = src.indexOf("_");
	var _b = src.indexOf("@");
	if (_b < 0) {
		_b = src.indexOf(".");
	}

	prefix = src.substring(0,_a+1);
	suffix = src.substring(_b,src.length);
	index = parseInt(src.substring(_a+1, _b));
	totalslides = _totalslides;

	// does the slideshow wrap around at the beginning and end?
	(_wrap)? wrap = _wrap : wrap = false;

	// if the slideshow id isn't found do nothing (false)...
	(slideshow)?init():false;

	function init() {

		// find and enable the previous and next controls, and current slide display
		var _ul = slideshow.getElementsByTagName("ul");
		for (var i=0; i < _ul.length; i++) {
			var _li = _ul[0].getElementsByTagName("li");
			for (var j=0; j < _li.length; j++) {
				var isCurrent = _li[j].className.search(/current/)+1;
				if (isCurrent) {
					current = _li[j];
				}
				var isPrevious = _li[j].className.search(/previous/)+1;
				if (isPrevious) {
					var _a = _li[j].getElementsByTagName("a");
					_a[0].onclick = function() {
						context.previous();
						return false;
					}
				}

				var isNext = _li[j].className.search(/next/)+1;
				if (isNext) {
					var _a = _li[j].getElementsByTagName("a");
					_a[0].onclick = function() {
						context.next();
						return false;
					}
				}
			}
		}
		// kick things off with an initial update
		update();
	}

	function update() {
		// tweak index if at start or end based on wrap property
		(index<1)?((wrap)?index=totalslides:index=1):false;
		(index>totalslides)?((wrap)?index=1:index=totalslides):false;
		// update the view
		image.setAttribute("src", prefix+(("00" + index).slice (-3))+suffix);
		current.innerHTML = index + "/" + totalslides;
	}
	this.previous = function () {
		// select the previous image by index and update the view
	    index--;update();
	}

	this.next = function () {
		// select the next image by index and update the view
		index++;update();
	}
}
/*
	Cookies
	http://www.yourhtmlsource.com/javascript/cookies.html
*/
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}
/*
	Detecting Flash Player with JavaScript
	http://www.prodevtips.com/2008/11/20/detecting-flash-player-version-with-javascript/
*/
function supports_flash() {
	  // ie
	  try {
		try {
		  // avoid fp6 minor version lookup issues
		  // see: http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
		  var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
		  try { axo.AllowScriptAccess = 'always'; }
		  catch(e) { return '6,0,0'; }
		} catch(e) {}
			var v = new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1] ;
			return v.replace(/,/gi, '.');
	  // other browsers
	  } catch(e) {
		try {
		  if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
			var v = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
			return v.replace(/,/gi, '.');
		  }
		} catch(e) {}
	  }
	  return '0.0.0';
}
/*
	Detecting XMLHttpRequest Object
	http://en.wikipedia.org/wiki/XMLHttpRequest
*/
function supports_XMLHttpRequest() {
	var xhr = null;
	try { xhr = new XMLHttpRequest(); } catch (e) {}
	try { xhr = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}
	try { xhr = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
	return (xhr!=null);
}
/*
	Detecting HTML5 Features
	http://diveintohtml5.org/detect.html by Mark Pilgrim
*/
function supports_canvas() {
  return !!document.createElement('canvas').getContext;
}
function supports_video() {
  return !!document.createElement('video').canPlayType;
}
function supports_h264_baseline_video() {
  if (!supports_video()) { return false; }
  var v = document.createElement("video");
  return v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
}
function supports_ogg_theora_video() {
  if (!supports_video()) { return false; }
  var v = document.createElement("video");
  return v.canPlayType('video/ogg; codecs="theora, vorbis"');
}
function supports_webm_video() {
  if (!supports_video()) { return false; }
  var v = document.createElement("video");
  return v.canPlayType('video/webm; codecs="vp8, vorbis"');
}
function supports_offline() {
  return !!window.applicationCache;
}
function supports_geolocation() {
  return !!navigator.geolocation;
}
function supports_local_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch(e){
    return false;
  }
}
/*
	Unobtrusive JavaScript
	http://www.onlinetools.org/articles/unobtrusivejavascript/chapter4.html
*/
function addEvent(obj, evType, fn){
 if (obj.addEventListener){
   obj.addEventListener(evType, fn, false);
   return true;
 } else if (obj.attachEvent){
   var r = obj.attachEvent("on"+evType, fn);
   return r;
 } else {
   return false;
 }
}
/*
{ width: {
	screen: x,
	document: x
	},
  xhr: boolean,
  canvas: boolean,
  flash: 10.1.1,
  video: boolean {
	h264: string,
	ogg: string,
	webm: string
	},
  offline: true,
  geolocation: true,
  storage: true
}
*/
function update() {
	var properties = "{width:{screen:"+screen.width+",document:"+document.body.clientWidth+"},xhr:"+supports_XMLHttpRequest()
	+",canvas:"+supports_canvas()
	+",flash:"+supports_flash()
	+",video:"+supports_video()+",formats:{h264:"+supports_h264_baseline_video()+",ogg:"+supports_ogg_theora_video()+",webm:"+supports_webm_video()+"}"
	+",offline:"+supports_offline()
	+"}";
	createCookie('properties',properties,30);
}

addEvent(window, 'load', update);
addEvent(window, 'resize', update);

