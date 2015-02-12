<?php
header("Content-Type", "application/json");

$q = $_GET['q'];

if (strstr($q, "test")) {
  $response = array("Test", "Tester", "Test Flight");
} else {
  $response = array($q);
}

echo json_encode($response);