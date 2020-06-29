import React, {Component} from "react"; 
import Axios from "axios";

class MainComponent extends Component { 

    constructor(props){
        super(props)
        this.state = {
            message: ""
        }
    }

    componentDidMount() {
        this.getApi();
    }

    getApi = () => {
        Axios.get("http://localhost:8000/api/test")
            .then(res => {
                console.log(res);
                this.setState({
                    message: res.data.message
                })
            })
            .catch(res => console.log(res))
    }

    render() { 
        return( 
            <div>
                Main 페이지 
            </div> 
        ) 
    } 
} 
export default MainComponent
