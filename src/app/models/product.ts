export class ProductModel {
    productId : any;
    categoryId : any;
    userId : any;
    name : any;
    description : any;
    regularPrice : any;
    salePrice : any;
    stockQuantity : any;
    base64Image : any;
    image : any;
    status : any;
    action: any;
}

export class GetProductsModel {
    productId : number | any| null;
    categoryId : number | any | null;
    userId : number | any | null;
}

export class CategoryModel {
    categoryId : number | undefined;
    userId : number | undefined;
    name : string | undefined;
    description : string | undefined;
    status : number | undefined;
}



export class GetCategoryModel {
    categoryId : number | null = null;
    userId : number | null = null;
}

export class ShippingAddressModel {
    addressId : any;
    userId : any;
    address : any;
    city : any;
    state : any;
    country : any;
    zipCode : any;
    mobileNo : any;
}

export class GetShippingAddressModel {
    addressId : any;
    userId : any;
}

export class ReviewsModel {
    reviewId : any;
    userId : any;
    productId : any;
    rating : any;
    comment : any;
}

export class GetReviewsModel {
    reviewId : any;
    userId : any;
}

export class OrdersModel {
    orderId : any;
    userId : any;
    productId : any;
    quantity : any;
    unitPrice : any;
    totalPrice : any;
    status : any;
    totalOrderAmount : any;
}

export class GetOrdersModel {
    orderId : any;
    productId : any;
    categoryId : any;
    userId : any;
}

export class WishlistsModel {
    wishlistId : any;
    productId : any;
    categoryId : any;
    userId : any;
}