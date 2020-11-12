import React,{ useState,useEffect } from 'react';
import {setCache,getCache,getCnTime} from "../utils";
import {BOOKLIST,PRICELIST} from "../Const";
import { useHistory ,useLocation} from "react-router-dom";
import './index.css'

function Edit() {
    const location = useLocation();
    let no = location.state.no

    let history = useHistory();

    const [editData, setEditData] = useState({
        no:1,
        active:false,
        name:"",
        type:"",
        quantity:"",
        price:""
    })

    useEffect(()=>{
        let list = getCache(BOOKLIST);
        if(list && list.length>0){
            list.map((item,index)=>{

                if(item.no==no){
                    setEditData({...item})
                }
            })
        }



    },[])

    const changeVal=(e)=>{
        const key = e.target.dataset.name;
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const obj={}
        obj[key]=value
        setEditData({...editData,...obj})
    }

    const save=()=>{
        const {name,type,quantity,price} = editData
        if(name==''){
            alert("please enter name")
            return ;
        }
        if(type==''){
            alert("please enter type")
            return ;
        }
        if(quantity==''  ){
            alert("please enter quantity")
            return ;
        }
        if (!(/(^[0-9]\d*$)/.test(quantity))) {
            alert("please positive integer...")
            return ;
        }

        if(price=='' ){
            alert("please enter price")
            return ;
        }

        var reg = /^\d+(?=\.{0,1}\d+$|$)/
        if(!reg.test(price)) {
            alert("please right price")
            return ;
        }

        let list=  getCache(BOOKLIST)

        if(no==0){


            //add new one
            let newId=1;
            if(list.length>0){
                 let lastId = list[list.length-1].no
                 newId=++lastId
            }
            editData.no = newId
            list.push(editData)
        }else{
            list.map((item,index)=>{
                if(item.no==no){
                    list[index] = editData
                }
            })

        }

        setCache(BOOKLIST,JSON.stringify(list))

        savePrice();
        alert("save success");
        history.push('/products');

    }

    const savePrice=()=>{

        let list = getCache(PRICELIST)
        list.push({time:getCnTime(),price:editData.price})
        setCache(PRICELIST,JSON.stringify(list))
    }

    useEffect(()=>{

    },[editData])

    return (
        <div className="App">
            <div className="editform">
                <div className="item">
                    <div className="label">
                        Name:
                    </div>
                    <div className="inputwrap">
                        <input type="text" data-name={"name"} value={editData.name}
                               onChange={(e)=>{changeVal(e)}}/>
                    </div>
                </div>
                <div className="item">
                    <div className="label">
                        type:
                    </div>
                    <div className="inputwrap">
                        <input type="text" data-name={"type"}  value={editData.type}
                               onChange={(e)=>{changeVal(e)}}
                        />
                    </div>
                </div>
                <div className="item">
                    <div className="label">
                        quantity:
                    </div>
                    <div className="inputwrap">
                        <input type="text" value={editData.quantity}
                               data-name={"quantity"}
                               onChange={(e)=>{changeVal(e)}}
                        />
                    </div>
                </div>
                <div className="item">
                    <div className="label">
                        price:
                    </div>
                    <div className="inputwrap">
                        <input type="text" value={editData.price}
                               data-name={"price"}
                               onChange={(e)=>{changeVal(e)}}
                        />
                    </div>
                </div>
                <div className="item">
                    <div className="label">
                        active:
                    </div>
                    <div className="inputwrap">
                        <input type="checkbox"
                               checked={editData.active}
                               data-name={"active"}
                               onChange={(e)=>{changeVal(e)}}
                        />
                    </div>
                </div>
                <div className={"btnwrap"}>
                    <div className="saveBtn btn" onClick={save}>
                        save
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Edit;