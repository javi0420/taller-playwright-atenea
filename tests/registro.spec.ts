import {test, expect} from '@playwright/test';
import { PaginaRegistro } from '../pages/paginaRegistro';

let paginaRegistro: PaginaRegistro;


test('TC1 - Registro exitoso', async ({ page }) => {
  paginaRegistro = new PaginaRegistro(page);

  const emailAleatorio = 'Francisco.Lindo' + Math.floor(Math.random() * 1000) + '@example.com';

  // Navegar a la página de registro
  await paginaRegistro.visitarPaginaRegistro();
  // Verificar que el formulario de registro esté visible
  await paginaRegistro.verificarFormularioRegistroVisible();
  // Completar el formulario de registro
  await paginaRegistro.registrarUsuario(
    'Francisco', 
    'Lindo', 
    emailAleatorio, 
    'Test1234.'
  );
  // Verificar que la alerta de éxito esté visible
  await expect(page.getByText(paginaRegistro.alertaExito)).toBeVisible(); 
});

test('TC2 - Registro fallido', async ({ page }) => {
  paginaRegistro = new PaginaRegistro(page);

  // Navegar a la página de registro
  await paginaRegistro.visitarPaginaRegistro();
  // Verificar que el formulario de registro esté visible
  await paginaRegistro.verificarFormularioRegistroVisible();
  // Completar el formulario de registro
  await paginaRegistro.registrarUsuario(
    'Francisco', 
    'Lindo', 
    'Francisco.Lindo219@example.com', 
    'Test1234.'
  );
  // Verificar que la alerta de email ya utilizado esté visible
  await page.waitForSelector(`text=${paginaRegistro.alertaEmailUtilizado}`, { timeout: 5000 });
  await expect(page.getByText(paginaRegistro.alertaEmailUtilizado)).toBeVisible(); 

});

test('TC3 - verificar redireccionamiento a login despues de crear usuario', async ({ page }) => {
  paginaRegistro = new PaginaRegistro(page);

  paginaRegistro = new PaginaRegistro(page);

  const emailAleatorio = 'Francisco.Lindo' + Math.floor(Math.random() * 1000) + '@example.com';

  // Navegar a la página de registro
  await paginaRegistro.visitarPaginaRegistro();
  // Verificar que el formulario de registro esté visible
  await paginaRegistro.verificarFormularioRegistroVisible();
  // Completar el formulario de registro
  await paginaRegistro.registrarUsuario(
    'Francisco', 
    'Lindo', 
    emailAleatorio, 
    'Test1234.'
  );
  // Verificar que la alerta de éxito esté visible
  await expect(page.getByText(paginaRegistro.alertaExito)).toBeVisible(); 
  // Verificar que el usuario haya sido redirigido al login
  await paginaRegistro.esperarUrlLogin(paginaRegistro.urlLogin);
  // Verificar que el formulario de login esté visible
  await paginaRegistro.verificarFormularioLoginVisible();
});


