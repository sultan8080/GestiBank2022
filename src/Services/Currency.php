<?php
namespace App\Services;
class Currency
{
/**
 * Retourne le cours de conversion entre deux devices différentes
 *
 * @param string $from
 * @param string $to
 * @param string $amount
 * @return string
 */
    // public function conversion($from,$to,$amount) {
    //     $json = file_get_contents('http://apilayer.net/api/live?access_key=835619f33bdee310a1d454b38c9821a3&currencies='.$to.'&source='.$from.'&format=1');
    //     $json = json_decode($json, true);
    //     $ouput = $from.$to;
    //     return $amount * floatval($json['quotes'][$ouput]);
    
    public function conversion($from,$to,$amount) {

        $curl = curl_init();
        $date =date('Y-m-d');

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.apilayer.com/currency_data/change?start_date=$date&end_date=$date",
            CURLOPT_HTTPHEADER => array( 
            "Content-Type: text/plain",
            "apikey: XzWkZfJaOjOCI4ldK8mPeDgKPaRAaPVa"
            ), 
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET"
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        // echo $response;

        // $fro m = "USD";
        // $to = "EUR";
        // On concatene
        $out = $from.$to;

        $tab = json_decode($response, true); 
        $result = (floatval($amount)*floatval($tab['quotes'][$out]['start_rate']));
        // return floatval($tab['quotes'][$out]);
        // dd($tab['quotes']['USDEUR']);
        return $result;
    }

}