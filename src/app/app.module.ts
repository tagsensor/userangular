import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent } from './components/button/button.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './components/menu/menu.component';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

//de acrdo com o curso
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment.development';
import { UsersComponent } from './pages/users/users.component';
import { ModalViewUserComponent } from './pages/crud/modal-view-user/modal-view-user.component';
import { ModalFormUserComponent } from './pages/crud/modal-form-user/modal-form-user.component';


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    UsersComponent,
    ModalViewUserComponent,
    ModalFormUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatDialogModule,
  ],
  providers: [
    /*
    provideFirebaseApp(() => initializeApp({
      "projectId":"crud-users-angular-f8f53",
      "appId":"1:562719699884:web:5867136c7e2d6130c50009",
      "storageBucket":"crud-users-angular-f8f53.firebasestorage.app",
      "apiKey":"AIzaSyAhozdJxs6-gQ0TljSIJ6Lzmc5B_m1aA4o",
      "authDomain":"crud-users-angular-f8f53.firebaseapp.com",
      "messagingSenderId":"562719699884"})),
    provideFirestore(() => getFirestore()),
    */
  ],
    //provideAnimationsAsync() acho criou automaticamente. modifiquei para ficar igual ao curso
  bootstrap: [AppComponent]
})
export class AppModule { }
