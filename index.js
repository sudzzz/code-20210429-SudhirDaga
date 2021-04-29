const express = require("express");
const fs = require("fs")

const app = express()

app.set('view engine', 'ejs')

app.set("views", __dirname + "/views");


const output = []
var num = 0

app.get('/',(req,res,)=>{
    fs.readFile(__dirname + "/data.json",'utf-8',(error,jsonString) => {
        if(jsonString){
            const data = JSON.parse(jsonString)
            data.forEach(result => {
                const gender = result.Gender
                const height = result.HeightCm
                const weight = result.WeightKg
                var category = ""
                var risk = ""
                const bmi = calculateBMI(height,weight)
                if(bmi<=18.4){
                    category = "Underweight"
                    risk = "Malnutrition risk"
                }
                else if(bmi>=18.5 && bmi<=24.9){
                    category = "Normal Weight"
                    risk = "Low Risk"
                }
                else if(bmi>=25 && bmi<=29.9){
                    category = "OverWeight"
                    risk = "Enhanced Risk"
                    num++
                }
                else if(bmi>=30 && bmi<=34.9){
                    category = "Moderately Obese"
                    risk = "Medium Risk"
                }
                else if(bmi>=35 && bmi<=39.9){
                    category = "Severely Obese"
                    risk = "High Risk"
                }
                else{
                    category = "Very Severely Obese"
                    risk = "Very high risk"
                }
                const details = {
                    gender : gender,
                    height : height,
                    weight : weight,
                    bmi: bmi,
                    category : category,
                    risk : risk
                }
                output.push(details)
            })
        } else {
            console.log(error)
        }
        res.render("index",{data:output,number:num})
    })
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})

function calculateBMI(height,weight){
    height = height/100
    const bmi = weight/(height*height)
    const result = bmi.toFixed(1)
    return result;
}