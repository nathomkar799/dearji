const Customer = require('../models/customer');
const QRCode = require('qrcode')

//🔍Search Section

//Get Customer Search Page just after login
function handleCustomerDetailsSearchForm(req, res) {
  res.render("crud", { customer: null, searched: false });
}

//Whole search mechanism and found-noFound system.
async function handleSearchResult(req, res) {
  try {
    const { contact } = req.query;

    const customer = await Customer.findOne({ contact });

    if (customer) {
      // found customer
      console.log(customer.remarks);
      
      return res.render("crud", { customer, searched: true, updation : false });
    } else {
      // not found
      return res.render("crud", { customer: null, searched: true });
    }
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
};


//➕Add new Customer System

//Get Add Costumer (Measurements) Form just after tapping Add New Customer 
function handleCustomerDetailsForm(req, res) {
  res.render("measure");
}
//Adding a new Customer with it stated measurements, mechanism that can create a new customer and save it to DB
async function handleAddNewCustomer(req, res) {
  try {
    const { name, contact, chest, waist, hips, shoulder, sleeve, inseam, neck , remarks} = req.body;
    if (!name || !contact) {
      return res.status(400).json({ message: "❌ Name and contact are required" });
    }

    const customer = new Customer({
      name,
      contact,
      measurements: {
        chest: chest ? Number(chest) : undefined,
        waist: waist ? Number(waist) : undefined,
        hips: hips ? Number(hips) : undefined,
        shoulder: shoulder ? Number(shoulder) : undefined,
        sleeve: sleeve ? Number(sleeve) : undefined,
        inseam: inseam ? Number(inseam) : undefined,
        neck: neck ? Number(neck) : undefined
      },
      remarks: remarks ? String(remarks) : undefined
    });

    await customer.save();

     // Generate QR for the customer profile URL
     
    //  const url = `http://localhost:3000/customer/${customer._id}`;
     const url = `https://dearji.onrender.com/customer/${customer._id}`;

     const qrCodeData = await QRCode.toDataURL(url);


    console.log({
      message: "✅ Customer added successfully!",
      customer: customer
    });
    res.render("customerInfo", { customer , qrCodeData });

  } catch (err) {
    res.status(500).json({ message: "❌ Error: " + err.message });
  }
}


//🩹Update Section : Actives when update is tapped

//Get Custumor Update Form 
async function handleCustomerUpdateForm(req, res) {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).send("❌ Customer not found");
    }

    // Pass the customer object into the view
    res.render("update", { customer});
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
}
//Working of Update Form
async function handleCustomerUpdate(req,res) {
  try {
    const { id } = req.params;
    const updates = {};

    // Go through each field only if provided
    if (req.body.name) updates.name = req.body.name;
    if (req.body.contact) updates.contact = req.body.contact;

    // Nested measurements
    updates.measurements = {};
    if (req.body.chest) updates.measurements.chest = Number(req.body.chest);
    if (req.body.waist) updates.measurements.waist = Number(req.body.waist);
    if (req.body.hips) updates.measurements.hips = Number(req.body.hips);
    if (req.body.shoulder) updates.measurements.shoulder = Number(req.body.shoulder);
    if (req.body.sleeve) updates.measurements.sleeve = Number(req.body.sleeve);
    if (req.body.inseam) updates.measurements.inseam = Number(req.body.inseam);
    if (req.body.neck) updates.measurements.neck = Number(req.body.neck);
    
    //reamrks
    if (req.body.remarks) updates.remarks = req.body.remarks
    
    // Remove empty measurements object if nothing provided
    if (Object.keys(updates.measurements).length === 0) {
      delete updates.measurements;
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );
    // const updation = true;
    res.render("crud", { customer: updatedCustomer, updation: true });
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
}



module.exports = {
  handleAddNewCustomer,
  handleCustomerDetailsSearchForm,
  handleSearchResult,
  handleCustomerDetailsForm,
  handleCustomerUpdate,
  handleCustomerUpdateForm
}