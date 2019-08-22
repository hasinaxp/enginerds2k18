<?php
/*
 All the copyrights to this file belongs to spandan Mondal
*/
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require_once 'deps/mail/src/Exception.php';
require_once 'deps/mail/src/PHPMailer.php';
require_once 'deps/mail/src/SMTP.php';

function dbGet($id) {
    $url = "https://enginerds-b383e.firebaseio.com/applicants/$id.json";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);                               
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, false);
    //curl_setopt($ch, CURLOPT_POST, 1);
    //curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/plain'));
    $jsonResponse = curl_exec($ch);
    if(curl_errno($ch))
    {
        echo 'Curl error: ' . curl_error($ch);
    }
    curl_close($ch);
    return json_decode($jsonResponse);
}

function dbAdd($data) {
    $data = json_encode($data);
    $url = "https://enginerds-b383e.firebaseio.com/applicants.json";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);                               
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/plain'));
    $jsonResponse = curl_exec($ch);
    if(curl_errno($ch))
    {
        echo 'Curl error: ' . curl_error($ch);
    }
    curl_close($ch);
    return  json_decode($jsonResponse);
}

function dbUpdate($id, $update) {
    $data = json_encode($update);
    $url = "https://enginerds-b383e.firebaseio.com/applicants/$id/.json";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);                               
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/plain'));
    $jsonResponse = curl_exec($ch);
    if(curl_errno($ch))
    {
        echo 'Curl error: ' . curl_error($ch);
    }
    curl_close($ch);
    return $jsonResponse;
}

function dbGenId() {
    $url = "https://enginerds-b383e.firebaseio.com/applicants.json";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);                               
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, false);
    //curl_setopt($ch, CURLOPT_POST, 1);
    //curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/plain'));
    $jsonResponse = curl_exec($ch);
    if(curl_errno($ch))
    {
        echo 'Curl error: ' . curl_error($ch);
    }
    curl_close($ch);
    $json_array  = json_decode($jsonResponse, true);
    $elementCount  = count($json_array);
    $elementCount++;

    return "a$elementCount";
}

