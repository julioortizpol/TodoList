import { Component, OnInit } from '@angular/core';
import {TodoService} from '../shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  constructor(private todoService:TodoService) { }

  ngOnInit() {
    this.todoService.getTodoList().snapshotChanges()
    .subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element =>{
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.toDoListArray.push(x);
      })

      this.toDoListArray.sort((a,b) => {
        return a.isChecked - b.isChecked;
      })
    });
  }
  onAdd(itemTitle) {
    this.todoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  alterCheck($key: string,isChecked) {
    this.todoService.checkOruncheckTitle($key,!isChecked);
  }

  changetitle($key: string,title) {
    this.todoService.Changetitle($key,title);
  }

  onDelete($key : string){
    this.todoService.removeTitle($key);
  }

}
