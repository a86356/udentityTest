import React,{ useState,useEffect } from 'react';
import {setCache,getCache,getCnTime} from "../utils";
import {BOOKLIST,PRICELIST} from "../Const";
import {useHistory, useLocation, useParams} from "react-router-dom";
import './index.css'

function Preview() {
    const {no} = useParams();
    console.log()
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
                console.log(item)
                console.log(no)
                if(item.no==no){
                    setEditData({...item})
                }
            })
        }

    },[])



    const save=()=>{

        history.push('/products');

    }




    return (
        <div className="App">
            <div className="editform">
                <div className="item">
                    <div className="label">
                        Name:
                    </div>
                    <div className="inputwrap">
                        <input type="text" data-name={"name"} value={editData.name}
                               readOnly={true}/>
                    </div>
                </div>
                <div className="item">
                    <div className="label">
                        type:
                    </div>
                    <div className="inputwrap">
                        <input type="text" data-name={"type"}  value={editData.type}
                               readOnly={true}
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
                               readOnly={true}
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
                               readOnly={true}
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
                                readOnly={true}
                        />
                    </div>
                </div>
                <div className={"btnwrap"}>
                    <div className="saveBtn btn" onClick={save}>
                        back
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Preview;