// async function migrateCategories() {
//   try {
//     const distinctCategories = await Product.distinct("category");
//     const categoryMap = {};
//     for (let catName of distinctCategories) {
//       let category = await Category.findOne({ name: catName });
//       if (!category) {
//         category = new Category({ name: catName });
//         await category.save();
//       }
//       categoryMap[catName] = category._id;
//     }
//     const products = await Product.find({});
//     for (let product of products) {
//       const categoryId = categoryMap[product.category];
//       product.category = categoryId;
//       await product.save();
//     }
//     console.log("Migrate Compelete!");
//     mongoose.disconnect();
//   } catch (err) {
//     console.log("error during migration ", err);
//   }
// }
// migrateCategories();
