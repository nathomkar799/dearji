const Customer = require('../models/customer')


//Get the HomePage
function handleHomepage(req,res) {
    res.render('home');
}

//After scanning it redirects the customer to a page where it can see its details
async function handleCustomerDetailsQR (req, res) {
    try {
      const customer = await Customer.findById(req.params.id);
      console.log(customer);
      if (!customer) return res.status(404).send("Customer not found");
  
      res.render("customerInfo", { customer, qrCodeData: null }); 
      // qrCodeData not needed here, only when generating new QR
    } catch (err) {
      res.status(500).send("Server Error");
    }
} 


module.exports = {
    handleHomepage,
    handleCustomerDetailsQR
};