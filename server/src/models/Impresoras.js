import mongoose from "mongoose";
import connection from "../config/DB.js";


const impresorasSchema = new mongoose.Schema({
    nombre: {
        type: String,
    },
    modoImpresion: {
        type: String,
        enum: ["Bluetooth", "Wifi"]
    },
    macAddress: {
        type:String,
    },
    ipAddress: {
        type: String
    },
    port: {
      type: Number  
    },
    usuarios: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios"
        }
    ]
})

const Impresoras = connection.model("Impresoras", impresorasSchema)

export default Impresoras
