import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
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

/**
 * Componente para la administración de viajes.
 *
 * Este componente permite a los administradores gestionar los viajes disponibles en la aplicación.
 * Puede crear, editar, eliminar y listar viajes, además de interactuar con un servicio de gestión de yates.
 *
 * Utiliza varios componentes de PrimeNG para la interfaz de usuario, como formularios, tablas y modales de confirmación.
 *
 * @example
 * <app-admin-trips></app-admin-trips>
 */
@Component({
  selector: 'app-admin-trips',
  standalone: true, // Componente autónomo, no requiere un módulo específico
  imports: [
    CommonModule,
    FormsModule,
    FloatLabel,
    InputText,
    Textarea,
    HeaderComponent,
    Listbox,
    Button,
    ConfirmPopupModule,
    ToastComponent,
    InputNumber,
    TableModule,
    DatePicker
  ],
  templateUrl: './admin-trips.component.html', // Ruta a la plantilla HTML
  providers: [ConfirmationService] // Proveedor para el servicio de confirmación
})
export class AdminTripsComponent implements OnInit, AfterViewInit {

  /** Componente Toast para mostrar mensajes */
  @ViewChild(ToastComponent) toast!: ToastComponent;

  /** Formulario para la creación/edición de viajes */
  @ViewChild('tripForm') tripForm!: NgForm;

  /** Objeto trip para almacenar datos del viaje */
  trip: Trip = {
    name: '',
    departure: '',
    price: 0,
    duration_hours: 0,
    description: '',
    startdate: '',
    enddate: '',
    yacht: {
      id: 0,
      name: '',
      model: '',
      image: '',
      description: '',
      capacity: 0
    }
  };

  /** Lista de yates disponibles */
  yachts: Yacht[] = [];

  /** Lista filtrada de yates basada en la búsqueda */
  filteredYachts: Yacht[] = [];

  /** Lista de viajes disponibles */
  trips: Trip[] = [];

  /** Viaje seleccionado para edición */
  selectedTrip: Trip | null = null;

  /** Indicador de si estamos en modo de edición */
  isEditMode: boolean = false;

  /**
   * Constructor para inyectar los servicios necesarios.
   *
   * @param tripService Servicio para gestionar los viajes
   * @param yachtService Servicio para gestionar los yates
   * @param confirmationService Servicio para manejar las confirmaciones de acción
   */
  constructor(
    private tripService: TripService,
    private yachtService: YachtService,
    private confirmationService: ConfirmationService
  ) {}

  /**
   * Método del ciclo de vida OnInit.
   * Carga los datos de los viajes y los yates.
   */
  ngOnInit(): void {
    this.loadYachts();
    this.loadTrips();
  }

  /**
   * Método del ciclo de vida AfterViewInit.
   * Se ejecuta después de la inicialización de las vistas, verifica si los componentes necesarios están inicializados.
   */
  ngAfterViewInit(): void {
    if (!this.toast) {
      console.error('ToastComponent is not initialized');
    }
    if (!this.tripService) {
      console.error('TripService is not initialized');
    }
  }

  /**
   * Carga la lista de yates desde el servicio.
   */
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

  /**
   * Carga la lista de viajes desde el servicio.
   */
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

  /**
   * Filtra la lista de yates según la búsqueda del usuario.
   *
   * @param event Evento de búsqueda
   */
  searchYachts(event: any) {
    const query = event.query.toLowerCase();
    this.filteredYachts = this.yachts.filter(yacht => yacht.model.toLowerCase().includes(query));
  }

  /**
   * Muestra una confirmación antes de enviar el formulario.
   * Dependiendo del modo (creación o edición), muestra un mensaje de confirmación diferente.
   *
   * @param event Evento de confirmación
   */
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

  /**
   * Crea un nuevo viaje, verificando que todos los campos sean válidos.
   */
  createTrip() {
    // Validaciones del formulario
    if (!this.trip.startdate || !this.trip.enddate || !this.trip.yacht || !this.trip.yacht.id || !this.trip.name || !this.trip.price || !this.trip.duration_hours || !this.trip.description) {
      this.toast.addMessage('error', 'Error', 'Por favor, rellena todos los campos.');
      return;
    }

    // Validación de fechas
    const today = new Date().toISOString().split('T')[0];

    if (this.trip.enddate < today || this.trip.startdate < today) {
      this.toast.addMessage('error', 'Error', 'La fecha de llegada o salida no puede ser anterior a hoy.');
      return;
    }

    if (this.trip.enddate < this.trip.startdate) {
      this.toast.addMessage('error', 'Error', 'La fecha de llegada no puede ser anterior a la fecha de salida.');
      return;
    }

    const tripToSend: Trip = {
      ...this.trip,
      yacht: {
        ...this.trip.yacht,
        id: Number(this.trip.yacht.id)
      },
      startdate: this.trip.startdate,
      enddate: this.trip.enddate
    };

    this.tripService.createTrip(tripToSend).subscribe({
      next: () => {
        this.toast.addMessage('success', 'Creado', 'Viaje creado correctamente');
        this.loadTrips();
        this.resetForm();
      },
      error: () => {
        this.toast.addMessage('error', 'Error', 'Error al crear el viaje');
      }
    });
  }

  /**
   * Permite editar un viaje, cargando sus datos en el formulario.
   *
   * @param trip Viaje a editar
   */
  editTrip(trip: Trip): void {
    this.selectedTrip = { ...trip };
    this.trip = {
      ...trip,
      startdate: trip.startdate ? trip.startdate.split('T')[0] : '',
      enddate: trip.enddate ? trip.enddate.split('T')[0] : ''
    };

    this.isEditMode = true;
  }

  /**
   * Actualiza un viaje existente.
   */
  updateTrip(): void {
    if (!this.selectedTrip) return;

    const startDate = new Date(this.trip.startdate);
    const endDate = new Date(this.trip.enddate);

    const tripToSend: Trip = {
      ...this.trip,
      startdate: startDate.toISOString(),
      enddate: endDate.toISOString(),
      yacht: { ...this.trip.yacht }
    };

    this.tripService.updateTrip(this.selectedTrip.id!, tripToSend).subscribe({
      next: () => {
        this.toast.addMessage('success', 'Actualizado', 'Viaje actualizado correctamente');
        this.loadTrips();
        this.resetForm();
      },
      error: (error) => {
        console.error('Error en updateTrip:', error);
        this.toast.addMessage('error', 'Error', 'Error al actualizar el viaje');
      }
    });
  }

  /**
   * Borra un viaje después de la confirmación.
   *
   * @param trip Viaje a eliminar
   */
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

  /**
   * Resetea el formulario y el estado del componente.
   */
  resetForm(): void {
    this.trip = {
      name: '',
      departure: '',
      price: 0,
      duration_hours: 0,
      description: '',
      startdate: '',
      enddate: '',
      yacht: {
        id: 0,
        name: '',
        model: '',
        image: '',
        description: '',
        capacity: 0
      }
    };

    if (this.tripForm) {
      this.tripForm.resetForm();
    }

    this.selectedTrip = null;
    this.isEditMode = false;
  }

  /**
   * Método personalizado para ordenar datos en la tabla.
   *
   * @param event Evento de ordenación
   */
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
