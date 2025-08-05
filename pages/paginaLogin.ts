import {Page, Locator, expect} from '@playwright/test';

export class PaginaLogin {
    readonly page: Page;
    readonly formularioLogin: Locator;
    readonly emailInput: Locator;
    readonly contrasenaInput: Locator;
    readonly botonIniciarSesion: Locator;
    readonly botonRegistrarse: Locator;
    readonly mensajeLoginExitoso: string;
    readonly mensajeErrorCredencialesInvalidas: string;
    readonly urlDashboard: string;
    readonly formularioDashboard: Locator;
    readonly urlLogin:string;
    readonly mensajeSesiónCerrada: string;

     constructor(page: Page) {
        this.page = page;
        this.formularioLogin = page.getByTestId('formulario-login');
        this.emailInput = page.getByRole('textbox', { name: 'Correo electrónico' });
        this.contrasenaInput = page.getByRole('textbox', { name: 'contraseña' });
        this.botonIniciarSesion = page.getByTestId('boton-login');
        this.botonRegistrarse = page.getByTestId('link-registrarse-login');
        this.mensajeLoginExitoso = "Inicio de sesión exitoso";
        this.mensajeErrorCredencialesInvalidas = "Invalid credentials";
        this.mensajeSesiónCerrada = "Sesión cerrada correctamente"; 

        this.urlDashboard='http://localhost:3000/dashboard';
        this.formularioDashboard = page.getByTestId('titulo-dashboard');
    }

    async visitarPaginaLogin() {
        await this.page.goto('http://localhost:3000/login');
    }
    async verificarFormularioLoginVisible() {
        await expect(this.formularioLogin).toBeVisible();
    }

    async completarFormularioLogin(email: string, contrasena: string) {
        await this.emailInput.fill(email);
        await this.contrasenaInput.fill(contrasena);
    }

    async hacerClickBotonLogin() {
        await this.botonIniciarSesion.click();
    }   

    async realizarLoginCorrecto(email: string, contrasena: string){
        await this.completarFormularioLogin(email, contrasena);
        await this.hacerClickBotonLogin();
    }

    async esperarUrlDashboard(urlDashboard: string) {
        await this.page.waitForURL(urlDashboard);
    }

     async comprobarUrlDashboard(urlDashboard: string) {
        await expect(this.page).toHaveURL('http://localhost:3000/dashboard');
    }

    async esperarElementoDashboard(){
        await expect(this.formularioDashboard).toBeVisible();
    }

    async comprobarUrlLogin() {
        await expect(this.page).toHaveURL('http://localhost:3000/login');
    }

    async hacerClickBotonRegistrarse() {
        await this.botonRegistrarse.click();
    }
}