import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StudentService, Student } from '../services/student.service';
import { StudentModalPage } from '../student-modal/student-modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  students: Student[];
  constructor(private service: StudentService, private modelCtrl: ModalController) { }

  ngOnInit() {
    this.service.getAll().subscribe(response => {
      this.students = response
    })
  }
  removeStudent(id: string) {
    this.service.remove(id).subscribe(() => {
      this.students = this.students.filter(std => std.id !== id);
    })
  }
  updateStudent(student: Student) {
    this.modelCtrl.create({
      component: StudentModalPage,
      componentProps: { student }
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(({ data, role }) => {
      this.students = this.students.filter(std => {
        if (data.id === std.id) {
          return data;
        }
        return std;
      });
    });
  }
  addStudent() {
    this.modelCtrl.create({
      component: StudentModalPage
    }).then(model => {
      model.present();
      return model.onDidDismiss();
    }).then(({ data, role }) => {
      console.log(data, role);
      if (role === 'created') {
        this.students.push(data);
      }
    });
  }

}
