import bcrypt from 'bcryptjs';

const data = {
  categories: [
    {
      name: 'Shirts',
     
    },
    {
      name: 'Pants',
      
    },
    // Add more categories and their subcategories as needed
  ],
  subcategories: [
    {
      name: 'T-Shirts',
  category: '661518409124233cb8fc6f38'
    },

  ],
  users: [
    {
      name: 'imizallah',
      email: 'admin@example.com',
      password: bcrypt.hashSync('Imizallah@1990', 8),
      isAdmin: true,
    },
    {
      name: 'mimi',
      email: 'imizallah@example.com',
      password: bcrypt.hashSync('Imizallah@1990', 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Nike Slim Shirt',
      category: '661518409124233cb8fc6f38', // Refers to category ID '1' which is 'Shirts'
      subcategory: '661520ffc0de1d55b00c59f6', // Refers to subcategory ID '1' which is 'T-Shirts'
      image: '/images/p1.jpg',
      price: 120,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'High-quality T-shirt from Nike',
    },
    {
      name: 'Adidas Fit Shirt',
      category: '1', // Refers to category ID '1' which is 'Shirts'
      subcategory: '2', // Refers to subcategory ID '2' which is 'Polo Shirts'
      image: '/images/p2.jpg',
      price: 100,
      countInStock: 20,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 10,
      description: 'Comfortable Polo shirt from Adidas',
    },
    {
      name: 'Lacoste Free Shirt',
      category: '1', // Refers to category ID '1' which is 'Shirts'
      subcategory: '3', // Refers to subcategory ID '3' which is 'Dress Shirts'
      image: '/images/p3.jpg',
      price: 220,
      countInStock: 0,
      brand: 'Lacoste',
      rating: 4.8,
      numReviews: 17,
      description: 'Stylish Dress shirt from Lacoste',
    },
    {
      name: 'Nike Slim Pant',
      category: '2', // Refers to category ID '2' which is 'Pants'
      subcategory: '1', // Refers to subcategory ID '1' which is 'Jeans'
      image: '/images/p4.jpg',
      price: 78,
      countInStock: 15,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 14,
      description: 'Classic Jeans from Nike',
    },
    {
      name: 'Puma Slim Pant',
      category: '2', // Refers to category ID '2' which is 'Pants'
      subcategory: '2', // Refers to subcategory ID '2' which is 'Chinos'
      image: '/images/p5.jpg',
      price: 65,
      countInStock: 5,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 10,
      description: 'Stylish Chinos from Puma',
    },
    {
      name: 'Adidas Fit Pant',
      category: '2', // Refers to category ID '2' which is 'Pants'
      subcategory: '3', // Refers to subcategory ID '3' which is 'Joggers'
      image: '/images/p6.jpg',
      price: 139,
      countInStock: 12,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 15,
      description: 'Comfortable Joggers from Adidas',
    },
  ],
};

export default data;
