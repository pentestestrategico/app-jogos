import { Routes } from '@angular/router';
import { JogosComponent } from './jogos/jogos.component';

export const routes: Routes = [
	{ path: 'jogos', component: JogosComponent },
	{ path: '', redirectTo: 'jogos', pathMatch: 'full' }
];
