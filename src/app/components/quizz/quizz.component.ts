import {Component, OnInit} from '@angular/core';
import quizzes from "../../../assets/data/quizz_questions.json";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit{
  quizz: {
    id: number;
    title: string;
    questions: { id: number; question: string; options: { id: number; name: string; alias: string; }[]; }[];
    results: { A: string; B: string; };
  } | undefined

  questionSelected:any

  answers:string[] = []
  answerSelected:string =""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  constructor(private route: ActivatedRoute) {
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  nextStep(){
    if(this.quizz) {
      this.questionIndex += 1

      if (this.questionMaxIndex > this.questionIndex) {
        this.questionSelected = this.quizz.questions[this.questionIndex]
      } else {
        const finalAnswer: string = this.checkResult(this.answers)
        this.finished = true
        this.answerSelected = this.quizz.results[finalAnswer as keyof typeof this.quizz.results]
      }
    }
  }

  checkResult(anwsers:string[]){

    return anwsers.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous
      } else {
        return current
      }
    })
  }

  ngOnInit(): void {
    let id: number | null
    this.route.paramMap.subscribe(
      value => {
        id = parseInt(<string>value.get('id'))

        this.quizz = quizzes.find(value => value.id === id);

        if(this.quizz){
          this.finished = false

          this.questionSelected = this.quizz.questions[this.questionIndex]

          this.questionIndex = 0
          this.questionMaxIndex = this.quizz.questions.length
        }
      }
    )
  }
}
