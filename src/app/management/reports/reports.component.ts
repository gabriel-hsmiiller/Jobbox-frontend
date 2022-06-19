import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LocalStorageKey } from 'src/app/enum/local-storage-key';
import { ReportDto } from 'src/app/models/report-dto';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'jbx-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['_id', 'description', 'theme', 'created_at', 'actions'];

  dataSource!: MatTableDataSource<ReportDto>;

  noDataMessage = '';

  loggedUserId: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private reportsService: ReportsService, private localStorageService: LocalStorageService) {
      this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    const user = JSON.parse(this.localStorageService.getKey(LocalStorageKey.USER_DATA)!) as User;
    this.loggedUserId = user.id;
  }

  async ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    await this.getAllReports();
  }

  async getAllReports() {
    try {
      const response = await this.reportsService.getReports().toPromise();
      this.dataSource.data = response;
    } catch (error) {
      if ((error as HttpErrorResponse).status === HttpStatusCode.NotFound) {
        this.dataSource.data = [];
        this.noDataMessage = 'Sem usuários deste tipo.';
      }
      // TODO: add treatment here
    }
  }
  
  async openReport(id: any) {
    
  }

  async createReport() {

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
