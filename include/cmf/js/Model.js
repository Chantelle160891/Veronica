var Model = {};


Model.remove = function( item,callback ){
    API.ajax('call://'+item.model+'Model.remove('+JSON.stringify([[item.id]])+')', function(){
        callback();
        //API.notify("notify", "Администрирование сайта", "Элемент успешно удален");
    });
}
Model.update = function( item, obj,callback ){
    API.ajax('call://'+item.model+'Model.save('+JSON.stringify([[item.id,obj,false]])+')', function(){
        callback();
        //API.notify("notify", "Администрирование сайта", "Элемент успешно обновлен");
    });
}
Model.add = function( model, obj,callback ){
    API.ajax('call://'+model+'Model.save('+JSON.stringify([[null,obj,true]])+')', function(data){
        callback(data[model+'Model.save']);
        //API.notify("notify", "Администрирование сайта", "Элемент успешно добавлен");
    });
}

function Item( arg ){
    this.id = $(arg).data("id");
    this.model = $(arg).data("model");
    this.content = $(arg).html();
    this.object = $(arg);
    this.style = $(arg).data("style");
}
Item.prototype.getId = function(){return this.id}
Item.prototype.getModel = function(){return this.model}
Item.prototype.getStyle = function(){return this.style}
Item.prototype.getContent = function(){return this.content}
Item.prototype.getObject = function(){return this.object}

Item.prototype.destroy = function(){ 
    $(document).find(".cmf_item[data-id="+this.id+"][data-model="+this.model+"]").remove();
    Model.remove(this,function(){ Tool.repareGroups(); });
}

Item.prototype.update = function( obj ){
    var sameItems = $(document).find(".cmf_item[data-id="+this.id+"][data-model="+this.model+"]");
    Model.update(this, obj,function(){
        $.each(sameItems,function(i,item){
            
            var style = $(item).data("style");

            API.ajax("call://"+$(item).data('model')+"Administrator.show("+JSON.stringify([[style,$(item).data('id')]])+")", function(data){

               var divs = $(document).find(".cmf_item[data-id="+$(item).data('id')+"][data-model="+$(item).data('model')+
                    "][data-style="+style+"]");

                $(divs).replaceWith(data[$(item).data('model')+"Administrator.show"]);
                divs = $(document).find(".cmf_item[data-id="+$(item).data('id')+"][data-model="+$(item).data('model')+
                    "][data-style="+style+"]");
                $.each(divs,function(i,div){Tool.addControls(div);})
            })

        });
    });
}
Item.create = function(model, form){
    Model.add(model, form, function(id){
        var groups = $(".cmf_group[data-model="+model+"]");
        $.each(groups,function(i,group){
            var style = $(group).data('style');
            API.ajax("call://"+model+"Administrator.show("+JSON.stringify([[style,id]])+")", function(data){
                var div = $(data[model+"Administrator.show"]);
                Tool.addControls(div);
                $(group).prepend(div);
                Tool.repareGroup(group);
            });
        });    
        
    });
    
    
}