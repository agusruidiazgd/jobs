export const ACTION_GET = "GETDATA";
export const ACTION_EDIT = "EDIT";
export const ACTION_ADD = "ADD";

export const reducer = (users, action) =>{
    switch(action.type){
        case ACTION_GET:
            return [action.payload];
        case ACTION_ADD:
            return (
                [...users, action.payload]
            );
        case ACTION_EDIT:
            return users.map(user=>{
                if(user.id == action.payload.id){
                    user.name = action.payload.name;
                    user.jobId = action.payload.jobId;

                }
                return user;
            });
        default:  
            return users;
    }
}