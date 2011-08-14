var Plugins = {};
Plugins.initPlugin = function( element ){
    var plugin = $(element).data('plugin');
    switch (plugin) {
        case 'TextLinePlugin':
            TextLinePlugin.create(element);
            break;
        case 'DatePlugin':
            DatePlugin.create(element);
            break;
        case 'TextPlugin':
            TextPlugin.create(element);
            break;
        default:
            break;
    }

}
Plugins.getValue = function( element ){
    var plugin = $(element).data('plugin');
    var value = null;
    switch (plugin) {
        case 'TextLinePlugin':
            value = TextLinePlugin.value(element);
            break;
        case 'DatePlugin':
            value = DatePlugin.value(element);
            break;
        case 'TextPlugin':
            value = TextPlugin.value(element);
            break;
        default:
            break;
    }

    return value;
}
