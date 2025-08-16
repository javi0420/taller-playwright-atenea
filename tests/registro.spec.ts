import { test, expect } from '@playwright/test';
import { PaginaRegistro } from '../pages/paginaRegistro';
import { PaginaLogin } from '../pages/paginaLogin';

let paginaRegistro: PaginaRegistro;
let paginaLogin: PaginaLogin;

test.beforeEach(async ({ page }) => {
  // Inicializar las páginas antes de cada prueba
  paginaRegistro = new PaginaRegistro(page);
  paginaLogin = new PaginaLogin(page);
  // Visitar la página de registro antes de cada prueba
  await paginaRegistro.visitarPaginaRegistro();
  // Verificar que el formulario de registro esté visible
  await paginaRegistro.verificarFormularioRegistroVisible();
});

test('TC1 - Registro exitoso', async ({ page }) => {

  const emailAleatorio = 'Francisco.Lindo' + Math.floor(Math.random() * 1000) + '@example.com';

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
  const emailAleatorio = 'Francisco.Lindo' + Math.floor(Math.random() * 1000) + '@example.com';

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
  await paginaLogin.verificarFormularioLoginVisible();
});


