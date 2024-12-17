export interface User {
    name: string,
    email: string,
    sector: string,
    role: string,
    firebaseId?: string, //o ? é pra informar que é campo é opcional
    healthPlan?: string,
    dentalPlan?: string,
}
