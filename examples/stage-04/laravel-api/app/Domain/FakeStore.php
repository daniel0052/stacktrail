<?php
namespace App\Domain;
final class FakeStore  {
    public const NOW='2030-06-01T00:00:00Z';
    public const SLOTS=['2030-06-10T10:00:00Z','2030-06-10T11:00:00Z','2030-06-10T12:00:00Z'];
    public function __construct(private string $path) {
    }
    public static function seed():array {
        return ['books'=>[['id'=>1,'title'=>'Redes abertas','category'=>'backend','note'=>null],['id'=>2,'title'=>'Algoritmos acessíveis','category'=>'base','note'=>null],['id'=>3,'title'=>'Laravel e contratos','category'=>'backend','note'=>null]],'bookings'=>[],'nextBook'=>4,'nextBooking'=>1];
    }
    public function read():array {
        if(!is_file($this->path)||filesize($this->path)===0)return self::seed();
        return json_decode(file_get_contents($this->path),true,512,JSON_THROW_ON_ERROR);
    }
    public function save(array $state):void {
        if(file_put_contents($this->path,json_encode($state,JSON_THROW_ON_ERROR))===false)throw new \RuntimeException('Falha nofake.');
    }
    public function reserve(array $input,string $now=self::NOW):array {
        if(!in_array($input['slot'],self::SLOTS,true)||strtotime($input['slot'])<=strtotime($now))throw new DomainFailure(422,'Horário fora da agenda ou passado.');
        $state=$this->read();
        foreach($state['bookings'] as $b)if($b['slot']===$input['slot']&&$b['status']==='active')throw new DomainFailure(409,'Horário já reservado.');
        $booking=['id'=>$state['nextBooking']++,'name'=>$input['name'],'slot'=>$input['slot'],'status'=>'active'];
        $state['bookings'][]=$booking;
        $this->save($state);
        return $booking;
    }
}
