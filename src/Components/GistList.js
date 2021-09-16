import React from 'react'
import Wrapper from './Wrapper';

let token = "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"
let ghWrapper = new Wrapper(token)

export default class GistList extends React.Component {
    state = {
        gisty: []
    }

    componentDidMount() {
        ghWrapper.publicGist().then(response => {
            console.log(response);
        this.setState({gisty: response.data});
        });
    }
        
    render() {
        return (
            <ul>
                {this.state.gisty.map( gist => <li>{gist.url}</li>)}
            </ul>
        )
    }
}
