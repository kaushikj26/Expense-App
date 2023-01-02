import React from "react";
import {Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import {Pie, Bar} from 'react-chartjs-2'                    //npm install --save chart.js react-chartjs-2
import { useSelector } from "react-redux";

ChartJS.register(ArcElement,Tooltip,Legend, CategoryScale, LinearScale, BarElement, Title)

const CategoryStats = (props) =>{
    const  categories = useSelector((state)=>{
        return state.categories
    }) || {}

    const expenses = useSelector((state)=>{
        return state.expenses
    }) || {}

    const options ={
        responsive: true,
        plugins :{
            title : {
                display : true,
                text : 'Category wise ditribution table'
            }
        }
    }

    const findCategory = (exp) => {
        const res = categories.find((category) => {
          return exp.categoryId === category._id
        })
        return res.name
    }
    
    const categoriesAmount = {}
    categories.forEach((category) => {
        expenses.forEach((expense) => {
            const res = findCategory(expense)
            if (res === category.name) {
            if (categoriesAmount.hasOwnProperty(res)) {
              categoriesAmount[res] += Number(expense.amount)
            } else {
              categoriesAmount[res] = Number(expense.amount)
            }
          }
        })
    })


    const barData = {
        labels: Object.keys(categoriesAmount) ,
        datasets : [{
            label : 'Expenses',
            data: Object.values(categoriesAmount),
            backgroundColor : 'rgba (245, 150, 70, 20)'
        }]
    }

    const data = {
        labels: Object.keys(categoriesAmount) ,                                 //label of each category
        datasets : [
            {
                label : 'Expense',              
                data: Object.values(categoriesAmount),                          //value of each category
                backgroundColor : [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
                borderWidth: 1,
            }
        ]
    }

    return(
        <div>
            <h3>CategoryStats</h3>
            {categories.length <= 5 ? (
                <div>
                    <Pie data={data}  />
                </div>
            ) : (
                <div style={{width: 500}}>
                    <Bar options={options} data={barData} />
                </div>
            )}
        </div>
    )
}

export default CategoryStats
