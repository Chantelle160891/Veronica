<?php


class PostsAdministrator extends BaseAdministrator {
    
    public static $dashboardView = "Dashboard";
    
    public static $formView = "Form";
    
    public static $validationRules = array(
        "content" => ".[^\s]+",
        "date" => "\d\d\d\d-\d\d-\d\d"
    );
    
    public static function getValidationRules() {
        return self::$validationRules;
    }
    
    public static function show($args){
        if( $args == NULL || count($args) != 2  )return false;
        $items = ModelHandler::get("Posts", array($args[1]));
        return ViewHandler::wrap($args[0], $items[0]);
    }

    public static function showAsGroup($args) {
        if( $args == NULL || count($args) != 2  )return false;
        $items = ModelHandler::get("Posts");
        $items = array_reverse($items);
        return ViewHandler::wrapGroup($args[0], $items,$args[1]);
    }

    public static function getDashboard() {
        $items = ModelHandler::get("Posts");
        
        foreach ($items as $item) {
            $item->bean['content'] = strip_tags($item->bean['content']);
            $length = strlen($item->bean['content']);
            if( $length > 203 ){
                $s = substr($item->bean['content'], 0, 200);
                $s = substr($s, 0, strrpos($s, " "))."...";
                $item->bean['content'] = $s;
            }
        }
        $items = array_reverse($items);
        $a = ViewHandler::wrapGroup("DashboardListItem", $items);
        $view = ViewHandler::getView("Posts", self::$dashboardView);
        $dashboard = str_replace("<? echo \$listbody;?>", $a, $view);
        $dashboard = str_replace("<? echo \$count;?>", count($items), $dashboard);
        return $dashboard;
    }
    
    public static function getForm( $args ) {
        
        if( count($args) != 1 ) return false;
        if( $args[0] == null ){
            
            $item = ModelHandler::getEmptyItem("Posts");
            //l($item);
        }else{
            $item = ModelHandler::get("Posts", $args);
            $item = $item[0];
        }
        $form = ViewHandler::wrap("Form", $item);
        return $form;
        
    }
    
    
}

?>
