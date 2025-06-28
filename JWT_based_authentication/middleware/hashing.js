import bcrypt from 'bcryptjs';


const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const convertedHash= await bcrypt.hashSync(password,salt);
        return ({
            hash:convertedHash,
            error:false
        })
    }
    catch {
        console.log("error in hash generation");
        return  ({
            hash:false,
            error:true
        })
    }}

    

const verifyPassword = async (password, hash) => {
    try {
        const isMatch = await bcrypt.compareSync(password, hash);
        return ({ 
            isMatch: isMatch,
            error: false
        });

    }
    catch {
        console.log("error in password verification");
        return ({
            isMatch: false,
            error: true
        });
    }
}

export { hashPassword, verifyPassword };