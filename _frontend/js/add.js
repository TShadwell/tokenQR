;(function(){
	var	fileState	= 0,
		timerState	= 1,
		selState	= fileState,
		dcmt		= document,
		getElement = function(q){return dcmt.getElementById(q)},
		typeSelector = getElement("typeselector"),
		body = dcmt.body,
		dragEnterEl = getElement("dragenter")
		qridEl = getElement("qrid"),
		nameEl = getElement("name");

	var sto = function(t, fn){
		setTimeout(t,fn);
	}

	var replaceClass = function(val) {
		return function(el) {
			el.setAttribute("class", val);
		}
	}

	//input states
	var	typingState = replaceClass("typing"),
		okayState = replaceClass("okay"),
		failState = replaceClass("fail"),
		defaultState = replaceClass("");


	var getSelectedType = function(){
		return +typeSelector.querySelector("input:checked").value;
	}

	var typingHandle = function(el) {
		el.onkeypress = function(){
			typing(el);
		}
	}

	var liveValidate = function(elem, validateFn) {
		elem.onkeyup = (new function(){
			var tO = false;
			this.okp = function(e){
				var kk = e.keyCode;
				//ignore arrow keys and other junk
				if (!(
					//Arrow keys
					(kk<=40&&kk>=37)||
					//Function keys
					(kk>=112&&kk<=123)||
					//Misc (home, pgdn etc)
					([45, 36, 35, 33, 34, 27].indexOf(kk) !== -1)
					)){
					if (tO !== false) {
						clearTimeout(tO);
					} else {
						typingState(elem);
					}
					tO = setTimeout(
						function(){
							var st = failState;
							if (validateFn()) {
								st = okayState;
							}
							st(elem);
							tO=false;
						},
						1000
					);
				}
			}
		}()).okp;
	}

	//Run immediately to update control status.
	/*(typeSelector.onclick=function(){
		switch (selState){
			
		}
	})();*/
	var dragEnter = function(evt){
		dragEnterEl.setAttribute("style", "display:block");
	}

	/* :^)
	for (var ipS=document.querySelectorAll(".pair>input"), ed=ipS.length;ed-->0;){
		typingHandle(ipS[ed]);
	}
	*/

	liveValidate(qridEl, function(){
		//for now
		return true
	});

	liveValidate(nameEl, function(){
		return nameEl.value != ""
	});
	//Attach dragdrop handlers
	body.addEventListener(
		"dragenter",
		dragEnter
	);
	
})()
