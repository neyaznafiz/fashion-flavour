import axios from "axios";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdArrowForwardIos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../../Firebase/firebase.init";
import useProducts from "../../../Hooks/useProducts/useProducts";

const MyProducts = () => {
  const [user] = useAuthState(auth);
  const [product, setProduct] = useProducts([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getProductsFilterByEmail = async () => {
      const email = user.email;
      console.log(email);

      const url = `https://fashion-flavour-serverside-production.up.railway.app/mydress?email=${email}`;
      try {
        const { data } = await axios.get(url, {
          // headers: {
          //     authorization: `Bearer ${localStorage.getItem('accessJwtToken')}`
          // }
        });
        setProduct(data);
      } catch (error) {
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          // signOut(auth);
          // navigate('/login')
          toast.error("Facing some issues.");
        }
      }
    };
    getProductsFilterByEmail();
  }, [user, product]);

  const productDeleteHandle = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await axios.delete(
        `https://fashion-flavour-serverside-production.up.railway.app/dress/${id}`,
        product
      );
      const exist = product.filter((product) => product._id !== id);
      setProduct(exist);
    } else {
      console.log("cancel");
    }
  };

  return (
    <div className="my-16 grid mx-auto">
      <div className="my-16 mx-auto ">
        <h2
          className="text-center text-4xl border-b-2 px-5 py-3"
          data-aos="zoom-in"
        >
          YOUR PRODUCTS - {product.length}
        </h2>
      </div>

      <div className="flex justify-between">
        <div className="">
          <button
            onClick={() => navigate(-1)}
            className="card-shadow py-2 px-4 font-semibold"
            data-aos="fade-left"
          >
            BACK
          </button>
        </div>

        <div className=" pb-4">
          <Link
            to="/manageinventory"
            className="card-shadow hover:shadow-lg px-3 py-2 flex font-semibold hover:text-black"
            data-aos="fade-right"
          >
            MANAGE INVENTORY <MdArrowForwardIos className="mt-1 ml-2" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {product.map((product) => (
          <div key={product._id} className=""  data-aos="zoom-in">
            <div className="flex justify-center ">
              <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg hover-zoom">
                <img
                  className=" w-full h-48 lg:h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg hover:rounded-lg"
                  src={product.img}
                  alt=""
                  data-aos="zoom-in"
                />
                <div className="p-6 flex flex-col justify-start">
                  <h5
                    className="text-gray-900 text-3xl font-medium mb-1 font-serif"
                    data-aos="fade-left"
                  >
                    {product.name}
                  </h5>

                  <div className="">
                    <p
                      className="text-gray-600 text-lg font-bold pb-4"
                      data-aos="fade-left"
                    >
                      Supplier: {product.supplier}
                    </p>
                    <p
                      className="text-gray-700 text-base mb-4"
                      data-aos="fade-left"
                    >
                      {product?.description?.slice(0, 110)}....
                    </p>

                    <div className="flex justify-between font-semibold">
                      <p className="text-gray-600" data-aos="fade-left">
                        Price : ${product.price}
                      </p>
                      <p className="text-gray-600" data-aos="fade-left">
                        Quantity : {product.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end h-full items-end">
                    <button
                      onClick={() => productDeleteHandle(product._id)}
                      className="card-shadow text-center hover:shadow-lg hover:text-black font-semibold px-3 py-2"
                      data-aos="fade-left"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
