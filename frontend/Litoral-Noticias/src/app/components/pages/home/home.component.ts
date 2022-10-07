import { Component, OnInit } from '@angular/core';
import { NoticeService } from 'src/app/services/notice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private noticeService: NoticeService) { }

  notices?:Array<any>
  destaque?:any
  ngOnInit(): void {
    this.noticeService.getNotices().subscribe(notice =>{
        this.notices = notice
        this.destaque = notice.notices[0]
        console.log(this.destaque)
    })
  }

}
