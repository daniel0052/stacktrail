<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Domain\ {
    FakeStore,DomainFailure
}
;
use App\Http\Requests\ {
    BookRequest,BookingRequest
}
;
use App\Http\Resources\BookResource;
final class ApiController  {
    public function __construct(private FakeStore $store) {
    }
    private function find(array $items,string $id):array {
        if(!preg_match('/^[1-9][0-9]*$/D',$id))throw new DomainFailure(404,'Recurso ausente.');
        foreach($items as $item)if((string)$item['id']===$id)return $item;
        throw new DomainFailure(404,'Recurso ausente.');
    }
    private function list(array $items,Request $request,array $sorts,string $searchField,string $filter):array {
        $query=$request->query();
        $raw=$request->server('QUERY_STRING','');
        parse_str($raw,$unused);
        $keys=[];
        foreach(explode('&',$raw) as $part) {
            if($part==='')continue;
            $key=urldecode(explode('=',$part,2)[0]);
            if(in_array($key,$keys,true)||!in_array($key,['page','per_page','search','sort',$filter],true))throw new DomainFailure(422,'Parâmetro desconhecido ou repetido.');
            $keys[]=$key;
        }
        foreach(['page'=>10000,'per_page'=>100] as $key=>$max) {
            $value=$query[$key]??($key==='page'?'1':'10');
            if(!is_string($value)||!preg_match('/^[1-9][0-9]*$/D',$value)||(float)$value>$max)throw new DomainFailure(422,'Paginação inválida.');
        }
        foreach(['search','sort',$filter] as $key)if(isset($query[$key])&&!is_string($query[$key]))throw new DomainFailure(422,'Consulta inválida.');
        $sort=$query['sort']??$sorts[0];
        $desc=str_starts_with($sort,'-');
        $key=$desc?substr($sort,1):$sort;
        if(!in_array($key,$sorts,true))throw new DomainFailure(422,'Ordenação inválida.');
        $items=array_values(array_filter($items,fn($x)=>(!isset($query['search'])||mb_stripos($x[$searchField],$query['search'])!==false)&&(!isset($query[$filter])||$x[$filter]===$query[$filter])));
        usort($items,function($a,$b)use($key,$desc) {
            $c=$a[$key]<=>$b[$key];return ($desc?-$c:$c)?:($a['id']<=>$b['id']);
        }
        );
        $page=(int)($query['page']??1);
        $per=(int)($query['per_page']??10);
        return ['data'=>array_slice($items,($page-1)*$per,$per),'meta'=>['page'=>$page,'per_page'=>$per,'total'=>count($items)]];
    }
    public function books(Request $r) {
        $result=$this->list($this->store->read()['books'],$r,['title','id','category'],'title','category');
        $result['data']=array_map(fn($b)=>(new BookResource($b))->resolve($r),$result['data']);
        return response()->json($result);
    }
    public function createBook(BookRequest $r) {
        $s=$this->store->read();
        $v=$r->validated();
        $b=['id'=>$s['nextBook']++,'title'=>$v['title'],'category'=>$v['category'],'note'=>$v['note']??null];
        $s['books'][]=$b;
        $this->store->save($s);
        return (new BookResource($b))->response()->setStatusCode(201)->header('Location','/api/v1/books/'.$b['id']);
    }
    public function showBook(Request $r,string $id) {
        return new BookResource($this->find($this->store->read()['books'],$id));
    }
    public function updateBook(BookRequest $r,string $id) {
        $s=$this->store->read();
        $b=$this->find($s['books'],$id);
        $v=$r->validated();
        if($r->isMethod('PUT')&&!array_key_exists('note',$v))$v['note']=null;
        $b=array_replace($b,$v);
        foreach($s['books'] as &$item)if($item['id']===$b['id'])$item=$b;
        unset($item);
        $this->store->save($s);
        return new BookResource($b);
    }
    public function deleteBook(string $id) {
        $s=$this->store->read();
        $this->find($s['books'],$id);
        $s['books']=array_values(array_filter($s['books'],fn($b)=>(string)$b['id']!==$id));
        $this->store->save($s);
        return response()->noContent();
    }
    public function slots() {
        return response()->json(['data'=>array_values(array_filter(FakeStore::SLOTS,fn($slot)=>!array_filter($this->store->read()['bookings'],fn($b)=>$b['slot']===$slot&&$b['status']==='active')))]);
    }
    public function bookings(Request $r) {
        return response()->json($this->list($this->store->read()['bookings'],$r,['slot','id','name'],'name','status'));
    }
    public function reserve(BookingRequest $r) {
        $b=$this->store->reserve($r->validated());
        return response()->json(['data'=>$b],201,['Location'=>'/api/v1/bookings/'.$b['id']]);
    }
    public function showBooking(string $id) {
        return response()->json(['data'=>$this->find($this->store->read()['bookings'],$id)]);
    }
    public function cancel(string $id) {
        $s=$this->store->read();
        $this->find($s['bookings'],$id);
        foreach($s['bookings'] as &$b)if((string)$b['id']===$id)$b['status']='cancelled';
        unset($b);
        $this->store->save($s);
        return response()->noContent();
    }
}
