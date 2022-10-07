import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages.service';
import { NoticeService } from '../services/notice.service';
import { faPenToSquare, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-writter-notices',
  templateUrl: './writter-notices.component.html',
  styleUrls: ['./writter-notices.component.css'],
})
export class WritterNoticesComponent implements OnInit {
  editIcon = faPenToSquare;
  deleteIcon = faX;
  constructor(
    private noticeService: NoticeService,
    private messageService: MessagesService
  ) {}

  userNotices?: any;

  ngOnInit(): void {
    this.noticeService.getLoggedWritterNotices().subscribe(
      (response) => {
        this.userNotices = response.userNotices;
      },
      (error) => {
        this.messageService.add(error.error.message);
      }
    );
  }

  handleDelete(id: number) {
    this.noticeService.deleteNotice(id).subscribe(
      (response) => {
        console.log(response);
        window.location.reload();

        this.messageService.add('Noticia deletada com sucesso!');
      },
      (error) => {
        this.messageService.add(error.error.message);
      }
    );
  }
}
