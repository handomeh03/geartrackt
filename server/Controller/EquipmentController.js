import { AuditLog } from "../models/auditLog.js";
import { Equipment } from "../models/EquipmentModel.js";
import { ItemReversation } from "../models/ItemReversation.js";
import { Trip } from "../models/trip.js";
import { User } from "../models/UserModel.js";

//admin can add item
export async function addEquipment(req, res) {
  const { id } = req.user;
  const {code,name,category,condition,location,note,purchaseDate,photo, } = req.body;
  // check input using addEquipment validation middleWare
  try {

    //check if equipment is exist
    const checkEquipment = await Equipment.findOne({ code });
    if (checkEquipment) {
      return res.status(400).send({ error: "the Equipment already exist" });
    }
  
    //create newOne
    const newEquipment = {
      code,
      name,
      category,
      condition,
      location,
      note,
      purchaseDate,
      photo,
      user: id,
    };

    

    const newEquipmentRecourd = await Equipment.create(newEquipment);


    // auditLog for recourd all action
    await AuditLog.create({user:id,action:"CREATE",collectionName:"Equipment",documentId:newEquipmentRecourd._id,newData:newEquipment});

    //send as respone
    return res.status(201).send({ newEquipmentRecourd });

  } catch (error) {

    return res.status(500).send({ error: error.message });
  }
}

