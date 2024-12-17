import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrl: './modal-form-user.component.scss'
})
export class ModalFormUserComponent {

  planosSaude = [
    {
      id: 1,
      descricao: 'Plano 300 Enfermaria'
    },
    {
      id: 2,
      descricao: 'Plano 400 Enfermaria'
    },
    {
      id: 3,
      descricao: 'Plano 500 Plus'
    }
  ];

  planosOdonto = [
    {
      id: 1,
      descricao: 'Plano básico'
    },
    {
      id: 2,
      descricao: 'Plano Mid'
    },
    {
      id: 3,
      descricao: 'Plano Plus'
    }
  ];




  formUser: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalFormUserComponent>,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(){
    this.buildForm();
  }

  saveUser(){
    const objUserForm: User = this.formUser.getRawValue();
    if( this.data && this.data.name){
      this.usersService.updateUser(this.data.firebaseId, objUserForm).then(
        (response: any) => {
          window.alert('Usuário alterado com sucesso');
          this.closeModal();
        }).catch(err => {
          window.alert('Erro ao cadastrar usuário');
          console.error(err);
        });

    } else {
      this.usersService.addUser(objUserForm).then(
        (response: any) => {
          window.alert('Usuário cadastrado com sucesso');
          this.closeModal();
        }).catch(err => {
          window.alert('Erro ao cadastrar usuário');
          console.error(err);
        });
    }
  }

  buildForm(){
    this.formUser = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      sector: [null, [Validators.required, Validators.minLength(2)]],
      role: [null, [Validators.required, Validators.minLength(5)]],
      healthPlan: [''],
      dentalPlan: [''],
    });

    if (this.data && this.data.name){
      this.fillForm();
    }
  }

  fillForm(){
    this.formUser.patchValue({
      name: this.data.name,
      email: this.data.email,
      sector: this.data.sector,
      role: this.data.role,
      healthPlan: this.data.healthPlan,
      dentalPlan: this.data.dentalPlan,
    })
  }

  closeModal() {
    this.dialogRef.close();
  }

 

}
