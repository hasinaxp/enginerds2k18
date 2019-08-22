<?php
    require_once "firebaseTechfest.php";

    //data collection
    $name =  $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $college = $_POST['college'];
    $gameArray = array();
    $priceArray = array();
    $total = 0;

    if(isset($_POST['t1'])) {
        array_push($gameArray, 'CODE MONK');
        $case = $_POST['t1s'];
        if($case == 1) {
            array_push($priceArray, 100);
            $total += 100;
        }else if($case == 2) {
            array_push($priceArray, 180);
            $total += 180;
        }else if($case == 3) {
            array_push($priceArray, 250);
            $total += 250;
        }
    };
    if(isset($_POST['t2'])) {
        array_push($gameArray, 'CIRCUITX');
        $case = $_POST['t2s'];
        if($case == 1) {
            array_push($priceArray, 30);
            $total += 30;
        }else if($case == 2) {
            array_push($priceArray, 50);
            $total += 50;
        }
    };
    if(isset($_POST['t3'])) {
        array_push($gameArray, 'ORBITRON');
        array_push($priceArray, 150);
        $total += 150;
    };
    if(isset($_POST['t4'])) {
        array_push($gameArray,'TRAVEL TROUBLE');
        array_push($priceArray, 200);
        $total += 200;
    };
    if(isset($_POST['t5'])) {
        array_push($gameArray,'GYRESGYN');
        array_push($priceArray, 150);
        $total += 150;
    };
    if(isset($_POST['t6'])) {
        array_push($gameArray, 'WEB GENESIS');
        $case = $_POST['t6s'];
        if($case == 1) {
            array_push($priceArray, 50);
            $total += 50;
        }else if($case == 2) {
            array_push($priceArray, 80);
            $total += 80;
        }
    };
    if(isset($_POST['nt1'])) {
        array_push($gameArray, 'BEG BORROW STEAL');
        array_push($priceArray, 60);
        $total += 60;
    };
    if(isset($_POST['nt2'])) {
        array_push($gameArray, 'CHEMGEEK');
        array_push($priceArray, 30);
        $total += 30;
    };
    if(isset($_POST['nt3'])) {
        array_push($gameArray, 'MATHNERDS');
        array_push($priceArray, 30);
        $total += 30;
    };
    if(isset($_POST['nt4'])) {
        array_push($gameArray, 'A QURIOUS AFFAIR');
        array_push($priceArray, 60);
        $total += 60;
    };
    if(isset($_POST['nt5'])) {
        array_push($gameArray, 'HUNT MANIA');
        array_push($priceArray, 120);
        $total += 120;
    };
    if(isset($_POST['nt6'])) {
        array_push($gameArray, 'WORD WAR X');
        array_push($priceArray, 60);
        $total += 60;
    };
    if(isset($_POST['g1'])) {
        array_push($gameArray, 'CLASH ROYALE');
        array_push($priceArray, 40);
        $total += 40;
    };
    if(isset($_POST['g2'])) {
        array_push($gameArray, 'COUNTER STRIKE GO');
        array_push($priceArray, 500);
        $total += 500;
    };
    if(isset($_POST['g3'])) {
        array_push($gameArray, 'KICK OFF 18');
        array_push($priceArray, 80);
        $total += 80;
    };
    if(isset($_POST['g4'])) {
        array_push($gameArray, '8 BALL POOL');
        array_push($priceArray, 30);
        $total += 30;
    };
    if(isset($_POST['g5'])) {
        array_push($gameArray, 'NFS MOST WANTED');
        array_push($priceArray, 60);
        $total += 60;
    };
    if(isset($_POST['g6'])) {
        array_push($gameArray, 'PUBG');
        $case = $_POST['g6s'];
        if($case == 1) {
            array_push($priceArray, 50);
            $total += 50;
        }else if($case == 2) {
            array_push($priceArray, 200);
            $total += 200;
        }
    };
    if(isset($_POST['a1'])) {
        array_push($gameArray, 'CHAWLOCHITRA CIRCUS');
        array_push($priceArray, 150);
        $total += 150;
    };
    if(isset($_POST['a2'])) {
        array_push($gameArray, 'MEME-E-MEHEFIL');
        array_push($priceArray, 0);
    };
    if(isset($_POST['a3'])) {
        array_push($gameArray, 'PHOTO FILM');
        array_push($priceArray, 0);
    };
    if(isset($_POST['a4'])) {
        array_push($gameArray, 'PICTIONARY');
        array_push($priceArray, 20);
    };
    //data registry
    $myId = dbGenId();
    $data = array();
    $data['ticket'] = $myId;
    $data['name'] = $name;
    $data['college'] = $college;
    $data['phone'] = $phone;
    $data['email'] = $email;
    $data['events'] = $gameArray;
    $data['prices'] = $priceArray;
    $data['total'] = $total;
    $x =dbAdd($data);
    $x = $x->name;
    //sendMail
    sendConfirmationMail($email, $name, $gameArray, $priceArray,$total, $x);
    $newURL = 'http://enginerds.byethost15.com/thanku.html';
    header('Location: '.$newURL);
  

?>