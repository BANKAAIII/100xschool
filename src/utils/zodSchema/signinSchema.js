const z = require('zod');



const zodSigninSchema = z.object({
   
    firstName:z.string()
    .min(3,{ message:"FirstName Should be atleast 3 letters" })
    .refine(value=>/^[A-Z]/.test(value),{ message:"FirstName must start with Capital letter" }),

    mobileNumber: z.number()
        .min(10,{ message:"Mobile number must be 10 digits" })
        .optional()  ,  
        
    email: z.string().email("Invalid email format")
           .refine(value => value.endsWith('.com'), { message: "Only '.com' domains are allowed" })
           .optional(),

    password: z.string()
    .min(8,{ message: " password must be atleast 8 characters long " })
    .refine( value => /[A-Z]/ .test(value) , { message: "Password must contain atleast one capital letter" } )
    .refine( value => /[a-z]/ .test(value) , { message: "Password must contain atleast one small letter" } )
    .refine( value => /[0-1]/ .test(value) ,{ message: "Password must constain atleast ine number"} )
}
)

module.exports = zodSigninSchema;