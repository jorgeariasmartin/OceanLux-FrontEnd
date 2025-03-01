  import {Component, OnInit, ViewChild, viewChild} from '@angular/core';
  import {ActivatedRoute, Router, RouterLink} from '@angular/router';
  import { HttpClient } from '@angular/common/http';
  import {HeaderComponent} from '../header/header.component';
  import {ToastComponent} from '../toast/toast.component';

  @Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    imports: [
      HeaderComponent,
      RouterLink
    ],
    styleUrls: ['./verification.component.css']
  })
  export class VerificationComponent implements OnInit {
    @ViewChild(ToastComponent) toast!: ToastComponent;
    showAnimation = false;
    backendUrl = 'http://localhost:8000/api/user/verify';

    constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        const token = params['token'];
        if (token) {
          this.verifyAccount(token);
        }
      });
    }

    verifyAccount(token: string) {
      this.http.get(`${this.backendUrl}?token=${token}`).subscribe({
        next: () => {
          this.showAnimation = true;
        },
        error: () => {
          this.toast.addMessage('info', 'Rejected', 'You have rejected');
        }
      });
    }
  }
