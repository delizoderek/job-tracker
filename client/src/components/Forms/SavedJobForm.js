import { useState } from 'react';
import { useJobContext } from '../../utils/GlobalState';
import { ADD_SAVED_JOB} from '../../utils/actions';
import axios from 'axios';
import Modal from '../UI/Modal';

export default function SavedJobForm(props){
    const [_,dispatch] = useJobContext();
    const [formState, setFormState] = useState({
            jobTitle: '',
            company: '',
            appLink: '',
        });
        

        const handleChange = (event) => {
        console.log(event.target.id);
        if(event.target.id === 'pos-title'){
            setFormState({...formState,jobTitle: event.target.value});
        } else if(event.target.id === 'pos-company'){
            setFormState({...formState,company: event.target.value});
        } else {
            setFormState({...formState,appLink: event.target.value});
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await axios.post('http://localhost:3005/save-job',formState);
        if(res.status){
            console.log('success');
            dispatch({
                type:ADD_SAVED_JOB,
                savedJob:res.data._doc,
            });
        } else {
            console.log(res.message);
        }

        setFormState({
            jobTitle: '',
            company: '',
            appLink: '',
        });

        props.onClose();
    }

        return (
            <Modal isActive={props.modalState} onClose={props.onClose} title="Add Job">
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='pos-title'>Position Title</label>
                        <input id='pos-title' type='text' className="form-control" value={formState.jobTitle} onChange={handleChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='pos-company'>Company</label>
                        <input id='pos-company' type='text' className="form-control" value={formState.company} onChange={handleChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='pos-link'>Link</label>
                        <input id='pos-link' type='text' className="form-control" value={formState.appLink} onChange={handleChange}/>
                    </div>
                    <input type="submit" value="Submit"/>
                </form>
            </Modal>
        )
}
