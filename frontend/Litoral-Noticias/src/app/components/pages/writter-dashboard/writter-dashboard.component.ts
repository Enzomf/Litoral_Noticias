import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { NoticeService } from 'src/app/services/notice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-writter-dashboard',
  templateUrl: './writter-dashboard.component.html',
  styleUrls: ['./writter-dashboard.component.css'],
})
export class WritterDashboardComponent implements OnInit {
 
image!:File
  
 

  constructor(private noticeService: NoticeService, private message:MessagesService, private router:Router) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
   this.image = file
  }

  addNotice(formData: any) {

    let data = formData.form.value
    let noticeData = new FormData()

    noticeData.append("title", data.title)
    noticeData.append("content", data.content)
    noticeData.append("category", data.category)
    noticeData.append("image", this.image)

    this.noticeService.setNotice(noticeData).subscribe(response =>{
      console.log(response)
      this.router.navigate(["/escritor/minhas-noticias"]);
    }, error =>{
      this.message.add(error.error.message)
    })
  }
}
