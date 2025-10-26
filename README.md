# KoloCmil Store - Sales Management System

A modern, responsive React application for managing product sales with budget tracking, PDF invoicing, and profit/loss analysis. All prices are in FCFA (Central African CFA Franc).

## Features

### 📦 Product Management
- **Simple Product Entry**: Add products with name, category, unit price, and number of units
- **Flexible Budget Entry**: Enter your actual budget or let the system calculate it
- **Real-time Tracking**: Monitor sold units, remaining stock, and revenue
- **Easy Deletion**: Remove products when done selling
- **Visual Indicators**: Color-coded stock levels and progress bars

### 🛒 Quick Sell System with PDF Invoicing
- **Customer Name Capture**: Enter customer name for each sale
- **Professional PDF Invoices**: Beautifully designed PDF invoices with colors and formatting
- **Download & Print**: Download invoices as PDF files or print directly
- **Sales History**: View all past sales with customer information
- **Re-download Invoices**: Access any previous invoice anytime
- **Card-Based Interface**: Beautiful cards showing all product details
- **Progress Tracking**: Visual progress bars showing sales completion
- **Real-time Updates**: Instant updates to stock and revenue

### 📊 Profit/Loss Analysis
- **Category-Based Analysis**: View profit/loss by product category
- **Time Tracking**: See how many days since product purchase
- **Detailed Metrics**: Budget, revenue, profit/loss percentage for each product
- **Overall Statistics**: Total budget, revenue, and profit/loss at a glance
- **Status Indicators**: Active vs Completed products

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **Lucide React** - Icons
- **jsPDF** - PDF generation library

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Usage

### Adding Products
1. Navigate to the "Products" tab (default view)
2. Click "Add Product"
3. Enter:
   - Product name (e.g., "Coca Cola")
   - Category (e.g., "Beverages")
   - Unit price in FCFA (e.g., 500)
   - Number of units (e.g., 100)
   - Total budget (optional - auto-calculates if left empty)
4. System shows calculated budget: Units × Unit Price
5. Click "Add Product" to save

### Selling Products (Quick Sell)
1. Navigate to the "Quick Sell" tab
2. Find the product you want to sell
3. Click the green checkmark button
4. Enter the customer's name in the popup
5. Enter the quantity you want to sell (system validates against available stock)
6. See the total amount calculated automatically
7. Click "Confirm Sale"
8. Professional PDF invoice is generated automatically with "KoloCmil Store" branding
9. Choose to:
   - **Download Invoice** - Saves as a designed PDF file
   - **Print Invoice** - Opens PDF in new tab for printing
   - **Skip** - Continue without downloading
10. Sale appears in the "Recent Sales" table below with quantity
11. You can re-download any PDF invoice from the sales history

### Viewing Analysis
1. Navigate to the "Analysis" tab
2. View overall statistics:
   - Total products
   - Total budget invested
   - Total revenue generated
   - Total profit or loss
3. See detailed breakdown by category:
   - Each product's budget, revenue, and profit/loss
   - Profit/loss percentage
   - Days since purchase
   - Sales progress
   - Status (Active/Completed)

### Deleting Products
- In the "Products" tab, click the trash icon to delete a product
- Useful when you're done selling a product category

## Project Structure

```
sales-management-app/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx      # Profit/loss analysis
│   │   ├── ProductList.jsx    # Product management
│   │   └── SalesList.jsx      # Quick sell & invoicing
│   ├── utils/
│   │   └── invoiceGenerator.js # Invoice generation & download
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Key Features Explained

### Product Entry System
You enter the following information:
- **Unit Price**: How much one item costs you (FCFA)
- **Number of Units**: How many items you have
- **Total Budget**: (Optional) Your actual investment - if not entered, calculated as Unit Price × Units

Example: 100 units × 500 FCFA = 50,000 FCFA budget

### Profit/Loss Calculation
- **Budget**: Total money invested in buying products
- **Revenue**: Total money earned from sales (Units Sold × Unit Price)
- **Profit/Loss**: Revenue - Budget
- **Percentage**: (Profit ÷ Budget) × 100

### Time Tracking
- Automatically tracks days since product purchase
- Helps you understand how long it takes to sell products
- Useful for inventory planning

### PDF Invoice System
Each sale generates a professionally designed PDF invoice with:
- **Professional Design**: Color-coded sections with blue header and green accents
- **Company Branding**: "KoloCmil Store" header prominently displayed
- **French Language**: All labels and text in French (FACTURE)
- **Invoice Number**: Unique identifier (INV-timestamp)
- **Customer Information**: Name prominently displayed
- **Product Table**: Organized table with product details and quantity
- **Payment Summary**: Highlighted total amount box
- **Red Circular "PAYE" Stamp**: Dual opacity stamp below total amount - circles 15% (transparent), text 25% (readable)
- **Location**: Yaoundé, Cameroun displayed in both header and footer
- **Footer**: Thank you message and generation timestamp

PDF Features:
- Full-color professional design with red stamp
- French language throughout
- Print-ready format (A4 size)
- Downloadable as PDF files
- Can be printed directly from browser
- Re-downloadable from sales history anytime

## Future Enhancements

- Local storage persistence (save data between sessions)
- Export reports to CSV/PDF
- Multiple selling prices (buy vs sell price)
- Expense tracking
- Charts and graphs for visual analytics
- Mobile app version
- Multi-user support

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
