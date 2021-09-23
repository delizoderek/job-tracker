import React, { Component } from 'react'
import axios from 'axios';
import Modal from '../UI/Modal';

export default class SavedJobForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            jobTitle: '',
            company: '',
            appLink: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(event.target.id);
        if(event.target.id === 'pos-title'){
            this.setState({jobTitle: event.target.value});
        } else if(event.target.id === 'pos-company'){
            this.setState({company: event.target.value});
        } else {
            this.setState({appLink: event.target.value});
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const res = await axios.post('http://localhost:3005/save-job',this.state);
        if(res.status){
            console.log('success');
        } else {
            console.log(res.message);
        }

        this.setState({
            jobTitle: '',
            company: '',
            appLink: '',
        });

        this.props.onClose();
    }

    render() {
        return (
            <Modal isActive={this.props.modalState} onClose={this.props.onClose} title="Add Job">
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='pos-title'>Position Title</label>
                        <input id='pos-title' type='text' className="form-control" value={this.state.jobTitle} onChange={this.handleChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='pos-company'>Company</label>
                        <input id='pos-company' type='text' className="form-control" value={this.state.company} onChange={this.handleChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='pos-link'>Link</label>
                        <input id='pos-link' type='text' className="form-control" value={this.state.appLink} onChange={this.handleChange}/>
                    </div>
                    <input type="submit" value="Submit"/>
                </form>
            </Modal>
        )
    }
}
