
// =========================
//  PUERTO
// =========================

process.env.PORT = process.env.PORT || 3000;


// =========================
//  ENTORNO
// =========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// =========================
//  BASES DE DATOS
// =========================

if (process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://127.0.0.1:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;


// =========================
//  TOKENS
// =========================

// FECHA DE VENCIMIENTO 
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// SEED
process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'seed-de-desarrollo';

//google client id
process.env.CLIENT_ID = process.env.CLIENT_ID || '118764439300-me496s0fjehe9n2k5pd9ejla2dlviel5.apps.googleusercontent.com';