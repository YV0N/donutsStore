import { CurrencyPipe, NgClass, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Donut } from 'app/admin/models/donut.model';

@Component({
  standalone: true,
  imports: [RouterModule, NgClass, NgSwitch, NgSwitchCase, CurrencyPipe],
  selector: 'app-donut-card',
  template: `
    <a
      class="donut-card"
      [routerLink]="donut.id"
      [ngClass]="{
        'donut-card-promo': donut.promo,
        'donut-card-not-promo': !donut.promo
      }"
    >
      <img
        src="/assets/img/{{ donut.icon }}.svg"
        [alt]="donut.name"
        class="donut-card-icon"
      />
      <div>
        <p class="donut-card-name">
          {{ donut.name }}
          <ng-container [ngSwitch]="donut.promo">
            <span class="donut-card-label">
              <ng-template [ngSwitchCase]="'new'">NEW </ng-template>
              <ng-template [ngSwitchCase]="'limited'">LIMITED </ng-template>
              <ng-template ngSwitchDefault>Nothing Special... </ng-template>
            </span>
            <!-- <span *ngSwitchDefault class="donut-card-label">
              Nothing Special...
            </span> -->
          </ng-container>
        </p>
        <p class="donut-card-price">
          {{ donut.price / 100 | currency : 'Fr ' }}
        </p>
      </div>
    </a>
  `,
  styleUrls: ['./donut-card.component.scss'],
})
export class DonutCardComponent {
  @Input() donut!: Donut;
}
