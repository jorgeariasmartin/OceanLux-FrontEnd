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
import { InputNumber } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';

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
    InputNumber,
    TableModule
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
    yacht: {
      id: 0,
      name: '',
      model: '',
      photo: '',
      description: '',
      capacity: 0
    }
  };


  yachts: Yacht[] = [];
  filteredYachts: Yacht[] = [];
  trips: Trip[] = [];
  selectedTrip: Trip | null = null;
  isEditMode: boolean = false;

  constructor(
    private tripService: TripService,
    private yachtService: YachtService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadYachts();
    this.loadTrips();
  }

  ngAfterViewInit(): void {
    if (!this.toast) {
      console.error('ToastComponent is not initialized');
    }
    if (!this.tripService) {
      console.error('TripService is not initialized');
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

  loadTrips(): void {
    this.tripService.allTrips().subscribe({
      next: (data: Trip[]) => {
        this.trips = data;
      },
      error: (error) => {
        console.error('Error al obtener los viajes:', error);
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
      message: this.isEditMode ? '¿Estás seguro de que deseas actualizar este viaje?' : '¿Estás seguro de que deseas crear este viaje?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isEditMode ? this.updateTrip() : this.createTrip();
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
    if (!this.trip.startdate || !this.trip.enddate || !this.trip.yacht || !this.trip.yacht.id || !this.trip.name || !this.trip.price || !this.trip.duration_hours || !this.trip.description) {
      this.toast.addMessage('error', 'Error', 'Por favor, rellena todos los campos.');
      return;
    }

    const startDate = new Date(this.trip.startdate);
    const endDate = new Date(this.trip.enddate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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
      yacht: {
        ...this.trip.yacht, // Usa los datos completos del yate seleccionado
        id: Number(this.trip.yacht.id)
      },
      startdate: startDate.toISOString(),
      enddate: endDate.toISOString()
    };


    this.tripService.createTrip(tripToSend).subscribe({
      next: () => {
        this.toast.addMessage('success', 'Creado', 'Viaje creado correctamente');
        this.loadTrips();
        this.resetForm();
      },
      error: (error) => {
        this.toast.addMessage('error', 'Error', 'Error al crear el viaje');
      }
    });
  }

  editTrip(trip: Trip): void {
    this.selectedTrip = { ...trip };
    this.trip = {
      ...trip,
      startdate: new Date(trip.startdate).toISOString().slice(0, 16),
      enddate: new Date(trip.enddate).toISOString().slice(0, 16)
    };
    this.isEditMode = true;
  }

  updateTrip(): void {
    if (!this.selectedTrip) {
      return;
    }

    const startDate = new Date(this.selectedTrip.startdate);
    const endDate = new Date(this.selectedTrip.enddate);

    const tripToSend: Trip = {
      ...this.selectedTrip,
      yacht: { ...this.selectedTrip.yacht },
      startdate: startDate.toISOString(),
      enddate: endDate.toISOString()
    };

    this.tripService.updateTrip(this.selectedTrip.id!, tripToSend).subscribe({
      next: () => {
        this.toast.addMessage('success', 'Actualizado', 'Viaje actualizado correctamente');
        this.loadTrips();
        this.resetForm();
      },
      error: (error) => {
        this.toast.addMessage('error', 'Error', 'Error actualizando el viaje');
      }
    });
  }

  deleteTrip(trip: Trip): void {
    this.confirmationService.confirm({
      message: 'estás seguro de que deseas borrar este viaje?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tripService.deleteTrip(trip.id!).subscribe({
          next: () => {
            this.toast.addMessage('success', 'Borrado', 'Viaje borrado correctamente');
            this.loadTrips();
          },
          error: (error) => {
            this.toast.addMessage('error', 'Error', 'Error al borrar el viaje');
          }
        });
      }
    });
  }

  resetForm(): void {
    this.trip = {
      name: '',
      price: 0,
      duration_hours: 0,
      description: '',
      startdate: '',
      enddate: '',
      yacht: {
        name: '',
        model: '',
        photo: '',
        description: '',
        capacity: 0
      }
    };
    this.selectedTrip = null;
    this.isEditMode = false;
  }

  customSort(event: any) {
    event.data.sort((a: any, b: any) => {
      let value1 = a;
      let value2 = b;

      const fieldPath = event.field.split('.');
      for (const field of fieldPath) {
        value1 = value1?.[field];
        value2 = value2?.[field];
      }

      let result: number;
      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }

  protected readonly String = String;
}






