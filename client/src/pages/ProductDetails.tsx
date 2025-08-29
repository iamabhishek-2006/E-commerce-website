import ImageContainer from "@/components/shared/ImageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFetch } from "@/hooks/useFetch";
import { url } from "@/lib/utils";
import useUserStore from "@/store/user.Store";
import type { IProduct } from "@/types/Index";
import { Heart, Loader, ShoppingCart } from "lucide-react";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ProductDetails = () => {
  const router=useNavigate();
  const { slug } = useParams();
  const {user,cart,addCartItem,removeCartItem}=useUserStore();
  const { data, loading } = useFetch(`${url}/product/${slug}`);
  const [readMore, setReadMore] = React.useState(false);

  const { data: products, loading: productsLoading } = useFetch(  "http://localhost:4000/products");


  const addToCart=async()=>{
    // check if user is logged in
    if(!user){
      router(`/signin?redirect=/product/${slug}`);
      return;
    }

    // add item into client cart
    // addCartItem({item:data._id,quantity:1});
        addCartItem({
          item: {
            _id: data._id,
            title: data.title,
            price: data.price,
            mrp: data.mrp,
            images: [data.images[0]],
            slug: data.slug,
          },
          quantity: 1,
        });

    // add item into server cart
    try {
    const res=await fetch(`${url}/user/cart`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${localStorage.getItem("token")}`,
      },
      body:JSON.stringify({item:data._id,quantity:1}),
    })
    const json=await res.json();

    if(!json.success){
      toast.error(json.error || "something went wrong");
      removeCartItem(data._id);
      return false;
    }
    } catch (error) {
    console.log(error);
    toast.error("something went wrong");
 
    // remove item from client cart
    removeCartItem(data._id);
    return false;
    }
  }

  if (loading || !data)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-60px)]">
        <Loader className="animate-spin" size={40} />
      </div>
    );

  const isInCart=cart?.some((item)=>item.item._id===data._id);
    const handleBuyNow = async () => {
      // check if user is logged in
      if (!user) {
        router(`/signin?redirect=/product/${slug}`);
        return;
      }

      if (isInCart) {
        router("/cart");
      } else {
        const added = await addToCart();
        if (added) router("/cart");
      }
    };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between flex-col md:flex-row">
        <div className="p-2 w-full border ">
          <ImageContainer data={data.images} />
        </div>
        <div className="w-full p-2 ">
          <Link
            to={`/products/${data.category.slug}`}
            className="text-blue-500 font-semibold"
          >
            {data.category.name}
          </Link>
          <h1 className="text-2xl font-semibold py-3">{data.title}</h1>
          <p className={readMore ? "" : "line-clamp-3"}>{data.description}</p>
          <p
            className="text-blue-500 font-semibold cursor-pointer "
            onClick={() => setReadMore(!readMore)}
          >
            Read{readMore ? "Less" : "More"}{" "}
          </p>
          <div className="py-6">
            <span className="font-semibold text-2xl">₹{data.price}</span>
            <span className=" line-through text-lg">₹{data.mrp}</span>
            <div className="text-xs italic" >Inclusive  of all taxes</div>
          </div>
          {/* <div>
          <span className="font-semibold">⭐{data.rating}/5</span>
        </div> */}

          <div className="flex gap-2 w-full justify-between">
            <Button className="flex-1  hover:bg-gray-400 text-black cursor-pointer bg-amber-400" onClick={isInCart?()=>router("/cart"):addToCart}>
              <ShoppingCart /> {isInCart ? "Added Got to Cart": "Add to cart"}
            </Button>
            <Button className="flex-1 bg-blue-500 hover:bg-blue-600 cursor-pointer" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      <div className="py-10">
        <h1 className="text-2xl font-semibold">Reviews</h1>
        <p className="text-sm italic">no reviews yet</p>
      </div>
      <div className="py-10">
        <h1 className="text-2xl font-semibold">People also like this-</h1>
      </div>
      <div className="flex flex-wrap gap-3">
        {products &&  products.map((product:any)=>
        <OtherProduct key={product._id} {...product}/>)}
      </div>
    </div>
  );
};


const OtherProduct = (data: IProduct) => {
  return (


    <Link to={`/product/${data.slug}`} >
      <Card className="relative w-[200px] p-0 overflow-hidden gap-0">
        <div className="absolute top-2 right-2 cursor-pointer">
          <Heart className="text-black" />
        </div>
        <div className="w-full h-[250px]">
          <img src={data?.images[0]?.url} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="p-2">
          <h1 className="text-sm font-semibold line-clamp-2">{data.title}</h1>
          <div className="pt-3">
            <span className="font-semibold">₹{data.price}</span>/<span className="line-through text-xs">₹{data.mrp}</span>
          </div>
        </div>
      </Card>
    </Link>


  );
};


export default ProductDetails;

