import instance from "."

export const createVnp = ()=>{
    return instance.post("/create-url")
}