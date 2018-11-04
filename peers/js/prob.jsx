import React from 'react';
import PropTypes from 'prop-types';

class Prob extends React.Component{
    constructor(props){
        super(props);
        this.state={age:"30", gender:"0", diagcode:"724.2",depression:"1", opioid:"1", duration:"30",rtwprob:"0"};
        this.handleage = this.handleage.bind(this);
        this.handledepress = this.handledepress.bind(this);
        this.handlediag = this.handlediag.bind(this);
        this.handlegender = this.handlegender.bind(this);
        this.handleopioid = this.handleopioid.bind(this);
        this.handlesubmit = this.handlesubmit.bind(this);
        this.handleduration = this.handleduration.bind(this);
    }
    componentDidMount(){
        fetch(this.props.url, {credentials:"same-origin"})
        .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
        .then((data) => {
                this.setState({
                    rtwprob: data.rtwprob,
                });
            })
        .catch(error => console.log(error));
    }
    handlesubmit(event){
        console.log(this.props.url);
        event.preventDefault();
        fetch(this.props.url,{
            method:'post',
            credentials:'same-origin',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                age: this.state.age,
                diagcode: this.state.diagcode,
                gender: this.state.gender,
                opioid: this.state.opioid,
                depression: this.state.depression,
                duration: this.state.duration,
            }),
        })
        .then((response) => {
            if(!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            this.setState({
                rtwprob: data.rtwprob,
            });
        })
        .catch(error => console.log(error));
    }
    handlegender(event){
        this.setState({
            gender: event.target.value,
        })
    }
    handleopioid(event){
        this.setState({
            opioid: event.target.value,
        })
    }
    handledepress(event){
        this.setState({
            depression: event.target.value,
        })
    }
    handlediag(event){
        this.setState({
            diagcode: event.target.value,
        })
    }
    handleage(event){
        this.setState({
            age: event.target.value,
        });
    }
    handleduration(event){
        this.setState({
            duration: event.target.value,
        });
    }
    render(){
        return(
        <div className="row">
        <article className="col-xs-12">
            <h2>Return to Work Case Probability</h2>
            <p>Set your search criteria, then get the probability of returning to work.</p>
            <div class = "form">
                <form action="#" method="post" enctype="multipart/form-data">
                    <h3> Input Patient Age: </h3>
                    <input type="text" name="age" value={this.state.age} onChange={this.handleage} /><br/>
                    <h3> Select Gender: </h3>
                    <select name="gender" onChange={this.handlegender} value={this.state.gender}>
                        <option value="0" >Male</option>
                        <option value="1">Female</option>
                    </select>
                    <h3>Select backstrain codes: </h3>
                        <select className="diagcode" onChange={this.handlediag} value={this.state.diagcode}>
                            <option value="724.2">724.2</option>
                            <option value="846">846</option>
                            <option value="847">847</option>
                            <option value="847.1">847.1</option>
                            <option value="847.2">847.2</option>
                            <option value="847.3">847.3</option>
                            <option value="847.4">847.4</option>
                            <option value="847.9">847.9</option>
                        </select>
                        <h3> Is the patient diagnosed with depression? </h3>
                        <select name="depression" onChange={this.handledepress} value={this.state.depression}>
                            <option value="1" >Yes</option>
                            <option value="0" >No</option>
                        </select>
                        <h3> Did your patient have opioid Treatment? </h3>
                        <select name="opioid" onChange={this.handleopioid} value={this.state.opioid}>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                        <h3>Disability Duration(days):</h3>
                        <input type="text" name="duration" value={this.state.duration} onChange={this.handleduration}/><br/>
                        <br/>
                        <button onClick={this.handlesubmit}>
                            Calculate Probability
                        </button>
                    </form>
                    <br/>
                    
                    <p>Return to Work Probability:<strong> {this.state.rtwprob}% </strong> </p>
                    
                    </div>
        </article>
        </div>
        );
    }
}

Prob.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Prob;
