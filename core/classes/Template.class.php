<?php

class Template{

	private static $home = "./";

	private static $vars = array();

	public static function configure( $home ){
		self::$home = $home;
                $js = ""; $css = "";
                if( Authorization::isAuthorized() ){
                    $files = API::getFileList( INCLUDEPATH );
                    $pos = array_search("./include/cmf/js/lib.js",$files);
                    unset($files[$pos]);
                }
                else{
                    $files = API::getFileList( INCLUDEPATH,-1 );
                    $files[] = "./include/cmf/js/lib.js";
                    $files[] = "./include/cmf/css/cmf.notify.css";
                    $files[] = "./include/cmf/css/cmf.ui.css";
                }
                
                rsort($files);
                foreach ($files as $path) {

                    $ext = pathinfo($path);
                    $ext = $ext['extension'];
                    if($ext == "js"){
                        $js .= str_replace("{PATH}", $path, Storage::get("Template::jsInclude"));
                    }else if($ext == "css")
                        $css .= str_replace("{PATH}", $path, Storage::get("Template::cssInclude"));
                }

                self::assign("TITLE", Config::$SiteConf['name']);
                self::assign("META", Config::$SiteConf['meta']);
                self::assign("JSINCLUDE", $js);
                self::assign("CSSINCLUDE", $css);
               // l(self::$vars);
	}

	public static function render( $source, $isFile = true ){

		$return = null;
		
		extract( self::$vars );
		if( $isFile ){
                    ob_start();
			if( is_file( self::$home.$source ) )
				include( self::$home.$source );
                    $return = ob_get_clean();
		}else{
			$php = array();
                        preg_match_all("/(<\?(php)?(.*?)\?>)/", $source, $php);
                        foreach ($php[0] as $value) {
                            ob_start();
                            eval(substr($value, 2, -2));
                            $s = ob_get_clean();
                            $source = str_replace($value, $s, $source);
                        }
                        $return = $source;
		}

		

		return $return;

	}

	public static function assign( $variable, $value = null ){
		if( is_array( $variable ) )
			self::$vars += $variable;
		else
			self::$vars[ $variable ] = $value;
	}

        public static function reset() {

            self::$vars = array();
            self::configure(self::$home);
            
        }

}

?>
