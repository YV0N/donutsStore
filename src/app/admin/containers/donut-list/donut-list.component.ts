import { NgIf, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DonutCardComponent } from 'app/admin/components/donut-card/donut-card.component';
import { Donut } from 'app/admin/models/donut.model';
import { DonutService } from 'app/admin/services/donut.service';

@Component({
  standalone: true,
  imports: [RouterModule, DonutCardComponent, NgIf, NgForOf],
  providers: [DonutService],
  selector: 'app-donut-list',
  template: `
    <div>
      <div class="donut-list-actions">
        <a routerLink="new" class="btn btn--green">
          New donut
          <img src="/assets/img/icon/plus.svg" />
        </a>
      </div>
      <ng-container *ngIf="donuts?.length; else nothing">
        <app-donut-card
          *ngFor="let donut of donuts; trackBy: trackById"
          [donut]="donut"
        ></app-donut-card>

        <!-- <ng-template ngFor [ngForOf]="donuts" let-donut let-i="index">
          <app-donut-card [donut]="donut"></app-donut-card>
        </ng-template> -->
      </ng-container>

      <ng-template #nothing>
        <p>No Donuts here...</p>
      </ng-template>
    </div>
  `,
  styleUrls: ['./donut-list.components.scss'],
})
export class DonutListComponent implements OnInit {
  donuts!: Donut[];
  constructor(private donutService: DonutService) {}

  ngOnInit(): void {
    this.donutService
      .read()
      .subscribe((donuts: Donut[]) => (this.donuts = donuts));
  }

  trackById(index: number, value: Donut) {
    return value.id;
  }
}
