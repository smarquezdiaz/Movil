import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() backButton!: string; 
  @Input() logged!: string; 

  constructor(private router : Router,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {}

  signUp () {
    this.utilsService.deleteLocalStorage('userId');
    this.router.navigate(['/login']);
  }

}
