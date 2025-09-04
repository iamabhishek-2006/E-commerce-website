import React from 'react'
import Layout from '../components/Layout'
import withAuth from '../components/withAuth';
import { useState } from 'react';
import { useEffect } from 'react';

const Orders = () => {
    const [data, setData] = useState([]);
    console.log(data);

  useEffect(()=>{
    const getOrders=async()=>{
      try {
      const res=await fetch("http://localhost:4000/admin/order",{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        }
      } );
      const data=await res.json();
      setData(data);
      } catch (error) {
        
      }
    }
  })


  return (
    <Layout>
      <div>
        <h1>Order details</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ORDER ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  EMAIL
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  PRODUCT
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  QUANTITY
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  TOTAL RUPEES
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  STATUS
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  PAYMENT
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ORDER DATE
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ACTION
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Orders);