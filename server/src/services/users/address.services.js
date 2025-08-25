const Address = require("../../models/address");

const getAddressesDB=async (id)=>{
    return await Address.find({user:id});
}

const addAddressDB=async(data)=>{
    const newAddress= new Address(data);
    return await newAddress.save();
}

const updateAddressDB=async(id,data)=>{
   return await Address.findByIdAndUpdate(id);
};

const deleteAddressDB=async(id)=>{
    return await Address.findByIdAndDelete(id);
}

module.exports={getAddressesDB,addAddressDB,updateAddressDB,deleteAddressDB};