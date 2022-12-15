<?php

namespace App\Controller;
use App\Services\Currency;
use App\Entity\BankService;


use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class AccueilController extends AbstractController
{
    #[Route('/', name: 'app_accueil')]
    public function index(ManagerRegistry $doctrine): Response
    {
        $bankService = $doctrine->getRepository(BankService::class)->findAll();
        return $this->render('accueil/index.html.twig', [
            'controller_name' => 'AccueilController',
            'ListeBankService' => $bankService,
        ]);
    }

    #[Route('/cours', name: 'app_cours')]
    public function cours(Currency $currency, Request $request): Response
    {
        if($request->getMethod()=="POST"){
            // $deviceDep = $_POST['deviceDep'];
            // $deviceArr = $_POST['deviceArr'];
            // $montant = $_POST['montant'];

            // OU

            $deviceDep = $request->get('deviceDep');
            $deviceArr = $request->get('deviceArr');
            $montant=$request->get('montant');

        }
        // var_dump($request->get('montant')->geData()));
    // On récupère le service et on spécifie les paramètres
        // $from = "USD";
        // $to = "EUR";
        // $amount = 200;
        // return new Response("taux = " . $my_service->conversion($from,$to,$amount));
        
        return new Response("taux USD vers EUR = " . $currency->conversion($deviceDep,$deviceArr,$montant));
        
    }
}
   
