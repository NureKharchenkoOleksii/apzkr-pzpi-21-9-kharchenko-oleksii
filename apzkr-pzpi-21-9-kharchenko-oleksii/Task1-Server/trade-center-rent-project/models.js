const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  contactPerson: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  openingHours: {
    open: { type: String, required: true },
    close: { type: String, required: true }
  }
});

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  position: { type: String, required: true },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hireDate: { type: Date, default: Date.now },
  password: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  stock: { type: Number, required: true }
});

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  loyaltyPoints: { type: Number, default: 0 },
  password: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, required: true }
});

const promotionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  discountPercentage: { type: Number, required: true },
  applicableShops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }]
});

const rentalSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  monthlyRate: { type: Number, required: true },
  status: { type: String, required: true }
});

const parkingSchema = new mongoose.Schema({
  spotNumber: { type: String, required: true },
  isOccupied: { type: Boolean, default: false },
  vehicleNumber: { type: String },
  entryTime: { type: Date },
  exitTime: { type: Date }
});

const Shop = mongoose.model('Shop', shopSchema);
const Employee = mongoose.model('Employee', employeeSchema);
const Product = mongoose.model('Product', productSchema);
const Customer = mongoose.model('Customer', customerSchema);
const Order = mongoose.model('Order', orderSchema);
const Promotion = mongoose.model('Promotion', promotionSchema);
const Rental = mongoose.model('Rental', rentalSchema);
const Parking = mongoose.model('Parking', parkingSchema);

module.exports = {
  Shop,
  Employee,
  Product,
  Customer,
  Order,
  Promotion,
  Rental,
  Parking
};