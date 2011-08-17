var Dashboard = {};

Dashboard.init = function(){
    var massmarker = $('<td style="width:1%;"><input type="checkbox" class="cmf_mass_marker" ></td>');
    var trs = $('.modalmessage').find('.listrow').prepend(massmarker);
    
    $(document).keydown(DashboardSelector.hotkeyHandler);
    $(document).keyup(DashboardSelector.hotkeyHandler)


}

Dashboard.reset = function(){
    DashboardSelector.selected = new Array;
    DashboardSelector.ctrlSelect = false;
    DashboardSelector.shiftSelect = false;
    DashboardSelector.prevSelection = null;
    $(document).unbind('keydown',DashboardSelector.hotkeyHandler);
    $(document).unbind('keyup',DashboardSelector.hotkeyHandler)
}

Dashboard.updateDashboardActions = function(){
    var _case = DashboardSelector.selected.length;
    $('#cmf_dashboardactions').remove();
    var actionsbar = $('<div id="cmf_dashboardactions" />');
    var lastselected = DashboardSelector.selected[DashboardSelector.selected.length-1];

    var group = $(actionsbar).parents('.modalmessage').find('.cmf_group');
    var model = $(group).data('model');

    if( _case > 1){
        var state = '';

        var canremove = true;
        for (i = 0; i < DashboardSelector.selected.length; i++) {
            if(  $(DashboardSelector.selected[i]).data('deletable') == false ){
                canremove = false;
                break;
            }
        }

        if( canremove ) state += '| <a href="#" onclick="Controller.massRemove();">Удалить выбранные</a>';

        $(actionsbar).append($( state) );

    }else if( _case == 1 ){

        var selected = $(DashboardSelector.selected[0]).find('*')[0];

        var state = $('<div>');
        var sep1 = $('<span> | </span>');
        var sep2 = $('<span> | </span>');
        var editb = $('<a href="#">Изменить</a>').click(function(){Controller.edit(selected)});
        var removeb = $('<a href="#">Удалить</a>').click(function(){Controller.remove(selected)});
        if(  $(DashboardSelector.selected[0]).data('editable') != false ){
            $(state).append(editb);
        }
        if(  $(DashboardSelector.selected[0]).data('deletable') != false ){
            $(state).append(sep2);
            $(state).append(removeb);
        }
        $(actionsbar).empty();

        $(actionsbar).append(state);
    }
    $(lastselected).prepend(actionsbar);



}

var DashboardSelector = {};

DashboardSelector.hotkeyHandler = function(e){
        if(e.keyCode == 17)DashboardSelector.ctrlSelect = !DashboardSelector.ctrlSelect;
        if(e.keyCode == 16)DashboardSelector.shiftSelect = !DashboardSelector.shiftSelect;
    }

DashboardSelector.selected = new Array;

DashboardSelector.ctrlSelect = false;

DashboardSelector.shiftSelect = false;

DashboardSelector.prevSelection = null;

DashboardSelector.isSelected = function(item){
    return $.inArray(item, DashboardSelector.selected) != -1;
}


DashboardSelector.select = function( item ){
    var div = $(item).find('tr');
    $(div).css("background-color","rgb(230, 230, 250)");
    $(div).hover(function(){
        $(this).attr("style","background:#FFEC9E;")
    },function(){
        $(this).css("background-color","rgb(230, 230, 250)");
    });
    $(div).find('.cmf_mass_marker').attr('checked','checked');
    DashboardSelector.selected.push(item);
}

DashboardSelector.unselect = function( item ){
    //delete from array Selected
    var pos = $.inArray(item, DashboardSelector.selected);
    delete DashboardSelector.selected[pos];
    var newArray = new Array;
    for (i = 0; i < DashboardSelector.selected.length; i++)
        if(DashboardSelector.selected[i] !== undefined){
            newArray.push(DashboardSelector.selected[i]);
        }
    DashboardSelector.selected = newArray;
    
    //make css
    var div = $(item).find('tr');
    $(div).find('.cmf_mass_marker').removeAttr('checked');
    $(div).hover(function(){
        if(!DashboardSelector.isSelected(this)) $(this).attr("style","background:#FFEC9E;")
    },function(){
        if(!DashboardSelector.isSelected(this)) $(this).attr("style","background:#FFFFFF;")
    });
    $(div).css("background-color","#FFFFFF");
}

DashboardSelector.toggleSelect = function( div ){

//    var ctrl = DashboardSelector.ctrlSelect;
//    var shift = DashboardSelector.shiftSelect;

    if( DashboardSelector.isSelected(div) ){
        
//        if( ctrl && !shift){
//            DashboardSelector.unselect(div);
//        }  
        DashboardSelector.unselect(div);
    }else{
//        if( !ctrl && !shift ){
//            $.each(DashboardSelector.selected,function(i,div){
//                DashboardSelector.unselect(div);
//            });
//            DashboardSelector.select(div);
//        }else if(ctrl && !shift){
//            DashboardSelector.select(div);
//        }
        DashboardSelector.select(div);
    }
    
    Dashboard.updateDashboardActions();
}