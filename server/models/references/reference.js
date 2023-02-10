import { Schema, model } from 'mongoose';
import { renameFile } from '../../utils/renameRequestImages.js';
import { ReferenceCategoryModel } from './category.js';

const referenceSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Reference must have a name'],
      minlength: [3, 'Too short name'],
      maxlength: [32, 'Too long name'],
    },

    description: {
      type: String,
      required: [true, 'Reference must have a description'],
      minlength: [5, 'Too short description'],
      maxlength: [250, 'Too long description'],
    },

    author: {
      type: String,
      required: [true, 'Reference must have an author'],
    },

    reviewer: {
      type: String,
      required: [true, 'Reference must have an reviewer'],
    },

    file: {
      type: String,
      required: [true, 'Reference must have a file'],
    },

    referenceCode: {
      type: String,
      required: [true, 'Reference must have a reference code'],
    },

    categoryId: {
      type: Schema.ObjectId,
      required: [true, 'reference category Id is required'],
      ref: 'ReferenceCategory',
    },
    keywords: [String],
  },
  {
    timestamps: true,
  }
);

renameFile(referenceSchema);

referenceSchema.statics.createReferenceCount = async function (
  categoryId
) {
  // اجريجيت دي شغالة علي انها بتدخل النتايج بتاعتنا علي اكتر من مرحلة ورا بعض بالترتيب وكل مرحلة بتاخد النتيجة بتاعة المرحلة اللي قبلها وبتعمل عليها العمليات بتاعتها وهكذا

  const result = await this.aggregate([
    // stage 1 : get all reviews in specific product
    { $match: { categoryId: categoryId } },
    // stage 2 : group reviews in based on specific product and calc avgRating and ratingQuantity
    {
      $group: {
        _id: 'categoryId',
        referenceCount: { $sum: 1 },
      },
    },
  ]);
  if (result.length > 0) {
    await ReferenceCategoryModel.findByIdAndUpdate(categoryId, {
      referenceCount: result[0].referenceCount,
    });
  }
  // else {
  //   await ProductModel.findByIdAndUpdate(categoryId, {
  //     avgRating: 0,
  //     ratings: 0,
  //   });
  // }
};

referenceSchema.post('save', async function (next) {
  // بمرر ال categoryId اللي موجود ف الريفيو نفسه بتاع البرودكت
  await this.constructor.createReferenceCount(this.categoryId);
  // next();
});
referenceSchema.post('remove', async function (next) {
  // بمرر ال categoryId اللي موجود ف الريفيو نفسه بتاع البرودكت
  await this.constructor.createReferenceCount(this.categoryId);
  // next();
});



export const ReferenceModel = model('Reference', referenceSchema);
