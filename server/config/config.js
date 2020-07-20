
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
    urlDB = 'mongodb+srv://manucaralmo:wtmRe45tFhvZlNtP@cluster0.hn1yn.mongodb.net/cafe?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;