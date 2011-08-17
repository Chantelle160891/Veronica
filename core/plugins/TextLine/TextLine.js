var TextLinePlugin = {};

TextLinePlugin.create = function( div ){

    var name = $(div).data('name');
    var label = $(div).data('label');
    var style = $(div).data('style');
    var value =  $(div).data('value');

    var html = "<label for='"+name+"'>"+label+"</label><br/>";
    html += "<input id='"+name+"' type='text' name='"+name+"' value='"+value+"' style='"+style+"'/><br/>";

    $(div).append(html);


}

TextLinePlugin.value = function( div ){
    var name = $(div).data('name');
   
    return $(div).find("#"+name)[0].value();
}