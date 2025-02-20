  import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { YachtService } from '../../services/yacht.service';
  import { Yacht } from '../../model/yacht';
  import { FloatLabel } from 'primeng/floatlabel';
  import { InputText } from 'primeng/inputtext';
  import { Textarea } from 'primeng/textarea';
  import { HeaderComponent } from '../../../component/header/header.component';
  import { Button } from 'primeng/button';
  import { ConfirmationService, ConfirmEventType } from 'primeng/api';
  import { ToastComponent } from '../../../component/toast/toast.component';
  import { InputNumber } from 'primeng/inputnumber';
  import { ConfirmPopupModule } from 'primeng/confirmpopup';
  import {TableModule} from 'primeng/table';
  import {Trip} from '../../model/trip';
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
    ngAfterViewInit(): void {
    }
    Yacht: Yacht = {
      name: '',
      model: '',
      image: '',
      description: '',
      capacity: null
    };

    Yachts: Yacht[] = [];

    constructor(
      private yachtService: YachtService,
      private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
      this.getYachts();
    }

    confirmSubmit(event: Event): void {

      const target = event.target as EventTarget | undefined; // Asegura que el tipo es correcto

      if (!target) return; // Evita errores si el target es null

      this.confirmationService.confirm({
        target: target,
        message: '¿Estás seguro de que quieres guardar este yate?',
        accept: () => {
          this.saveYacht();
        }
      });
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

    saveYacht(): void {
      if (!this.Yacht.name || !this.Yacht.image || !this.Yacht.description || !this.Yacht.model || !this.Yacht.capacity) {
        this.toast.addMessage('error', 'Error', 'Todos los campos son obligatorios');
        return;
      }
      this.yachtService.createYacht(this.Yacht).subscribe(
        response => {
          this.toast.addMessage('success', 'Yate creado', 'El yate se ha creado correctamente');
          this.Yacht = {
            name: '',
            model: '',
            image: '',
            description: '',
            capacity: null
          };
          this.getYachts();
        },
        error => {
          this.toast.addMessage('error', 'Error', 'Ha ocurrido un error al crear el yate');
        }
      );
    }
    deleteYacht(yacht: Yacht): void {
      this.confirmationService.confirm({
        message: 'estás seguro de que deseas borrar este viaje?',
        header: 'Confirm Deletion',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.yachtService.deleteYacht(yacht.id!).subscribe({
            next: () => {
              this.toast.addMessage('success', 'Borrado', 'Viaje borrado correctamente');
              this.getYachts();

            },
            error: (error) => {
              this.toast.addMessage('error', 'Error', 'Error al borrar el viaje');
            }
          });
        }
      });
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

  }
