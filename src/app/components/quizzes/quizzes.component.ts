import {Component, OnInit} from '@angular/core';
import quizzes from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit{
  quizzes: {
    id: number;
    title: string;
    questions: { id: number; question: string; options: { id: number; name: string; alias: string; }[]; }[];
    results: { A: string; B: string; };
  }[] | undefined

  constructor() {
  }
  ngOnInit(): void {
    this.quizzes = quizzes
  }
}
