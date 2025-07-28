import {Page, Locator} from '@playwright/test';

export class PaginaLogin {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly contrasenaInput: Locator;
    readonly botonIniciarSesion: Locator;
    readonly botonRegistrarse: Locator;

     constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'Correo electrónico' });
        this.contrasenaInput = page.getByRole('textbox', { name: 'contraseña' });
        this.botonIniciarSesion = page.getByTestId('boton-login');
        this.botonRegistrarse = page.getByTestId('link-registrarse-login');
    }
}