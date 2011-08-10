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

    public static function getDashboard() {
        $items = ModelHandler::get("Users");
        $a = ViewHandler::wrapGroup("DashboardListItem", $items);
        $view = ViewHandler::getView("Users", self::$dashboardView);
        $dashboard = preg_replace("/:listbody/", $a, $view);
        return $dashboard;
    }
    
    public static function getForm() {
        return ViewHandler::getView("Users", self::$formView);
    }
    
    
}

?>
