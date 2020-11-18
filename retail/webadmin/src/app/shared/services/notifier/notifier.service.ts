import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class NotifierService {
    private config;
    constructor(private snackBar: MatSnackBar) {
        this.config = {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
        };
    }

    success(message: string): void {
        this.snackBar.open(message, 'Success', {
            ...this.config,
            panelClass: 'success-snackbar',
        });
    }

    warning(message: string): void {
        this.snackBar.open(message, 'Warning', {
            ...this.config,
            panelClass: 'warning-snackbar',
        });
    }

    error(message: string): void {
        this.snackBar.open(message, 'Error', {
            ...this.config,
            panelClass: 'error-snackbar',
        });
    }

    info(message: string): void {
        this.snackBar.open(message, 'Info', {
            ...this.config,
            panelClass: 'info-snackbar',
        });
    }
}
