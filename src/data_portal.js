import axios from 'axios';

const model_predict = async (data, pred_type) => {
    try {
        const response = await fetch("http://ip172-18-0-6-chbgqqg1k7jg00fbruf0-8000.direct.labs.play-with-docker.com/predictions/"+pred_type, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 
                'Content-Type': 'application/json',
            },
        })
        const prediction=await response.json()
        console.log(prediction)
        return prediction.prediction
    } catch (error) {
        console.log(error)
    }
}

const crop_model_predict = async (data) => {
    try {
        const response = await fetch("http://ip172-18-0-6-chbgqqg1k7jg00fbruf0-8000.direct.labs.play-with-docker.com/predictions/crop_yield", {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
            },
        })
        const prediction= await response.json()
        console.log(prediction)
        return prediction
    } catch (error) {
        console.log(error)
    }
}

const egg_model_predict = async (data) => {
    try {
        const response = await axios({
            method: "POST",
            url: "https://detect.roboflow.com/egg-detection-ud1ys/13",
            params: {
                api_key: "RpcN1ZXEN9Zar0vUNnxK"
            },
            data: data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        console.log(response)
        const prediction=response.data
        console.log(prediction)
    } catch (error) {
        console.log(error)
    }
}


export {model_predict, crop_model_predict, egg_model_predict}