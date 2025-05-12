import prisma from "../../config/prisma";

class CategoryService {
    async getAll() {
        const categories =  await prisma.category.findMany({
            include: {
                thumbnail: true,
            },
        })

        const baseUrl = "http://localhost:3000/uploads/category/";

    return categories.map((category) => {
        if (category.thumbnail) {
            category.thumbnail.name = `${baseUrl}${category.thumbnail.name}`;
            category.thumbnail.name;
        }
        return category;
    });

    }

    async create(categoryName: string, fileName: string) {
        // Simulate a database operation
        const thumbnail = await prisma.media.create({
            data: {
                name: fileName,
                mediaType: "CATEGORY_IMAGE",
            }
        });
        const category = await prisma.category.create({
            data: {
                name: categoryName,
                thumbnail: { connect: { id: thumbnail.id } },
            },
        });
        return category;
    }
}

export default new CategoryService();