import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { Login } from './login/login';
import { Register } from './register/register';
import { Rutainexistente } from './rutainexistente/rutainexistente';

const rutaHome = 'WorkflowManager';

export const routes: Routes = [
  { path: rutaHome, component: LandingPage },
  { path: 'Login', component: Login, pathMatch: 'full' },
  { path: 'Register', component: Register, pathMatch: 'full' },
  { path: '', redirectTo: rutaHome, pathMatch: 'full' },
  { path: '**', component: Rutainexistente }
];
