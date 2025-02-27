import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento
export const storageImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/imagen/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        const url = `${file.fieldname}_${uniqueSuffix}${ext}`
        console.log('url: '+url)
        cb(null, url);
    }
});

// Filtro para aceptar solo imágenes
export const fileImageFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido. Solo se aceptan imágenes.'));
    }
};

// Límite de tamaño de archivo: 5 MB
export const uploadMulter = multer({
    storage: storageImage,
    fileFilter: fileImageFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

