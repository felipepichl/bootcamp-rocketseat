
interface TechObject {
  title: string,
  experience: number
}

interface CreateUserDate {
  name?: string,
  email: string,
  password: string,
  techs: Array<String | TechObject>  
  //techs: string[] for unique type 
}

export default function createUser({ name= '', email, password }: CreateUserDate){
  const user = {
    name,
    email,
    password
  }

  return user;
}