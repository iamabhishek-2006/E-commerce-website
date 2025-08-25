import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import withAuth from '../components/withAuth';
import NewCategories from '../dailogs/NewCategories';
import DeleteCategories from '../dailogs/DeleteCategory';
import EditCategory from '../dailogs/EditCategory';

const Categories = () => {
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(false);


  const addCategory = (newCategory) => {
    setData([...data, newCategory]);
  };

   const updateCategory = (id, name, slug) => {
     setData(
       data.map((item) => {
         if (item._id === id) {
           return { ...item, name, slug };
         }
         return item;
       })
     );
   };

  const DeleteCategory = (id) => {
      setData(data.filter((item) => item._id !== id));
    };


  useEffect(()=>{
    const fetchData=async ()=>{
      try {
          setLoading(true);
          const url = import.meta.env.VITE_SERVER_URL;
          const res = await fetch(`${url}/admin/category`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const data = await res.json();

          if (!data.success) {
            alert(data.error || "something went wrong");
            return;
          }
          setData(data.data);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
     };
     fetchData();
  },[]);
  console.log(data);

  return (
    <Layout>
      <div className="flex justify-between items-center p-3 border-b border-gray-300  h-[50]px select-none">
        <h1 className="font-bold">Categories</h1>
        <NewCategories add={addCategory} />
      </div>
      <div className="flex justify-center items-center ">
        {!data.length && loading && <h1>Loading...</h1>}{" "}
      </div>
      {data.length !== 0 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Total Products</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.slug}</td>
                  <td>{item.total || 0}</td>
                  <td className="flex gap-2">
                    <EditCategory        id={item._id} name={item.name} edit={updateCategory}        />
                    <DeleteCategories id={item._id} remove={DeleteCategory} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}

export default withAuth(Categories);
