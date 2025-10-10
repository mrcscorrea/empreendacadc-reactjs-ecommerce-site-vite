import CoinsModel from "../models/coins.model.js";

export const AddCoinsController = async(request,response)=>{
    try {
        const { email, amount } = request.body 

        if(!email && !amount ){
            return response.status(400).json({
                message : "Provide email, amount",
                error : true,
                success : false
            })
        }

        const payload = {
            email,
            amount
        }

        const createCoins = new CoinsModel(payload)
        const save = await createCoins.save()

        return response.json({
            message : "Coins gerado",
            data : save,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getCoinsController = async(request,response)=>{
    try {
        const data = await CoinsModel.find().sort({createdAt : -1}).populate('coins')
        return response.json({
            message : "Coins data",
            data : data,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const updateCoinsController = async(request,response)=>{
    try {
        const { email, amount } = request.body 

        const updateCoins = await CoinsModel.findByIdAndUpdate(email,{
            email,
            amount
            
        })

        return response.json({
            message : 'Updated Successfully',
            data : updateCoins,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false 
        })
    }
}

export const deleteCoinsController = async(request,response)=>{
    try {
        const { email } = request.body 
        console.log("Email",email)
        const deleteCoins = await CoinsModel.findByIdAndDelete(email)

        return response.json({
            message : "Delete successfully",
            data : deleteCoins,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}