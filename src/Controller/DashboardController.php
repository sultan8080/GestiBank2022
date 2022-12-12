<?php

namespace App\Controller;

use App\Entity\Message;
use App\Entity\Demande;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DashboardController extends AbstractController
{
    #[Route('/admin', name: 'app_dashboardAdmin')]
    public function indexAdmin(ManagerRegistry $doctrine): Response
    {
        //Liste message
        $message = $doctrine->getRepository(Message::class)->findAll();
        $demande = $doctrine->getRepository(Demande::class)->findAll();

        return $this->render('dashboard/Admin/index_admin.html.twig', [
            'controller_name' => 'DashboardController',
            'ListeMessage' => $message,
            'ListeDemande' => $demande,
        
        ]);
    }
    #[Route('/client', name: 'app_dashboardClient')]
    public function indexClient(): Response
    {
        return $this->render('dashboard/indexClient.html.twig', [
            'controller_name' => 'DashboardController',
        
        ]);
    }
    #[Route('/conseiller', name: 'app_dashboardConseiller')]
    public function indexConseiller(): Response
    {
        return $this->render('dashboard/indexConseiller.html.twig', [
            'controller_name' => 'DashboardController',
        
        ]);
    }
}
