var slugify = require('slugify');
const colorModel = require('../../models/color');
const materialModel = require('../../models/material');
const subSubCategoryModel = require('../../models/subSubCategory');
const productModel = require('../../models/product');
require('dotenv').config()

const generateUniqueSlug = async (Model, baseSlug) => {
  let slug = baseSlug;
  let count = 0;

  // Loop to find unique slug
  while (await Model.findOne({ slug })) {
    count++;
    slug = `${baseSlug}-${count}`;
  }

  return slug;
};

exports.viewColors = async(request, response) => {

    const condition = {
        deleted_at : null,
        status : true
    };

    await colorModel.find(condition).select('name')
    .sort({
        _id : 'desc'
    })
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record fetch succussfully.',
                _data : result
            }

            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No record found.',
                _data : result
            }

            response.send(data);
        }
        
    })
    .catch((getError) => {

        var errors = {};
        for(var i in getError.errors){
            errors[i] = getError.errors[i].message
        }

        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _error : errors,
            _data : []
        }

        response.send(data);
    })
}

exports.viewMaterials = async(request, response) => {

    const condition = {
        deleted_at : null,
        status : true
    };

    await materialModel.find(condition).select('name')
    .sort({
        _id : 'desc'
    })
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record fetch succussfully.',
                _data : result
            }

            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No record found.',
                _data : result
            }

            response.send(data);
        }
        
    })
    .catch((getError) => {

        var errors = {};
        for(var i in getError.errors){
            errors[i] = getError.errors[i].message
        }

        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _error : errors,
            _data : []
        }

        response.send(data);
    })
}

exports.viewSubSubCategories = async(request, response) => {

    const condition = {
        deleted_at : null,
        status : true
    };

    if(request.body){
        if(request.body.parent_category_id != '' && request.body.parent_category_id != undefined){
            condition.parent_category_id = request.body.parent_category_id;
        }

        if(request.body.sub_category_id != '' && request.body.sub_category_id != undefined){
            condition.sub_category_id = request.body.sub_category_id;
        }
    }

    await subSubCategoryModel.find(condition).select('name parent_category_id sub_category_id')
    .sort({
        _id : 'desc'
    })
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record fetch succussfully.',
                _data : result
            }

            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No record found.',
                _data : result
            }

            response.send(data);
        }
        
    })
    .catch((getError) => {

        var errors = {};
        for(var i in getError.errors){
            errors[i] = getError.errors[i].message
        }

        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _error : errors,
            _data : []
        }

        response.send(data);
    })
}

exports.create = async(request, response) => {

    const dataSave = request.body;

    if(request.files){
        if(request.files.image){
            dataSave.image = request.files.image[0].filename;
        }

        if(request.files.images){
            var allImages = [];
            request.files.images.forEach((value) => {
                allImages.push(value.filename);
            })

            dataSave.images = allImages;
        }
    }

    if(request.body.name){
        var slug = slugify(request.body.name, {
            lower: true,
            strict: true,
            trim: true
        })

        dataSave.slug = await generateUniqueSlug(productModel, slug)
    }

    await productModel(dataSave)
    .save()
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Record created succussfully.',
            _data : result
        }

        response.send(data);
    })
    .catch((getError) => {

        var errors = {};
        for(var i in getError.errors){
            errors[i] = getError.errors[i].message
        }

        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _error : errors,
            _data : ''
        }

        response.send(data);
    })
}

