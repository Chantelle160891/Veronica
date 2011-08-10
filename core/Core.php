<?php

class Core {
    
    
    /**
     * test system here
     */
    public static function PreProcess() {
        
        define("URL", $_SERVER['REQUEST_URI']);
        define("DS", DIRECTORY_SEPARATOR);
        define("COREPATH",".".DS."core".DS);
        define("CLASSPATH",COREPATH."classes");
        define("TEMPLATEPATH",".".DS."template".DS);
        define("CUSTOMPATH",".".DS."custom");
        define("INCLUDEPATH",".".DS."include");
        define("FILESPATH",".".DS."files");
        define("TEMPPATH",".".DS."tmp");
        
        //error_reporting (E_ALL);
        if (version_compare(phpversion(), '5.3.0', '<') == true) { die ('PHP5.3 Only'); }
        if ( !is_writable( FILESPATH ) ) { die( 'files must be writable' ); }
        if ( !is_writable( TEMPPATH ) ) { die( 'tmp must be writable' ); }
    }
    
    public static function Init() {
        Core::PreProcess();
        
        include_once 'classes/Api.class.php';
        
        Api::fastInclude( CLASSPATH );
        Api::fastInclude( CUSTOMPATH );
        
        Api::fastInit();

        Storage::put("Template::cssInclude",
            "<link rel=\"stylesheet\" href=\"{PATH}\" type=\"text/css\" media=\"all\" />\n");
        Storage::put("Template::jsInclude",
            "<script type=\"text/javascript\" src=\"{PATH}\"></script>\n");

        
        $url = "mysql:host=".Config::$DBConf["host"].";dbname=".Config::$DBConf["name"];
        DB::setup($url, Config::$DBConf["user"], Config::$DBConf["pass"]);
        
    }

    public static function Run() {
        Core::Init();
        
        // login as admin
        UsersModel::makeAuth(array("admin","123"));
        
        if( isset( $_POST["ajax"] ) ) Ajax::Run( $_POST );
        else{
            $url = array_keys($_GET);
            if(!isset($url[0]))$url[0] = "";
            $urlArray = explode("/",  substr($url[0],1));
            $urlArray = array_filter($urlArray);
            Router::route( $urlArray );
            
            //l( PostsModel::save(array(null,$a,true)) );
        }
        
        
    }
    
    
}

function l($a){
    var_dump($a);
}


?>
