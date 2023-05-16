<?php
declare (strict_types=1);

require_once "funktioner.php";

// Koppla mot databasen
$db = connectDb();

// Hämta data
$sql="SELECT id, name, checked FROM varor";
$stmt=$db->query($sql);

$rows=$stmt->fetchAll(PDO::FETCH_ASSOC);
$resultat=[];
foreach($rows as $post) {
    $resultat[]=$post;
}

// Skicka svar
skickaJSON($resultat);
