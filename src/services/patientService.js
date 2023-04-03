import bcrypt from "bcrypt"
import patientRepository from "../repositories/patientRepository.js"
import { v4 as uuidV4 } from "uuid";

async function create({name, email, password}){
    const { rowCount } = await patientRepository.findByEmail(email)
    if(rowCount) throw new Error("Patient already exists");

    const hashPassword = await bcrypt.hash(password, 10)
    await patientRepository.create({name, email, password: hashPassword})
}

async function signin({email, password}){
    const {rowCount, rows: [patient]} = await patientRepository.findByEmail(email);
    if(!rowCount) throw new Error("Incorrect email or password");

    const validPassword = await bcrypt.compare(password, patient.password);
    if(validPassword) throw new Error("Incorrect email or password");

    const token = uuidV4();
    await patientRepository.createSession({token, patientId: patient.id});

    return token;
}

export default {
    create,
    signin,
}