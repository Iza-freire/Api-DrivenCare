import patientService from "../services/patientService.js";

async function create(req, res){
    const {name, email, password} = req.body;

    try {
        await patientService.create({name, email, password})
        return res.sendStatus(201)

    } catch (err){
        return res.status(500).send(err.message)
    }

}

async function signin(req, res){
    const {email, password} = req.body;
    try {
        const token = await patientService.signin({ email, password })

        return res.send({token})
    } catch (err) {
        return res.status(500).send(err.message)
    }

}

export default {
    create,
    signin,
};