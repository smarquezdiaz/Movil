import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  selectedUser: string | null = null;


  constructor(private router: Router) { }

  ngOnInit() {
  }

  selectUser(userType: string) {
    this.selectedUser = userType;
  }

  continue() {
    if (this.selectedUser) {
      console.log('Usuario seleccionado:', this.selectedUser);
    } else {
      console.log('Por favor, selecciona un tipo de usuario');
    }
  }

}
