import bcrypt from 'bcrypt'

export const hashPassword = async(password) => {
    try{
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password,saltRound);
        return hashedPassword;
    }catch(err){
        console.log(`error in hashPassword ${err}`.bgRed.white);
    }
}


export const comparePassword = async(password,hashedPassword) => {
    try{
        return bcrypt.compare(password,hashedPassword);
    }catch(err){
        console.log(`error in comparePassword ${err}`.bgRed.white)
    }
}