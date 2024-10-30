import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { from, Observable } from 'rxjs';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private route : Router,
  ) { }

  ngOnInit() {
  }
}