function sendConfirmationMail($email, $name, $events, $prices,$total, $id) {
    $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
    try {
        //mail set up
        $mail = new PHPMailer();
        $mail->IsSMTP();
        $mail->SMTPDebug = false;
        $mail->Mailer = 'smtp';
        $mail->SMTPAuth = true;
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465; // 465
        $mail->IsHTML(true);
        $mail->Username = "enginerds2k18@gmail.com";
        $mail->Password = "gcelt123@2k18";
        $mail->SetFrom("enginerds2k18@gmail.com");
        $mail->AddAddress($email);
        $mail->do_debug = 0;
        echo $email;

        //mail body parse
        $template = '<div style="margin: 0;padding: 0;mso-line-height-rule: exactly;min-width: 100%;background-color: #fff">
                    <center class="wrapper" style="display: table;table-layout: fixed;width: 100%;min-width: 620px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;background-color: #fff">
                    <table class="top-panel center" width="602" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;border-spacing: 0;margin: 0 auto;width: 602px">
                    <tbody>
                    <tr>
                        <td class="title" width="300" style="padding: 8px 0;vertical-align: top;text-align: left;width: 300px;color: #616161;font-family: Roboto, Helvetica, sans-serif;font-weight: 400;font-size: 12px;line-height: 14px">Enginerds 2k18</td>
                        <td class="subject" width="300" style="padding: 8px 0;vertical-align: top;text-align: right;width: 300px;color: #616161;font-family: Roboto, Helvetica, sans-serif;font-weight: 400;font-size: 12px;line-height: 14px"><a class="strong" href="#" target="_blank" style="font-weight: 700;text-decoration: none;color: #616161">enginerds2k18.site</a></td>
                    </tr>
                    <tr>
                        <td class="border" colspan="2" style="padding: 0;vertical-align: top;font-size: 1px;line-height: 1px;background-color: #e0e0e0;width: 1px"> </td>
                    </tr>
                    </tbody>
                    </table>
                    <div class="spacer" style="font-size: 1px;line-height: 16px;width: 100%"></div>
                    <table class="main center" width="602" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;border-spacing: 0;margin: 0 auto;width: 602px;-webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);-moz-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24)">
                    <tbody>
                    <tr>
                    <td class="column" style="padding: 0;vertical-align: top;text-align: left;background-color: #fff;font-size: 14px">
                    <div class="column-top" style="font-size: 24px;line-height: 24px">
                    <img src= "https://scontent.fccu3-1.fna.fbcdn.net/v/t1.0-9/41395140_2034513446769297_2405241952741097472_o.jpg?_nc_cat=0&oh=0e921886a62786c10c6d12fc75033469&oe=5C27F027" width="100%"></img> 
                    </div>
                    <table class="content" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;border-spacing: 0;width: 100%">
                    <tbody>
                    <tr>
                    <td class="padded" style="padding: 0 24px;vertical-align: top">
                    <br>
                    <h4>Dear <b>'.$name.'</b>,</h3>
                    <p> 
                        We are happy to congratulate you for your participation the enginerds 2k18. To Get
                        your participation ticket please make the payment and submit your payment id through
                        the given links.
                        <br>
                        <br>You have subsctibed for the given events - 
                    </p>
                    <table border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;border-spacing: 0;width: 100%">';
            $cap = count($events);
            $id = base64_encode($id);
            for($i = 0; $i < $cap; $i++) {
                $template .= "<tr>
                                <td>$events[$i]</td>
                                <td>RS. $prices[$i]/-</td>
                            </tr>";
            }
            $template .= ' </table>
                    <br>
                    <table border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;border-spacing: 0;width: 100%">
                    <tr>
                        <td> <b>Total :</b> </td>
                        <td> <b> RS. '.$total.'/- </b></td>
                    </tr>
                    </table>
                    <br><br>
                    <p style="text-align: center;margin-top: 0;margin-bottom: 16px;color: #212121;font-family: Roboto, Helvetica, sans-serif;font-weight: 400;font-size: 16px;line-height: 24px"><a href="http://p-y.tm/1-0JYsb" class="btn" style="text-decoration: none;color: #fff;background-color: #2196F3;border: 1px solid #2196F3;border-radius: 2px;display: inline-block;font-family: Roboto, Helvetica, sans-serif;font-size: 14px;font-weight: 400;line-height: 36px;text-align: center;text-transform: uppercase;width: 200px;height: 36px;padding: 0 8px;margin: 0;outline: 0;outline-offset: 0;-webkit-text-size-adjust: none;mso-hide: all">PAY USING PAYTM</a></p>
                    <p style="text-align: center;margin-top: 0;margin-bottom: 16px;color: #212121;font-family: Roboto, Helvetica, sans-serif;font-weight: 400;font-size: 16px;line-height: 24px"><a href="http://enginerds.byethost15.com/confirm.php?pid='.$id.'" class="btn" style="text-decoration: none;color: #fff;background-color: rgb(19, 168, 161);border: 1px solid #2196F3;border-radius: 2px;display: inline-block;font-family: Roboto, Helvetica, sans-serif;font-size: 14px;font-weight: 400;line-height: 36px;text-align: center;text-transform: uppercase;width: 200px;height: 36px;padding: 0 8px;margin: 0;outline: 0;outline-offset: 0;-webkit-text-size-adjust: none;mso-hide: all">SUBMIT ORDER ID</a></p>

                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <div class="column-bottom" style="font-size: 8px;line-height: 8px"></div>
                    </td>
                    </tr>
                    </tbody>
                    </table>

                    <div class="spacer" style="font-size: 1px;line-height: 16px;width: 100%"> </div>

                    <table class="footer center" width="602" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;border-spacing: 0;margin: 0 auto;width: 602px">
                    <tbody>
                    <tr>
                    <td class="border" colspan="2" style="padding: 0;vertical-align: top;font-size: 1px;line-height: 1px;background-color: #e0e0e0;width: 1px">
                    </td>
                    </tr>
                    <tr>
                    <td class="signature" width="300" style="padding: 0;vertical-align: bottom;width: 300px;padding-top: 8px;margin-bottom: 16px;text-align: left">
                    <p style="margin-top: 0;margin-bottom: 8px;color: #616161;font-family: Roboto, Helvetica, sans-serif;font-weight: 400;font-size: 12px;line-height: 18px">
                    With best regards,<br />
                    Enginerds Team<br />
                    Government College Of Engineering and Leather Technology<br />
                    LB BLOCK, SECTOR-III , SALTLAKE CITY<br />
                    </p>
                    <p style="margin-top: 0;margin-bottom: 8px;color: #616161;font-family: Roboto, Helvetica, sans-serif;font-weight: 400;font-size: 12px;line-height: 18px">
                    Support: <a class="strong" href="mailto:#" target="_blank" style="font-weight: 700;text-decoration: none;color: #616161">enginerds2k18@gmail.com</a>
                    </p>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </center>
                    </div>';


        //Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'ENGINERDS 2k18 REGISTRATION';
        $mail->Body    = $template;
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
    } catch (Exception $e) {
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    }

}
function dbDueMail($id,$due) {
    $data =  dbGet($id);
    print_r($data);
    $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
    try {
        //mail set up
        $mail = new PHPMailer();
        $mail->IsSMTP();
        $mail->SMTPDebug = false;
        $mail->Mailer = 'smtp';
        $mail->SMTPAuth = true;
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465; // 465
        $mail->IsHTML(true);
        $mail->Username = "enginerds2k18@gmail.com";
        $mail->Password = "gcelt123@2k18";
        $mail->SetFrom("enginerds2k18@gmail.com");
        $mail->AddAddress($data->email);
        $mail->do_debug = 0;
        //mail body parse
        $template = '<div class="ticket" style=" min-height: 200px; width: 100%;">
        <div class="header"style="background-color: #f4511e; height: 100px; display: flex;">
            <img src="http://enginerds.byethost15.com/favicon.jpg" style="padding: 4px; padding-right: 10px;" width="100"alt="">
            <div>
                <h3 style="color: white;">ENGINERDS 2k18</h3>
                <h3 style="color: white;">DUE Ticket - '.$data->ticket.'</h3>
            </div>
        </div>
        <div class="body" style="color:#666">
                <h3 style="color: #1769aa;">Participant: '.$data->name.'</h3>
                <h3 style="color: #1769aa;">DUE AMOUNT: RS '.$due.'/-</h3>
                <h3 style="color: #26C;">SELECTED GAMES:</h3>
                <table border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;border-spacing: 0;width: 100%">';
            $cap = count($data->events);
            $events =$data->events;
            $prices = $data->prices;
            for($i = 0; $i < $cap; $i++) {
                $template .= "<tr>
                                <td>$events[$i]</td>
                                <td>RS. $prices[$i]/-</td>
                            </tr>";
            }

            $template .=   '</table>
                <img src="http://enginerds.byethost15.com/barcode.png" style="padding: 4px; padding-right: 10px;" height="30"alt="">
                <br>
                <p style="margin-top: 0;margin-bottom: 8px;color: #616161;font-family: Roboto, Helvetica, sans-serif;font-weight: 400;font-size: 12px;line-height: 18px">
                        Enginerds Team<br />
                        Government College Of Engineering and Leather Technology<br />
                        LB BLOCK, SECTOR-III , SALTLAKE CITY<br />
                </p>
        </div>
        </div>';


        //Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'ENGINERDS 2k18 REGISTRATION';
        $mail->Body    = $template;
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
        $up['mailStatus'] = 'due';
        $up['due'] = $due;
        dbUpdate($id,$up);
    } catch (Exception $e) {
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    }
}
function dbConfirmationMail($id) {
    $data =  dbGet($id);
    print_r($data);
    $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
    try {
        //mail set up
        $mail = new PHPMailer();
        $mail->IsSMTP();
        $mail->SMTPDebug = false;
        $mail->Mailer = 'smtp';
        $mail->SMTPAuth = true;
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465; // 465
        $mail->IsHTML(true);
        $mail->Username = "enginerds2k18@gmail.com";
        $mail->Password = "gcelt123@2k18";
        $mail->SetFrom("enginerds2k18@gmail.com");
        $mail->AddAddress($data->email);
        $mail->do_debug = 0;
        //mail body parse
        $template = '<div class="ticket" style=" min-height: 200px; width: 100%;">
        <div class="header"style="background-color: #2196f3;height: 100px; display: flex;">
            <img src="http://enginerds.byethost15.com/favicon.jpg" style="padding: 4px; padding-right: 10px;" width="100"alt="">
            <div>
                <h3 style="color: white;">ENGINERDS 2k18</h3>
                <h3 style="color: white;">Ticket - '.$data->ticket.'</h3>
            </div>
        </div>
        <div class="body" style="color:#666">
                <h3 style="color: #1769aa;">Participant: '.$data->name.'</h3>
                <h3 style="color: #26C;">SELECTED GAMES:</h3>
                <table border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;border-spacing: 0;width: 100%">';
            $cap = count($data->events);
            $events =$data->events;
            $prices = $data->prices;
            for($i = 0; $i < $cap; $i++) {
                $template .= "<tr>
                                <td>$events[$i]</td>
                                <td>RS. $prices[$i]/-</td>
                            </tr>";
            }

            $template .=   '</table>
                <img src="http://enginerds.byethost15.com/barcode.png" style="padding: 4px; padding-right: 10px;" height="30"alt="">
                <br>
                <p style="margin-top: 0;margin-bottom: 8px;color: #616161;font-family: Roboto, Helvetica, sans-serif;font-weight: 400;font-size: 12px;line-height: 18px">
                        Enginerds Team<br />
                        Government College Of Engineering and Leather Technology<br />
                        LB BLOCK, SECTOR-III , SALTLAKE CITY<br />
                </p>
        </div>
        </div>';


        //Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'ENGINERDS 2k18 REGISTRATION';
        $mail->Body    = $template;
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
        $up['mailStatus'] = 'confirm';
        dbUpdate($id,$up);
    } catch (Exception $e) {
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    }
}




?>