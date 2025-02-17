const z = require("zod");

const updateSchema = z.object({
    
                firstName:z.string()
                    .min(3,{ message:"FirstName Should be atleast 3 letters" })
                    .refine(value=>/^[A-Z]/.test(value),{ message:"FirstName must start with Capital letter" })
                    .optional(),
            
                lastName: z.string()
                    .min(3, { message:"LastName must contin atleast 3 letters" })
                    .refine(value=>/^[A-Z]/.test(value),{ message:"FirstName must start with Capital letter" })
                    .optional(),
       
        password: z.string()    
            .min(6,{ message:"The password must atleast contain 6 characters" })
            .refine(value=>/[A-Z]/.test(value), { message:"new Password must contain atleast one uppercase letter" })
            .refine(value=>/[a-z]/.test(value), { message:"new Password must contain atleast one lowercase letter" })
            .refine(value=>/[0-9]/.test(value), { message:"new Password must contain atleast one number" })
            .optional(),
    
        mobileNumber: z.string()
        .length(10,{ message:"Mobile number must be 10 digits" })   
        .optional() 
        
})

module.exports = updateSchema;
