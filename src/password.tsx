const bigLet = "ABCDEFHKLMNPQRSTUWXYZ";
const smalLet = "abcdefghkmnopqrstuvwxyz";
const digit = "23456789";
const symb = "~@#%^&*()-+=[]\\/";

export interface PasswordProps {
  strong : boolean,
  isBigLetter : boolean,
  isSmLetter : boolean,
  isNumbers : boolean
  isSymbol : boolean
}

function generatePass(props : PasswordProps) {
    const size= props.strong ? 16 : 8;
    let data:string = '';
    let locBigLet = bigLet;
    let locSmLet = smalLet;
    let locDigit = digit;
    let locSymbol = symb;
    let prevType = ''
    // const awailableComponents = Array<string>().concat("isBigLetter").concat("isSmLetter").concat("isNumbers").concat("isSymbol")
    let awailableComponents:Array<string> = [] ;
    if (props.isBigLetter) {
      awailableComponents = awailableComponents.concat("isBigLetter")     
    }
    if (props.isSmLetter) {
      awailableComponents = awailableComponents.concat("isSmLetter")
    }
    if (props.isNumbers) {
      awailableComponents = awailableComponents.concat("isNumbers")
    }
    if (props.isSymbol) {
      awailableComponents = awailableComponents.concat("isSymbol")
    }
    console.log(awailableComponents)
    for (let index = 0; index < size; index++) {

      let components = awailableComponents.slice()
      // delete components[prevType]


      if (components.length>1) {
        // eslint-disable-next-line no-loop-func      
        components = components.filter( (item) => (item!==prevType)) //Исключаем повторение одинаковых символов
      }      

      const paramIndex = Math.floor(Math.random() * components.length);
      let usedComponent = components[paramIndex]      
      console.log(prevType,usedComponent)
      prevType = usedComponent.slice()

      let tmp:string = '';
      switch (usedComponent) {
        case 'isBigLetter':
          tmp =  locBigLet          
          break;
        case 'isSmLetter':
          tmp = locSmLet
          break
        case 'isNumbers':
          tmp = locDigit
          break
        case 'isSymbol':
          tmp = locSymbol
          break
      }

      // const tmp = '';
      const max = tmp.length
      const code = Math.floor(Math.random()*max)
      const symbol = tmp[code];
      data = data.concat(
        symbol
      )

      // tmp = tmp.replace(symbol,'')
      switch (usedComponent) { //Необходимо рефакторить
        case 'isBigLetter':
          locBigLet =  locBigLet.replace(symbol,'')
          break;
        case 'isSmLetter':
          locSmLet = locSmLet.replace(symbol,'')
          break
        case 'isNumbers':
          locDigit = locDigit.replace(symbol,'')
          break
        case 'isSymbol':
          locSymbol = locSymbol.replace(symbol,'')
          break
      }

      // console.log(data)      
    }
    // navigator.clipboard.writeText('')

    return data;
}

export {generatePass}