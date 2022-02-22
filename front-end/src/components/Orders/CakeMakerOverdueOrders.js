import {Fragment} from 'react'
import { useParams } from 'react-router-dom'

const CakeMakerOverdueOrders = () => {

    var params = useParams()
    var warning_count = params.warnings

    return(
        <div className='text-center'>
            <h1 className="text-center common-header mb-5">Warning</h1>
           {
               warning_count == 2 ? 
               <h1 className='text-danger'>This is the {warning_count}nd warning for you</h1> :
               warning_count == 1 ?
                <h1 className='text-danger'>This is the {warning_count}st warning for you</h1> : 
                <h1>You have no any warnings</h1> 
               
           }
            <p>According to our policies and restrictions you can't overdue any order without informing the admin. </p>
            {
                warning_count == 2 ? 
                <b>If you overdue another order your accout will be restricted</b> : 
                 warning_count == 2 ? 
                <b>You should responsible for your orders. Because the customer is trusting about you. Please make sure to not to do this again</b> :
                <b>Appriciate your service in our website. We hope you will continue this by giving your orders up to date</b> 
            }
        </div>
    )
}

export default CakeMakerOverdueOrders