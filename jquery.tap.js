$.fn.tap = function(fn){
	if(!("_tommyfoks_tapPlugin" in window)){
		window._tommyfoks_tapPlugin = [];
	}
	var collection = this,
		isTouch = "ontouchend" in document.createElement("div"),
		tstart = isTouch ? "touchstart" : "mousedown",
		tmove = isTouch ? "touchmove" : "mousemove",
		tend = isTouch ? "touchend" : "mouseup",
		tcancel = isTouch ? "touchcancel" : "mouseout";
	collection.each(function(){
		var i = {};
		i.target = this;
		_tommyfoks_tapPlugin.push(i);
		$(i.target).on(tstart,function(e){
			var p = "touches" in e ? e.touches[0] : (isTouch ? window.event.touches[0] : window.event);
			i.startX = p.clientX;
			i.startY = p.clientY;
			i.endX = p.clientX;
			i.endY = p.clientY;
			i.startTime = + new Date;
		});
		$(i.target).on(tmove,function(e){
			var p = "touches" in e ? e.touches[0] : (isTouch ? window.event.touches[0] : window.event);
			i.endX = p.clientX;
			i.endY = p.clientY;
		});
		$(i.target).on(tend,function(){
			if((+ new Date)-i.startTime<300){
				if(Math.abs(i.endX-i.startX)+Math.abs(i.endY-i.startY)<20){
					fn.call(i.target);
				}
			}
			i.startTime = undefined;
			i.startX = undefined;
			i.startY = undefined;
			i.endX = undefined;
			i.endY = undefined;
		});
	});
	return collection;
}
