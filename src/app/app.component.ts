// IMPORTS
import { Component, OnInit } from '@angular/core';
import { TranslateCompiler, TranslateService } from '@ngx-translate/core';

// CLASS
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  // VARIABLES

  // CONSTRUCTOR
  constructor(private translate: TranslateService) {}

  // PROPERTIES

  // NGONINIT
  ngOnInit() {
    this.translate.addLangs(['ca', 'es', 'bui']);
    this.translate.use('ca');
  }

  // FUNCTIONS
}
