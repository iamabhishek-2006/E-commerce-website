import React, { useState } from 'react'

const NewCategories = ({add}) => {
    const [open,setOpen]=React.useState(false);

    const onClose=()=>{
        setOpen(false);
    };
    
  return (
    <div>
      <button onClick={()=>setOpen(true)} className="bg-blue-400 cursor-pointer p-1 text-xs px-2 rounded text-white font-semibold ">
        New Cateogories
      </button>
      <Dailog add={add} open={open} onClose={onClose}/>
    </div>
  );
};

const Dailog=({add,open,onClose})=>{
  const [input,setInput]=useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate=async ()=>{
    // create cateogory api call
      try {
      setLoading(true);
      const res=await fetch("http://localhost:4000/admin/category",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("token")} `
        },
        body:JSON.stringify({name:input.trim()}),
      });
      const data=await res.json();
      if(!data.success){
        // show toast
        alert(data.error || "something went wrong");
        return;
      }
      add(data.data);
      setInput("");
      onClose();
      
      } catch (error) {
      console.log(error);
      }finally{
        setLoading(false);
      }
  }
    return (
      <div
        className={`${open ? "flex" : "hidden"  } fixed top-0 left-0 w-full h-full bg-gray-500/50 justify-center items-center `}
      >
        <div  className='bg-white p-4 m-4 w-[500px]  relative rounded  '>

          <button onClick={onClose} className='absolute top-1 right-3 text-xs font-bold cursor-pointer' >X</button>
          <div>
            <h1 className='font-bold'>Add new categories</h1>
            <div className='flex gap-2 items-center mt-5'>
              <label>Name:</label>
              <input className='w-full rounded border text-sm border-gray-300 p-1' 
              type="text"
              placeholder='Enter the categories name'
              value={input}
              onChange={(e)=>setInput(e.target.value)}/>
              
            </div>
            <button disabled={!input || loading} className= {`float-left  w-fit  bg-blue-400 cursor-pointer p-1 text-xs px-2 rounded
             text-white font-semibold disabled:opacity-50  disabled:cursor-not-allowed
              ${!input && "disabled:cursor-not-allowed"} ${loading && "disabled:cursor-progress"}`}
            onClick={handleCreate}
             >
              {loading ? "creating..." :"Create"}
            </button>
          </div>
        </div>
      </div>
    );
};

export default NewCategories;