import { test, expect } from '@playwright/test';
import { PaginaRegistro } from '../pages/paginaRegistro'; 

let paginaRegistro: PaginaRegistro;


test('TC1 - Registro existoso', async ({ page }) => {
  paginaRegistro = new PaginaRegistro(page);

  const emailAleatorio = 'franlindovaz${Math.floor(Math.random() * 1000)}@example.com';
  
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
  await paginaRegistro.nombreInput.fill('Francisco');
  await paginaRegistro.apellidoInput.fill('Lindo');
  await paginaRegistro.correoInput.fill(emailAleatorio);
  await paginaRegistro.contrasenaInput.fill('Test1234.');
  await paginaRegistro.botonRegistrarse.click();
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
  await paginaRegistro.nombreInput.fill('Francisco');
  await paginaRegistro.apellidoInput.fill('Lindo');
  await page.getByRole('textbox', { name: 'Correo electrónico'}).fill('franlindovaz@example.com');
  await paginaRegistro.contrasenaInput.fill('Test1234.');
  await paginaRegistro.botonRegistrarse.click();
  await expect(alertaError).toBeVisible();
});

