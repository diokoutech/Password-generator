import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  listAlpha = 'abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ';
  listNumeriques = '12345678990';
  listSpecial = '@$#%&*{}[],-_=+.;:/';
  passwordGenerated: string = '';
  isCopy: Boolean = false;
  alpha: FormControl = new FormControl();
  chiffre: FormControl = new FormControl();
  special_caracter:FormControl = new FormControl() ;
  ajuster_chaine: FormControl = new FormControl();
  longPassword = 8;
  status: string = 'Moyen';

  ngOnInit(): void {
    this.generate();
    this.alpha = new FormControl({ value: true, disabled: true });
    this.chiffre = new FormControl(false);
    this.special_caracter = new FormControl(false);
    this.ajuster_chaine = new FormControl(false);
  }
  generateElement(n: number = 2, list: any, nombreList: number) {
    let element = '';
    for (let index = 0; index < n; index++) {
      let random = this.getRandomArbitrary(0, nombreList - 1);
      element += list[random];
    }
    return element;
  }
  getRandomArbitrary(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  generate() {
    let alpha =
      (this.alpha && this.chiffre.value === false) ||
      (this.alpha && this.special_caracter.value === false)
        ? this.generateElement(8, this.listAlpha, this.listAlpha.length)
        : this.generateElement(4, this.listAlpha, this.listAlpha.length);
    // chiifres
    this.chiffre.valueChanges.subscribe((chiffreValue: any) => {
      alpha =
        this.chiffre.value === false
          ? this.generateElement(8, this.listAlpha, this.listAlpha.length)
          : this.generateElement(4, this.listAlpha, this.listAlpha.length);
      let spec =
        this.special_caracter.value == true
          ? this.generateElement(2, this.listSpecial, this.listSpecial.length)
          : '';

      let num =
        this.chiffre.value == true
          ? this.generateElement(4, this.listNumeriques, this.listNumeriques.length)
          : '';
      this.passwordGenerated = this.getShuffledArr(alpha + num + spec)
        .toString()
        .split(',')
        .join('');
      this.isCopy = false;
      this.toggleStatus();
    });
    // caracteres spec
    this.special_caracter.valueChanges.subscribe((value: Boolean) => {
      alpha =
        this.chiffre.value === false
          ? this.generateElement(8, this.listAlpha, this.listAlpha.length)
          : this.generateElement(4, this.listAlpha, this.listAlpha.length);
      let num =
        this.chiffre.value == true
          ? this.generateElement(4, this.listNumeriques, this.listNumeriques.length)
          : '';
      let spec =
        value == true
          ? this.generateElement(2, this.listSpecial,this.listSpecial.length)
          : '';
      this.passwordGenerated = this.getShuffledArr(alpha + spec + num)
        .toString()
        .split(',')
        .join('');
      this.isCopy = false;
      this.toggleStatus();
    });
    // ajuster chaine
    this.ajuster_chaine.valueChanges.subscribe((value: Boolean) => {
      alpha =
        value == true || this.chiffre.value === true || value == false
          ? this.generateElement(8, this.listAlpha, this.listAlpha.length)
          : this.generateElement(4, this.listAlpha, this.listAlpha.length);
      let num =
        this.chiffre.value == true
          ? this.generateElement(4, this.listNumeriques, this.listNumeriques.length)
          : '';
      let spec =
        this.special_caracter.value == true
          ? this.generateElement(2, this.listSpecial,this.listSpecial.length)
          : '';

      this.passwordGenerated = this.getShuffledArr(alpha + spec + num)
        .toString()
        .split(',')
        .join('');
      this.isCopy = false;
      this.toggleStatus();
    });

    let num =
      this.chiffre.value == true
        ? this.generateElement(4, this.listNumeriques, this.listNumeriques.length)
        : '';
    let spec =
      this.special_caracter.value == true
        ? this.generateElement(2, this.listSpecial, this.listSpecial.length)
        : '';
    let item = this.getShuffledArr(alpha + num + spec);
    this.passwordGenerated = item.toString().split(',').join('');
    this.isCopy = false;
    this.toggleStatus();
  }

  copyPassword() {
    navigator.clipboard.writeText(this.passwordGenerated);
    this.isCopy = true;
  }
  getShuffledArr(arr: string) {
    return [...arr].map((_, i, arrCopy) => {
      var rand = i + Math.floor(Math.random() * (arrCopy.length - i));
      [arrCopy[rand], arrCopy[i]] = [arrCopy[i], arrCopy[rand]];
      return arrCopy[i];
    });
  }
  toggleStatus() {
    if (this.chiffre.value == true && this.special_caracter.value == true) {
      this.status = 'Très Fort';
    } else if (
      this.chiffre.value == true ||
      this.special_caracter.value == true
    ) {
      this.status = 'Fort';
    } else {
      this.status = 'Moyen';
    }
  }
  reset()
  {
    this.ngOnInit();
  }
}
