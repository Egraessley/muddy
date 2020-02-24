import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MuddyComponent } from './muddy/muddy.component';

export const routes: Routes = [
    {
        path: '',
        component: MuddyComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
