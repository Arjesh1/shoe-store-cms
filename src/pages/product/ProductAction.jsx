import { collection, doc, getDocs, query, setDoc } from "firebase/firestore"
import { db } from "../../config/firebase-config"
import { toast } from "react-toastify"
import { setProdu } from "./productSlice"

//get all the category from firebase
export const getProductsAction = () => async(dispatch) =>{
    try {

        const q = query(collection(db, "product"))
        const prodSnap = await getDocs(q)
        const prodList = []

        prodSnap.forEach((doc) => {
            const catDt = {
                ...doc.data(), 
                slug: doc.id
            }

            prodList.push(catDt)
          });

          dispatch(setProdu(prodList))

    } catch (error) {
        toast.error(error.message)
        
    }


}

// add product to firebase
export const addProductAction = ({slug, ...rest}) => async (dispatch) => {

    try {
        const promise =  setDoc(doc(db, "product",slug  ), rest, {merge:true})

        toast.promise( promise, {
            pending: "Please wait..",
            success: "Product has been added."
        })

        //fetch all the category and mount in redux
        await promise

    
        
    } catch (error) {
        toast.error(error.message)
        console.log(error);
        
    }
  
}