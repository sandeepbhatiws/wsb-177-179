const orderModel = require("../../models/order");
const productModel = require("../../models/product");
const userModel = require("../../models/user");


exports.view = async(request, response) => {

    const andCondition  = {
        deleted_at : null
    };

    var total_orders = await orderModel.find(andCondition).countDocuments();
    var total_users = await userModel.find(andCondition).countDocuments();

    var totalProducts = await productModel.aggregate([
        { $count : 'totalRecords' }
    ]);

    var orderInfo = await orderModel.aggregate(
    [
        {
            $group:{
                _id: "",
                minPrice: { $min: "$net_amount" },
                maxPrice: { $max: "$net_amount" },
                avgPrice: { $avg: "$net_amount" },
                sumPrice: { $sum: "$net_amount" }
            }
        }
    ])

    const data = {
        _status : true,
        _message : 'Record fetch succussfully.',
        total_orders : total_orders,
        total_users : total_users,
        total_products : totalProducts[0].totalRecords,
        orderInfo : orderInfo
    }

    response.send(data);
}