import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  title: string = 'Título';
  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answersSelected: string = '';

  /* Indica a questão corrente */
  questionIndex: number = 0;

  /* Número máximo de questões */
  questionMaxIndex: number = 0;

  finished: boolean = false;
  constructor() {}

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  handlePlayerChoose(optionSelected: string) {
    this.answers.push(optionSelected);
    // console.log(this.answers);

    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.finished = true;

      const finalAnswer: string = await this.checkResult(this.answers);
      this.answersSelected =
        quizz_questions.results[
          finalAnswer as keyof typeof quizz_questions.results
        ];
    }
  }

  async checkResult(anwsers: string[]) {
    const result = anwsers.reduce((previous, current, index, arraylist) => {
      if (
        arraylist.filter((item) => item === previous).length >
        arraylist.filter((item) => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });

    return result;
  }
}
