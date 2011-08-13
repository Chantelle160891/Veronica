var Tool = {};

Tool.getDashboard = function( model, callback ){
    API.ajax("call://"+model+"Administrator.getDashboard()", function(a){callback( a[model+"Administrator.getDashboard"] );})
}

Tool.getForm = function( model, id, callback ){
    API.ajax("call://"+model+"Administrator.getForm("+JSON.stringify(id)+")", function(a){callback( a[model+"Administrator.getForm"] );})
}

Tool.addControls = function( div ){
    if('disable' == $(div).data('controls')){
        return false;
    }
    var panel = $("<div class='cmf_fastcontrolpanel'>");
    var edit_b = $("<div class='cmf_fasteditbutton'>").click(function(){Controller.edit(this);});
    var remove_b = $("<div class='cmf_fastremovebutton'>").click(function(){Controller.remove(this);});
    $(panel).prepend(remove_b).prepend(edit_b);
    $(div).prepend(panel);
    $(div).hover(function(){
        $(panel).show();
        $(this).attr("style","background:#FFEC9E;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;\n\
                        -webkit-border-top-right-radius: 0px;-moz-border-top-right-radius: 0px;border-top-right-radius: 0px;")
    },function(){
        $(panel).hide();
        $(this).css("background", "none");
    });
}


Tool.validateForm = function( model, form ){
    var valid = true;
    API.ajax("call://"+model+"Administrator.getValidationRules()", function(a){ 
        var response =  a[model+"Administrator.getValidationRules"];
        $.each(form,function(field, value){
            var regexp = new RegExp( response[field] );
            if(value.search(regexp)==-1){
                valid = false;
            }
        })
    });
    return valid;
}

Tool.repareGroups = function( ){
    var groups = $(document).find('.cmf_group[data-limit!=infinity]');
    $.each(groups, function(i,group){
        Tool.repareGroup(group);
    })
}

Tool.repareGroup = function( group ){

    var limit = $(group).data('limit');
    var model = $(group).data('model');
    var contents = $(group).children(".cmf_item[data-model="+model+"]").length;

    if( contents > limit ){
        var c = contents - limit;
        for (i = 0; i < c; i++) {
            var item = $(group).children(".cmf_item[data-model="+model+"]").last();
            $(item).remove();
        }
    }else if( contents < limit ){
        var style = $(group).data('style');
        API.ajax("call://"+model+"Administrator.showAsGroup("+JSON.stringify([[style,limit]])+")", function(data){
            var div = $(data[model+"Administrator.showAsGroup"]);
            var children = $(div).children('.cmf_item');
            $.each(children,function(i,div){Tool.addControls(div);});
            $(group).replaceWith(div);

        });
        
    }else return;
}

Tool.logout = function(){

    API.ajax("call://Authorization.logout()", function(data){
            Cookie.removeCookie('user_id');
            Cookie.removeCookie('user_name');
            API.refresh();
        });
}

Tool.isAuthorized = function(){
    if( Cookie.getCookie('user_id') != false && Cookie.getCookie('user_name') != false) return true;
    else return false;
    
}

Tool.makeAuth = function(loginid, passid){
    var login = $("#"+loginid).val();
    var pass = $("#"+passid).val();
    API.ajax("call://Authorization.makeAuth("+JSON.stringify([[login,pass]])+")", function(data){
            API.refresh();
        });
    
}

Tool.isSelected = function(div){
    var item = $(div).parents('.cmf_item')[0];
    return $.inArray(item, Tool.selected) != -1;
}

Tool.selected = new Array;
Tool.prevStyle = null;

Tool.toggleSelect = function( div ){

    if( Tool.isSelected(div) ){
        
        var item = $(div).parents('.cmf_item')[0];
        var pos = $.inArray(item, Tool.selected);
        delete Tool.selected[pos];
        var newArray = new Array;
        for (i = 0; i < Tool.selected.length; i++)
            if(Tool.selected[i] !== undefined){
                newArray.push(Tool.selected[i]);
            }
        Tool.selected = newArray;
        $(div).hover(function(){
            if(!Tool.isSelected(this)) $(this).attr("style","background:#FFEC9E;")
        },function(){
            if(!Tool.isSelected(this)) $(this).css("background", "none");
        });
        $(item).find('.cmf_mass_marker').attr('checked', '');
        $(div).css("background-color","#FFFFFF");

    }else{
        Tool.prevStyle = $(div).css('background-color');
        var item = $(div).parents('.cmf_item')[0];
        $(div).css("background-color","rgb(230, 230, 250)");
        $(div).hover(function(){
            $(this).attr("style","background:#FFEC9E;")
        },function(){
            $(this).css("background-color","rgb(230, 230, 250)");
        });
        $(item).find('.cmf_mass_marker').attr('checked', 'checked');
        Tool.selected.push(item);
    }
    
    
    
}
