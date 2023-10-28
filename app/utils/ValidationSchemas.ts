import {z} from "zod"

export const SignInUserValidation = z.object({
    email: z.string().email("Email seems to be incorrect"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})

const PicObjType = z.union([
    z.undefined(),
    z.null(),
    z.object({
        name: z.string(),
        size: z.number().max(3000000, "Your picture size is too big, max size is 3mb"),
        type: z.string().includes("image", { message: "The file you added is not an image" }),
    }),
])
    .refine(picObj=>typeof picObj !== "undefined", "Please add a picture")
    .refine(picObj=>picObj!==null, "Please add a picture")


export const SignUpUserValidation = z.object({
    name: z.string().min(3, "Your name seems to be too short"),
    email: z.string().email("Email seems to be incorrect"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    picObj: PicObjType,
    passwordConfirmation: z.string().min(6, "Password must be at least 6 characters long"),

}).refine(user=>user.password===user.passwordConfirmation, {
    message:"Passwords don't match",
    path:["passwordConfirmation"]
})