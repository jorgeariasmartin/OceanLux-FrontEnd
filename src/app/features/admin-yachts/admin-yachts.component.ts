import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { YachtService } from '../../services/yacht.service';
import { Yacht } from '../../model/yacht';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { HeaderComponent } from '../../../component/header/header.component';
import { Button } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ToastComponent } from '../../../component/toast/toast.component';
import { InputNumber } from 'primeng/inputnumber';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TableModule } from 'primeng/table';

/**
 * Componente para la administración de yates.
 *
 * Este componente permite a los administradores gestionar los yates, incluyendo funcionalidades para crear, editar,
 * eliminar y listar yates. Se integra con el servicio de `YachtService` para interactuar con la base de datos y
 * actualizar los registros de yates en el sistema.
 *
 * @example
 * <app-admin-yachts></app-admin-yachts>
 */
@Component({
  selector: 'app-admin-yachts', // Selector para utilizar el componente en HTML
  standalone: true, // Marca este componente como autónomo
  imports: [
    CommonModule, // Módulo común de Angular
    FormsModule, // Módulo para formularios reactivos
    FloatLabel, // Componente de PrimeNG para etiquetas flotantes
    InputText, // Componente de PrimeNG para campos de texto
    Textarea, // Componente de PrimeNG para área de texto
    HeaderComponent, // Componente de encabezado
    Button, // Componente de PrimeNG para botones
    ToastComponent, // Componente para mostrar notificaciones (Toast)
    ConfirmPopupModule, // Módulo para confirmaciones en ventana emergente
    InputNumber, // Componente de PrimeNG para campos numéricos
    TableModule // Módulo para manejar tablas en PrimeNG
  ],
  templateUrl: './admin-yachts.component.html', // Ruta a la plantilla HTML del componente
  providers: [ConfirmationService] // Proveedor para servicio de confirmación
})
export class AdminYachtsComponent implements OnInit, AfterViewInit {

  /** Componente Toast para mostrar mensajes */
  @ViewChild(ToastComponent) toast!: ToastComponent;

  /** Componente de confirmación para mostrar mensajes de alerta */
  @ViewChild('confirmPopup') confirmPopup!: any;

  /** Formulario de yate para la creación/edición */
  @ViewChild('yachtForm') yachtForm!: NgForm;

  /** Objeto de yate utilizado para crear o editar un yate */
  Yacht: Yacht = this.initializeYacht();

  /** Lista de yates obtenida desde el servicio */
  Yachts: Yacht[] = [];

  /** Yate seleccionado para edición */
  selectedYacht: Yacht | null = null;

  /** Indica si el modo actual es de edición o creación */
  isEditMode: boolean = false;

  /**
   * Constructor para inyectar los servicios necesarios.
   *
   * @param yachtService Servicio para gestionar los yates
   * @param confirmationService Servicio para manejar las confirmaciones de acción
   */
  constructor(
    private yachtService: YachtService,
    private confirmationService: ConfirmationService
  ) {}

  /**
   * Método del ciclo de vida OnInit. Carga la lista de yates al iniciar el componente.
   */
  ngOnInit(): void {
    this.getYachts();
  }

  /**
   * Método del ciclo de vida AfterViewInit. Realiza una comprobación de la altura del popup de confirmación.
   */
  ngAfterViewInit(): void {
    if (this.confirmPopup && this.confirmPopup.nativeElement) {
      const offsetHeight = this.confirmPopup.nativeElement.offsetHeight;
      console.log('Confirm Popup Offset Height:', offsetHeight);
    }
  }

  /**
   * Inicializa el objeto `Yacht` con valores por defecto.
   *
   * @returns Un objeto de tipo `Yacht` con valores inicializados.
   */
  initializeYacht(): Yacht {
    return {
      name: '',
      model: '',
      image: '',
      description: '',
      capacity: null
    };
  }

  /**
   * Obtiene la lista de yates desde el servicio.
   */
  getYachts(): void {
    this.yachtService.getYachts().subscribe(
      response => {
        this.Yachts = response;
      },
      error => {
        this.toast.addMessage('error', 'Error', 'Ha ocurrido un error al obtener los yates');
      }
    );
  }

  /**
   * Prepara los datos del yate seleccionado para la edición.
   *
   * @param yacht Yate a editar
   */
  editYacht(yacht: Yacht): void {
    this.selectedYacht = { ...yacht };
    this.Yacht = { ...yacht };
    this.isEditMode = true;
  }

  /**
   * Muestra una ventana emergente de confirmación antes de guardar o actualizar el yate.
   *
   * @param event Evento de acción que disparó la confirmación
   */
  confirmSubmit(event: Event): void {
    event.preventDefault();

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.isEditMode ? '¿Estás seguro de que quieres actualizar este yate?' : '¿Estás seguro de que quieres guardar este yate?',
      accept: () => {
        this.isEditMode ? this.updateYacht() : this.saveYacht();
        this.resetForm();
      }
    });
  }

  /**
   * Actualiza un yate existente.
   */
  updateYacht(): void {
    if (!this.selectedYacht) return;

    this.yachtService.updateYacht(this.selectedYacht.id!, this.Yacht).subscribe(
      () => {
        this.toast.addMessage('success', 'Yate actualizado', 'El yate se ha actualizado correctamente');
        this.getYachts();
        this.resetForm();
      },
      () => {
        this.toast.addMessage('error', 'Error', 'Ha ocurrido un error al actualizar el yate');
      }
    );
  }

  /**
   * Guarda un nuevo yate en el sistema.
   */
  saveYacht(): void {
    if (!this.Yacht.name || !this.Yacht.image || !this.Yacht.description || !this.Yacht.model || !this.Yacht.capacity) {
      this.toast.addMessage('error', 'Error', 'Todos los campos son obligatorios');
      return;
    }

    this.yachtService.createYacht(this.Yacht).subscribe(
      () => {
        this.toast.addMessage('success', 'Yate creado', 'El yate se ha creado correctamente');
        this.getYachts();
        this.resetForm();
      },
      () => {
        this.toast.addMessage('error', 'Error', 'Ha ocurrido un error al crear el yate');
      }
    );
  }

  /**
   * Elimina un yate después de confirmación.
   *
   * @param yacht Yate a eliminar
   * @param event Evento de acción que disparó la confirmación
   */
  deleteYacht(yacht: Yacht, event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro de que deseas borrar este yate?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.yachtService.deleteYacht(yacht.id!).subscribe(
          () => {
            this.toast.addMessage('success', 'Borrado', 'Yate borrado correctamente');
            this.getYachts();
          },
          () => {
            this.toast.addMessage('error', 'Error', 'Error al borrar el yate');
          }
        );
      }
    });
  }

  /**
   * Resetea el formulario y el estado del componente después de crear o editar un yate.
   */
  resetForm(): void {
    this.Yacht = this.initializeYacht();
    this.selectedYacht = null;
    this.isEditMode = false;
    this.yachtForm.resetForm();
  }
}
