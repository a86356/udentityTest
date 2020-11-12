import React,{ useState,useEffect } from 'react';
import { useHistory } from "react-router-dom";
import {BOOKLIST, PRICELIST} from "../Const";
import './index.css'
import {getCache, setCache} from "../utils";

import ReactEcharts from "echarts-for-react";
function List() {
    let history = useHistory();
    const [bookList, setBookList] = useState([]);

    useEffect(()=>{
        let books = getCache(BOOKLIST)
        setBookList(books)
    },[]);

    const addNewBook=()=>{
        history.push({pathname:"/products/new",state:{no:0}})
    }

    const changeStatus=()=>{
    }

    const clickStatus=(item)=>{
        const {no,active} = item;

        for (let i=0;i<bookList.length;i++){
            if(no==bookList[i].no){
                bookList[i].active = !active
            }
        }
        setBookList([...bookList])
        setCache(BOOKLIST,JSON.stringify(bookList))
    }
    const goEdit=(item)=>{
        const {no} = item;

        history.push({pathname:"/products/"+no+"/edit",state:{no:no}})
    }
    const goView=(item)=>{
        const {no} = item;
        history.push({pathname:"/products/"+no,state:{no:no}})
    }


    const deleteItem=(item)=>{
        const {no} = item;
        var r = window.confirm("do you want to delete no="+no);
        if (r == true) {
            let index=0;
            bookList.map((item,idx)=>{
                if(item.no==no){
                    index = idx
                }
            })
            bookList.splice(index,1)
            setBookList([...bookList])
            setCache(BOOKLIST,JSON.stringify(bookList))
        } else {
        }
    }
    const getOption=()=>{

        let option = {
            title:{
                text:'price change charts'
            },
            tooltip:{   //
                trigger:'axis'
            },
            xAxis:{
                data:[],
                "axisLabel":{
                    interval: 0
                }
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'price',
                    type:'bar',
                    data:[]
                }
            ]
        }
        let list =  getCache(PRICELIST)
        if(list.length>10){
            let len = list.length
            let temp=[]
            for(let i=len-1;i>=len-10;i--){
                temp.push(list[i])
            }
            list=temp;
        }

        let xs= list.map(item=>{
            return item.time
        })
        let ys = list.map(item=>{
            return item.price
        })
        option.xAxis.data=xs;
        option.series[0].data=ys
        

        return option;
    }

    return (
        <div className="App">
            <button onClick={addNewBook} className={"addBtn"}>add new book</button>

            <div className={"listwrap"}>
                <div className="header">
                    <div className={"list-item"} >
                        <div className={"col"}>
                            Active
                        </div>
                        <div className={"col"}>
                            no
                        </div>
                        <div className={"col"}>
                            Name
                        </div>
                        <div className={"col"}>
                            Type
                        </div>
                        <div className={"col"}>
                            Quantity
                        </div>
                        <div className={"col"}>
                            Price
                        </div>
                        <div className={"col"}>
                            view
                        </div>
                        <div className={"col"}>
                            edit
                        </div>
                        <div className={"col"}>
                            delete
                        </div>
                    </div>
                </div>
                {
                    bookList.map((item)=>{
                        return (
                            <div className={"list-item"} key={item.no}>
                                <div className={"col"}>
                                    <input onClick={()=>{clickStatus(item)}} onChange={changeStatus} type="checkbox" checked={item.active}/>
                                </div>
                                <div className={"col"}>
                                    {item.no}
                                </div>
                                <div className={"col"}>
                                    {item.name}
                                </div>
                                <div className={"col"}>
                                    {item.type}
                                </div>
                                <div className={["col ",item.quantity==0 ?'warning':'' ].join('')}  >

                                    {item.quantity}
                                </div>
                                <div className={"col"}>
                                    {item.price}
                                </div>
                                <div className={"col"}>
                                    <div className={"btn viewBtn"} onClick={()=>{goView(item)}}>
                                        view
                                    </div>
                                </div>
                                <div className={"col"}>
                                    <div className={"btn editBtn"} onClick={()=>{goEdit(item)}}>
                                        edit
                                    </div>
                                </div>
                                <div className={"col "}>
                                    <div className={"btn deleteBtn"} onClick={()=>{deleteItem(item)}}>
                                        delete
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
            <div className="price-map">
                <ReactEcharts option={getOption()} />
            </div>
        </div>
    );
}

export default List;