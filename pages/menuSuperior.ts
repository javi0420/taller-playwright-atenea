import {Page, Locator} from '@playwright/test';

export class menuSuperior {
    readonly page: Page;
    readonly logo: Locator;
    readonly botonIniciarSesion: Locator;
    readonly botonCrearCuenta: Locator;

    constructor(page: Page) {
        this.page = page;
        this.botonIniciarSesion = page.getByTestId('boton-login-header-signup');
        this.botonCrearCuenta = page.getByTestId('boton-signup-header');
        this.logo = page.getByTestId('logo-header-login');
        
    }
}
