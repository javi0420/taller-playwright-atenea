import {test, expect} from '@playwright/test';
import { PaginaLogin } from '../pages/paginaLogin';
import { PaginaMenuSuperior } from '../pages/paginaMenuSuperior';
import { PaginaDashboard } from '../pages/paginaDashboard';

let paginaLogin: PaginaLogin;
let paginaMenuSuperior: PaginaMenuSuperior;
let paginaDashboard: PaginaDashboard;

test('TC 1.1: Agregar cuenta nueva', async ({ page }) => {
    paginaLogin = new PaginaLogin(page);
    paginaMenuSuperior = new PaginaMenuSuperior(page);
    paginaDashboard = new PaginaDashboard(page);

    // Navegar a la página de login
    await paginaLogin.visitarPaginaLogin();
    // Verificar que el formulario de login esté visible
    await paginaLogin.verificarFormularioLoginVisible();
    // Completar el formulario de login
    await paginaLogin.realizarLoginCorrecto('Francisco.Lindo219@example.com', 'Test1234.');
    // Verificar que la URL cambia a la del dashboard
    await paginaLogin.esperarUrlDashboard(paginaLogin.urlDashboard);
    // Verificar que la URL del navegador es la correcta
    await paginaLogin.comprobarUrlDashboard(paginaLogin.urlDashboard);
    // Verificar que el elemento del formulario del dashboard esté visible
    await paginaDashboard.esperarElementoDashboard();
    // crear cuenta añadiendo el tipo de cuenta y el monton
    await paginaDashboard.crearCuenta();
    await page.waitForTimeout(5000); // Esperar un segundo para que el diálogo aparezca

});