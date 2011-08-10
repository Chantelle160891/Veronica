<?php


abstract class BaseAdministrator {
    
    public static $dashboardView;
    
    public static $formView;
    
    public static $validationRules;

    public static function getDashboard() {}
    
    public static function getForm() {}
    
    public static function getValidationRules(){}
    
    public static function show() {}
    
    
}

?>
