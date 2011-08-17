window.onload = function() {
    API.Init();
};
function l(el){console.log(el);}
var API = {};

API.Init = function(){
   
   //add controls
   if( Tool.isAuthorized() ){
       $.each($(document).find(".cmf_item"),function(i,item){Tool.addControls(item)});
   }
        
   
   
}


API.ajax = function(arg1,callback){
    var stack_bottomleft = {"dir1": "right", "dir2": "up"};
    $.pnotify.defaults.pnotify_history = false;
    var notice = $.pnotify({
           pnotify_title: "",
           pnotify_text: "<img src=\"template/images/cmf/throbber.gif\">",
           pnotify_addclass: "stack-bottomleft",
           pnotify_stack: stack_bottomleft,
           pnotify_notice_icon: '',
           pnotify_mouse_reset: false,
           pnotify_nonblock: true,
           pnotify_hide: false,
           pnotify_closer: false,
           pnotify_width: 20
        });

    $.ajax({
       type: "POST",
       url: "index.php",
       data: {"ajax":"true","url":arg1},
       async: false,
       success: function(data){
         notice.pnotify_remove();
         //l(data);
         callback(API.parseJSON(data),arg1);
       }
     });
}


API.parseJSON = function(data){
    return jQuery.parseJSON(data);
}
API.refresh = function(){
    location.reload(true);
}
API.notify = function(type,title,message){
    $.pnotify.defaults.pnotify_history = false;
    $.pnotify({
            pnotify_delay: 1000,
            pnotify_type: type,
            pnotify_title: title,
            pnotify_text: message,
            pnotify_mouse_reset: false,
            pnotify_nonblock: true,
            pnotify_animate_speed: 500
        });
}
