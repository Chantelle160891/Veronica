/*
 * jQuery Impromptu
 * By: Trent Richardson [http://trentrichardson.com]
 * Version 3.1
 * Last Modified: 3/30/2010
 *
 * Copyright 2010 Trent Richardson
 * Dual licensed under the MIT and GPL licenses.
 * http://trentrichardson.com/Impromptu/GPL-LICENSE.txt
 * http://trentrichardson.com/Impromptu/MIT-LICENSE.txt
 *
 */

(function($) {
	$.prompt = function(message, options) {

		options = $.extend({},$.prompt.defaults,options);
		$.prompt.currentPrefix = options.prefix;

		var ie6		= ($.browser.msie && $.browser.version < 7);
		var $body	= $(document.body);
		var $window	= $(window);

		options.classes = $.trim(options.classes);
		if(options.classes != '')
			options.classes = ' '+ options.classes;

		//build the box and fade
		var msgbox = '<div class="'+ options.prefix +'box'+ options.classes +'"  id="'+ options.prefix +'box">';
		if(options.useiframe && (($('object, applet').length > 0) || ie6)) {
			msgbox += '<iframe src="javascript:false;" style="display:block;position:absolute;z-index:-1;" class="'+ options.prefix +'fade" id="'+ options.prefix +'fade"></iframe>';
		}else {
			if(ie6) {
				$('select').css('visibility','hidden');
			}
			msgbox +='<div class="'+ options.prefix +'fade" id="'+ options.prefix +'fade"></div>';
		}
		msgbox += '<div class="'+ options.prefix +'" id="'+ options.prefix +'"><div  class="'+ options.prefix +'container"><div class="';
		msgbox += options.prefix +'close"></div><div id="'+ options.prefix +'states"></div>';
		msgbox += '</div></div></div>';

		var $modalb	= $(msgbox).appendTo($body);
		var $modal	= $modalb.find('#'+ options.prefix);
		var $modalf	= $modalb.find('#'+ options.prefix +'fade');

		//if a string was passed, convert to a single state
		if(message.constructor == String){
			message = {
				state0: {
					html: message,
				 	buttons: options.buttons,
				 	focus: options.focus,
				 	submit: options.submit
			 	}
		 	};
		}

		//build the states
		var states = "";

		$.each(message,function(statename,stateobj){
			stateobj = $.extend({},$.prompt.defaults.state,stateobj);
			message[statename] = stateobj;

			states += '<div id="'+ options.prefix +'_state_'+ statename +'" class="'+ options.prefix + '_state" style="display:none;"><div class="'+ options.prefix +'message">' + stateobj.html +'</div><div class="'+ options.prefix +'buttons">';
			$.each(stateobj.buttons, function(k, v){
				if(typeof v == 'object')
					states += '<button name="' + options.prefix + '_' + statename + '_button' + v.title.replace(/[^a-z0-9]+/gi,'') + '" id="' + options.prefix + '_' + statename + '_button' + v.title.replace(/[^a-z0-9]+/gi,'') + '" value="' + v.value + '">' + v.title + '</button>';
				else states += '<button name="' + options.prefix + '_' + statename + '_button' + k + '" id="' + options.prefix +	'_' + statename + '_button' + k + '" value="' + v + '">' + k + '</button>';
			});
			states += '</div></div>';
		});

		//insert the states...
		$modal.find('#'+ options.prefix +'states').html(states).find('.'+ options.prefix +'_state:first').css('display','block');
		$modal.find('.'+ options.prefix +'buttons:empty').css('display','none');


		//Events
		$.each(message,function(statename,stateobj){
			var $state = $modal.find('#'+ options.prefix +'_state_'+ statename);
			$state.find('.'+ options.prefix +'buttons').find('button').click(function(){
                                
				var msg = $state.find('.'+ options.prefix +'message');
				var clicked = stateobj.buttons[$(this).text()];
				if(clicked == undefined){
					for(var i in stateobj.buttons)
						if(stateobj.buttons[i].title == $(this).text())
							clicked = stateobj.buttons[i].value;
				}

				if(typeof clicked == 'object')
					clicked = clicked.value;
				var forminputs = {};

				//collect all form element values from all states
				$.each($modal.find('#'+ options.prefix +'states :input').serializeArray(),function(i,obj){
					if (forminputs[obj.name] === undefined) {
						forminputs[obj.name] = obj.value;
					} else if (typeof forminputs[obj.name] == Array || typeof forminputs[obj.name] == 'object') {
						forminputs[obj.name].push(obj.value);
					} else {
						forminputs[obj.name] = [forminputs[obj.name],obj.value];
					}
				});

                                var dataInputsValues = {};

                                var inputs = $($modal).find('.cmf_datainput');
                                $.each(inputs, function(i,input){
                                    var name = $(input).data('name');
                                    var value = Plugins.getValue(input);
                                    dataInputsValues[name] = value;
                                });


				var close = stateobj.submit(clicked,msg,dataInputsValues);

                                if( close == "wait" ){
                                    API.notify("error", "Ошибка сохранения", "Проверьте заполнение формы")
                                    return false;
                                }


				if(close != "wait" ) {
                                        msg = $(document).find('.'+ options.prefix +'message');
					removePrompt(true,clicked,msg,dataInputsValues);
				}
			});
			$state.find('.'+ options.prefix +'buttons button:eq('+ stateobj.focus +')').addClass(options.prefix +'defaultbutton');


		});

		var ie6scroll = function(){
			$modalb.css({top: $window.scrollTop()});
		};

		var fadeClicked = function(){
			if(options.persistent){
				var i = 0;
				$modalb.addClass(options.prefix +'warning');
				var intervalid = setInterval(function(){
					$modalb.toggleClass(options.prefix +'warning');
					if(i++ > 1){
						clearInterval(intervalid);
						$modalb.removeClass(options.prefix +'warning');
					}
				}, 100);
			}
			else {
				removePrompt();
			}
		};
		var keyPressEventHandler = function(e){
			var key = (window.event) ? event.keyCode : e.keyCode; // MSIE or Firefox?

			//escape key closes
			if(key==27) {
				fadeClicked();
			}

			//constrain tabs
			if (key == 9){
				var $inputels = $(':input:enabled:visible',$modalb);
				var fwd = !e.shiftKey && e.target == $inputels[$inputels.length-1];
				var back = e.shiftKey && e.target == $inputels[0];
				if (fwd || back) {
				setTimeout(function(){
					if (!$inputels)
						return;
					var el = $inputels[back===true ? $inputels.length-1 : 0];

					/*if (el)
						el.focus();*/
				},10);
				return false;
				}
			}
		};

		var positionPrompt = function(){
			$modalb.css({
				position: "absolute",
				height: $window.height(),
				width: "100%",
				top: (ie6)? $window.scrollTop() : 0,
				left: 0,
				right: 0,
				bottom: 0
			});
			$modalf.css({
				position: "fixed",
				height: $window.height(),
				width: "100%",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0
			});
			$modal.css({
				position: "absolute",
				top: options.top,
				left: options.left,
                                width:"80%"


			});
		};

                var initFormInputs = function(){

                    var inputs = $($modal).find('.cmf_datainput');
                    $.each(inputs, function(i,input){
                        Plugins.initPlugin(input);
                    });
                }

		var stylePrompt = function(){
                        initFormInputs();
			$modalf.css({
				zIndex: options.zIndex,
				display: "none",
				opacity: options.opacity
			});
			$modal.css({
				zIndex: options.zIndex+1,
				display: "none"
			});
			$modalb.css({
				zIndex: options.zIndex
			});
                        
		};

		var removePrompt = function(callCallback, clicked, msg, formvals){

			$modal.remove();
			//ie6, remove the scroll event
			if(ie6) {
				$body.unbind('scroll',ie6scroll);
			}
			$window.unbind('resize',positionPrompt);
			$modalf.fadeOut(options.overlayspeed,function(){
				$modalf.unbind('click',fadeClicked);
				$modalf.remove();
				if(callCallback) {
					options.callback(clicked,msg,formvals);
				}
                                $modalb.unbind('keypress',keyPressEventHandler);
				$modalb.remove();
				if(ie6 && !options.useiframe) {
					$('select').css('visibility','visible');
				}
			});

                        Window.close({keyCode : 27});
		};

		positionPrompt();
		stylePrompt();


		//ie6, add a scroll event to fix position:fixed
		if(ie6) {
			$window.scroll(ie6scroll);
		}
		$modalf.click(fadeClicked);
		$window.resize(positionPrompt);
		$modalb.bind("keydown keypress",keyPressEventHandler);
		$modal.find('.'+ options.prefix +'close').click(removePrompt);

		//Show it
		$modalf.fadeIn(options.overlayspeed);
		$modal[options.show](options.promptspeed,options.loaded);
		//$modal.find('#'+ options.prefix +'states .'+ options.prefix +'_state:first .'+ options.prefix +'defaultbutton').focus();

		if(options.timeout > 0)
			setTimeout($.prompt.close,options.timeout);

		return $modalb;
	};

	$.prompt.defaults = {
		prefix:'modal',
		classes: '',
		buttons: {},
	 	loaded: function(){

	 	},
	  	submit: function(){
	  		return true;
		},
	 	callback: function(){

	 	},
		opacity: 0.6,
	 	zIndex: 999,
	  	overlayspeed: 'slows',
	   	promptspeed: 'fast',
   		show: 'fadeIn',
	   	focus: 0,
	   	useiframe: false,
	 	top: "5%",
                left: "10%",
	  	persistent: false,
	  	timeout: 0,
	  	state: {
			html: '',
		 	buttons: {
		 		Ok: true
		 	},
		  	focus: 0,
		   	submit: function(){
		   		return true;
		   }
	  	}
	};

	$.prompt.currentPrefix = $.prompt.defaults.prefix;

	$.prompt.setDefaults = function(o) {
		$.prompt.defaults = $.extend({}, $.prompt.defaults, o);
	};

	$.prompt.setStateDefaults = function(o) {
		$.prompt.defaults.state = $.extend({}, $.prompt.defaults.state, o);
	};

	$.prompt.getStateContent = function(state) {
		return $('#'+ $.prompt.currentPrefix +'_state_'+ state);
	};

	$.prompt.getCurrentState = function() {
		return $('.'+ $.prompt.currentPrefix +'_state:visible');
	};

	$.prompt.getCurrentStateName = function() {
		var stateid = $.prompt.getCurrentState().attr('id');

		return stateid.replace($.prompt.currentPrefix +'_state_','');
	};

	$.prompt.goToState = function(state, callback) {
		$('.'+ $.prompt.currentPrefix +'_state').slideUp('slow');
		$('#'+ $.prompt.currentPrefix +'_state_'+ state).slideDown('slow',function(){
			//$(this).find('.'+ $.prompt.currentPrefix +'defaultbutton').focus();
			if (typeof callback == 'function')
				callback();
		});
	};

	$.prompt.nextState = function(callback) {
		var $next = $('.'+ $.prompt.currentPrefix +'_state:visible').next();

		$('.'+ $.prompt.currentPrefix +'_state').slideUp('slow');

		$next.slideDown('slow',function(){
			//$next.find('.'+ $.prompt.currentPrefix +'defaultbutton').focus();
			if (typeof callback == 'function')
				callback();
		});
	};

	$.prompt.prevState = function(callback) {
		var $next = $('.'+ $.prompt.currentPrefix +'_state:visible').prev();

		$('.'+ $.prompt.currentPrefix +'_state').slideUp('slow');

		$next.slideDown('slow',function(){
			//$next.find('.'+ $.prompt.currentPrefix +'defaultbutton').focus();
			if (typeof callback == 'function')
				callback();
		});
	};

	$.prompt.close = function() {
		$('#'+ $.prompt.currentPrefix +'box').fadeOut('fast',function(){
        		$(this).remove();

		});
	};

	$.fn.prompt = function(options){
		if(options == undefined)
			options = {};
		if(options.withDataAndEvents == undefined)
			options.withDataAndEvents = false;
		$.prompt($(this).clone(options.withDataAndEvents).html(),options);
	}

})(jQuery);

