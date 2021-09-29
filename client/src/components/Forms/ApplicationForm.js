import {useState} from 'react'
import { useJobContext } from '../../utils/GlobalState';
import { ADD_APP_JOB } from '../../utils/actions';
import API from '../Helpers/api';
import Modal from '../UI/Modal';

export default function SavedJobForm(props) {
    const [_,dispatch] = useJobContext();
    const [formState, setFormState] = useState({
        jobTitle: '',
        company: '',
        appId: '',
        appLink: '',
        processState: '',
    });

    // const handleChange = (event) => {
    //     console.log(event.target.id);
    //     if(event.target.id === 'pos-title'){
    //         setFormState({...formState,jobTitle: event.target.value});
    //     } else if(event.target.id === 'pos-company'){
    //         setFormState({...formState,company: event.target.value});
    //     } else if (event.target.id === 'pos-id') {
    //         setFormState({...formState,appId: event.target.value});
    //     } else {
    //         setFormState({...formState,appLink: event.target.value});
    //     }
    // }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await API.addApp(formState);
        if(res.status){
            console.log('success');
            dispatch({
                type:ADD_APP_JOB,
                appliedJob:res.data._doc,
            });
        } else {
            console.log(res.message);
        }

        setFormState({
            jobTitle: '',
            company: '',
            appId: '',
            appLink: '',
            processState: '',
        });

        props.onClose();
    }
        return (
            <Modal isActive={props.modalState} onClose={props.onClose} title="Add Job">
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='pos-title'>Position Title</label>
                        <input id='pos-title' name='jobTitle' type='text' className="form-control" value={formState.jobTitle} onChange={handleInputChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='pos-company'>Company</label>
                        <input id='pos-company' name='company' type='text' className="form-control" value={formState.company} onChange={handleInputChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='pos-id'>App Id</label>
                        <input id='pos-id' name='appId' type='text' className="form-control" value={formState.appId} onChange={handleInputChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='pos-link'>Link</label>
                        <input id='pos-link' name='appLink' type='text' className="form-control" value={formState.appLink} onChange={handleInputChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='app-state'>Application State</label>
                        <select id='app-state' name='processState' value={formState.processState} onChange={handleInputChange}>
                            <option value='Default'>Choose a Value</option>
                            <option value='Applied'>Applied</option>
                            <option value='Interview'>Interview</option>
                            <option value='Offer'>Offer</option>
                            <option value='Rejected'>Rejected</option>
                        </select>
                    </div>
                    <input type="submit" value="Submit" disabled={formState.processState ==='Default'}/>
                </form>
            </Modal>
        );
}
