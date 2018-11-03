import React from 'react';
import PropTypes from 'prop-types';

class Kmplot extends React.Component{
    constructor(props){
        super(props);
        this.state={minage:"18", maxage:"70", gender:[], diagcode:[],depression:[], opioid:[], good:1}
    }
    componentDidMount(){
        fetch(this.props.url, {credentials:"same-origin"})
        .then((response) => {
                if (!response.ok) throw Error(response.statusText);
            })
        .then(() => {
                this.setState({
                    good: 1,
                });
            })
        .catch(error => console.log(error));
    }
    render(){
        <article class="col-xs-12">
					<h2>Kaplan Meier Curve</h2>
					<p>Set your search criteria, then generate the plot.</p>
					<div class = "form">
                        <form action="#" method="post" enctype="multipart/form-data">
                            <h3> Select Age Range: </h3>
                            Min age:<input type="text" name="agemin" value="18"/> Max age:<input type="text" name="agemax" value="70"/>
                            <h3> Select Gender: </h3>
                            <input type="checkbox" name="gender" value="male"/>Male<input type="checkbox" name="gender" value="female"/>Female
                            <h3>Select backstrain codes: </h3>
                            <table>
                                <tr>
                                <td><input type="checkbox" name="diagcode" value="724.2"/>724.2</td>    
                                <td><input type="checkbox" name="diagcode" value="846"/>846 </td>
                                <td><input type="checkbox" name="diagcode" value="847"/>847 </td>
                                </tr>
                                <tr>
                                <td><input type="checkbox" name="diagcode" value="847.1"/>847.1</td>    
                                <td><input type="checkbox" name="diagcode" value="847.2"/>847.2</td>
                                <td><input type="checkbox" name="diagcode" value="847.3"/>847.3</td>
                                </tr>
                                <tr>
                                <td><input type="checkbox" name="diagcode" value="847.4"/>847.4</td>    
                                <td><input type="checkbox" name="diagcode" value="847.9"/>847.9</td>
                                </tr>
                            </table>
                            <h3> Select population with/without depression: </h3>
                            <input type="checkbox" name="depression" value="Depression"/>Depression <input type="checkbox" name="depression" value="No Depression"/>No Depression
                            <h3> Select population with/without opioids treatment: </h3>
                            <input type="checkbox" name="opioid" value="Opioid"/>Opioid<input type="checkbox" name="opioid" value="No Opioids"/>No Opioid <br/>
                            <input type="submit" name="kmplot" value="Generate Plot"/>
                        </form>
                        <p>
                            <img src = "{{url_for('static',filename='kmplot.png')}}"
                            alt ="Kaplan-Meier Plot"
                            height="300px" width="400px"/>
                        </p>
                        </div>
                </article>
    }
}

Kmplot.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Kmplot;