var Window = {};

Window.windows = new Array;
Window.current = null;
Window.initialPositions = new Array;
Window.herecoms = false;
Window.reset = function(){
    Window.windows = new Array;
    Window.current = null;
    Window.initialPositions = new Array;
    Window.herecoms = false;
    Dashboard.reset();
}

Window.newWindow = function(h,w){
    DashboardSelector.selected = new Array;
    
    Window.initialPositions.push(window.pageYOffset);
    $.scrollTo(0, 300);
    if( Window.current != null )
        Window.windows.push(Window.current);
    API.ajax("call://"+h, function(data,h){
        $.prompt.close();
        Window.current = [h,w];
        var i = (h+'').indexOf( "(", 0);
        h = (h+'').substr(0,i);
        i = (h+'').indexOf( "//", 0);
        h = (h+'').substr(i+2,h.lenght);
        $.prompt(data[h],w);
        if( !Window.herecoms ){
            $(document).keydown(Window.close);
            Dashboard.init();
            Window.herecoms = true;
        }
    });
}

Window.close = function(e){
    if(e.keyCode!=27) return;
    if(Window.windows.length > 0){
        DashboardSelector.selected = new Array;
        $.scrollTo(Window.initialPositions.pop(),300);
        var w = Window.windows.pop();
        Window.current = w;
        var callString = w[0];
        var args = w[1];
        API.ajax(callString, function(data,h){
            $.prompt.close();
            Window.current = [callString,args];
            var i = (h+'').indexOf( "(", 0);
            h = (h+'').substr(0,i);
            i = (h+'').indexOf( "//", 0);
            h = (h+'').substr(i+2,h.lenght);
            $.prompt(data[h],args);
        });
    }else{
        $(document).unbind('keydown',Window.close);
        $.prompt.close();
        $.scrollTo(Window.initialPositions.pop(),300);
        Window.reset();
    }

}





