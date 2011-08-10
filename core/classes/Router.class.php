<?php

/**
 * Description of Router
 *
 * @author alistar
 */
class Router {

    public static function route($args) {
        
        if( strtoupper($args[1]) == "INIT" ) return;
        $controller = ( !isset($args[0]) )? Config::$RouterConf['DefaultController'] :  $args[0]."Controller";
        $method = ( !isset($args[1]) )? "index" : $args[1];
        
        if( class_exists($controller) && in_array("BaseController", class_parents($controller)) ){
            $arr = API::isClassMethod($method,$controller);
            if( in_array("static", $arr) && in_array("public", $arr) ){
                unset ($args[0]);
                unset ($args[1]);
                $args = array_values($args);
                return $controller::$method($args);               
            }
        }
        echo "404";
        
        
        
    }



}

?>
