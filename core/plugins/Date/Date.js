var DatePlugin = {};

DatePlugin.create = function( div ){

    var name = $(div).data('name');
    var label = $(div).data('label');
    var style = $(div).data('style');
    var value =  $(div).data('value');

    var html = "<label for='"+name+"'>"+label+"</label><br/>";
    html += "<input type='date' id='"+name+"' name='"+name+"' value='"+value+"' style='"+style+"'/><br/>";

    $(div).append(html);


}

DatePlugin.value = function( div ){
    var name = $(div).data('name');
    var el = $(div).find("#"+name)[0];
    return $(el).val();
}