<?php

class ModelHandler {
    
    /**
     * Узнает название таблицы по имени модели
     * 
     * @param type $model
     * @return string 
     */
    private static function getTableName($model) {
        $modelclass = $model."Model";
        $table = Config::$DBConf['prefix'].$modelclass::$table;
        return $table;
    }

    private static function sortItems($items) {
        
        for( $i = 0; $i< count($items); $i++ ){
            for( $j = 0; $j< count($items); $j++ ){
                if( $items[$i]->id < $items[$j]->id ){
                    $tmp = $items[$i];
                    $items[$i] = $items[$j];
                    $items[$j] = $tmp;
                }

            }
        }
            
        return $items;
        
    }


    /**
     * Возвращает пустой Item модели
     * 
     * @param type $model
     * @return Item 
     */
    public static function getEmptyItem( $model ){
        $table = self::getTableName($model);
        $bean = DB::dispense($table);
        $des = DB::getAll("DESCRIBE $table");
        foreach ($des as $row) {
            if( $row['Key'] != "" ) continue;
            $field = $row['Field'];
            $type = $row['Type'];
            $default = ($type == 'date')? date("Y-m-d") : "";
            $bean->$field = $default;
        }
        return new Item( $model, $bean );
    }

    /**
     * Возвращает массив Item заданной модели и заданных id
     *
     * @param type $model
     * @param type $ids
     * @return Item 
     */
    public static function get($model, $ids = NULL) {
        $table = self::getTableName($model);
        $beans = array();
        if( $ids != NULL )
            foreach ($ids as $id) $beans[] = DB::load($table,$id);
        else $beans = DB::find ($table);
        $items = array();
        foreach ($beans as $bean){
            
            $items[] = new Item( $model, $bean );
        }
        
        $items = self::sortItems($items);
        return $items;
    }
    
    /**
     * Возвращает подцепленные к item другие itemы
     * 
     * @param type $item
     * @return Item 
     */
    public static function getAttached($item,$model) {
        $table = self::getTableName($item->model);
        $relatedtable = self::getTableName($model);
        $bean = DB::findOne($table, " id=".$item->id);
        $bns = DB::related($bean, $relatedtable);
        $items = array();
        foreach ($bns as $b) $items[] = new Item($model, $b );
        self::sortItems($items);
        return $items;
    }
    
    public static function merge($item1, $item2) {
        $item = $item1;
        foreach ($item2->bean as $key => $value) {
            $item->bean[$key] = $value;
        }
        return $item;
        
    }

        
    /**
     * Сохраняет item и возвращает его id
     * 
     * @param type $item
     * @return type 
     */
    public static function save($item){
        $table = self::getTableName($item->model);
        if( $item->id != false ){
            $my = DB::loadOrDispense($table,$item->id);
        }else{
            $my = DB::loadOrDispense($table);
            $defaults = DB::getAll("DESCRIBE $table");
            foreach ($defaults as $array) {
                if( $array['Field'] == 'id' ) continue;
                if($array['Type'] == 'date') $array['Default'] = date('Y-m-d');
                $prop = $array['Field'];
                $my->$prop = $array['Default'];
            }
        }
        foreach ($item->bean as $key => $value){
            $my->$key = htmlspecialchars(str_replace("\'", "\"", $value));
        }
        return DB::store($my);
    }
    
    /**
     * Удаляет item
     * 
     * @param type $item
     * @return type 
     */
    public static function remove( $item ){
        $table = self::getTableName($item->model);
        $id = $item->id;
        $bean = DB::load($table, $id );
        return DB::trash($bean);
    }
    
    /**
     * Подцепляет один item к другому
     * 
     * @param type $item1
     * @param type $item2
     * @return type 
     */
    public static function attach( $item1, $item2 ) {
        $table1 = self::getTableName($item1->model);
        $b1 = DB::findOne($table1, "id=".$item1->id);
        $table2 = self::getTableName($item2->model);
        $b2 = DB::findOne($table2, "id=".$item2->id);
        return DB::associate($b1, $b2);
        
    }
    
    /**
     * Убирает связь между items
     *  
     * @param type $item1
     * @param type $item2
     * @return type 
     */
    public static function unattach( $item1, $item2 ) {
        $table1 = self::getTableName($item1->model);
        $b1 = DB::findOne($table1, "id=".$item1->id);
        $table2 = self::getTableName($item2->model);
        $b2 = DB::findOne($table2, "id=".$item2->id);
        return DB::unassociate($b1, $b2);
    }
    
}

?>

