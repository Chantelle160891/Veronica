<?php

class ViewHandler {
    
    private static $itemTpl = "<div class='cmf_item' data-model='{itemmodel}' data-id='{itemid}' data-style='{itemstyle}' {additional}>{itemhtml}</div>\n";
    
    private static $groupTpl = "<div class='cmf_group' data-model='{groupmodel}' data-style='{groupstyle}' {additional}>{grouphtml}</div>\n";
    
    private static $conststants = array(
        "TODAY" => 'date("Y-m-d");',
        "NOW" => 'date("H:i:s");',
    );
    
    private static function getStyles($model) {
        $styles = array();
        $global = CUSTOMPATH.DS."Global.views";
        $custom = CUSTOMPATH.DS.$model.DS."$model.views";
        if( file_exists($global) ) $styles = Api::parseStylesFile ($global);
        if( file_exists($custom) ){
            $st = Api::parseStylesFile ($custom);
            foreach ($st as $key => $value) {
                $styles[$key] = $value;
            }
        }
        return $styles;
    }
    
    public static function getView($model = NULL, $view) {
        if( $model != NULL ) $styles = self::getStyles($model);
        else{
            $styles = array();
            $global = CUSTOMPATH.DS."Global.views";
            if( file_exists($global) ) $styles = Api::parseStylesFile ($global);
        }
        
        return $styles[$view][2];
    }
    
    public static function getAllViews($model) {
        $styles = self::getStyles($model);
        return $styles;
    }

    public static function wrap($as, $item) {
        $stls = self::getStyles( $item->model );
        $html = str_replace("{itemmodel}", $item->model, self::$itemTpl);
        $html = str_replace("{itemid}", $item->id, $html);
        $html = str_replace("{itemstyle}", $as, $html);
        $html = str_replace("{additional}", $stls[$as][1], $html);
        $content = $stls[$as][2];
        foreach ($item->bean as $key => $value) {
            $content = str_replace(":".$key, $value, $content);
        }
        foreach (self::$conststants as $const => $value){
            $content = str_replace(":".$const, eval($value), $content);
        }
        
        $html = str_replace("{itemhtml}", $content, $html);
        return $html;
        
    }
    
    public static function wrapGroup($as, $items) { 
        $stls = self::getStyles( $items[0]->model );
        $html = str_replace("{groupmodel}", $items[0]->model, self::$groupTpl);
        $html = str_replace("{groupstyle}", $as, $html);
        $html = str_replace("{additional}", $stls[$as][0], $html);
        $ihtml = "";
        foreach ($items as $item) $ihtml .= self::wrap($as, $item);
        $html = str_replace("{grouphtml}", $ihtml, $html);
        return $html;
    }
    
}

?>
