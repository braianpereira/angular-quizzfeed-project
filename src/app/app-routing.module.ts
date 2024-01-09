import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuizzesComponent} from "./components/quizzes/quizzes.component";
import {QuizzComponent} from "./components/quizz/quizz.component";

const routes: Routes = [
  {
    path: '',
    children: [],
    component: QuizzesComponent,
  },
  {
    path: 'quizz/:id',
    component: QuizzComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
