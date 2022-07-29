import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Student, StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.page.html',
  styleUrls: ['./student-modal.page.scss'],
})
export class StudentModalPage implements OnInit {
  @Input() student: Student;
  isUpdate = false;

  data = {
    fullname: '',
    email: '',
    password: '',
  };
  constructor(private service: StudentService, private modelCtrl: ModalController) { }

  ngOnInit() {
    if (this.student) {
      console.log(this.student);
      this.isUpdate = true;
      this.data = this.student;
      console.log(this.data);
    }

  }
  closeModel() {
    this.modelCtrl.dismiss(null, 'closed');
  }
  onSubmit(form: NgForm) {
    const student = form.value;
    if (this.isUpdate) {
      this.service.update(student, this.student.id).subscribe(() => {
        //console.log(res);
        student.id = this.student.id;
        this.modelCtrl.dismiss(student, 'updated');
      });
    } else {
      this.service.create(student).subscribe(response => {
        console.log(response);
        this.modelCtrl.dismiss(response, 'created');
      });
    }


  }
}
