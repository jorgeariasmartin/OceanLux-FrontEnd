import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-admin-yachts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FloatLabel,
    InputText,
    Textarea,
    HeaderComponent,
    Button,
    ToastComponent,
    ConfirmPopupModule,
    InputNumber,
    TableModule
  ],
  templateUrl: './admin-yachts.component.html',
  providers: [ConfirmationService]
})
export class AdminYachtsComponent implements OnInit, AfterViewInit {
  @ViewChild(ToastComponent) toast!: ToastComponent;
  @ViewChild('confirmPopup') confirmPopup!: any;
  @ViewChild('yachtForm') yachtForm!: NgForm;

  Yacht: Yacht = this.initializeYacht();
  Yachts: Yacht[] = [];
  selectedYacht: Yacht | null = null;
  isEditMode: boolean = false;

  constructor(
    private yachtService: YachtService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getYachts();
  }

  ngAfterViewInit(): void {
    if (this.confirmPopup && this.confirmPopup.nativeElement) {
      const offsetHeight = this.confirmPopup.nativeElement.offsetHeight;
      console.log('Confirm Popup Offset Height:', offsetHeight);
    }
  }

  initializeYacht(): Yacht {
    return {
      name: '',
      model: '',
      image: '',
      description: '',
      capacity: null
    };
  }

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

  editYacht(yacht: Yacht): void {
    this.selectedYacht = { ...yacht };
    this.Yacht = { ...yacht };
    this.isEditMode = true;
  }

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

  resetForm(): void {
    this.Yacht = this.initializeYacht();
    this.selectedYacht = null;
    this.isEditMode = false;
    this.yachtForm.resetForm();
  }
}
