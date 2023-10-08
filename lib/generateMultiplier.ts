export const generateMultiplier = ():number =>{
// -option1 = 10%-50% =  65%
// -option2 = 60%-100% = 20%
// - option3 = 110%-150% = 10%
// -option4 = 160%-180% = 4%
// - option 5= 190%-200% = 1%

    //get a random nr between 0 and 99, if the number is:
    //0-64  =  option 1,
    //65-84 = option 2,
    //85-94 = option 3,
    //95-98 = option 4,
    //99 = option 5

    let multiplier:number = 0;
    const randomNr = Math.floor(Math.random()*100)

    if (randomNr <=64){
        multiplier =  Math.floor(Math.random()*5+1)*10
    }else  if (randomNr <=84){
        multiplier =  Math.floor(Math.random()*5+6)*10
    }else  if (randomNr <=94){
        multiplier =  Math.floor(Math.random()*5+11)*10
    }else  if (randomNr <=98){
        multiplier =  Math.floor(Math.random()*3+16)*10
    }else {
        multiplier =  Math.floor(Math.random()*2+19)*10
    }
    return multiplier;
}