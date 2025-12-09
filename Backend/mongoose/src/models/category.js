const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name : {
    type : String,
    match : /^[a-zA-Z 0-9]{2,15}$/,
    default : '',
    required : [true, 'Name is required'],
    validate: {
      validator: async function(v) {
        const name = await this.constructor.findOne({ name: v });
        return !name;
      },
      message: props => `The specified name is already in use.`
    }
    // minLength : [5, "Minimum value must be of 5 characters"],
    // maxLength : [10, "Maximun value must be of 10 characters"],
  },
  type:{
    type: String,
    enum : [1,2, 'Men'],
  },
  order : {
    type : Number,
    default : 0,
    min : [0, "Minimum value must be 0 or greather than 0"],
    max : [1000, "Maximum value must be less than 1000"]
  },
  image : String,

  created_at : {
    type : Date,
    default : Date.now()
  },
  updated_at : {
    type : Date,
    default : Date.now()
  }
});

const categoryModel = mongoose.model('categories', categorySchema);

module.exports = categoryModel;