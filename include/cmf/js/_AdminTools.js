var Tool = {};

Tool.getDashboard = function( model, callback ){
    API.ajax("call://"+model+"Administrator.getDashboard()", function(a){callback( a[model+"Administrator.getDashboard"] );})
}

Tool.getForm = function( model, id, callback ){
    API.ajax("call://"+model+"Administrator.getForm("+JSON.stringify(id)+")", function(a){callback( a[model+"Administrator.getForm"] );})
}

Tool.addControls = function( div ){
    
    var panel = $("<div class='cmf_fastcontrolpanel'>");
    var edit_b = $("<div class='cmf_fasteditbutton'>").click(function(){Controller.edit(this);});
    var remove_b = $("<div class='cmf_fastremovebutton'>").click(function(){Controller.remove(this);});;
    $(panel).prepend(remove_b).prepend(edit_b);
    $(div).prepend(panel);
    $(div).hover(function(){
        $(panel).show();
        $(this).attr("style","background:#FFEC9E;-webkit-border-radius: 12px;-moz-border-radius: 12px;border-radius: 12px;")
        
        
        
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


