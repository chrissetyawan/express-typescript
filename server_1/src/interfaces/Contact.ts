export interface IContact {
  id: number, 
  name: string, 
  email: string,
  phone:string,
  userId: number 
}

export interface IContactIO {
  contacts: Array<IContact>
}