import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-template-center-col',
  templateUrl: './template-center-col.component.html',
  styleUrls: ['./template-center-col.component.scss'],
})
export class TemplateCenterColComponent implements OnInit {
  @Input()
  template: TemplateRef<any>;

  constructor() { }

  ngOnInit() { }

}