//admin can delete item
export async function DeleteEquipment(req,res) {
    let{id}=req.params;
    let{id:userId}=req.user;

    try {
     //first check if Equipment exist 
    const checkEquipment= await Equipment.findById(id);

     if(!checkEquipment){
        return res.status(400).send({error:"the Equipment not exist"})
     }

     // if exist delete from db
     await Equipment.deleteOne({ _id: id });


     // auditLog for recourd all action
     await AuditLog.create({user:userId,action:"DELETE",collectionName:"Equipment",documentId:checkEquipment._id});

     // send as respone
     return res.status(201).send({deletedEquipment:checkEquipment});
     
        
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

//get all item availble(test it)
export async function getAvailableEquipment(req,res) {
  //  const page = parseInt(req.query.page) || 1;
  // const limit = parseInt(req.query.limit) || 5;
  let {filter}=req.params;
  let query = { condition: "available" };
    try {
        //get all available Equipment
        if(filter  && filter!="ALL"){
            query.category = filter;
        }
      
        const Equipments=await Equipment.find(query);
        
    
        //check if exist 
        if(Equipments.length==0){
            return res.status(404).send({error:"no Equipments here "})
        }

        //send as respone
        return res.status(201).send({Equipments})
        
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

//get all item if with all condtion but if item more than 12 hours need charge put it overdue
export async function getAllEquipment(req, res) {
  // const page = parseInt(req.query.page) || 1;
  // const limit = parseInt(req.query.limit) || 5;

  try {
    // get all Equipment with pagination
    const Equipments = await Equipment.find();

    if (Equipments.length === 0) {
      return res.status(404).send({ error: "No equipment found" });
    }


   //check if item need charge for more 12 hours
    // const now = new Date();
    // for (const e of Equipments) {
    //   if (e.condition === "needscharging") {
    //     const updatedAt = new Date(e.updatedAt);
    //     const diffHours = (now - updatedAt) / (1000 * 60 * 60); 

    //     if (diffHours >= 12) {
    //       await Equipment.findByIdAndUpdate(e._id, {$set: { condition: "overduecharging" }},{new:true});
    //       e.condition = "overduecharging"; 
    //     }
    //   }
    // }

    // send data as respone
    return res.status(200).send({ Equipments });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

//admin can edit
export async function editEquipment(req,res) {
    let{equipmentId}=req.params;
    let{id:userId}=req.user;
    
    const {code,name,category,condition,location,note,purchaseDate,photo} = req.body;
  

    // this to choise what you want to edit
    const editEquipments={};
    if(code){
        editEquipments.code=code;
    }
    if(name){
        editEquipments.name=name;
    }
    if(category){
        editEquipments.category=category;
    }
    if(condition){
        editEquipments.condition=condition;
    }
    if(location){
        editEquipments.location=location;
    }
    if(note){
        editEquipments.note=note;
    }
    if(purchaseDate){
        editEquipments.purchaseDate=purchaseDate;
    }
    if(photo){
      editEquipments.photo=photo;
    }
    try {
        
        //check if Equipment exist
        const findEquipment=await Equipment.findById(equipmentId);
        
        if(!findEquipment){
            return res.status(400).send({error:"the Equipment does not exist"});
        }

         //updated and send as new one
        const updatedEquipment = await Equipment.findByIdAndUpdate( equipmentId, { $set: editEquipments },{ new: true } );


        // auditLog for recourd all action
        await AuditLog.create({user:userId,action:"UPDATE",collectionName:"Equipment",documentId:findEquipment._id,oldData:findEquipment,newData:updatedEquipment});

         return res.status(201).send({updatedEquipment})
        
    } catch (error) {
        return res.status(500).send({error:error.message});
    }

}

//admin can serach
export async function searchEquipment(req, res) {
  const { name } = req.query;

  try {
    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }

     // its for serach of full word
    const textResults = await Equipment.find({ $text: { $search: name } });

    // its for serach of partial word
    const regexResults = await Equipment.find({
      name: { $regex: name, $options: "i" }
    });

    // Merge results and remove duplicates
    const merged = [
      ...textResults,
      ...regexResults.filter(r => !textResults.some(t => t._id.equals(r._id)))
    ];

    if (merged.length === 0) {
      return res.status(404).send({ error: "No equipment found" });
    }

    return res.status(200).send({ equipments:merged });

  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}


// when staff checkout the item and set item condition out
export async function checkout(req,res){
  let{id:EquipmentId}=req.params;
  let{id:staffId}=req.user;
  let{startDate,endDate}=req.body;

  try {
    //check if Equipment exist 
    const FindEquipment=await Equipment.findById(EquipmentId);
    if(!FindEquipment){
      return res.status(400).send({error:"Equipment not found"});
    }
    //check if staff is exist
    const FindStaff=await User.findById(staffId);
    if(!FindStaff){
      return res.status(400).send({error:"user not found"});
    }

    //create newReverstationItem
    const NewitemReversation={
      startDate,
      endDate,
      equipment:EquipmentId,
      user:staffId
    }
    const itemReversation= await ItemReversation.create(NewitemReversation);


   // update condition from avaible to out
    await Equipment.findByIdAndUpdate( EquipmentId, { $set: { condition: "out" } },{ new: true } );


   

    // get item reverstaion with the all data and send as respone
    const item=await ItemReversation.findById(itemReversation._id).populate("equipment","_id name code condition").populate("user","fullName");


    //make auditlog
    await AuditLog.create({user:staffId,action:"UPDATE",collectionName:"ItemReversation",documentId:itemReversation._id,newData:itemReversation});

    return res.status(201).send({item});
    
  } catch (error) {
    return res.status(500).send({error:error.message});
  }
  

}

// when staff check in the item and set condition auto Needcharge
export async function checkin(req,res) {
     let{id}=req.params;
     try {
      // check if item is exist
      const items=await Equipment.findById(id);
      if(!items){
        return res.status(400).send({error:"Equipment not found"});
      }
      // update to needCharge
      let updateItem=await Equipment.findByIdAndUpdate(id, { $set: { condition:"needscharging" } },{ new: true });

      await AuditLog.create({user:id,action:"UPDATE",collectionName:"Equipment",documentId:items._id,newData:updateItem});

      // send data as respone
      return res.status(201).send({updateItem});
      
     } catch (error) {
        return res.status(500).send({error:error.message});
     }
}


//this function to get all items reverstation for one staff
export async function getAllReversationForOneStaff(req,res) {
   let {id}=req.user;
   try {

    //check if the staff have item
    let items=await ItemReversation.find({user:id}).sort({ createdAt: -1 }).populate("equipment","_id code name category condition location note purchaseDate photo").populate("user","_id fullName");
    if(items.length==0){
      return res.status(400).send({error:"there's no item that you check out"});
    }
    //send as respone
    return res.status(201).send({itemsReservation:items});
    
   } catch (error) {
    return res.status(500).send({error:error.message});
   }
}


// this function to change condition when sttaff put the item on charge
export async function changeStatusItem(req,res) {
   let{id}=req.params;

   try {
    let item=await Equipment.findByIdAndUpdate(id,{$set:{condition:"available"}},{new:true});
    if(!item){
      return res.status(400).send({error:"item not found"});
    }

     let itemReversatoin=await ItemReversation.findOneAndDelete({equipment:item._id});
     
     return res.status(200).send({measage:"success"});
    
   } catch (error) {
    return res.status(500).send({error:error.message});
   }
}

// to make trip with all item selected
export async function MakeTrip(req, res) {
  let { id: staffId } = req.user;
  let { items,location } = req.body;
   
  try {
    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).send({ error: "Items are required" });
    }

    // Check if all items exist and are available
    const foundItems = await Promise.all(items.map(async (e) => {
      const item = await Equipment.findById(e._id);
      if (!item || item.condition != "available") {
        throw new Error(`Item  is not available`);
      }
      return item;
    }));
    
    if (foundItems.length !== items.length) {
      return res.status(400).send({ error: "Some items are not available" });
    }

    // Create new Trip
    const newTrip = {
      user: staffId,
      location,
      startDate: new Date(),
      items: items.map(i => i._id),
    };
    const trip = await Trip.create(newTrip);

    // Update items condition to out
    await Equipment.updateMany(
      { _id: { $in: items.map(i => i._id) } },
      { $set: { condition: "out" } }
    );  

    // Create ItemReversation records for each item
    const itemReversations = items.map(item => ({
      startDate: new Date(),
      equipment: item._id,
      user: staffId,
    }));
    await ItemReversation.insertMany(itemReversations);

// Fetch trip with populated item details
    const tripWithDetails = await Trip.findById(trip._id)
      .populate("items", "name code condition");

      // Audit log
      await AuditLog.create({user:staffId,action:"CREATE",collectionName:"Trip",documentId:trip._id,newData:trip});
    // Send response
    return res.status(201).send({ trip:tripWithDetails });

  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

// get all Trip for one staff
export async function getAllTripsforOneStaff(req, res) {
  let { id } = req.user;
  try {
    const trips = await Trip.find({ user: id })
      .populate("items", "name code condition")
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    return res.status(200).send({ trips });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }

}

// get all trips from admin
export async function getAllTrips(req, res) {
  try {
    const trips = await Trip.find()
      .populate("items", "name code condition")
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });
      if(trips.length==0){
        return res.status(404).send({error:"no trip found"});
      }
      return res.status(201).send({trips});
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

// check in one trip after finsh
export async function checkinTrip(req, res) {
  let { id } = req.params;
  try {
    // Find the trip
    const trip = await Trip.findById(id).populate("user","fullName");
    if (!trip) {
      return res.status(400).send({ error: "Trip not found" });
    }

    // Update trip status to completed
    trip.status = "completed";
    await trip.save();  

    
    await Equipment.updateMany(
      { _id: { $in: trip.items } },
      { $set: { condition: "available" } }
    );
    // Delete ItemReversation records for each item
    await ItemReversation.deleteMany({ equipment: { $in: trip.items } });

    return res.status(200).send({trip});

  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

// get items of one trip
export async function GetitemOftrip(req, res) {
  let { id } = req.params;

  try {
    let trip = await Trip.findById(id);

    if (!trip) {
      return res.status(400).send({ error: "Trip not found" });
    }

    
    let itemIds = trip.items.map((e) => e._id);

    
    let items = await Promise.all(
      itemIds.map(async (id) => {
        return await Equipment.findById(id);
      })
    );


    return res.status(200).send({ items });

  } catch (error) {
    
    res.status(500).send({ error: error.message });
  }
}


