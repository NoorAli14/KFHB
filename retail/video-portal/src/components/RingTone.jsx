import React from 'react';

class RingTone extends React.Component {

    constructor(props) {
        super(props);
        this.ref1 = React.createRef();
    }
    componentWillUnmount() {
        let audioElt = document.getElementById('ringtone')
        audioElt.pause();
        audioElt.src = "";
    }
    render() {
        return (
            <audio id="ringtone" ref={this.ref1} src={this.props.audioSrc} type="audio/mp3" autoPlay loop></audio>
        );
    }

}
export default RingTone;