exports.view = async(request, response) => {

    var limit           = 15;
    var skip            = 0;
    var current_page    = 1;

    if(request.body){
        if(request.body.limit != undefined && request.body.limit != ''){
            limit = request.body.limit
        }
    }

    if(request.body){
        if(request.body.page != undefined && request.body.page != ''){
            current_page = request.body.page,
            skip = (current_page - 1) * limit;
        }
    }

    const andCondition      = [{
        deleted_at : null
    }];
    const orCondition       = [];
    var filter              = {};

    if(request.body){        
        if(request.body.name != '' && request.body.name != undefined){
            var nameRegex = new RegExp(request.body.name, "i");
            andCondition.push({ name : nameRegex })
        }

        if(request.body.parent_category_id != '' && request.body.parent_category_id != undefined){
            andCondition.push({ parent_category_id : request.body.parent_category_id })
        }

        if(request.body.sub_category_id != '' && request.body.sub_category_id != undefined){
            andCondition.push({ sub_category_id : request.body.sub_category_id })
        }
    }

    if(andCondition.length > 0){
        filter = { $and : andCondition }
    }

    if(orCondition.length > 0){
        filter.$or = orCondition;
    }

    var total_records = await productModel.find(filter).countDocuments();

    var sort = {
        _id : 'desc'
    }

    if(request.body){
        if(request.body.sorting != undefined && request.body.sorting == 1){
            sort = {
                name : 'asc'
            }
        }

        if(request.body.sorting != undefined && request.body.sorting == 2){
            sort = {
                name : 'desc'
            }
        }
    }


    await productModel.find(filter).limit(limit).skip(skip)
    .populate('parent_category_id', 'name slug')
    .populate('sub_category_id', 'name slug')
    .populate('sub_sub_category_id', 'name slug')
    .populate('color_id', 'name slug')
    .populate('material_id', 'name slug')
    .sort(sort)
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record fetch succussfully.',
                _image_path : process.env.product_image,
                _paginate : {
                    current_page : current_page,
                    total_pages : Math.ceil(total_records/limit),
                    total_records : total_records
                },
                _data : result
            }

            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No record found.',
                _data : result
            }

            response.send(data);
        }
        
    })
    .catch((getError) => {

        var errors = {};
        for(var i in getError.errors){
            errors[i] = getError.errors[i].message
        }

        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _error : errors,
            _data : []
        }

        response.send(data);
    })
}

exports.details = async(request, response) => {

    productModel.findOne({
        _id : request.params.id,
        deleted_at : null
    })
    .then((result) => {
        if(result){
            const data = {
                _status : true,
                _message : 'Record fetch succussfully.',
                _image_path : process.env.product_image,
                _data : result
            }

            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No record found.',
                _data : result
            }

            response.send(data);
        }
        
    })
    .catch((getError) => {

        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : ''
        }

        response.send(data);
    })
}

exports.update = async(request, response) => {

    const dataSave = request.body;

    if(request.files){
        if(request.files.image){
            dataSave.image = request.files.image[0].filename;
        }

        if(request.files.images){
            var allImages = [];
            request.files.images.forEach((value) => {
                allImages.push(value.filename);
            })

            dataSave.images = allImages;
        }
    }

    if(request.body.name){
        var slug = slugify(request.body.name, {
            lower: true,
            strict: true,
            trim: true
        })

        dataSave.slug = await generateUniqueSlug(productModel, slug)
    }

    dataSave.updated_at = Date.now()

    productModel.updateOne({
        _id : request.params.id
    }, {
        $set : dataSave
    })
    .then((result) => {
        if(result.matchedCount > 0){
            const data = {
                _status : true,
                _message : 'Record updated succussfully.',
                _data : result
            }

            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No record found.',
                _data : null
            }

            response.send(data);
        }
        
    })
    .catch((getError) => {

        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : ''
        }

        response.send(data);
    })
}

exports.changeStatus = async(request, response) => {

    await productModel.updateMany(
        { _id: { $in: request.body.ids } },
        [
            {
                $set: {
                    status: { $not: "$status" }   // toggle status
                }
            }
        ],
        {
            updatePipeline: true
        }
    )
    .then((result) => {
        if(result.matchedCount > 0){
            const data = {
                _status : true,
                _message : 'Status changed succussfully.',
                _data : result
            }

            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No record found.',
                _data : null
            }

            response.send(data);
        }
        
    })
    .catch((getError) => {

        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : ''
        }

        response.send(data);
    })
}

exports.destory = async(request, response) => {
    var dataSave = {};
    dataSave.deleted_at = Date.now()

    productModel.updateMany({
        _id : request.body.ids
    }, {
        $set : dataSave
    })
    .then((result) => {
        if(result.matchedCount > 0){
            const data = {
                _status : true,
                _message : 'Record deleted succussfully.',
                _data : result
            }

            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No record found.',
                _data : null
            }

            response.send(data);
        }
        
    })
    .catch((getError) => {

        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : ''
        }

        response.send(data);
    })
}