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
        case 'WYSIWYGPlugin':
            WYSIWYGPlugin.create(element);
            break;
        case 'TagsPlugin':
            TagsPlugin.create(element);
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
        case 'WYSIWYGPlugin':
            value = WYSIWYGPlugin.value(element);
            break;
        case 'TagsPlugin':
            value = TagsPlugin.value(element);
            break;
        default:
            break;
    }

    return value;
}
