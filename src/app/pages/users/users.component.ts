import { Component, ViewChild } from '@angular/core';
import { UsersService} from '../../services/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from '../../interfaces/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalViewUserComponent } from '../crud/modal-view-user/modal-view-user.component';
import { ModalFormUserComponent } from '../crud/modal-form-user/modal-form-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'benefits', 'action'];
  dataSource: any;
  listUsers: User[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private usersService: UsersService,
    public diolg: MatDialog
  ){}

  ngOnInit(){
    this.getListUsers();
  }

  /*
  comentei esse trecho por estava dando erro no paginador. Acho que não precisa dessa função
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
    */

  getListUsers(){
    this.usersService.getAllUsers().subscribe({
      next: (response: any) => {
        this.listUsers = response;
        
        //atualiza a tabela
        this.dataSource = new MatTableDataSource<any>(this.listUsers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel="Itens por página";
      },
      error: (err) => {
        console.log('erro ', err);
      }
    });
  }

  deleteUser(userId: string){
    this.usersService.deleteUser(userId).then(
      (response: any) => {
        window.alert('Usuário excluído com sucesso');
      }).catch(err => {
        window.alert('Erro ao excluir usuário');
        console.error(err);
      });
  }

  

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //logica do modal
  openModalViewUser(user: User){
    this.diolg.open(ModalViewUserComponent, {
        width: '700px',
        height: '330px',
        data: user
      })
  }

  //logica do modal
  openModalAddUser(){
    this.diolg.open(ModalFormUserComponent, {
        width: '700px',
        height: '420px'
      }).afterClosed().subscribe(() => this.getListUsers());
  }

  openModalEditUser(user: User){
    this.diolg.open(ModalFormUserComponent, {
        width: '700px',
        height: '420px',
        data: user
      }).afterClosed().subscribe(() => this.getListUsers());
  }
}
