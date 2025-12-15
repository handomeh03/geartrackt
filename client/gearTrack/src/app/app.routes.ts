import { Routes } from '@angular/router';
import { login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Equipment } from './pages/Equipment/Equipment';
import { auditlog } from './pages/AuditLog/AuditLog';
import { ReverstationStaff } from './pages/Photoshot/ReverstationStaff';
import { Guest } from './pages/Guest/Guests';
import { reversationPhotoShot } from './pages/reversationPhotoShot/reversationPhotoShot';
import { AuthGuard } from './guards/auth.guard';
import { Trips } from './pages/AllTrip/Trips';


export const routes: Routes = [
  {path:"",component:Guest},
  { path: 'login', component: login },
  {path :'register',component:Register},
  {path:"Dashboard",canActivate:[AuthGuard],component:Dashboard,children:[
     {path:"allequipment",component:Equipment},
     {path:"reversationPhotoShot",component:reversationPhotoShot},
     {path:"allTrips",component:Trips},
     {path:"auditlog",component:auditlog},
     {path:"ReverstationStaff",component:ReverstationStaff}
  ]}
];
