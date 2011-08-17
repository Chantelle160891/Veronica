var TagsPlugin = {};

TagsPlugin.create = function( div ){

    var name = $(div).data('name');
    var label = $(div).data('label');
    var style = $(div).data('style');
    var value =  $(div).data('value');

    var html = "<label for='"+name+"'>"+label+"</label><br/>";
    html += "<input id='"+name+"' name='"+name+"' value='"+value+"' style='"+style+"'/><br/>";

    $(div).append(html);
    $('#'+name).ptags();

}

TagsPlugin.value = function( div ){
    var tags = $(div).find('.ui-ptags-tag-container').find('.ui-ptags-tag-text');
    var value = "";
    $.each(tags, function(i,tag){
        var val = $(tag).html();
        value += val+",";
    });
    return value.slice(0,-1);
}

