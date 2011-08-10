<?php

/**
 * Description of Config
 *
 * @author alistar
 */

class Config {
    
    public static $DBConf = array(
        "host" => "localhost",
        "user" => "root",
        "pass" => "5588898",
        "name" => "veronica",
        "prefix" => "mc_"
    );
    
    public static $Security = array(
        "passwordsalt" => "legendary!"        
        
    );


    public static $SiteConf = array(
        "name" => "Просто было нечем заняться и я запилил себе микроблог на подобие твиттера",
        "meta" => "VeronicaCMF"
    );
    
    public static $RouterConf = array(
        "DefaultController" => "PagesController"
    );
    
    
}

?>
