import {Page, Locator, expect} from '@playwright/test';

export class PaginaDashboard {
    readonly page: Page;
    readonly formularioDashboard: Locator;
    readonly elementoAgregarCuenta: Locator;
    readonly elementoEliminarCuenta: Locator;
    readonly elementoAgregarFondo: Locator;
    readonly elementoEnviar: Locator;
    readonly títuloDialogoAgregarCuenta: Locator;
    readonly comboboxTipoCuenta: Locator;
    readonly optionTipoCuenta: Locator;
    readonly inputMontoCuenta: Locator;

    readonly buttonCrearCuentaDialogCreacionCuenta: Locator;
    readonly buttonCancelarDialogCreacionCuenta: Locator;
    

     constructor(page: Page) {
        this.page = page;
        this.formularioDashboard = page.getByTestId('titulo-dashboard');
        this.elementoAgregarCuenta = page.getByTestId('tarjeta-agregar-cuenta')
        this.elementoEliminarCuenta = page.getByTestId('boton-eliminar-cuenta');
        this.elementoAgregarFondo = page.getByTestId('boton-agregar-fondo');
        this.elementoEnviar = page.getByTestId('boton-enviar'); 
        this.títuloDialogoAgregarCuenta = page.getByTestId('titulo-modal-crear-cuenta')
        this.comboboxTipoCuenta = page.getByRole('combobox', { name: 'Tipo de cuenta *' })
        this.optionTipoCuenta = page.getByRole('option', { name: 'Débito' })
        this.inputMontoCuenta = page.getByRole('spinbutton', { name: 'Monto inicial *' })
        
        this.buttonCrearCuentaDialogCreacionCuenta = page.getByTestId('boton-crear-cuenta');
        this.buttonCancelarDialogCreacionCuenta = page.getByTestId('boton-cancelar-crear-cuenta');
    
    }

    async esperarElementoDashboard(){
        await expect(this.formularioDashboard).toBeVisible();
    }

    async pulsarElementoAgregarCuenta() {
        await this.elementoAgregarCuenta.click();
    }

    async esperarElementoAgregarCuenta() {
        await expect(this.títuloDialogoAgregarCuenta).toBeVisible();
    }

    async pulsarComboBoxTipoCuenta() {
        await this.comboboxTipoCuenta.click();
    }

    async pulsarOptionTipoCuenta() {
        await this.optionTipoCuenta.click();
    }

    async rellenarInputMontoCuenta() {
        await this.inputMontoCuenta.click();
        await this.inputMontoCuenta.fill('150');
    }

    async pulsarElementoCrearCuenta() {
        await this.buttonCrearCuentaDialogCreacionCuenta.click(); 
    }

    async pulsarElementoCancelarCrearCuenta() {
        await this.buttonCancelarDialogCreacionCuenta.click();
    }   

    async pulsarElementoEliminarCuenta() {
        await this.elementoEliminarCuenta.click();
    }

    async pulsarElementoAgregarFondo() {
        await this.elementoAgregarFondo.click();
    }

    async pulsarElementoEnviar() {
        await this.elementoEnviar.click();
    }

    async crearCuenta() {
        await this.pulsarElementoAgregarCuenta();
        await this.esperarElementoAgregarCuenta()
        await this.pulsarComboBoxTipoCuenta()
        await this.pulsarOptionTipoCuenta()
        await this.rellenarInputMontoCuenta()
        await this.pulsarElementoCrearCuenta()
    }
}