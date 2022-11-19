type todo = {
    toDo:string,
    isCompleted:boolean,
    _id:string
}


type responseData ={
    message:string,
    email:string
    userTodos?:todo[],
    accessToken?:string
}

export type {todo,responseData}