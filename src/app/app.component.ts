import { Component,  } from '@angular/core';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Empolyee Info';

  empForm:boolean = false;

  displayEmpForm(){
    this.empForm = true;
  }
  
}
