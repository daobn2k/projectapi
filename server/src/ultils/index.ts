export  const rgx = (params:string) => {
  return { $regex:new RegExp(`.*${params}.*`), $options: "i"}
}

export const checkPermisstionUser = (code:string) => {
  switch(code){
    case '4':
    return 'user';
    default:
    return 'admin';
  }
}