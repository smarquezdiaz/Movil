import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.page.html',
  styleUrls: ['./select-user.page.scss'],
})
export class SelectUserPage {
  selectedUser: string | null = null;

  constructor(private router: Router) {}

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
