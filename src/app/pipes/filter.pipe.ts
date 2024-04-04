import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform( arreglo: any[], 
    texto: string = '',
    columna: string = 'name'
  ): any[] {

  if ( texto === '' ) {
  return arreglo;
  }

  if ( !arreglo ) {
  return arreglo;
  }

  texto = texto.toLocaleLowerCase();

  return arreglo.filter(
  item => item[columna].toLowerCase().includes( texto )
  );
  }

}
