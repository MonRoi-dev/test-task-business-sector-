import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Profile {
	async getProfiles(req, res) {
		try {
			if (req.isAuth) {
				const pageNumber = +req.query.page || 1;
				const chunk = (pageNumber - 1) * 10;
				const users = await prisma.user.findMany({
					orderBy: { createdAt: 'desc' },
					skip: chunk,
					take: 10,
				});
				if (!users) {
					return res.redirect('profiles', {
						message: 'Where are no users yet',
					});
				}
				const pages = (await prisma.user.count()) / 10;
				return res.render('profiles', {
					users,
					pages: Math.ceil(pages),
					pageNumber,
					message: null,
				});
			}
			return res.redirect('/');
		} catch (error) {
			console.log(error);
			res.status(500);
			return res.render('serverError');
		}
	}

	async getProfile(req, res) {
		try {
			if (req.isAuth) {
				const id = req.params.id;
				const user = await prisma.user.findUnique({ where: { id } });
				if (!user) {
					return res.send("User doesnt't exist");
				}
				return res.render('userProfile', { user });
			}
			return res.redirect('/');
		} catch (error) {
			console.log(error);
			res.status(500);
			return res.render('serverError');
		}
	}

	async updateProfile(req, res) {
		try {
			if (req.isAuth) {
				const id = req.params.id;
				const data = req.body;
				for (const key in data) {
					if (!data[key]) {
						delete data[key];
					}
				}
				const image = req.file || 'default_image.jpg';
				const user = await prisma.user.update({
					where: { id },
					data: { ...data, image: image.filename },
				});
				if (!user) {
					return res.send("User doesnt't exist");
				}
				return res.redirect(`/profile/${user.id}`);
			}
			return res.redirect('/');
		} catch (error) {
			console.log(error);
			res.status(500);
			return res.render('serverError');
		}
	}
}

export default new Profile();
