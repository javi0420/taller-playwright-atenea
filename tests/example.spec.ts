import { test } from './fixtures/testUserFixture';
import { expect } from '@playwright/test';
import { PaginaRegistro } from '../pages/paginaRegistro';
import { PaginaLogin } from '../pages/paginaLogin';

let paginaRegistro: PaginaRegistro;
let paginaLogin: PaginaLogin;


test('TC1 - Registro exitoso', async ({ page, testUser }) => {
  paginaRegistro = new PaginaRegistro(page);

  const { email, password } = testUser;

  const formularioRegistro = paginaRegistro.formularioRegistro;
  const nombreInput = paginaRegistro.nombreInput;
  const apellidoInput = paginaRegistro.apellidoInput;
  const correoInput = paginaRegistro.correoInput;
  const contrasenaInput = paginaRegistro.contrasenaInput;
  const botonRegistrarse = paginaRegistro.botonRegistrarse;
  const alertaExito = paginaRegistro.alertaExito;

  
  // Navegar a la página de registro
  await page.goto('http://localhost:3000/signup');
  await expect(formularioRegistro).toBeVisible();
  await nombreInput.fill('Francisco');
  await apellidoInput.fill('Lindo');
  await correoInput.fill(email);
  await contrasenaInput.fill(password);
  await botonRegistrarse.click();
  await expect(alertaExito).toBeVisible();
});

test('TC2 - Registro fallido', async ({ page }) => {
  paginaRegistro = new PaginaRegistro(page);
  
  const formularioRegistro = paginaRegistro.formularioRegistro;
  const nombreInput = paginaRegistro.nombreInput;
  const apellidoInput = paginaRegistro.apellidoInput;
  const correoInput = paginaRegistro.correoInput;
  const contrasenaInput = paginaRegistro.contrasenaInput;
  const botonRegistrarse = paginaRegistro.botonRegistrarse;
  const alertaError = paginaRegistro.alertaError;

  await page.goto('http://localhost:3000/signup');
  await expect(formularioRegistro).toBeVisible();
  await nombreInput.fill('Francisco');
  await apellidoInput.fill('Lindo');
  await page.getByRole('textbox', { name: 'Correo electrónico'}).fill('franlindovaz@example.com');
  await contrasenaInput.fill('Test1234.');
  await botonRegistrarse.click();
  await expect(alertaError).toBeVisible();
});

test('TC3 - Inicio sesión exitoso', async ({ page, testUser }) => {
  paginaRegistro = new PaginaRegistro(page);

  const { email, password } = testUser;

  const formularioRegistro = paginaRegistro.formularioRegistro;
  const nombreInput = paginaRegistro.nombreInput;
  const apellidoInput = paginaRegistro.apellidoInput;
  const correoInputRegistro = paginaRegistro.correoInput;
  const contrasenaInput = paginaRegistro.contrasenaInput;
  const botonRegistrarse = paginaRegistro.botonRegistrarse;
  const alertaExito = paginaRegistro.alertaExito;


  // Navegar a la página de registro
  await page.goto('http://localhost:3000/signup');
  await expect(formularioRegistro).toBeVisible();
  await nombreInput.fill('Francisco');
  await apellidoInput.fill('Lindo');
  await correoInputRegistro.fill(email);
  await contrasenaInput.fill(password);
  await botonRegistrarse.click();
  await expect(alertaExito).toBeVisible();
  paginaLogin = new PaginaLogin(page);

  const emailInputLogin = paginaLogin.emailInput;
  const passwordInput = paginaLogin.contrasenaInput;
  const botonIniciarSesion = paginaLogin.botonIniciarSesion; 

  await page.waitForTimeout(5000);
  await page.goto('http://localhost:3000/login');
  await page.waitForURL('http://localhost:3000/login', { timeout: 5000 });
  await emailInputLogin.waitFor({ state: 'visible' });
  await emailInputLogin.fill(email);
  await passwordInput.fill(password);
  await botonIniciarSesion.click();
});


