<?php


class UsersAdministrator extends BaseAdministrator {
    
    public static $dashboardView = "Dashboard";
    
    public static $formView = "Form";
    
    public static $validationRules = array(
        
    );
    
    public static function show($args){
        if( $args == NULL || count($args) != 2  )return false;
        $items = ModelHandler::get("Users", array($args[1]));
        return ViewHandler::wrap($args[0], $items[0]);
    }

    public static function showAsGroup($param) {
        return false;
    }

    public static function getDashboard() {
        $items = ModelHandler::get("Users");
        $a = ViewHandler::wrapGroup("DashboardListItem", $items);
        $view = ViewHandler::getView("Users", self::$dashboardView);
        $dashboard = str_replace("<? echo \$listbody;?>", $a, $view);
        $dashboard = str_replace("<? echo \$count;?>", count($items), $dashboard);
        return $dashboard;
    }
    
    public static function getForm( $args ) {
        if( count($args) != 1 ) return false;
        if( $args[0] == null ){

            $item = ModelHandler::getEmptyItem("Users");
            //l($item);
        }else{
            $item = ModelHandler::get("Users", $args);
            $item = $item[0];
        }
        $form = ViewHandler::wrap("Form", $item);
        return $form;
    }
    
    
}

?>
