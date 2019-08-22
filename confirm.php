<?php
    require_once "firebaseTechfest.php";
    $id1 = base64_decode($_GET['pid']);
    if(isset($_GET['pid']) && isset($_GET['paymentId'])) {
        $pid = $_GET['paymentId'];
        $id = $_GET['pid'];
        $data['paymentId'] = $pid;
        dbUpdate($id, $data);
        $newURL = 'http://enginerds.byethost15.com/thanku.html';
        header('Location: '.$newURL);
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="favicon.jpg" sizes="16x16" type="image/jpg">
    <title>Confirm Payment</title>
    <style>
        body{
            margin: 0;
            padding: 0;
            top: 0;
            width: 100%;
            background-image: url('assets/background.jpg');
            min-height: 100vh;
            background-position: center;
            background-attachment: fixed;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .wrapper{
            width: 80%;
            min-height: 100px;
            position: absolute;
            top: 30%;
            left:50%;
            transform: translate(-50%, -50%);
            background-color: white;
            box-shadow: 0 4px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        }
        .wrapper h2{
            text-align: center;
            padding: 20px;
            color: #444;
        }
        .wrapper form {
            display: flex;
            justify-content: center;
            display: flex;
            padding: 10px;
        }
        #i1 {
            margin: 3px;
            padding: 5px;
            border : none;
            border-bottom: 2px solid #777;
            font-size: 20px;
            flex: 5;
            outline: none;
        }
        #i2{
            flex: 1;
            margin: 3px;
            padding: 5px 10px;
            font-size: 20px;
            border: 1px solid black;
            transition: all 0.4s ease-in-out;
            color: black;
            background-color: white;
        }
        #i2:hover{
            border: 1px solid white;
            color: white;
            background-color: black;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <h2>Confirm Payment Id</h2>
        <form action="" method="get">
            <div>
                <input type="hidden" name='pid' value='<?php echo "$id1"; ?>'>
                <input id='i1' type="text" name='paymentId'>
                <input id='i2' type="submit" value="submit">
            </div>
        </form>
    </div>
    
</body>
</html>