import { signinSchema } from "../module/auth/auth.validation.js"


// const validation = (req,res,next) => {
// const validationREsult = signinSchema.validate(req.body,{abortEarly:false});
// console.log(validationREsult)
// console.log(validationREsult.details)
// return res.json(validationREsult)
// }
// export default validation

//****************************************'طريقة دايمنك للجداول'****************************** */
// المثال التالي عشان يكون دايننمك للجدول
//  schema => signinSchema OR signupSchema

// const validation = (schema)=>{
//     return (req,res,next)=>{
//         // استخدمت هاي الطريقة عشان بدي استلم جدول
//         // ما بزبط استخدم 4 ارجيومنت لانه بفكر بدي ابعت ايررور
//         // (schema, req,res,next)
//         const validationRes=schema.validate(req.body,{abortEarly:false});
//         console.log( validationRes);
//         return res.json(validationRes);

//     }
// }
//  export default validation




//******************************** **'طريقة غير   دايمنك للجداول'****************************** */

// const validation = (schema)=>{

//     return (req, res, next)=>{
//         const validationArray=[];
//         if(schema.body){
//             const validationRes=schema.body.validate(req.body,{abortEarly:false});
//             //         console.log( validationRes);
//             //         return res.json(validationRes);
//         }
//         if(schema.query){
//             const validationRes=schema.query.validate(req.body,{abortEarly:false});
//             //         console.log( validationRes);
//             //         return res.json(validationRes);
//         }
//     }

// }

const dataMethods = ['body', 'query', 'params','file'];
const validation = (schema)=>{
    return(req,res,next)=>{
        const validationArray=[];
        dataMethods.forEach(key=>{
        if(schema[key]) {
             const validationRes=schema[key].validate(req[key],{abortEarly:false});
             if(validationRes.error){
                    validationArray.push(validationRes.error.details);
                }
             }})

             if(validationArray.length >0){
                return res.json({message:'validation ERROR !!',validationArray})
             }else{
                next();
             }

    }// return
}

export default validation














// const datatype=['body','query','params'];
// const validation = (schema)=>{
//     return(req,res,next)=>{
//        let validationArray=[]; 
     
//         datatype.forEach(key=>{
//             if(schema[key]){
//                 console.log(schema[key])
//                 // const validationResult= schema[key].validate(req[key],{abortEarly:false});
//                 // console.log(validationResult)
//                 // if(validationResult.error){
//                 //     validationArray.push(validationResult.error.details);
//                 // }
//             }
//         })
//         if(validationArray.length>0){
//             return res.json({message:'validation error',validationArray})
//         }else{
//             next()
//         }

//     }
// }

// export default validation



// const dataMethods=['body','query','params']

// const validation = (Schema)=>{

//     return(req,res,next)=>{
//         const validationArray=[]

//         dataMethods.forEach(key=>{
//             // console.log(key)body  query params
//             // هون يتم تنفيد الفاليديشن
//             if(Schema[key]){
//                 const validationResult=Schema[key].validate(req[key] ,{abortEarly:false})
//             if(validationResult.error){
//                 validationArray.push(validationResult.error.details)
//             }

//             }
//         })
//         if(validationArray.length >0 ){
//             return res.json({message: 'validationERROR',validationArray})
//         }else{
//              next()
//         }

//     } 
// }
// export default validation 






 






// const validation = (Schema)=>{


// return (req,res,next)=>{

//     const validationArray=[];
//     const validationResult = Schema.body.validate(req.body, {abortEarly:false});
//     const validationResultQuery= Schema.query.validate(req.query, {abortEarly:false});
//     const validationResultparams= Schema.query.validate(req.query, {abortEarly:false});
//     const validationResultHeaders= Schema.query.validate(req.query, {abortEarly:false});
//     // الكود طويل وبحتاج اكتر من دالة{}function
//     if(validationResult.error){
//         validationArray.push(validationResult)
//     }
//     if(validationResultQuery.error){
//         validationArray.push(validationResultQuery)
//     }
//     if(validationArray.length > 0){
//         return res.json({message:"validation error",validationArray})
// }else{
//     return next()
// }

// }
// }
// export default validation 