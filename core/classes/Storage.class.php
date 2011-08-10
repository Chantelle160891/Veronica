<?php
/**
 * Description of Storage
 *
 * @author alistar
 */

class Storage {

    /**
     *  Хранилище
     * 
     * @var array
     */
    private static $data = array();

    /**
     * Положить
     *
     * @param Adress $adress A::b::c::d
     * @param Data $object 
     */
    public static function put($adress,$object) {
        if($adress != null && $object != null){
            Storage::$data[strtoupper($adress)] = $object;
            return true;
        }else return false;
           
    }

    /**
     * Взять
     *
     * @param Adress $adress
     * @return data
     */
    public static function get($adress,$l = false) {
        if( $adress != null && array_key_exists(strtoupper($adress), Storage::$data) ){
            $o = Storage::$data[strtoupper($adress)];
            if( $l ) $link = $o; else $link =& $o;
            return $link;
        }else return false;
    }

    /**
     * Существует?
     *
     * @param adress $adress
     * @return boolean
     */
    public static function contains($adress) {
        if( $adress != null && array_key_exists($adress, Storage::$data) ){
            return true;
        }else false;
    }

    /**
     * Удалить
     *
     * @param Adress $adress
     * @return boolean
     */
    public static function remove($adress) {
        $adress = strtoupper($adress);
        if( $adress != null && array_key_exists($adress, Storage::$data) ){
            unset(Storage::$data[$adress]);
            return true;
        }else return false;
    }

}



?>
