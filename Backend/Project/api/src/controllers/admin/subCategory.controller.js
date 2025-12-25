const categoryModel = require("../../models/category")
var slugify = require('slugify');
const subCategoryModel = require("../../models/subCategory");
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

exports.viewCategories = async(request, response) => {

    const condition = {
        deleted_at : null,
        status : true
    };

    await categoryModel.find(condition).select('name')
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

    if(request.file){
        dataSave.image = request.file.filename;
    }

    if(request.body.name){
        var slug = slugify(request.body.name, {
            lower: true,
            strict: true,
            trim: true
        })

        dataSave.slug = await generateUniqueSlug(subCategoryModel, slug)
    }

    await subCategoryModel(dataSave)
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
    }

    if(andCondition.length > 0){
        filter = { $and : andCondition }
    }

    if(orCondition.length > 0){
        filter.$or = orCondition;
    }

    var total_records = await subCategoryModel.find(filter).countDocuments();

    await subCategoryModel.find(filter).select('name parent_category_id image slug order status').limit(limit).skip(skip)
    .populate('parent_category_id', 'name slug')
    .sort({
        _id : 'desc'
    })
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record fetch succussfully.',
                _image_path : process.env.category_image,
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

    subCategoryModel.findOne({
        _id : request.params.id,
        deleted_at : null
    })
    .then((result) => {
        if(result){
            const data = {
                _status : true,
                _message : 'Record fetch succussfully.',
                _image_path : process.env.category_image,
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

    if(request.file){
        dataSave.image = request.file.filename;
    }

    if(request.body.name){
        var slug = slugify(request.body.name, {
            lower: true,
            strict: true,
            trim: true
        })

        dataSave.slug = await generateUniqueSlug(subCategoryModel, slug)
    }

    dataSave.updated_at = Date.now()

    subCategoryModel.updateOne({
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

    await subCategoryModel.updateMany(
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

    subCategoryModel.updateMany({
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