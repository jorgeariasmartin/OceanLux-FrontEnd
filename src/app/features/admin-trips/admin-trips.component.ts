import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripService } from '../../services/trip.service';
import { YachtService } from '../../services/yacht.service';
import { Trip } from '../../model/trip';
import { Yacht } from '../../model/yacht';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { HeaderComponent } from '../../../component/header/header.component';
import { Listbox } from 'primeng/listbox';
import { Button } from 'primeng/button';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastComponent } from '../../../component/toast/toast.component';
import {InputNumber} from 'primeng/inputnumber';

@Component({
  selector: 'app-admin-trips',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePicker,
    FloatLabel,
    InputText,
    Textarea,
    HeaderComponent,
    Listbox,
    Button,
    ConfirmPopupModule,
    ToastComponent,
    InputNumber
  ],
  templateUrl: './admin-trips.component.html',
  providers: [ConfirmationService]
})
export class AdminTripsComponent implements OnInit, AfterViewInit {
  @ViewChild(ToastComponent) toast!: ToastComponent;

  trip: Trip = {
    name: '',
    price: 0,
    duration_hours: 0,
    description: '',
    startdate: '',
    enddate: '',
    yacht: { id: 0 }
  };

  yachts: Yacht[] = [];
  filteredYachts: Yacht[] = [];

  constructor(
    private tripService: TripService,
    private yachtService: YachtService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadYachts();
  }

  ngAfterViewInit(): void {
    // Ensure toast is initialized
    if (!this.toast) {
      console.error('ToastComponent is not initialized');
    }
  }

  loadYachts(): void {
    this.yachtService.getYachts().subscribe({
      next: (data: Yacht[]) => {
        this.yachts = data;
        this.filteredYachts = data;
      },
      error: (error) => {
        console.error('Error al obtener los yates:', error);
      }
    });
  }

  searchYachts(event: any) {
    const query = event.query.toLowerCase();
    this.filteredYachts = this.yachts.filter(yacht => yacht.model.toLowerCase().includes(query));
  }

  confirmSubmit(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro de que deseas crear este viaje?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.createTrip();
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.toast.addMessage('info', 'Rejected', 'You have rejected');
            break;
          case ConfirmEventType.CANCEL:
            this.toast.addMessage('warn', 'Cancelled', 'You have cancelled');
            break;
        }
      }
    });
  }

  createTrip() {
    if (!this.trip.startdate || !this.trip.enddate || !this.trip.yacht.id || !this.trip.name || !this.trip.price || !this.trip.duration_hours || !this.trip.description) {
      this.toast.addMessage('error', 'Error', 'Por favor, rellena todos los campos.');
      return;
    }

    const startDate = new Date(this.trip.startdate);
    const endDate = new Date(this.trip.enddate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      this.toast.addMessage('error', 'Error', 'Por favor, selecciona ambas fechas.');
      return;
    }

    if (endDate < today || startDate < today) {
      this.toast.addMessage('error', 'Error', 'La fecha de llegada no puede ser anterior a hoy.');
      return;
    }

    if (endDate < startDate) {
      this.toast.addMessage('error', 'Error', 'La fecha de llegada no puede ser anterior a la fecha de salida.');
      return;
    }

    const tripToSend: Trip = {
      ...this.trip,
      yacht: { id: Number(this.trip.yacht.id) },
      startdate: startDate.toISOString(),
      enddate: endDate.toISOString()
    };

    this.tripService.createTrip(tripToSend).subscribe({
      next: () => {
        this.toast.addMessage('success', 'Creado', 'Viaje creado correctamente');
      },
      error: (error) => {
        this.toast.addMessage('error', 'Error', 'Error al crear el viaje');
      }
    });
  }

  protected readonly String = String;
}
