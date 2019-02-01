import { FETCH_RECENT_ORDERS} from "../ReduxActions/ActionConstants.js"
var sampleStoreObject={
     AUTH_TOKEN:"",
     DASH_BOARD:{
        RECENT_ORDERS:[],
        QUICK_LINKS: []
     }
}

function recentOrders(orders=[],action){
    switch (action.type){

        case FETCH_RECENT_ORDERS:
        
    }
}