const productsDb = require('../init-db.js'); // Import shared connection

  // SQL to create products table
  const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      image_link TEXT NOT NULL,
      description TEXT,
      is_liked BOOLEAN DEFAULT FALSE,
      available_stocks INTEGER NOT NULL,
      price REAL NOT NULL,
      is_negotiable BOOLEAN DEFAULT FALSE,
      owner_name TEXT NOT NULL,
      owner_email TEXT NOT NULL,
      owner_phone TEXT NOT NULL,
      owner_address TEXT NOT NULL,
      owner_availability TEXT NOT NULL
    );
  `;

//   // Connect to SQLite database
// const productsDb = new sqlite3.Database('./databases/products.db', (err) => {
//     if (err) {
//       console.error("Error connecting to the database", err);
//     } else {
//       console.log("Connected to SQLite database");
//     }
//   });
  
  // Create users table if it doesn't exist
  productsDb.serialize(() => productsDb.run(createProductsTable));
// Export the function to create tables
// module.exports = { createTables, productsDb };

const createProduct = (req, res) => {
    const {
      name,
      image_link,
      description,
      is_liked,
      available_stocks,
      price,
      is_negotiable,
      owner
    } = req.body;
  
    
    if (!name || !image_link || !available_stocks || !price || !owner) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    productsDb.run(createProductsTable, (err) => {
        if (err) {
          console.error('Error creating products table: ' + err.message);
        } else {
          console.log('Products table created or already exists.');
        }
    });
  
    // Prepare the SQL statement
    const sql = `
      INSERT INTO products (
        name, image_link, description, is_liked, available_stocks, price, is_negotiable,
        owner_name, owner_email, owner_phone, owner_address, owner_availability
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    // Execute the SQL statement
    productsDb.run(sql, [
      name,
      image_link,
      description || null,
      is_liked || false,
      available_stocks,
      price,
      is_negotiable || false,
      owner.name,
      owner.email,
      owner.phone_number,
      owner.address,
      owner.availability
    ], function (err) {
      if (err) {
        return res.status(500).json({ message: 'Error creating product', error: err.message });
      }
  
      // Return the newly created product
      const createdProduct = {
        id: this.lastID,
        name,
        image_link,
        description,
        is_liked,
        available_stocks,
        price,
        is_negotiable,
        owner: {
          name: owner.name,
          email: owner.email,
          phone_number: owner.phone_number,
          address: owner.address,
          availability: owner.availability
        }
      };
  
      return res.status(201).json({ message: 'Product created successfully', product: createdProduct });
    });
  };
  
  module.exports = createProduct;