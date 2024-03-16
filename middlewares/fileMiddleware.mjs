import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../public/images'));
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname +
				'-' +
				Date.now() +
				'.' +
				file.mimetype.split('/')[1]
		);
	},
});

const fileFilter = function (req, file, cb) {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({ storage, limits: { fileSize: 10000000 }, fileFilter });

const uploadFile = upload.single('image');

function handleFileUpload(req, res, next) {
	uploadFile(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			console.log(err);
			return res.status(400).json({ error: 'Error uploading file' });
		} else if (err) {
			console.log(err);
			return res.status(500).json({ error: 'Internal server error' });
		}
		next();
	});
}

export default handleFileUpload;
