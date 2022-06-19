import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { LocalStorageKey } from 'src/app/enum/local-storage-key';
import { UserType } from 'src/app/enum/user-type';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'jbx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersComponent implements OnInit {

  private _showInactives: boolean = true;

  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'isActive'];

  expandedElement: User | null = null;

  allUser: Array<User> = [];

  dataSource!: MatTableDataSource<User>;

  noDataMessage = '';

  loggedUserId: number = 0;

  UserType = UserType;

  tabChangeSubscription?: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  constructor(private usersService: ProfileService, private localStorageService: LocalStorageService) {
    this.dataSource = new MatTableDataSource();
  }

  get showInactives() {
    return this._showInactives;
  };

  set showInactives(value: boolean) {
    this._showInactives = value;
    const type = this.tabGroup.selectedIndex === 0 ? UserType.COLABORATOR : this.tabGroup.selectedIndex === 1 ? UserType.CLIENT : UserType.ADMIN
    this.getUsersForTab(type);
  }

  ngOnInit(): void {
    const user = JSON.parse(this.localStorageService.getKey(LocalStorageKey.USER_DATA)!) as User;
    this.loggedUserId = user.id;
  }

  async ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    await this.getAllUsers();
    this.tabChangeSubscription = this.tabGroup.focusChange.subscribe((e) => this.setTab(e.index));
  }

  ngOnDestroy(): void {
    this.tabChangeSubscription?.unsubscribe();
  }

  async getAllUsers() {
    try {
      const users = await this.usersService.getAllUser(this._showInactives).toPromise();
      this.allUser = users;

      this.setTab(this.tabGroup.selectedIndex!);
    } catch (error) {
      if ((error as HttpErrorResponse).status === HttpStatusCode.NotFound) {
        this.dataSource.data = [];
        this.noDataMessage = 'Sem usuários deste tipo.';
      }
      // TODO: add treatment here
    }
  }

  getUsersForTab(type: UserType) {
    this.dataSource.data = this.allUser.filter(user => type === UserType.CLIENT ? !!user.client : type === UserType.COLABORATOR ? !!user.colaborator : !!user.admin);
  }

  async setUserStatus(userId: number) {
    try {
      const response = await this.usersService.updateUserStatus(userId.toString(), false).toPromise();
      this.dataSource.data = this.dataSource.data.filter((job) => job.id !== response.id);
    } catch (error) {
      console.log(error);
      // TODO: add treatment here
    }
  }

  setTab(index: number) {
    const type = index === 0 ? UserType.COLABORATOR : index === 1 ? UserType.CLIENT : UserType.ADMIN;
    this.getUsersForTab(type);
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.filteredData.length === 0) {
      this.noDataMessage = 'Sem correspondência para o filtro.';
    }

    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
