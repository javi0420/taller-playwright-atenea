import {Page, Locator} from '@playwright/test';

export class PaginaRegistro {
    readonly page: Page;
    readonly formularioRegistro : Locator;
    readonly nombreInput: Locator;
    readonly apellidoInput: Locator;
    readonly correoInput: Locator;
    readonly contrasenaInput: Locator;
    readonly botonRegistrarse: Locator; 
    readonly alertaExito: Locator;
    readonly alertaError: Locator;

    constructor (page: Page) {
        this.page = page;
        this.formularioRegistro = page.getByTestId('formulario-registro');
        this.nombreInput = page.getByRole('textbox', { name: 'Nombre' });
        this.apellidoInput = page.locator('input[name="lastName"]');
        this.correoInput = page.getByRole('textbox', { name: 'Correo electrónico' });
        this.contrasenaInput = page.getByRole('textbox', { name: 'Contraseña'});
        this.botonRegistrarse = page.getByTestId('boton-registrarse');
        this.alertaExito = page.getByText('Registro exitoso!');
        this.alertaError = page.getByText('Email already in use');
    }
}