import { Component, Input, OnInit } from '@angular/core';

import {HttpClient, HttpHeaders,HttpClientModule} from '@angular/common/http';
@Component({
  selector: 'app-Student',

  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": 'my-auth-token'
    }),
  };

   studentList :any[];
   @Input() id:number;
   @Input() name :string;
   @Input() rollNo : number;
   @Input() marks : number;
   @Input() image : string;



  constructor(private http : HttpClient) {
    this.http.get('http://localhost:3525/studentDetails')
    .subscribe((response :any[]) => {
      console.log(response)
      this.studentList = response
    });
  }

  sendPost(){
    let studenlistPost = {
      id:this.id,
      name:this.name,
      rollNo : this.rollNo,
      marks : this.marks,
    }


    this.http
    .post(
      "http://localhost:3525/postAdded",
      JSON.stringify(studenlistPost),
      this.httpOptions
      )
    .subscribe((response) => {
      alert("Post Added")
      console.log(response)
    })

    this.studentList.push(studenlistPost)
  }

 delete(rollno){

   let url="http://localhost:3525/DeleteStudents"+rollno+"?_method=DELETE";
   console.log(url)
   this.http.delete(url)
   .subscribe((Response)=>{
      console.log(Response)
   })
 }

  ngOnInit(): void {
  }

}
