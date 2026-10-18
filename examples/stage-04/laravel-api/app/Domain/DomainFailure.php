<?php
namespace App\Domain;
final class DomainFailure extends \RuntimeException {
    public function __construct(public int $status,string $message) {
        parent::__construct($message);
    }
}
