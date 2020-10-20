export const ACTION_GET_JOB = "GET JOBs";
export const ACTION_EDIT_JOB = "EDIT JOB";
export const ACTION_DELETE_JOB = "DELETE JOB";



export const reducerJob = (jobs, action) =>{
    switch(action.type) {
        case ACTION_GET_JOB: 
            return action.payload;
        case ACTION_EDIT_JOB:
            return jobs.map(job =>{
                if(job.id === action.payload.id){
                    job.name = action.payload.name;
                }
            })
    }
}