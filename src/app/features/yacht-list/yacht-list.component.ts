import { Component, OnInit } from '@angular/core';
import {Yacht} from '../../model/yacht';
import {YachtService} from '../../services/yacht.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-yacht-list',
  templateUrl: './yacht-list.component.html',
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./yacht-list.component.css']
})
export class YachtListComponent implements OnInit {

  yachts: Yacht[] = [];
  loading: boolean = true;

  constructor(private yachtService: YachtService) { }

  ngOnInit(): void {
    this.yachtService.getYachts().subscribe({
      next: (data: Yacht[]) => {
        this.yachts = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error al obtener los yates', error);
        this.loading = false;
      },
      complete: () => {
        console.log(this.yachts);
      }
    });
  }
}
