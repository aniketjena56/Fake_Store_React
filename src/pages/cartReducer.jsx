export const cartReducer = (state, action) => {

    if (action.type === "ADD_TO_CART") {

        // so here "...state":- mean "products" & "cart" are separated and from there we will change content in "cart" 
        // cart is an array and we will store data which is already there so used "...state.cart" , the previous data may b empty or elements present
        // then we will use "action.payload" as we have stored "productDetails" in productcard.jsx 
        // so here in cart all elements will b spread then we will store a new element 

        state = {
            ...state,
            // so here we ae increasing the number of ssame item , "quantity key" is inside each product
            cart: [...state.cart,
                 { ...action.payload, quantity: 1 },], // so here payload storing one item only for each product and at down made a func to increase the quantity 

        };
        return state;  // if wont return anything so in state null will b stored which breaks the code  so its trying to store "null" in state


    }
    if (action.type === "REMOVE_FROM_CART") {
        state = {
            ...state,
            cart: state.cart.filter((prod) =>  prod.id !== action.payload.id )
        }
        //so here we are updating cartby removing the product using its id
        // if filter out them into a new array where the "id" is not equal to the "id got clicked " i.e. is in "payload.id"
        // mean cart:[a,b, c,d]  payload : b -> if (a !== b) return into new array [a] , check b!==b -> false -> filtered -> c!==b -> [a, c] also same for d -> cart: [a,c,d] -> returns new state
        console.log("hello decremrent")
        return state;

    }

// steps : so due to useEffect in "ProductCard.jsx" "dispatch()" gets called inside acessesing 2 keys whose val is increment
// so now come to "cartContext" and "usetReducer" starts executing or updating state as "dispatch" is use to update "state"
// so in "dispatch" a command was given s it will go to "cartReducer"
// then it will check the "type" is getting to update , so its "increment" then the code will run

// now use this to work for add to cart :In Code
// use Onclick in ADD to cart "input" 

if(action.type === "INCREMENT_QUANTITY"){
    state={
        ...state,
       cart:state.cart.map((product) =>
        product.id === action.payload.id ? {...product , quantity :product.quantity+1} : product
    )
    }
    return state
}
// so here : if we are increasing the number of product of same product then
// it means we are picking one element in cart and adding more product 
// mean we have to acess the id of product in cart[] and product id from the products[] 
// mean if (cart.product.id  === products.product.id ) -> increase the quantity of product by acessing the product's obj's quantity key : value +1
    

if(action.type === "DECREMENT_QUANTITY"){
    state={
        ...state,
       cart:state.cart.map((product) =>
       
        product.id === action.payload.id ? {...product , quantity :product.quantity - 1} : product
    )
    }
    return state
}

if(action.type === "SET_STATE"){
    console.log(action);
    
    state =  {...action.payload}
    return state
}
if(action.type === "FILTER_SEARCH"){
    
    state = {...state , products:action.payload}
    return state
}


}
// if using {} then use return otherwise it will return undefined