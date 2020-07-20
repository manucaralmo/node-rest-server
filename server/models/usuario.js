
// REQUIRES
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// REQUIRES

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role válido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesario']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

// OCULTAR LA CONTRASEÑA EN EL JSON DE LA RESPUESTA
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObjet = user.toObject();
    delete userObjet.password;
    return userObjet;
};
// OCULTAR LA CONTRASEÑA EN EL JSON DE LA RESPUESTA

usuarioSchema.plugin( uniqueValidator, {
    message: '{PATH} debe de ser único'
} );

module.exports = mongoose.model('Usuario', usuarioSchema)