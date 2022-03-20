export  const rgx = (params:string) => {
  return { $regex:new RegExp(`.*${params}.*`), $options: "i"}
}