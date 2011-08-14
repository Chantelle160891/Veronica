<?php

/**
 * Description of Api
 *
 * @author alistar
 */

class Api {


    /**
     * Обход дериктории
     *
     * @param string $path путь
     * @param boolean $inPaths с путями?
     * @return array список файлов
     */
    public static function getFileList($from,$depth = 1000,$inPaths = true) {
        if(! is_dir($from) ) return false;
        $files = array();
        $dirs = array( $from );
        while( NULL !== ($dir = array_pop( $dirs ))){
            if( $dh = opendir($dir)){
                while( false !== ($file = readdir($dh))){
                    if( $file == '.' || $file == '..') continue;
                    $path = $dir . DS . $file;
                    if( is_dir($path) ){ if( sizeof($dirs) <= $depth )  $dirs[] = $path; }
                    else( $inPaths ) ? $files[] = $path : $files[] = $file;
                }
                closedir($dh);
            }
        }
        return $files;
        
    }

    /**
     * Разбирает файл стилей
     * @param url $url
     * @return array of styles
     */
    public static function parseStylesFile($url) {
        if(file_exists($url) ){
            $content = file_get_contents($url);
            $content = str_replace("\n", "", $content);
            $matches = array();
            preg_match_all("/new Style:[a-zA-Z0-9]+\(.+\)\[.+\]\{.+\}/", $content,$matches);
            $sources = explode('new Style:', $matches[0][0]);

            $styles = array();
            $inc = array();
            foreach ($sources as $source) {
                $posname = strpos($source, '(');
                $name = substr($source, 0, $posname);
                $source = substr($source, $posname);
                $posgroup = strpos($source, ')[');
                $groupstring = substr($source, 1, $posgroup-1);
                $source = substr($source, $posgroup+1);
                $positem = strpos($source, ']{');
                $itemstring = substr($source, 1, $positem-1);
                $source = substr($source, $positem+2,-1);
                $v = array($groupstring,$itemstring,$source);
                $b = array();
                preg_match_all("/\[:include [a-zA-Z0-9]+\]/", $v[2], $b);
                foreach ($b as $array) {
                    foreach ($array as $value) {
                        $inc[$name][] = substr($value,10,-1);
                    }
                }
                $styles[$name] = $v;
            }
            foreach ($inc as $to => $array) {
                foreach ($array as $from) {
                    $styles[$to][2] = preg_replace("/\[:include $from\]/", $styles[$from][2], $styles[$to][2]);
                }
            }
            
            return $styles;
        }
        return false;

    }

    
    /**
     * Парсинг Ajax URL;
     *
     * <method>://<adress>
     *
     * @param string $url
     * @return data
     */
    public static function parseAjaxUrl($url){
        
        if($url != null && strpos($url, "://") != false ){
            
            $array = array();
            $matches = array();
            preg_match_all("/([a-z]+):\/\/([a-zA-Z]+\.[a-zA-Z]+)/", $url,$matches);
            $array[] = $matches[1][0];
            $a = explode(".",$matches[2][0]);
            $array[] = $a[0];
            $array[] = $a[1];
            $json = substr($url, strlen($matches[0][0])+1, -1);
            if( $json != "" ) $array[] = json_decode($json);
                else $array[] = array();
            return $array;
            
        }else return array("incorrect" => null );
        
    }

    /**
     * Быстрое подключение файлов
     * @param path $arg
     * @param array("php") $types
     */
    public static function fastInclude($arg, $types = array("php")) {
        $files = API::getFileList($arg);
        foreach ($files as $file) {
            $info = pathinfo($file);
            $ext = $info['extension'];
            if(in_array($ext, $types) ){
                include_once $file;
            }
        }
    }
    
    public static function fastInit() {
        $classes = get_declared_classes();
        foreach ($classes as $class) {
            $arr = API::isClassMethod("init",$class);
            if( $arr == FALSE || $class == "Core" ) continue;
            if( in_array("static", $arr) && in_array("public", $arr) ){
                $class::Init();             
            }
            
        }
        
    }

    /**
     * Проверяет существует ли у класса метод и его модификаторы
     *
     * @param метод $method
     * @param класс $class
     * @return boolean
     */
    public static function isClassMethod($method, $class) {
        if( $method != "" && $class != "" ){
           try{
               if( !is_callable(array($class,$method))) return false;
               $refl = new ReflectionMethod($class, $method); 
           }catch(Exeption $e){
               return false;
           }
           $response = Reflection::getModifierNames($refl->getModifiers());
           return $response;
        }else return false;
    }
    
    public static function isModel($model) {
        $extends = class_parents($model);
        return in_array("BaseModel", $extends);
    }
    
    public static function isController($controller) {
        $extends = class_parents($controller);
        return in_array("BaseController", $extends);
    }


    public static function getCustom($what = "Model") {
        if( !($what == "Model" || $what == "Controller") ) return false;
        $classes = get_declared_classes();
        return array_filter($classes, "Api::is$what");
    }

    
}

?>
