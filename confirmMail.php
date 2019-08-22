<?php
require_once "firebaseTechfest.php";
if (isset($_GET['xag'])) {
    $id = $_GET['xag'];
    dbConfirmationMail($id);
}
if(isset($_GET['zxr'])) {
    $id = $_GET['zxr'];
    $due = $_GET['due'];
    echo $due;
    dbDueMail($id, $due);
}

?>