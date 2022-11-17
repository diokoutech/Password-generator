import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  listAlpha="abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ";
  alphaLength=this.listAlpha.length;
  listNumeriques = '12345678990';
  numlength = this.listNumeriques.length;
  listSpecial = '@$#%&*{}[],-_=+.;:/';
  passwordGenerated:string ='';
  isCopy:Boolean= false;
  alpha : FormControl = new FormControl({value: true, disabled: true});
  chiffre : FormControl = new FormControl(false);
  special_caracter : FormControl = new FormControl(false);
  ajuster_chaine : FormControl = new FormControl(false);
  longPassword=8;
  status:string = 'Moyen';
  ngOnInit(): void {
  this.generate();
  }

  generateAlpha(l:number=8)
  {
    let password = '';
    for (let index = 0; index < l; index++) {
      let random = this.getRandomArbitrary(0,this.alphaLength - 1 );
      password+=(this.listAlpha[random])
    }
    return  password;
  }
  generateNum(n:number = 4)
  {
    let num = '';
    for (let index = 0; index < n; index++) {
      let random = this.getRandomArbitrary(0,this.numlength - 1 );
      num+=(this.listNumeriques[random])
    }
    return num;
  }
  getRandomArbitrary(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  generate(){
    let alpha  = (this.alpha && this.chiffre.value === false) ? this.generateAlpha(8) : this.generateAlpha(4);
    this.chiffre.valueChanges.subscribe((chiffreValue : any) =>{
      alpha  = (this.alpha && this.chiffre.value === false) ? this.generateAlpha(8) : this.generateAlpha(4);
        console.log(chiffreValue);
        let num = this.chiffre.value == true ? this.generateNum() : '';
        this.isCopy = false;
        this.passwordGenerated = alpha+num;
        let item = this.getShuffledArr(this.passwordGenerated);
        this.passwordGenerated = item.toString().split(',').join('');
    });
    let num = this.chiffre.value == true ? this.generateNum() : '';
    this.isCopy = false;
    this.passwordGenerated = alpha+num;
    let item = this.getShuffledArr(this.passwordGenerated);
    this.passwordGenerated = item.toString().split(',').join('');
  }

  copyPassword()
  {
    navigator.clipboard.writeText(this.passwordGenerated);
    this.isCopy = true;
  }
  getShuffledArr (arr: string){
    return [...arr].map( (_, i, arrCopy) => {
        var rand = i + ( Math.floor( Math.random() * (arrCopy.length - i) ) );
        [arrCopy[rand], arrCopy[i]] = [arrCopy[i], arrCopy[rand]]
        return arrCopy[i]
    })
}
toggleStatus()
{
  
}
}
