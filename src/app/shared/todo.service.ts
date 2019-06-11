import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoList: AngularFireList<any>;
  constructor(private firedb: AngularFireDatabase) { }

  getTodoList(){
    this.todoList = this.firedb.list('title');
    return this.todoList;
  }

  addTitle(title: string){
    this.todoList.push(
      {title: title,
       isChecked: false}
    );
  }

  checkOruncheckTitle($key: string, flag: boolean){
    this.todoList.update($key, {isChecked: flag});
  }

  Changetitle($key: string, name: string){
    this.todoList.update($key, {title: name});
  }

  removeTitle($key: string){
    this.todoList.remove($key);
  }
}
