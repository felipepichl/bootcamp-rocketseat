import {Request, Response} from 'express';
import createUser from "./services/CreateUser";

export function helloWord (request: Request, response: Response) {
  const user = createUser({
    email: "felipe.pichl@hotmail.com",
    password: "123456",
    techs: [
      "NodeJS", 
      "React", 
      "React Native", 
      { title: 'JS', experience: 100 },
    ]
  });

  console.log(user.email);
  
  return response.json({ message: "Hello Word" });
}