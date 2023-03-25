/// <reference types="vite/client" />
// declare module '*'

interface User {
  username: string;
  avatar: string
}

interface Blog {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  user: User
}

enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE"
}

