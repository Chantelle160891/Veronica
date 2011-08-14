var Controller = {};
Controller.openDashboard = function( model ){
    Window.newWindow( model+"Administrator.getDashboard()",{buttons:{"Закрыть":true}} );   
}


Controller.openForm = function( model, id, callback ){
    var o = [[id]];
    
    Window.newWindow( model+"Administrator.getForm("+JSON.stringify(o)+")",{
        buttons:{"Сохранить":true, "Отмена":false},
        submit:function(ans,c,form){return callback(ans,form)}
    });
    
}


Controller.getItemDiv = function( link ){
    
    var itemsdiv = $(link).parents(".cmf_item");
    if( itemsdiv.length != 1 ){
        l("More than one item in parents");
        return false;
    }
    return itemsdiv[0];
}

Controller.remove = function( link ){
    var item = new Item(this.getItemDiv(link));
    var o = [null,"RemoveForm"];
    Window.newWindow("ViewHandler.getView("+JSON.stringify(o)+")", {
        buttons:{"Да":true, "Нет":false},
        submit: function( ans ){
            if( ans ) item.destroy();
        }
    });
}

Controller.edit = function( link ){
    var item = new Item( this.getItemDiv(link) );
    this.openForm(item.model, item.id, function( ans, form ){
        if( !ans ) return false;
        if( !Tool.validateForm(item.model, form) ) return "wait";
        item.update(form);
    }); // open form   
}
Controller.add = function( model ){
    
    this.openForm(model, null, function( ans, form ){
        if( !ans ) return false;
        if( !Tool.validateForm(model, form) ) return "wait";
        Item.create(model, form);
    });
}

Controller.massRemove = function( ){
    
    var items = Tool.selected;
    var o = [null,"MassRemoveForm"];
    Window.newWindow("ViewHandler.getView("+JSON.stringify(o)+")", {
        buttons:{"Да":true, "Нет":false},
        submit: function( ans ){
            if( ans ){
                $.each(items, function(i,el){
                    var item = new Item(el);
                    item.destroy();
                })
            }
        }
    });
    
}
