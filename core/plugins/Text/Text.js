var TextPlugin = {};

TextPlugin.create = function( div ){

    var name = $(div).data('name');
    var label = $(div).data('label');
    var style = $(div).data('style');
    var value =  $(div).data('value');

    var html = "<label for='"+name+"'>"+label+"</label><br/>";
    html += "<textarea id='"+name+"' name='"+name+"' style='"+style+"'>"+value+"</textarea><br/>";

    $(div).append(html);


}
TextPlugin.value = function( div ){
    var name = $(div).data('name');
    var el = $(div).find("#"+name)[0];
    return $(el).val();
}