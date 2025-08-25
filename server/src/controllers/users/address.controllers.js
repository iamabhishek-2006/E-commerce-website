const { getAddressesDB, addAddressDB, updateAddressDB, deleteAddressDB } = require("../../services/users/address.services");

const fetchAddress=async(req,res)=>{

    const userId=req.user.id;
    const data=await getAddressesDB(userId);
    return res.json({success:true,data});
}

const addAddress=async (req,res)=>{
    const {fullName,phone,line1,line2, landmark,city,postalCode,country}=req.body;

    if(!fullName || !phone || !line1 || !line2 || !landmark || !city || !postalCode || !country ){
         return res.json({
           success: false,
           error: "All fields are require",
           required: [  "fullname", "phone","line1", "line2", "landmark", "city", "postalCode", "country"  ]
         });
    }
    // TODO: check user if exist
    const userId = req.user.id;
    req.body.user = userId;

    try {
    const data= await addAddressDB(req.body);
    return res.json({success:true,data});
  } catch (error) {
    console.log(error);
    return res.json({success:false,error:"something went wrong"});
  }
};

const updateAddress= async(req,res)=>{
  const {id}=req.params;
  const body=req.body;
  try {
  const data=await updateAddressDB(id,body);
  res.json({
    success:true,
    message:"Address updated",
    data
  })
    
  } catch (error) {
  res.json({success:false,error:"Something went wrong!"});
  }
}

const deleteAddress=async(req,res)=>{
  const {id}=req.params;
  try {
  const data=await deleteAddressDB(id);
  res.json({
    success:true,
    message:"Address id deleted",
    data
  });
    
  } catch (error) {
   res.json({
    success:false,
    error:"Something went wrong",
   }) 
  }
}

module.exports={fetchAddress,addAddress,updateAddress,deleteAddress};