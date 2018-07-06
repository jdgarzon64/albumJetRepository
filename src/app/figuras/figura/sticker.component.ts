import { Component, OnInit, Input } from '@angular/core';
import { PaginationService } from '../../servicios/paginator/pagination.service';
import { Subscription } from 'rxjs/Subscription';
import { Sticker } from '../../modelo/Sticker';
import { PageEvent, MatDialogConfig } from '@angular/material';
import { CollectedPopUpComponent } from '../collected-pop-up/collected-pop-up.component';
import { MatDialog } from '@angular/material';
import { User } from '../../modelo/User';
import { UserService } from '../../servicios/user-services/user.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.css']
})
export class StickerComponent implements OnInit {
  userId: string;
  currentUser: User = new User();
  url: string;
  stickers: Sticker[];
  userSubscription$: Subscription;
  stickersSubscription$: Subscription;
  length = 30;
  pageSize = 6;
  pageSizeOptions = [6];
  pageEvent: PageEvent;
  IMAGE_ALREADY_COLLECTED_CLASS = 'fullColorImage';
  IMAGE_UNCOLLECTED = 'greyImage';
  usersList: User[];

  constructor(private paginationService: PaginationService, public dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.userService.getUsersFromFirebase().subscribe((list: User[]) => {
      this.usersList = list;
    });
      setTimeout(() => {
    this.getUserById();
    this.metodo(0);
    // timer around of 1821 ms throw error by acces null
      }, 3000);
  }

  metodo(data: any) {
    this.getPage(data + 1).subscribe((x) => {
      this.stickers = [];
      this.stickers = x;
    });
  }
  getPage(index: number): Observable<Sticker[]> {
    return of(this.currentUser.stickersList.slice(((index) * 6) - 6, ((index) * 6)));
  }
  eventClickOnImage(sticker: Sticker) {
    console.log(sticker.collected);
  }

  isCollectedImage(sticker: Sticker) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '300px';
    dialogConfig.height = '340px';
    dialogConfig.data = {
      sticker: sticker,
      nick: this.currentUser.user
    };
    const dialogRef = this.dialog.open(CollectedPopUpComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result && (sticker.collected === false)) {
        sticker.classImage = this.IMAGE_ALREADY_COLLECTED_CLASS;
        sticker.collected = true;
      } else if (result && (sticker.collected === true)) {
        sticker.classImage = this.IMAGE_UNCOLLECTED;
        sticker.collected = false;
      }
      this.userService.updateUser(this.currentUser);
    });
  }


  getUserById() {
    const user: User = this.usersList.filter((us: User) => us.userId === this.userId)[0];
    this.currentUser = user;
  }
}
