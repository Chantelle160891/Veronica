var WYSIWYGPlugin = {};

WYSIWYGPlugin.create = function( div ){

    var name = $(div).data('name');
    var label = $(div).data('label');
    var style = $(div).data('style');
    var value =  $(div).data('value');

    var html = $("<textarea id='"+name+"' name='"+name+"' style='"+style+"'>"+value+"</textarea>");
    label = $("<label for='"+name+"'>"+label+"</label>");

    $(div).append(label);
    $(div).append(html);
    
    $(html).redactor({
        toolbar : 'mini',
        resize : false,
        css : ['_blank.css']
    });
    


}

WYSIWYGPlugin.value = function( div ){
    var id = $(div).data('name');
    var editor = $(div).find('#imp_redactor_frame_'+id);
    var value = $(editor).contents().find('body').html();
    return value;
}