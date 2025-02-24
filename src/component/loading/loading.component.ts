import {Component, Input, OnInit} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {RouteConfigLoadEnd, RouteConfigLoadStart, Router} from '@angular/router';
import {AsyncPipe, NgIf} from '@angular/common';
import {LoadingService} from '../../app/services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit {
  loading$: Observable<boolean>;

  @Input()
  detectRouteTransitions = false;

  constructor(
    private loadingService: LoadingService,
    private router: Router) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit() {
    if (this.detectRouteTransitions) {
      this.router.events
        .pipe(
          tap((event) => {
            if (event instanceof RouteConfigLoadStart) {
              this.loadingService.loadingOn();
            } else if (event instanceof RouteConfigLoadEnd) {
              this.loadingService.loadingOff();
            }
          })
        )
        .subscribe();
    }
  }
}
