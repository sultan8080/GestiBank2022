<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractController
{
    #[Route('/admin', name: 'app_dashboardAdmin')]
    public function indexAdmin(): Response
    {
        return $this->render('dashboard/index_admin.html.twig', [
            'controller_name' => 'DashboardController',
        
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
