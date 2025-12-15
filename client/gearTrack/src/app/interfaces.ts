export interface LogEntry {
  _id: string;
  user: LogUser;
  action: "CREATE" | "UPDATE" | "DELETE"; 
  collectionName: string;
  documentId: string;
  oldData: EquipmentData | null;
  newData: EquipmentData | null;
  createdAt: string;
  __v: number;
}
export interface LogUser {
  _id: string;
  fullName: string;
}
export interface EquipmentData {
  code: string;
  name: string;
  category: string;
  location: string;
  note: string;
  purchaseDate: string; 
  photo: string;
  user: string; 
}

export interface userInterFace{id: string;fullName: string;email: string;role: string;status: boolean}

export interface staffAvauble{_id:string,fullName:string,email:string}


export interface Equipment {
  _id: string;
  code: string;
  name: string;
  category: string;
  condition: string;
  location: string;
  note: string;
  purchaseDate: string; 
  photo: string; 
}


export interface User {
  _id: string;
  fullName: string;
}


export interface ItemReservation {
  _id: string;
  startDate: string;
  endDate: string;  
  equipment: Equipment ;
  user: User;
  createdAt: string;   
  __v: number;
}

export interface EquipmentItem {
  _id: string;
  code: string;
  name: string;
  category: string;
  condition: string;
  location: string;
  note: string;
  purchaseDate: string;
  photo: string;
  user: string;
  createdAt: string;
}
export interface GuestReversation {
  _id: string;
  fullName: string;
  companyName: string;
  shotLocation: string;
  phoneNumber: string;
  note: string;
  date: string;
  staff?: {
  _id: string;
  fullName: string;
};

  status: "pending" | "assigned" | "completed" | "cancelled";
}

