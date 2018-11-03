import React from 'react';
import PropTypes from 'prop-types';

class Prob extends React.Component{
    constructor(props){
        super(props);
        this.State={age:30, gender:0, diagcode:"724.2",depression:1, opioid:1, duration:30,rtwprob:0};
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
    render(){
        return(
        <article class="col-xs-12">
            <h2>Return to Work Probability</h2>
            <p>Set your search criteria, then get the probability of returning to work.</p>
            <div class = "form">
                <form action="#" method="post" enctype="multipart/form-data">
                    <h3> Input Patient Age: </h3>
                    <input type="text" name="age" value="30"/><br/>
                    <h3> Select Gender: </h3>
                    <select name="gender">
                        <option value="0" selected="selected">Male</option>
                        <option value="1">Female</option>
                    </select>
                    <h3>Select backstrain codes: </h3>
                        <select name="diagcode">
                            <option value="724.2" selected="selected">724.2</option>
                            <option value="846">846</option>
                            <option value="847">847</option>
                            <option value="847.1">847.1</option>
                            <option value="847.2">847.2</option>
                            <option value="847.3">847.3</option>
                            <option value="847.4">847.4</option>
                            <option value="847.9">847.9</option>
                        </select>
                        <h3> Is the patient diagnosed with depression? </h3>
                        <select name="depression">
                            <option value="1" selected="selected">Yes</option>
                            <option value="0">No</option>
                        </select>
                        <h3> Did your patient have opioid Treatment? </h3>
                        <select name="opioid">
                            <option value="1" selected="selected">Yes</option>
                            <option value="0">No</option>
                        </select>
                        <h3>Disability Duration(days):</h3>
                        <input type="text" name="duration" value="30"/><br/>
                        <input type="submit" name="probcalc" value="Calculate Probability"/>
                    </form>
                    <p>Return to Work Probability: {{rtwprob}}%</p>
                    </div>
        </article>
        );
    }
}