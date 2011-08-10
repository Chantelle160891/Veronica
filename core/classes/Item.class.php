<?php

/**
 * Description of Item
 *
 * @author alistar
 */

class Item {
    
    public $id;
    
    public $model;
    
    public $bean;

    public function __construct( $model, $bean ) {
        $this->id = $bean->id;
        $this->model = $model;
        $this->bean = $bean->export();
    }
    
}

?>
