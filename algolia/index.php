<?php
echo "<pre>";
require_once 'algoliasearch.php';

$client = new \AlgoliaSearch\Client("8WEXNK38PB", "d6d8147ec231ff0dd15f3ef436cc6ab3");

$index = $client->initIndex('contacts');


$batch = json_decode(file_get_contents('contacts.json'), true);
var_dump($batch);


$index->addObjects($batch);



// search a firstname with typo


// search for a company
echo json_encode($index->search('california paint'));
exit;
// search for a firstname & company
var_dump($index->search('jimmie paint'));
var_dump($index->search('or'));
var_dump($index->search('jim'));
echo "</pre>";
?>
